from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, BitsAndBytesConfig
from transformers import AutoModelForCausalLM
import torch

app = Flask(__name__)
CORS(app)  # Allow frontend access

model_id = "meta-llama/Llama-3.2-3B-Instruct"

bnb_config = BitsAndBytesConfig (
    load_in_4bit = True,
    bnb_4bit_use_double_quant = True,
    bnb_4bit_quant_type = "nf4",
    bnb_4bit_compute_dtype = torch.bfloat16
)

tokenizer = AutoTokenizer.from_pretrained(model_id)
tokenizer.padding_side = 'left'
tokenizer.pad_token = tokenizer.eos_token
model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=bnb_config, device_map="auto")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    inputs = tokenizer(user_message, return_tensors="pt", padding=True)
    input_ids = inputs.input_ids.to("cuda")
    attention_mask = inputs.attention_mask.to("cuda")

    with torch.inference_mode():
        outputs = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=500)
    
    response = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

    return jsonify({"id": "ai", "text": response})

if __name__ == "__main__":
    app.run(debug=True)