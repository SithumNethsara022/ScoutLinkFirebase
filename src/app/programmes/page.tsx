
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BookOpen, Plus, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TROOPS = ['Gold I', 'Gold II', 'Gold III', 'Gold IV'];
const TROOP_PATROLS: Record<string, string[]> = {
  'Gold I': ['Kingfishers', 'Eagles', 'Seagulls'],
  'Gold II': ['Woodpeckers', 'Parrots', 'Salalihini'],
  'Gold III': ['Buzzards', 'Hawks', 'Falcons'],
  'Gold IV': ['Swans', 'Peacocks', 'Flamingo'],
};

export default function ProgrammesPage() {
  const [selectedTroop, setSelectedTroop] = useState('Gold I');
  const [selectedPatrol, setSelectedPatrol] = useState(TROOP_PATROLS['Gold I'][0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Programme Submitted", description: "Wednesday programme has been updated." });
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Patrol Programmes</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Plan your weekly Wednesday scouting activities</p>
      </header>

      <Tabs defaultValue="Gold I" onValueChange={(v) => {
        setSelectedTroop(v);
        setSelectedPatrol(TROOP_PATROLS[v][0]);
      }}>
        <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12 mb-8">
          {TROOPS.map(troop => (
            <TabsTrigger key={troop} value={troop} className="rounded-xl flex-1 text-[10px] font-bold uppercase">
              {troop}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-panel border-none rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-sm font-black gold-text uppercase tracking-widest">Select Patrol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {TROOP_PATROLS[selectedTroop].map(patrol => (
                  <button
                    key={patrol}
                    onClick={() => setSelectedPatrol(patrol)}
                    className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${
                      selectedPatrol === patrol 
                      ? 'bg-primary text-black' 
                      : 'hover:bg-white/5 text-muted-foreground border border-white/5'
                    }`}
                  >
                    {patrol}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-[10px] uppercase font-bold text-blue-400">Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-[10px] text-muted-foreground font-bold leading-relaxed space-y-2 uppercase">
                <p>• Max 3 programmes per Wednesday.</p>
                <p>• Must be submitted by Tuesday 22:00.</p>
                <p>• Subject to STL approval.</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-panel border-none rounded-[3rem]">
              <CardHeader>
                <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Programme Entry: {selectedPatrol}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                      <Label className="text-primary font-black uppercase text-xs tracking-widest">Programme {num}</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Activity Name</Label>
                          <Input placeholder="e.g. Pioneering Basics" className="rounded-xl bg-black/20 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <Label>Time Slot</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="14:00 - 15:00" className="pl-10 rounded-xl bg-black/20 border-white/10" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Location / Description</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input placeholder="Main Ground" className="pl-10 rounded-xl bg-black/20 border-white/10" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest shadow-xl">
                    Submit Weekly Schedule
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
