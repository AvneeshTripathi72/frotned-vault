"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues } from "./sell-form/schema";
import { SinglePageFormFields } from "./sell-form/SinglePageFormFields";
import { getCategoryDetails } from "@/lib/categories";

export function SellPromptForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      short_description: "",
      full_description: "",
      prompt_text: "",
      category: "",
      subcategory: "",
      use_case: "",
      prompt_type: "Instructional",
      models: [],
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

  const onSubmit = async (values: FormValues) => {
    try {
      // Validate Images if required by category
      const selectedCategory = values.category;
      const categoryDetails = getCategoryDetails(selectedCategory);
      if (categoryDetails && (categoryDetails.section.includes("Video") || categoryDetails.section.includes("Image"))) {
         if (images.length === 0) {
           toast.error("Please upload at least 1 showcase visual for this category");
           return;
         }
      }

      const cookies = document.cookie.split('; ');
      const userCookie = cookies.find(row => row.startsWith('vault_username='));
      const seller = userCookie ? userCookie.split('=')[1] : null;

      if (!seller) {
        toast.error("Security Session Expired. Please sign in.");
        router.push("/auth");
        return;
      }

      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          promptText: values.prompt_text,
          tags: values.tags ? values.tags.split(',').map(s => s.trim()).filter(s => s !== "") : [],
          images: images,
          seller: seller,
        }),
      });

      if (!response.ok) {
        let errMsg = "Deployment failed";
        try {
          const errData = await response.json();
          if (errData.error) errMsg = errData.error;
        } catch (e) {}
        throw new Error(errMsg);
      }

      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      toast.success("Prompt Deployed!");
      if (onSuccess) onSuccess();
      router.push("/explore");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
          <SinglePageFormFields 
            form={form} 
            images={images} 
            setImages={setImages} 
            isUploading={isUploading} 
            handleImageUpload={handleImageUpload} 
          />
          <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-4 border-t border-border/40 flex justify-end z-10 w-full rounded-b-3xl">
            <Button type="submit" className="rounded-xl px-12 py-6 font-black uppercase tracking-widest text-[12px] shadow-xl hover:scale-[1.02] transition-transform w-full md:w-auto">
              Deploy Prompt
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
        <Button className="rounded-xl hidden lg:flex items-center gap-2 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all shadow-lg shadow-primary/25">
          <Sparkles className="w-4 h-4" />
          <span>Add Prompt</span>
        </Button>
      </DialogTrigger>
      {/* Set a wider max-width to accommodate the single page view naturally and allow smooth scrolling */}
      <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto p-0 rounded-[2rem] border border-border bg-background shadow-2xl custom-scrollbar hidden-scroll-thumb block">
        <div className="p-8 pb-0">
          <DialogHeader className="mb-8 relative z-20">
            <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground"><Sparkles className="w-6 h-6" /></div>
              Deploy Asset
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium pt-1">Fuel the ecosystem with your high-quality engineered logic.</DialogDescription>
          </DialogHeader>
          <SellPromptForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
