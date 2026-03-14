"use client";

import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Plus, ImageIcon, Trash2, CheckCircle2 } from "lucide-react";

interface FormStepsProps {
  step: number;
  form: UseFormReturn<FormValues>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isUploading: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function FormSteps({ step, form, images, setImages, isUploading, handleImageUpload }: FormStepsProps) {
  if (step === 1) {
    return (
      <div className="space-y-4 animate-in fade-in duration-500">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
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
          render={({ field }) => (
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
          render={({ field }) => (
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
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Usage Documentation <span className="text-primary">*</span></FormLabel>
              <FormControl><Textarea className="min-h-[100px] bg-muted/20 border-border/40 rounded-xl p-4" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (step === 2) {
    return (
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
              <img src={url} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="p-2 bg-destructive text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1.5 py-2">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Nexus Category <span className="text-primary">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue /></SelectTrigger></FormControl>
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
        <FormField control={form.control} name="use_case" render={({ field }) => (
          <FormItem className="space-y-1.5 py-2">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Target Use Case <span className="text-primary">*</span></FormLabel>
            <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="prompt_type" render={({ field }) => (
          <FormItem className="space-y-1.5 py-2">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Instructional DNA <span className="text-primary">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue /></SelectTrigger></FormControl>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                {['Instructional', 'Creative', 'Technical', 'Analytical', 'Other'].map(t => (
                  <SelectItem key={t} value={t} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="difficulty" render={({ field }) => (
          <FormItem className="space-y-1.5 py-2">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Ease of Deployment <span className="text-primary">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue /></SelectTrigger></FormControl>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                  <SelectItem key={d} value={d} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="platform" render={({ field }) => (
          <FormItem className="space-y-1.5 py-2">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Target Platform <span className="text-primary">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue /></SelectTrigger></FormControl>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                {['ChatGPT', 'Claude', 'Midjourney', 'Stable Diffusion', 'Gemini', 'DALL-E', 'Other'].map(p => (
                  <SelectItem key={p} value={p} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="models"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Optimized Models <span className="text-primary">*</span></FormLabel>
              <FormControl>
                <Input value={field.value.join(", ")} onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))} className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" />
              </FormControl>
              <FormDescription className="text-[9px] font-medium opacity-50 italic">Separate with commas (e.g. GPT-4o, Claude 3.5)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="output_type" render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Expected Output DNA <span className="text-primary">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue /></SelectTrigger></FormControl>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl">
                {['Text', 'Code', 'Image', 'Data', 'Other'].map(o => (
                  <SelectItem key={o} value={o} className="font-bold hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-widest">{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="tags" render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Market Keywords</FormLabel>
            <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-8">
              <div className="flex justify-between items-center">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Asset Valuation (₹)</FormLabel>
                <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all">
                  <span className="text-xl font-black text-primary italic">₹</span>
                  <input type="number" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} className="w-20 bg-transparent border-none text-3xl font-black tracking-tighter text-primary italic focus:outline-none" />
                </div>
              </div>
              <div className="px-3 py-10 bg-muted/5 rounded-[2rem] border border-border/40">
                <Slider min={0} max={2000} step={1} value={[field.value || 0]} onValueChange={(vals) => field.onChange(vals[0])} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[49, 99, 199, 499].map((val) => (
                  <Button key={val} type="button" variant="outline" size="sm" onClick={() => field.onChange(val)} className={cn("rounded-xl border-border/40 font-bold", field.value === val ? "bg-primary text-white border-primary" : "bg-card")}>
                    ₹{val}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="example_output" render={({ field }) => (
          <FormItem className="space-y-1.5 pt-4">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Sanitized Logic Output</FormLabel>
            <FormControl><Textarea className="min-h-[120px] bg-muted/20 border-border/40 rounded-xl p-4 font-mono text-[10px]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center py-10 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black">Ready for Deployment?</h3>
          <p className="text-sm text-muted-foreground max-w-[300px]">Your asset "{form.getValues().title}" is ready to be listed.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline">{form.getValues().category}</Badge>
          <Badge variant="outline">{form.getValues().platform}</Badge>
          <Badge variant="outline">{form.getValues().prompt_type}</Badge>
          <Badge variant="outline">₹{form.getValues().price}</Badge>
        </div>
      </div>
    );
  }

  return null;
}
