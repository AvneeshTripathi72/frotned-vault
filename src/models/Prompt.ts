import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true, maxlength: 160 },
  full_description: { type: String, required: true },
  prompt_text: { type: String, required: true },
  promptText: { type: String },
  platform: { type: String, default: 'OpenAI' },
  category: { type: String, required: true },
  subcategory: { type: String },
  use_case: { type: String },
  prompt_type: { 
    type: String, 
    required: true, 
    enum: ['Instructional', 'Creative', 'Technical', 'Analytical', 'Other'] 
  },
  models: [{ type: String, required: true }],
  output_type: { 
    type: String, 
    required: true, 
    enum: ['Text', 'Code', 'Image', 'Data', 'Other'] 
  },
  inputs: [{
    name: { type: String },
    type: { type: String },
    description: { type: String }
  }],
  example_input: { type: Schema.Types.Mixed },
  example_output: { type: String },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['Beginner', 'Intermediate', 'Advanced'] 
  },
  tags: [{ type: String }],
  language: { type: String, default: 'English' },
  price: { type: Number, required: true, default: 0 },
  seller: { type: String, required: true },
  images: [{ type: String }],
  rating: { type: Number, default: 5 },
  sales: { type: Number, default: 0 },
  version: { type: String, default: 'v1.0' },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add indices to speed up queries by these fields
PromptSchema.index({ seller: 1 });
PromptSchema.index({ category: 1 });
PromptSchema.index({ platform: 1 });
PromptSchema.index({ createdAt: -1 });

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
