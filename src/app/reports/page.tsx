
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, Plus, X, Upload, Megaphone, Bell, 
  ChevronLeft, MessageSquare 
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ReportsPage() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [loading, setLoading] = useState(false);

  const reports: any[] = [];

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAddReport(false);
      toast({ title: "Report Transmitted", description: "Successfully logged." });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Troop Reports</h2>
          <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-2">Authenticated Archive</p>
        </div>
        <div className="flex items-center gap-4 self-end md:self-center">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center bg-white/5">
             <Avatar className="w-10 h-10">
               <AvatarFallback>U</AvatarFallback>
             </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => setShowAddReport(true)} className="flex-1 rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-14 shadow-xl">
          <Plus className="w-5 h-5 mr-2" /> Enter a Report
        </Button>
        <Button onClick={() => setShowAddAnnouncement(true)} variant="outline" className="flex-1 rounded-2xl border-primary/20 text-primary font-black uppercase h-14">
          <Megaphone className="w-5 h-5 mr-2" /> Make Announcement
        </Button>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Report cards */}
        </div>
      ) : (
        <Card className="glass-panel border-none rounded-[3rem] p-20 text-center opacity-20">
          <FileText className="w-16 h-16 mx-auto mb-6" />
          <p className="text-[10px] font-black uppercase tracking-widest">No reports archived</p>
        </Card>
      )}

      {showAddReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-xl bg-[#03150b] border border-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <header className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-black text-primary uppercase tracking-[0.2em] w-full text-center">Add Report</h3>
              <button onClick={() => setShowAddReport(false)} className="text-muted-foreground hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </header>

            <form onSubmit={handleSubmitReport} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Title *</Label>
                <Input required className="rounded-xl bg-black/40 border-primary/40 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Event Date *</Label>
                <Input type="date" required className="rounded-xl bg-black/40 border-primary/40 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-white uppercase">Brief Description *</Label>
                <Input required className="rounded-xl bg-black/40 border-primary/40 h-12 text-white" />
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest mt-4" disabled={loading}>
                {loading ? "Transmitting..." : "Submit Report"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
