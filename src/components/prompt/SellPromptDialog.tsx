"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { 
  BrainCircuit, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  ImageIcon, 
  Layers, 
  Cpu, 
  CircleDollarSign, 
  CheckCircle2, 
  X, 
  Plus, 
  Loader2,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

const formSchema = z.object({
  title: z.string().min(5, "Title too short").max(50),
  short_description: z.string().min(10, "Short description too short").max(160),
  full_description: z.string().min(20, "Full description too short"),
  prompt_text: z.string().min(20, "Prompt is too short"),
  category: z.string().min(1, "Select category"),
  subcategory: z.string().default(""),
  use_case: z.string().min(5, "Use case too short"),
  prompt_type: z.enum(['Instructional', 'Creative', 'Technical', 'Analytical', 'Other']),
  models: z.array(z.string()).min(1, "Select at least one model"),
  output_type: z.enum(['Text', 'Code', 'Image', 'Data', 'Other']),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  tags: z.string(),
  language: z.string().default('English'),
  platform: z.string().min(1, "Select platform"),
  price: z.number().min(0).max(1000),
  example_output: z.string().default(""),
});

type FormValues = z.infer<typeof formSchema>;
const STEPS = [
  { id: 1, name: "Core", icon: BrainCircuit },
  { id: 2, name: "Evidence", icon: ImageIcon },
  { id: 3, name: "Classification", icon: Layers },
  { id: 4, name: "Technical", icon: Cpu },
  { id: 5, name: "Pricing", icon: CircleDollarSign },
  { id: 6, name: "Verify", icon: CheckCircle2 },
];
export function SellPromptForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      short_description: "",
      full_description: "",
      prompt_text: "",
      category: "Marketing",
      subcategory: "",
      use_case: "",
      prompt_type: "Instructional",
      models: ["GPT-4o"],
      output_type: "Text",
      difficulty: "Beginner",
      tags: "",
      language: "English",
      platform: "ChatGPT",
      price: 50,
      example_output: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const { publicUrl } = await res.json();
        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded!`);
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["title", "short_description", "prompt_text", "full_description"];
    } else if (step === 3) {
      fieldsToValidate = ["category", "prompt_type", "difficulty", "use_case"];
    } else if (step === 4) {
      fieldsToValidate = ["models", "output_type"];
    } else if (step === 5) {
      fieldsToValidate = ["price"];
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    
    if (step === 1 && !isValid) {
      toast.error("Please fill all mandatory core fields");
      return;
    }

    if (step === 2) {
      if (images.length < 1) {
        toast.error("Please upload at least 1 preview image");
        return;
      }
    }

    if (step > 2 && !isValid) {
      toast.error("Please complete all required fields in this section");
      return;
    }

    setStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (values: FormValues) => {
    try {
      const cookies = document.cookie.split('; ');
      const userCookie = cookies.find(row => row.startsWith('vault_username='));
      const seller = userCookie ? userCookie.split('=')[1] : null;

      if (!seller) {
        toast.error("Security Session Expired. Please sign in to deploy prompts.");
        router.push("/auth");
        return;
      }

      const tagsArray = values.tags.split(',').map(s => s.trim()).filter(s => s !== "");

      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          promptText: values.prompt_text,
          tags: tagsArray,
          images: images,
          seller: seller,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to deploy asset");
      }

      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#8B5CF6', '#D946EF', '#3B82F6'] });
      toast.success("Prompt Deployed to Marketplace!");
      if (onSuccess) onSuccess();
      router.push("/explore");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Deployment Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center px-2">
        {STEPS.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2 relative">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
              step >= s.id ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-muted text-muted-foreground"
            )}>
              <s.icon className="w-4 h-4" />
            </div>
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", step >= s.id ? "text-primary" : "text-muted-foreground/60")}>
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="min-h-[350px]"
            >
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Asset Title <span className="text-primary">*</span></FormLabel>
                        <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="short_description"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Short Description <span className="text-primary">*</span></FormLabel>
                        <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prompt_text"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">The Prompt <span className="text-primary">*</span></FormLabel>
                        <FormControl><Textarea className="min-h-[140px] bg-muted/20 border-border/40 rounded-xl font-mono text-xs p-4 leading-relaxed" {...field} /></FormControl>
                        <FormDescription className="text-[9px] font-medium opacity-50 italic">Encrypted asset - locked until verified purchase.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="full_description"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Usage Documentation <span className="text-primary">*</span></FormLabel>
                        <FormControl><Textarea className="min-h-[100px] bg-muted/20 border-border/40 rounded-xl p-4" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-border/60 rounded-2xl p-8 text-center hover:border-primary/40 transition-colors relative group">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Upload Preview Images <span className="text-primary">*</span></p>
                        <p className="text-xs text-muted-foreground">Show off the results of your prompt</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 group bg-muted/20">
                        {url ? (
                          <img 
                            src={url} 
                            alt="Preview" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a24/primary?text=Preview+Error';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="p-2 bg-destructive text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {images.length === 0 && Array.from({ length: 3 }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square rounded-2xl border border-dashed border-border/40 flex items-center justify-center bg-muted/5">
                        <ImageIcon className="w-6 h-6 text-muted-foreground/10" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 py-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Nexus Category <span className="text-primary">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                            {["Marketing", "Coding", "Creative Writing", "Data Science", "Image Gen", "Business"].map(c => (
                              <SelectItem key={c} value={c} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="use_case"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 py-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Target Use Case <span className="text-primary">*</span></FormLabel>
                        <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prompt_type"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 py-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Instructional DNA <span className="text-primary">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                            {['Instructional', 'Creative', 'Technical', 'Analytical', 'Other'].map(t => (
                              <SelectItem key={t} value={t} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 py-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Ease of Deployment <span className="text-primary">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                            {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                              <SelectItem key={d} value={d} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 py-2">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Target Platform <span className="text-primary">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                            {['ChatGPT', 'Claude', 'Midjourney', 'Stable Diffusion', 'Gemini', 'DALL-E', 'Other'].map(p => (
                              <SelectItem key={p} value={p} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="models"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Optimized Models <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            value={field.value.join(", ")}
                            onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
                            className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"
                          />
                        </FormControl>
                        <FormDescription className="text-[9px] font-medium opacity-50 italic">Separate with commas (e.g. GPT-4o, Claude 3.5)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="output_type"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Expected Output DNA <span className="text-primary">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                            {['Text', 'Code', 'Image', 'Data', 'Other'].map(o => (
                              <SelectItem key={o} value={o} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Market Keywords</FormLabel>
                        <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
                        <FormDescription className="text-[9px] font-medium opacity-50 italic">Tags help buyers find your asset quickly.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }: any) => (
                      <FormItem className="space-y-8">
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Asset Valuation (₹)</FormLabel>
                          <div className="flex items-center gap-2 group/price bg-primary/5 px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all">
                            <span className="text-xl font-black text-primary italic opacity-40 group-hover/price:opacity-100 transition-opacity">₹</span>
                            <input 
                              type="number"
                              value={field.value}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              className="w-20 bg-transparent border-none text-3xl font-black tracking-tighter text-primary italic focus:outline-none p-0 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        
                        <div className="px-3 py-10 bg-muted/5 rounded-[2rem] border border-border/40 shadow-inner">
                          <Slider
                            min={0}
                            max={2000}
                            step={1}
                            value={[field.value || 0]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="py-4 cursor-pointer"
                          />
                          <div className="flex justify-between mt-4 text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
                             <span>Floor Price</span>
                             <span>Market Cap</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[49, 99, 199, 499].map((val) => (
                            <Button 
                              key={val}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange(val)}
                              className={cn(
                                "rounded-xl border-border/40 font-bold",
                                field.value === val ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-card px-2 py-1"
                              )}
                            >
                              ₹{val}
                            </Button>
                          ))}
                        </div>
                        
                        <FormDescription className="text-[10px] font-bold uppercase opacity-50">Market insight: Prompts priced between ₹49-199 convert 3x faster.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="example_output"
                    render={({ field }: any) => (
                      <FormItem className="space-y-1.5 pt-4">
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Sanitized Logic Output</FormLabel>
                        <FormControl><Textarea className="min-h-[120px] bg-muted/20 border-border/40 rounded-xl p-4 font-mono text-[10px]" {...field} /></FormControl>
                        <FormDescription className="text-[9px] font-medium opacity-50 italic">Provide a sample of what this prompt produces for transparency.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6 flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black">Ready for Deployment?</h3>
                    <p className="text-sm text-muted-foreground max-w-[300px]">
                      Your asset "{form.getValues().title}" is ready to be listed on the Vault marketplace.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline">{form.getValues().category}</Badge>
                    <Badge variant="outline">{form.getValues().platform}</Badge>
                    <Badge variant="outline">{form.getValues().prompt_type}</Badge>
                    <Badge variant="outline">₹{form.getValues().price}</Badge>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center pt-6 border-t border-border/40">
            <Button type="button" variant="ghost" className="rounded-xl px-6" onClick={prevStep} disabled={step === 1}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <Button 
              type={step === 6 ? "submit" : "button"}
              className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px]" 
              onClick={step === 6 ? undefined : nextStep}
            >
              {step === 6 ? "Deploy Prompt" : "Continue"} <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function SellPromptDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl hidden lg:flex items-center gap-2 px-6 bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/25 group">
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Add Prompt</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Sparkles className="w-6 h-6" />
              </div>
              Mint New Prompt
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium pt-1">
              Fuel the ecosystem with your high-quality engineered prompts.
            </DialogDescription>
          </DialogHeader>
          
          <SellPromptForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
