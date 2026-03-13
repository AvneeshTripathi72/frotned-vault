"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Smartphone, 
  CreditCard, 
  Eye, 
  EyeOff,
  ChevronRight,
  LogOut,
  Camera,
  Mail,
  KeyRound,
  Trash2,
  CheckCircle2,
  Sparkles,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

function SettingsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "account";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    fullName: ""
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data && !data.error) {
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          bio: data.bio || "",
          fullName: data.fullName || ""
        });
      }
    } catch (e) {
      console.error("Settings fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const tabs = [
    { id: "account", label: "Identity Nexus", icon: User, description: "Manage your public presence and avatars" },
    { id: "security", label: "Security Protocol", icon: Lock, description: "Keys, passwords, and session control" },
    { id: "notifications", label: "Transmissions", icon: Bell, description: "System alerts and communication" },
    { id: "billing", label: "Capital Ops", icon: CreditCard, description: "Payments, credits, and invoices" },
  ];

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Update failed");

      toast.success("Operational parameters updated!", {
        description: "Changes synced across all nodes.",
        icon: <CheckCircle2 className="w-4 h-4 text-primary" />
      });
      fetchProfile(); // Refresh
    } catch (err) {
      toast.error("Process interrupted. Synchronization failed.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest opacity-20">Link Established... Synchronizing...</div>;

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl" suppressHydrationWarning>
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-80 space-y-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter">Command <span className="text-primary italic">Center</span></h1>
            <p className="text-muted-foreground font-medium text-sm">System Configuration v1.0.4</p>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left group border border-transparent",
                  activeTab === tab.id 
                    ? "bg-primary/10 border-primary/20" 
                    : "hover:bg-muted/50 border-transparent"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  activeTab === tab.id ? "bg-primary text-white scale-110" : "bg-muted text-muted-foreground"
                )}>
                  <tab.icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className={cn("text-sm font-black uppercase tracking-widest", activeTab === tab.id ? "text-primary" : "text-foreground")}>
                    {tab.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium leading-none opacity-60">
                    {tab.description}
                  </p>
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                )}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-border">
            <Button variant="ghost" className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive gap-3 font-bold">
              <LogOut className="w-4 h-4" /> Terminate Session
            </Button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-[2.5rem] border-border bg-card/50 backdrop-blur-3xl p-10 shadow-xl overflow-hidden relative">
                {/* Background Branding */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {activeTab === "account" && (
                  <div className="space-y-10 relative z-10">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight">Identity Nexus</h2>
                        <p className="text-muted-foreground font-medium text-sm">Update your public profile and avatar</p>
                      </div>
                      <Link href="/profile">
                        <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-bold uppercase tracking-widest text-[10px]">
                          View Live Profile
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="md:col-span-2 flex items-center gap-8 p-6 rounded-3xl bg-muted/30 border border-border">
                          <div className="relative group">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-background shadow-xl bg-primary flex items-center justify-center">
                              <span className="text-4xl font-black text-white uppercase">
                                {(user?.username?.[0] || user?.email?.[0] || 'U')}
                              </span>
                            </div>
                            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-3xl">
                              <Camera className="w-6 h-6 text-white" />
                            </button>
                          </div>
                          <div className="space-y-2">
                             <h4 className="font-black text-lg">Avatar Image</h4>
                             <p className="text-xs text-muted-foreground max-w-xs">We recommend an image of at least 400x400 with a clean professional background.</p>
                             <div className="flex gap-2">
                               <Button size="sm" className="rounded-lg font-bold text-[10px] uppercase tracking-widest">Upload New</Button>
                               <Button size="sm" variant="ghost" className="rounded-lg text-[10px] uppercase tracking-widest text-destructive">Remove</Button>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Username</label>
                         <Input 
                            value={formData.username} 
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="h-12 bg-muted/20 border-border rounded-xl font-bold" 
                            suppressHydrationWarning 
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Public Email</label>
                         <Input 
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="h-12 bg-muted/20 border-border rounded-xl font-bold" 
                            suppressHydrationWarning 
                         />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Short Biography</label>
                         <Input 
                            value={formData.bio} 
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="Tell the world about your prompt engineering skills..."
                            className="h-12 bg-muted/20 border-border rounded-xl font-bold" 
                            suppressHydrationWarning 
                         />
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-10 relative z-10">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tight">Security Protocol</h2>
                      <p className="text-muted-foreground font-medium text-sm">Manage your passwords and secondary auth</p>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 rounded-3xl border border-border bg-muted/20 space-y-6">
                        <div className="flex items-center gap-4 text-primary">
                          <KeyRound className="w-6 h-6" />
                          <h3 className="font-black text-lg">Change Password</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Password</label>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} className="h-12 bg-background border-border rounded-xl" suppressHydrationWarning />
                              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">New Password</label>
                              <Input type="password" placeholder="••••••••" className="h-12 bg-background border-border rounded-xl" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confirm New Password</label>
                              <Input type="password" placeholder="••••••••" className="h-12 bg-background border-border rounded-xl" />
                            </div>
                          </div>
                          <Button className="w-fit rounded-xl px-10 h-12 bg-primary font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Update Passcode</Button>
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl border border-border/40 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                               <h3 className="font-black text-sm uppercase tracking-widest">Two-Factor Auth</h3>
                               <p className="text-[10px] text-muted-foreground font-medium">Add a secondary layer of encryption</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl border border-destructive/20 bg-destructive/5 space-y-6">
                        <div className="flex items-center gap-4 text-destructive">
                          <Trash2 className="w-6 h-6" />
                          <div>
                             <h3 className="font-black text-lg">Destroy Identity</h3>
                             <p className="text-xs text-muted-foreground font-medium">Permanently wipe all data from the Nexus. This cannot be undone.</p>
                          </div>
                        </div>
                        <Button variant="destructive" className="rounded-xl px-8 font-bold uppercase tracking-widest text-[10px]">Initiate Destruct Sequence</Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-10 relative z-10">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tight">Transmissions</h2>
                      <p className="text-muted-foreground font-medium text-sm">Control system alerts and broadcast feeds</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { title: "Market Alerts", desc: "When someone acquires your logic strings" },
                        { title: "System Updates", desc: "Protocol changes and feature deployments" },
                        { title: "Network Briefing", desc: "Weekly analytics on your assets" },
                        { title: "Chat Transmissions", desc: "Direct messages from other engineers" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-border hover:bg-muted/30 transition-all cursor-pointer">
                          <div className="space-y-1">
                            <p className="font-black text-sm uppercase tracking-widest transition-colors">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground font-medium">{item.desc}</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "billing" && (
                  <div className="space-y-10 relative z-10">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black tracking-tight">Capital Ops</h2>
                      <p className="text-muted-foreground font-medium text-sm">Monitor credits and transactional data</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Card className="p-8 rounded-3xl border-primary/20 bg-primary/5 space-y-4 shadow-sm border">
                         <div className="flex justify-between items-start">
                            <div className="p-3 rounded-2xl bg-primary text-white">
                              <Sparkles className="w-6 h-6" />
                            </div>
                            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[8px]">Pro Creator</Badge>
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">Active Credits</p>
                            <h3 className="text-4xl font-black tracking-tighter">12,450 <span className="text-sm opacity-40">CR</span></h3>
                         </div>
                         <Link href="/wallet">
                          <Button className="w-full rounded-xl bg-primary font-black uppercase tracking-widest text-[10px]">Manage Wallet</Button>
                         </Link>
                       </Card>

                       <Card className="p-8 rounded-3xl border-border bg-muted/20 flex flex-col justify-center items-center text-center space-y-3 shadow-none border">
                          <div className="p-4 rounded-full bg-background border border-border">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="font-black text-sm uppercase tracking-widest">Add Payment Method</p>
                          <p className="text-[10px] text-muted-foreground font-medium">Securely link your bank or crypto node</p>
                       </Card>
                    </div>
                  </div>
                )}
                
                {/* Save Button Fixed at Bottom */}
                <div className="mt-12 pt-8 border-t border-border flex justify-end">
                   <Button onClick={handleSave} className="rounded-xl px-12 h-14 bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Synchronize Configuration</Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading System Configuration...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
