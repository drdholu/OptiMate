from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch
import os

# Initialize app
app = Flask(__name__)
CORS(app)

# Global model/tokenizer/system prompt
model = None
tokenizer = None
system_prompt = None

def load_system_prompt(file_path="src/prompts/system_prompt.txt"):
    """Load system prompt from a file with fallback"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        print(f"[WARN] Failed to load system prompt: {e}")
        return (
            "You are Optimate, an advanced AI assistant designed to help users optimize their code."
        )

def load_model(model_path="./optim8-model"):
    """Load the fine-tuned LLaMA model and tokenizer with 4-bit quantization"""
    global model, tokenizer, system_prompt
    try:
        print("[INFO] Loading model and tokenizer...")
        
        quant_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.float16,
        )

        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            quantization_config=quant_config,
            torch_dtype=torch.float16,
            device_map="auto"
        )

        system_prompt = load_system_prompt()
        print("[INFO] Model and prompt loaded successfully.")

    except Exception as e:
        print(f"[ERROR] Model loading failed: {e}")
        exit(1)

# Load the model once at startup
load_model()

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True)
        user_message = data.get("message", "").strip()
        chat_history = data.get("history", [])

        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400

        # Optimization-related trigger keywords
        optimization_keywords = [
            "optimize", "faster", "efficiency", "performance",
            "speed up", "improve runtime", "algorithm"
        ]
        is_optimization_request = any(k in user_message.lower() for k in optimization_keywords)

        # Build prompt
        prompt = f"{system_prompt}\n\n"

        if is_optimization_request:
            prompt += "Remember: You MUST use the exact format specified above for code optimization requests.\n\n"

        for msg in chat_history:
            role = "User" if msg.get("role") == "user" else "Assistant"
            content = msg.get("content", "").strip()
            if content:
                prompt += f"{role}: {content}\n"

        prompt += f"User: {user_message}\nAssistant:"

        # Tokenize
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

        # Generate
        with torch.no_grad():
            output = model.generate(
                input_ids=inputs.input_ids,
                attention_mask=inputs.attention_mask,
                max_new_tokens=800,
                temperature=0.6,
                top_p=0.9,
                repetition_penalty=1.2,
                do_sample=True,
                no_repeat_ngram_size=3,
                length_penalty=1.0,
                pad_token_id=tokenizer.eos_token_id,
            )

        # Decode
        response_text = tokenizer.decode(
            output[0][inputs.input_ids.shape[1]:],
            skip_special_tokens=True
        )

        return jsonify({"id": "ai", "text": response_text})
    
    except Exception as e:
        print(f"[ERROR] Chat route failed: {e}")
        return jsonify({"error": "Something went wrong processing your message."}), 500

if __name__ == "__main__":
    # Don't enable reloader in production
    app.run(debug=False, port=5000)
