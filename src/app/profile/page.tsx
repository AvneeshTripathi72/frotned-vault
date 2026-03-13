"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  User as UserIcon, 
  Settings, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  ShieldCheck, 
  Star, 
  Wallet, 
  ShoppingBag, 
  Trophy, 
  Clock, 
  ExternalLink,
  Mail,
  Edit2,
  Camera,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Plus,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PromptCard } from "@/components/prompt/PromptCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [activeTab, setActiveTab] = useState("prompts");
  const [editForm, setEditForm] = useState({
    fullName: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    github: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      setUser(data);
      setEditForm({
        fullName: data.fullName || "",
        bio: data.bio || "",
        location: data.location || "",
        website: data.website || "",
        twitter: data.twitter || "",
        github: data.github || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[60vh] text-foreground">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="mt-4 text-muted-foreground animate-pulse font-medium">Syncing profile data...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300" suppressHydrationWarning>
      {/* Dynamic Header Background */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background" />
        <div className="absolute inset-0 opacity-10 dark:opacity-30" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" 
        />
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          
          {/* Main Sidebar: Avatar & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-3xl p-8 relative overflow-hidden shadow-xl"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              
              <div className="relative flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="w-32 h-32 rounded-[2rem] border-4 border-background overflow-hidden relative shadow-2xl bg-muted group">
                    {user?.avatar && !avatarError ? (
                      <img 
                        src={user.avatar} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white font-black text-4xl shadow-inner">
                        {(user?.email?.[0] || user?.username?.[0] || 'U').toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {user.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl shadow-lg border-4 border-background">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-1">
                  <h1 className="text-2xl font-black tracking-tight">{user.fullName || user.username}</h1>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase opacity-80">{user.role}</p>
                </div>

                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-medium">{user.location || "Remote Universe"}</span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground/80 font-medium max-w-xs">
                  {user.bio || "Crafting intelligence, one prompt at a time."}
                </p>

                <div className="flex items-center justify-center gap-4 mt-8 w-full">
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline" 
                    className="flex-1 rounded-xl h-11 border-border hover:bg-muted font-bold uppercase tracking-widest text-[10px]"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-2" /> {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border hover:bg-muted group">
                        <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/40 p-2 rounded-2xl shadow-2xl z-[100]">
                      <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest opacity-60 px-3 py-3">Quick_Ops</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/20 mx-1" />
                      <DropdownMenuItem asChild className="rounded-xl transition-all cursor-pointer">
                        <Link href="/settings?tab=security" className="flex items-center gap-3 px-3 py-2.5">
                          <Lock className="w-4 h-4 text-primary" />
                          <span className="font-bold text-sm">Change Password</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl transition-all cursor-pointer">
                        <Link href="/settings?tab=account" className="flex items-center gap-3 px-3 py-2.5">
                          <UserIcon className="w-4 h-4 text-primary" />
                          <span className="font-bold text-sm">Update Avatar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/20 mx-1" />
                      <DropdownMenuItem asChild className="rounded-xl transition-all cursor-pointer">
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5">
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          <span className="font-bold text-sm">All Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full mt-8 pt-8 border-t border-border/50">
                  {[
                    { icon: Twitter, href: user.twitter },
                    { icon: Github, href: user.github },
                    { icon: LinkIcon, href: user.website }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href ? (social.href.startsWith('http') ? social.href : `https://${social.href}`) : '#'}
                      target="_blank"
                      className="h-10 flex items-center justify-center rounded-xl bg-muted/30 border border-border hover:bg-primary/10 hover:border-primary/40 transition-all text-muted-foreground hover:text-primary"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2.5rem] bg-card/50 backdrop-blur-2xl border border-border p-8 shadow-lg"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Profile_Intelligence</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Revenue</p>
                  <p className="text-xl font-black text-primary">₹{user.stats?.totalEarnings || 0}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Sales</p>
                  <p className="text-xl font-black text-foreground">{user.stats?.totalSales || 0}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Rank</p>
                  <p className="text-sm font-black text-yellow-500 uppercase flex items-center gap-2">
                    <Trophy className="w-3 h-3" /> {user.stats?.rank || "Silver"}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Assets</p>
                  <p className="text-sm font-black text-foreground uppercase">{user.purchasedPrompts?.length || 0} Owned</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section: Content Tabs or Edit Form */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-[2.5rem] bg-card/50 backdrop-blur-3xl border border-border p-10 shadow-xl"
                >
                  <h2 className="text-3xl font-black tracking-tight mb-8">Refine Identity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Display Name</label>
                      <Input 
                        value={editForm.fullName} 
                        onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                        className="h-12 bg-muted/20 border-border rounded-xl focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Base Location</label>
                      <Input 
                        value={editForm.location} 
                        onChange={e => setEditForm({...editForm, location: e.target.value})}
                        className="h-12 bg-muted/20 border-border rounded-xl focus:ring-primary/20" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bio / Transmission</label>
                      <Textarea 
                        value={editForm.bio} 
                        onChange={e => setEditForm({...editForm, bio: e.target.value})}
                        className="min-h-[120px] bg-muted/20 border-border rounded-xl focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Twitter Handle</label>
                      <Input 
                        value={editForm.twitter} 
                        onChange={e => setEditForm({...editForm, twitter: e.target.value})}
                        placeholder="@username" 
                        className="h-12 bg-muted/20 border-border rounded-xl focus:ring-primary/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Website / Nexus</label>
                      <Input 
                        value={editForm.website} 
                        onChange={e => setEditForm({...editForm, website: e.target.value})}
                        placeholder="https://..." 
                        className="h-12 bg-muted/20 border-border rounded-xl focus:ring-primary/20" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-12">
                     <Button variant="ghost" className="rounded-xl h-12 px-6 font-bold" onClick={() => setIsEditing(false)}>Cancel</Button>
                     <Button className="rounded-xl h-12 px-10 bg-primary font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20" onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Tabs Navigation */}
                  <div className="flex gap-8 border-b border-border">
                    {[
                      { id: "prompts", label: "My Prompts", icon: Sparkles },
                      { id: "purchased", label: "Owned Assets", icon: ShoppingBag },
                      { id: "activity", label: "Nexus Feed", icon: Zap }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "pb-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative flex items-center gap-2 outline-none",
                          activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {activeTab === "purchased" && (
                      user.purchasedPrompts?.length > 0 ? (
                        user.purchasedPrompts.map((prompt: any, i: number) => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={prompt._id}
                          >
                             <PromptCard 
                               id={prompt._id}
                               title={prompt.title}
                               short_description={prompt.short_description}
                               price={prompt.price}
                               rating={prompt.rating}
                               platform={prompt.platform}
                               author={{ username: "Creator", avatar: "" }}
                               previewImage={prompt.images?.[0] || ""}
                               promptPreview={prompt.prompt_text?.substring(0, 50) || ""}
                             />
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                          <ShoppingBag className="w-16 h-16" />
                          <div className="space-y-1">
                            <p className="font-black uppercase tracking-widest text-foreground">Inventory empty</p>
                            <p className="text-sm font-medium text-muted-foreground">Acquire prompts from the marketplace to start building.</p>
                          </div>
                        </div>
                      )
                    )}

                    {activeTab === "prompts" && (
                      <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Plus className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-xl font-black text-foreground">No Active Listings</h3>
                           <p className="text-muted-foreground text-sm max-w-[350px]">You haven't listed any prompts for sale yet. Start monetizing your skills today.</p>
                        </div>
                        <Button className="h-12 px-8 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">Create First Listing</Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
