
"use client";

import { useState } from 'react';
import { ChevronLeft, Download, User, CheckCircle2, Circle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

const TROOPS = ['Gold I', 'Gold II', 'Gold III', 'Gold IV'];
const TROOP_PATROLS: Record<string, string[]> = {
  'Gold I': ['Kingfishers', 'Eagles', 'Seagulls'],
  'Gold II': ['Woodpeckers', 'Parrots', 'Salalihini'],
  'Gold III': ['Buzzards', 'Hawks', 'Falcons'],
  'Gold IV': ['Swans', 'Peacocks', 'Flamingo'],
};

export default function AttendancePage() {
  const [selectedTroop, setSelectedTroop] = useState('Gold I');
  const [selectedPatrol, setSelectedPatrol] = useState(TROOP_PATROLS['Gold I'][0]);
  
  // Mock check for leader ranks
  const USER_ROLE = 'Patrol Leader';
  const isLeader = ['Patrol Leader', 'Sub Troop Leader', 'Junior Troop Leader', 'Scout Leader'].includes(USER_ROLE);

  const handleDownload = (option: 'month' | 'year') => {
    toast({ 
      title: "Generating Report", 
      description: option === 'month' ? "Exporting current month's Excel sheet..." : "Exporting past 12 months Excel sheet...",
    });
  };

  return (
    <div className="min-h-screen space-y-6 pb-20">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5 gold-text" />
          </Link>
          <h1 className="text-lg font-black tracking-[0.2em] gold-text uppercase">Troop Registry</h1>
        </div>
        <div className="flex items-center gap-3">
           <Button onClick={() => handleDownload('month')} variant="outline" className="border-white/10 text-[9px] uppercase font-black hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4">
            Current Month
          </Button>
           <Button onClick={() => handleDownload('year')} variant="outline" className="border-white/10 text-[9px] uppercase font-black hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4">
            Last 12 Months
          </Button>
        </div>
      </header>

      <Tabs defaultValue="Gold I" className="w-full" onValueChange={(v) => {
        setSelectedTroop(v);
        setSelectedPatrol(TROOP_PATROLS[v][0]);
      }}>
        <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12 flex">
          {TROOPS.map((troop) => (
            <TabsTrigger
              key={troop}
              value={troop}
              className="rounded-xl flex-1 px-6 data-[state=active]:bg-primary data-[state=active]:text-black transition-all text-[10px] uppercase font-black"
            >
              {troop}
            </TabsTrigger>
          ))}
        </TabsList>

        {TROOPS.map(troop => (
          <TabsContent key={troop} value={troop} className="space-y-6">
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
              {TROOP_PATROLS[troop].map(patrol => (
                <Button
                  key={patrol}
                  variant={selectedPatrol === patrol ? 'default' : 'outline'}
                  onClick={() => setSelectedPatrol(patrol)}
                  className={cn(
                    "rounded-full px-6 h-9 text-[10px] uppercase font-black tracking-widest shrink-0",
                    selectedPatrol === patrol ? "bg-primary text-black border-none" : "border-white/5 text-muted-foreground"
                  )}
                >
                  {patrol}
                </Button>
              ))}
            </div>

            <Card className="glass-panel border-none rounded-[3rem] overflow-hidden">
              <CardContent className="p-0">
                <div className="p-10 border-b border-white/5 flex justify-between items-end bg-white/[0.01]">
                  <div>
                    <h3 className="text-3xl font-black gold-text uppercase tracking-tighter leading-none">{selectedPatrol} Patrol</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-black mt-3 tracking-widest">Monthly Wednesday Ledger • May 2026</p>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary leading-none">12</p>
                      <p className="text-[8px] uppercase font-black text-muted-foreground mt-2 tracking-widest">Total Strength</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-green-500 leading-none">94%</p>
                      <p className="text-[8px] uppercase font-black text-muted-foreground mt-2 tracking-widest">Patrol Score</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-4">
                  <div className="grid grid-cols-12 text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em] pb-6 border-b border-white/5">
                    <div className="col-span-4">Scout Identity</div>
                    <div className="col-span-2 text-center">Week 1</div>
                    <div className="col-span-2 text-center">Week 2</div>
                    <div className="col-span-2 text-center">Week 3</div>
                    <div className="col-span-2 text-center">Week 4</div>
                  </div>

                  {[
                    { name: 'Sithum Nethsara', grade: 10, att: [true, true, true, false] },
                    { name: 'Amiru Perera', grade: 9, att: [true, true, true, true] },
                    { name: 'Heshan Silva', grade: 11, att: [false, true, true, true] },
                    { name: 'Ravindu Fernando', grade: 10, att: [true, true, true, true] },
                  ].map((scout, idx) => (
                    <div key={idx} className="grid grid-cols-12 items-center py-6 border-b border-white/[0.02] group hover:bg-white/[0.01] rounded-2xl px-2 -mx-2 transition-colors">
                      <div className="col-span-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{scout.name}</p>
                          <p className="text-[9px] text-muted-foreground uppercase font-black">Grade {scout.grade} • Swan Patrol</p>
                        </div>
                      </div>
                      {scout.att.map((present, i) => (
                        <div key={i} className="col-span-2 flex justify-center">
                          <button className="focus:outline-none transition-transform active:scale-90">
                            {present ? 
                              <CheckCircle2 className="w-8 h-8 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" /> : 
                              <Circle className="w-8 h-8 text-white/5 hover:text-white/20 transition-colors" />
                            }
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="pt-8 space-y-6">
                    <div className="flex items-center gap-3 text-primary/60">
                       <MessageSquare className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Leadership Comments</span>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                       <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-medium italic">
                         "Excellent discipline this month. Week 4 absence for Sithum was due to District Trial." - JTL Asher
                       </p>
                    </div>
                    {isLeader && (
                      <div className="flex gap-4">
                        <Input 
                          placeholder="Type comment or add new scout..." 
                          className="rounded-[2rem] bg-black/40 border-white/5 h-14 pl-8 text-xs font-medium"
                        />
                        <Button className="h-14 px-8 rounded-[2rem] bg-primary text-black font-black uppercase text-[10px] tracking-widest">
                          Commit Update
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
