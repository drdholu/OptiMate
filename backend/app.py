from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch
import os
import sys

app = Flask(__name__)
CORS(app)  # Allow frontend access

# Global variables for model and tokenizer
model = None
tokenizer = None

def load_model():
    """Load the model and tokenizer only once"""
    global model, tokenizer
    
    try:
        print("Loading model and tokenizer...")
        # Model loading configuration
        model_path = "./optim8-model"

        # Configure quantization
        quantization_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.float16
        )

        # Load the locally saved model using standard Transformers
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            quantization_config=quantization_config,
            device_map="auto",  # Automatically choose best device setup
            torch_dtype=torch.float16,  # Use half precision to save memory
        )
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
        sys.exit(1)

# Load model unconditionally
load_model()

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400
    
    # Create inputs for model
    inputs = tokenizer(user_message, return_tensors="pt").to(model.device)
    
    # Generate response
    with torch.no_grad():
        outputs = model.generate(
            input_ids=inputs.input_ids,
            attention_mask=inputs.attention_mask,
            max_new_tokens=500,
            temperature=0.7,
            top_p=0.9
        )
    
    # Decode response
    response = tokenizer.decode(outputs[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
    
    return jsonify({"id": "ai", "text": response})

if __name__ == "__main__":
    # Set debug to False to prevent reloading issues
    app.run(debug=False)