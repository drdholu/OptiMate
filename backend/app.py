from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from transformers import AutoTokenizer, BitsAndBytesConfig
from transformers import AutoModelForCasualLM
import torch

app = Flask(__name__)
CORS(app)  # Allow frontend access

model = "meta-llama/Llama-3.2-1B"

bnb_config = BitsAndBytesConfig (
    load_in_4bit = True,
    bnb_4bit_use_double_quant = True,
    bnb_4bit_quant_type = "nf4",
    bnb_4bit__compute_dtype = torch.bfloat16
)

tokenizer = AutoTokenizer.from_pretrained(model)
tokenizer.pad = tokenizer.eos_token
model = AutoModelForCasualLM.from_pretrained(model, quantization_config=bnb_config, device_map="auto")

# Load AI model (GPT-2 for now, change later)
chatbot = pipeline("text-generation",  model="perplexity-ai/r1-1776", trust_remote_code=True)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    response = chatbot(user_message, max_length=100, num_return_sequences=1, truncation=True)

    return jsonify({"id": "ai", "text": response[0]["generated_text"]})

if __name__ == "__main__":
    app.run(debug=True)
