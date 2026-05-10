import { Badge } from "@/components/ui/badge" 

"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, Plus, Search, X, Upload, Megaphone, Bell, 
  ChevronLeft, Filter, FileUp, MessageSquare, Trash2 
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock User Data for testing
const USER = {
  id: '1',
  name: 'Asher Quinn',
  role: 'Scout Leader',
  profilePicUrl: 'https://picsum.photos/seed/user1/100'
};

export default function ReportsPage() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [loading, setLoading] = useState(false);

  // Permissions
  const isLeader = ['Patrol Leader', 'Sub Troop Leader', 'Assistant Sub Troop Leader', 'Junior Troop Leader', 'Assistant Junior Troop Leader', 'Senior Scout', 'Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 'Assistant Scout Leader', 'Scout Leader'].includes(USER.role);
  const canEnterReport = ['Assistant Sub Troop Leader', 'Junior Troop Leader', 'Assistant Junior Troop Leader', 'Senior Scout', 'Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 'Assistant Scout Leader', 'Scout Leader'].includes(USER.role);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAddReport(false);
      toast({ title: "Report Transmitted", description: "Successfully logged in the troop registry." });
    }, 1500);
  };

  const handleAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Announcement Pinned", description: "Broadcasted to selected troop segments." });
    setShowAddAnnouncement(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header - Responsive */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="md:hidden">
            <ChevronLeft className="w-6 h-6 gold-text" />
          </Link>
          <div>
            <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Troop Reports</h2>
            <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-2">Authenticated Archive & Activity Logs</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 self-end md:self-center">
          <button className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <Link href={`/profile/${USER.id}`}>
            <Avatar className="w-12 h-12 border-2 border-primary/20 hover:border-primary transition-all cursor-pointer">
              <AvatarImage src={USER.profilePicUrl} />
              <AvatarFallback>AQ</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {canEnterReport && (
          <Button 
            onClick={() => setShowAddReport(true)}
            className="flex-1 rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-14 shadow-xl hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-5 h-5 mr-2" /> Enter a Report
          </Button>
        )}
        {isLeader && (
          <Button 
            onClick={() => setShowAddAnnouncement(true)}
            variant="outline"
            className="flex-1 rounded-2xl border-primary/20 text-primary font-black uppercase tracking-widest h-14 hover:bg-primary/10"
          >
            <Megaphone className="w-5 h-5 mr-2" /> Make Announcement
          </Button>
        )}
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { id: 1, title: 'Annual Camp Logistics', date: '2026-05-12', author: 'Mark Anthony', desc: 'Summary of transport and gear deployment for the May hike.' },
          { id: 2, title: 'Sub-Troop Alignment', date: '2026-05-10', author: 'Sarah Jane', desc: 'Notes from the STPLM meeting regarding equipment maintenance.' }
        ].map(report => (
          <Card key={report.id} className="glass-panel border-none rounded-[3rem] p-8 group hover:bg-white/[0.05] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="text-[8px] uppercase font-black border-white/10">{report.date}</Badge>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter gold-text group-hover:text-primary transition-colors">{report.title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2 mb-6">Author: {report.author}</p>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-8">{report.desc}</p>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 rounded-xl h-10 text-[9px] uppercase font-black tracking-widest bg-white/5">View Document</Button>
              <Button variant="ghost" className="rounded-xl h-10 w-10 bg-white/5"><MessageSquare className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ADD REPORT MODAL - MATCHES SCREENSHOT */}
      {showAddReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-xl bg-[#03150b] border border-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-black text-primary uppercase tracking-[0.2em] w-full text-center">Add Report</h3>
              <button onClick={() => setShowAddReport(false)} className="text-muted-foreground hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </header>

            <form onSubmit={handleSubmitReport} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Title *</Label>
                <Input 
                  required 
                  className="rounded-xl bg-black/40 border-primary/40 focus:border-primary h-12 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Event Date * <span className="text-[10px] text-muted-foreground normal-case">(when it took place)</span></Label>
                <Input 
                  type="date" 
                  required 
                  className="rounded-xl bg-black/40 border-primary/40 focus:border-primary h-12 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Brief Description *</Label>
                <Input 
                  required 
                  className="rounded-xl bg-black/40 border-primary/40 focus:border-primary h-12 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Full Report <span className="text-muted-foreground">(optional)</span></Label>
                <Textarea 
                  placeholder="Type the full report here..." 
                  className="min-h-[120px] rounded-xl bg-black/40 border-primary/40 focus:border-primary text-white p-4"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-white uppercase">Upload Document <span className="text-yellow-500 text-[10px]">(Recommended)</span></Label>
                <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group cursor-pointer">
                  <Upload className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors mb-4" />
                  <p className="text-[10px] text-muted-foreground uppercase text-center mb-2">Uploading a document is the best choice for detailed reports</p>
                  <span className="text-yellow-500 font-bold text-xs underline decoration-primary/40 hover:decoration-primary">Choose file</span>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Visible to</Label>
                <Select defaultValue="everyone">
                  <SelectTrigger className="rounded-xl bg-black/40 border-primary/40 h-12 text-white">
                    <SelectValue placeholder="Everyone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#03150b] border-primary/20 text-white">
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="leaders">Leaders Only</SelectItem>
                    <SelectItem value="seniors">Seniors Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-[#7c6317] hover:bg-[#8c7327] text-white font-black uppercase tracking-widest shadow-xl mt-4"
                disabled={loading}
              >
                {loading ? "Transmitting..." : "Submit Report"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENT MODAL */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <Card className="w-full max-w-xl glass-panel border-none rounded-[3rem] p-10 space-y-8 animate-in slide-in-from-bottom-4">
             <header className="flex justify-between items-center">
                <h3 className="text-2xl font-black gold-text uppercase tracking-tight">Post Announcement</h3>
                <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => setShowAddAnnouncement(false)}>
                   <X className="w-6 h-6" />
                </Button>
             </header>
             <form onSubmit={handleAnnouncement} className="space-y-6">
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Broadcast Title</Label>
                   <Input placeholder="e.g. Uniform Inspection Next Wednesday" className="rounded-2xl bg-black/20 border-white/5 h-14" required />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Target Scope</Label>
                   <Select required>
                      <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14">
                        <SelectValue placeholder="Select Scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patrol">My Patrol Only</SelectItem>
                        <SelectItem value="subtroop">My Sub-Troop</SelectItem>
                        <SelectItem value="troop">Whole Troop</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Content</Label>
                   <Textarea className="rounded-2xl bg-black/20 border-white/5 min-h-[150px] p-6" required />
                </div>
                <Button className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest shadow-xl">
                   Broadcast Transmission
                </Button>
             </form>
          </Card>
        </div>
      )}
    </div>
  );
}
