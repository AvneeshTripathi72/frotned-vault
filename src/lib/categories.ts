export const PROMPT_CATEGORIES = [
  {
    section: "Short-form Vertical Video",
    categories: [
      "Instagram Reel", "Instagram Story", "YouTube Shorts", "TikTok Video",
      "Snapchat Story / Ad", "Pinterest Video Pin", "Facebook Reel",
      "LinkedIn Video (short)", "WhatsApp Status / Channel", "Twitch Clips / Shorts"
    ],
    aspectRatio: "9:16",
    displayMode: "Vertical frame + text card",
    outputFormat: "Script · Hook · CTA · Caption · Hashtags",
  },
  {
    section: "Long-form & Horizontal Video",
    categories: [
      "YouTube Long-form", "YouTube Thumbnail", "YouTube Channel Banner",
      "Podcast Video", "Webinar / Live Stream", "Online Course Video",
      "LinkedIn Video (long)", "Facebook Watch / Video", "X (Twitter) Video",
      "Vimeo / Wistia", "AI Video Generation", "OTT / Streaming Trailer"
    ],
    aspectRatio: "16:9",
    displayMode: "Horizontal frame + text card",
    outputFormat: "Script · Outline · Chapters · Description · Tags",
  },
  {
    section: "Static Image & Graphic Content",
    categories: [
      "Instagram Feed Post", "Instagram Carousel", "Instagram Profile Picture",
      "Twitter / X Post Image", "Twitter / X Card Image", "LinkedIn Post Image",
      "LinkedIn Article Cover", "Facebook Feed Image", "Facebook Cover Photo",
      "Pinterest Pin", "Midjourney / DALL-E", "Stable Diffusion / Flux",
      "Product Photography", "Open Graph Image", "Infographic"
    ],
    aspectRatio: "1:1 / 4:5 / 16:9",
    displayMode: "Image Frame",
    outputFormat: "Image prompt · Caption · Hashtags",
  },
  {
    section: "Audio & Voice Content",
    categories: [
      "Podcast Episode", "Podcast Cover Art", "Voice Synthesis", "AI Music",
      "Audiobook Narration", "Radio / Podcast Ad", "Sound Effect Prompt",
      "Voice Assistant Script"
    ],
    aspectRatio: "Audio Player",
    displayMode: "Audio player + text card",
    outputFormat: "Script · Duration · Tone",
  },
  {
    section: "Written & Document Content",
    categories: [
      "Blog / Long-form Article", "Email / Newsletter", "LinkedIn Post (text)",
      "Twitter / X Thread", "Facebook Post (text)", "YouTube Script",
      "SEO Meta Tags", "Chatbot Script", "Website Copy", "Press Release"
    ],
    aspectRatio: "Text UI",
    displayMode: "Text card (scrollable)",
    outputFormat: "Text Body · Sections · Focus Keywords",
  },
  {
    section: "Professional & Business Documents",
    categories: [
      "Pitch Deck / Slide", "Business Plan", "Market Research Report",
      "SWOT Analysis", "Financial Model / Report", "Job Description",
      "Resume / CV", "SOP / Process Doc", "Contract / Agreement", "NDA"
    ],
    aspectRatio: "A4 / Slides",
    displayMode: "A4 frame / Slides",
    outputFormat: "Sections · Outline · Executive Summary",
  },
  {
    section: "Technical & Developer Content",
    categories: [
      "Web Development", "Backend / API", "Database / SQL", "Python Script",
      "Docker / Kubernetes", "Terraform / IaC", "Regex Patterns", "Chrome Extension",
      "Machine Learning", "Web Scraping"
    ],
    aspectRatio: "Code UI",
    displayMode: "Code block (syntax highlighted)",
    outputFormat: "Code · Documentation · Comments",
  },
  {
    section: "Industry Vertical Prompts",
    categories: [
      "Healthcare / Medical", "Legal", "Finance & Accounting", "Real Estate",
      "Education & Training", "Sales & CRM", "Customer Support", "Gaming",
      "Creative Writing / Fiction", "Science & Technical"
    ],
    aspectRatio: "Document UI",
    displayMode: "Text card (structured)",
    outputFormat: "Structured Professional Output",
  }
];

export function getCategoryDetails(selectedCategory: string) {
  for (const group of PROMPT_CATEGORIES) {
    if (group.categories.includes(selectedCategory) || group.section === selectedCategory) {
      return group;
    }
  }
  return null;
}
