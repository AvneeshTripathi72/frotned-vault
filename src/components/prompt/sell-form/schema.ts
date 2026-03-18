import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(5, "Title too short").max(50),
  short_description: z.string().min(10, "Short description too short").max(160),
  full_description: z.string().min(20, "Full description too short"),
  prompt_text: z.string().min(20, "Prompt is too short"),
  category: z.string().min(1, "Select category"),
  subcategory: z.string().optional(),
  use_case: z.string().optional(),
  prompt_type: z.string().optional(),
  models: z.array(z.string()).min(1, "Select at least one model"),
  output_type: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.string().optional(),
  language: z.string().default('English'),
  platform: z.string().min(1, "Select platform"),
  price: z.number().min(0).max(1000),
  example_output: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
