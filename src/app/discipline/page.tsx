
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, ShieldAlert, History, Search, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function DisciplinePage() {
  const [severity, setSeverity] = useState('Yellow');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ 
        title: "Incident Reported", 
        description: `Scout will be notified of the ${severity} card.`,
        variant: severity === 'Red' ? 'destructive' : 'default'
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Discipline Management</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Maintain troop standards and conduct</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="glass-panel border-none rounded-[3rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <ShieldAlert className="w-6 h-6" />
                Report New Issue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Issue Title</Label>
                    <Input placeholder="e.g. Uniform Non-compliance" className="rounded-xl bg-black/20 border-white/10 h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Scout Name</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Select profile..." className="pl-10 rounded-xl bg-black/20 border-white/10 h-12" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Brief Description</Label>
                  <Textarea 
                    placeholder="Provide details about the incident..." 
                    className="min-h-[120px] rounded-2xl bg-black/20 border-white/10 p-6"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase font-black tracking-widest text-primary">Severity Level</Label>
                  <RadioGroup defaultValue="Yellow" onValueChange={setSeverity} className="grid grid-cols-3 gap-4">
                    <Label
                      className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${
                        severity === 'Yellow' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <RadioGroupItem value="Yellow" className="sr-only" />
                      <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                      <span className="text-[10px] font-black uppercase">Yellow</span>
                    </Label>
                    <Label
                      className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${
                        severity === 'Orange' ? 'border-orange-500 bg-orange-500/10' : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <RadioGroupItem value="Orange" className="sr-only" />
                      <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                      <span className="text-[10px] font-black uppercase">Orange</span>
                    </Label>
                    <Label
                      className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${
                        severity === 'Red' ? 'border-red-500 bg-red-500/10' : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <RadioGroupItem value="Red" className="sr-only" />
                      <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                      <span className="text-[10px] font-black uppercase">Red</span>
                    </Label>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest shadow-xl disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit Report"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-sm font-black gold-text uppercase tracking-widest flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'K. Silva', issue: 'Late Arrival', color: 'bg-yellow-500' },
                { name: 'M. Perera', issue: 'Improper Uniform', color: 'bg-orange-500' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className={`w-2 h-10 rounded-full ${log.color}`} />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{log.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{log.issue}</p>
                  </div>
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] bg-red-500/5 border-red-500/10">
            <CardHeader>
              <CardTitle className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Notification Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[9px] text-muted-foreground font-bold leading-relaxed uppercase space-y-2">
              <p>• Scout receives email & push notification.</p>
              <p>• Seniors & Instructors auto-copied.</p>
              <p>• Red cards flagged to Scout Leader.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
