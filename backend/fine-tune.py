from transformers import AutoTokenizer, BitsAndBytesConfig
from transformers import AutoModelForCausalLM
from datasets import load_dataset
import torch
from transformers import TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model

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

# Define LoRA Config
lora_config = LoraConfig(
    r=8,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Add LoRA adapter
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
model.gradient_checkpointing_enable()

ds = load_dataset("google/code_x_glue_cc_code_refinement", "small")
# dsGo = load_dataset("google/code_x_glue_ct_code_to_text", "go")
# dsJava = load_dataset("google/code_x_glue_ct_code_to_text", "java")
# dsJs = load_dataset("google/code_x_glue_ct_code_to_text", "javascript")

def format_instruction(sample):
    instruction = f"""### Instruction:
Use the provided code to respond to the query.

### Code:
{sample['buggy']}

### Response:
"""
    return {"input_text": instruction, "label_text": sample['fixed']}

def tokenize_function(sample):
    return tokenizer(
        sample["input_text"],
        text_target=sample["label_text"],
        padding="max_length",
        truncation=True,
        max_length=256
    )

formatted_ds = ds['train'].map(format_instruction)
tokenized_ds = formatted_ds.map(tokenize_function, batched=True, remove_columns=formatted_ds.column_names)

training_args = TrainingArguments(
        output_dir="tuned-model",
        per_device_train_batch_size=1,
        gradient_accumulation_steps=8,
        optim="paged_adamw_32bit",
        save_steps=100,
        logging_steps=10,
        learning_rate=2e-4,
        fp16=True,
        max_grad_norm=0.3,
        num_train_epochs = 1,
        warmup_ratio=0.03,
        lr_scheduler_type="cosine",
        push_to_hub=False,
)

trainer = Trainer(
    model=model,
    train_dataset=tokenized_ds,
    args=training_args,
    tokenizer=tokenizer,
)

trainer.train()

trainer.save_model("saved-model")