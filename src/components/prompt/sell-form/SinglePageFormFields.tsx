"use client";

import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { PROMPT_CATEGORIES, getCategoryDetails } from "@/lib/categories";

interface SinglePageFormFieldsProps {
  form: UseFormReturn<FormValues>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isUploading: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function SinglePageFormFields({ form, images, setImages, isUploading, handleImageUpload }: SinglePageFormFieldsProps) {
  const selectedCategory = form.watch("category");
  const categoryDetails = selectedCategory ? getCategoryDetails(selectedCategory) : null;

  return (
    <div className="space-y-12 pb-12 w-full animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* 1. Category Selection */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-border/40 pb-4">1. Category Selection</h2>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1.5 py-2">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">Asset Category <span className="text-primary">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold"><SelectValue placeholder="Select output category..." /></SelectTrigger></FormControl>
                <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-xl max-h-[400px]">
                  {PROMPT_CATEGORIES.map(group => (
                    <div key={group.section} className="py-2">
                      <div className="px-2 py-1 text-[9px] font-black uppercase text-muted-foreground">{group.section}</div>
                      {group.categories.map(c => (
                        <SelectItem key={c} value={c} className="font-bold hover:bg-primary/10 transition-colors cursor-pointer ml-2 text-xs">
                          {c}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {categoryDetails && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
             <p className="text-sm font-bold text-primary">UI Output Format Identified</p>
             <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">Aspect Ratio: {categoryDetails.aspectRatio}</Badge>
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">Display: {categoryDetails.displayMode}</Badge>
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">Format: {categoryDetails.outputFormat}</Badge>
             </div>
          </div>
        )}
      </section>

      {/* 2. Core Prompt Details */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-border/40 pb-4">2. Prompt DNA</h2>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Asset Title <span className="text-primary">*</span></FormLabel>
                <FormControl><Input placeholder="E.g. Viral Shorts Hook Generator" className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} /></FormControl>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="models"
              render={({ field }) => (
                <FormItem className="space-y-1.5 py-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Models Supported <span className="text-primary">*</span></FormLabel>
                  <FormControl>
                    <Input value={field.value?.join(", ")} onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))} className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        </div>
      </section>

      {/* Dynamic Section modified by user type */}
      {categoryDetails && (
        <section className="space-y-6 animate-in fade-in duration-500">
           <h2 className="text-2xl font-black tracking-tight border-b border-border/40 pb-4">3. Type-Specific Details</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Market Keywords</FormLabel>
                    <FormControl><Input placeholder="E.g. #marketing, #viral" className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} value={field.value || ""} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="use_case" render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Target Use Case</FormLabel>
                  <FormControl><Input className="h-12 bg-muted/20 border-border/40 rounded-xl font-bold" {...field} value={field.value || ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
           </div>

           {/* Video/Audio/Image specific validation will still run, but we moved image upload to the output section */}

           <FormField
              control={form.control}
              name="full_description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Usage Documentation</FormLabel>
                  <FormControl><Textarea className="min-h-[100px] bg-muted/20 border-border/40 rounded-xl p-4" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </section>
      )}

      {/* 4. Pricing */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight border-b border-border/40 pb-4">4. Value Assignment</h2>
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
      </section>

      {/* 5. Output Preview Section */}
      <section className="space-y-6 bg-card/50 p-6 rounded-2xl border border-border/40">
         <h2 className="text-2xl font-black tracking-tight border-b border-border/40 pb-4">5. Example Output / Preview</h2>
         <p className="text-sm text-muted-foreground font-medium">Verify your output format before deployment. This is what buyers will see.</p>
         
         <div className="space-y-4">
           {/* Image Upload for Output */}
           <div className="border-2 border-dashed border-border/60 rounded-2xl p-8 text-center hover:border-primary/40 transition-colors relative group">
             <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
             <div className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
               </div>
               <div className="space-y-1">
                 <p className="text-sm font-bold">Upload Example Photos / Visual Output</p>
                 <p className="text-xs text-muted-foreground">Show off the generated results or showcase visuals</p>
               </div>
             </div>
           </div>
           
           {images.length > 0 && (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
           )}
         </div>

         <FormField control={form.control} name="example_output" render={({ field }) => (
          <FormItem className="space-y-1.5 pt-4">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-primary">Sanitized Logic Output (Text)</FormLabel>
            <FormControl><Textarea className="min-h-[150px] bg-muted/40 border-primary/20 rounded-xl p-4 font-mono text-sm shadow-inner" placeholder={categoryDetails ? categoryDetails.outputFormat : "Output example..."} {...field} value={field.value || ""} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </section>

    </div>
  );
}
