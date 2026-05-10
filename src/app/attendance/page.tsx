
"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus, GripVertical, User, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  const isLeader = true; 

  const handleDownload = () => {
    toast({ title: "Generating Excel", description: "Choosing between current month or past 12 months..." });
  };

  return (
    <div className="min-h-screen space-y-6 pb-20">
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5 gold-text" />
          </Link>
          <h1 className="text-lg font-bold tracking-widest gold-text uppercase">Attendance Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={handleDownload} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-xl h-10 px-6 gap-2">
            <Download className="w-4 h-4" />
            Excel Export
          </Button>
        </div>
      </header>

      <Tabs defaultValue="Gold I" className="w-full" onValueChange={(v) => {
        setSelectedTroop(v);
        setSelectedPatrol(TROOP_PATROLS[v][0]);
      }}>
        <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12 flex overflow-x-auto">
          {TROOPS.map((troop) => (
            <TabsTrigger
              key={troop}
              value={troop}
              className="rounded-xl flex-1 px-6 data-[state=active]:bg-primary data-[state=active]:text-black transition-all text-[10px] uppercase font-bold"
            >
              {troop}
            </TabsTrigger>
          ))}
        </TabsList>

        {TROOPS.map(troop => (
          <TabsContent key={troop} value={troop} className="space-y-6">
            <div className="flex gap-2 overflow-x-auto py-2">
              {TROOP_PATROLS[troop].map(patrol => (
                <Button
                  key={patrol}
                  variant={selectedPatrol === patrol ? 'default' : 'outline'}
                  onClick={() => setSelectedPatrol(patrol)}
                  className={cn(
                    "rounded-full px-6 h-9 text-[10px] uppercase font-black tracking-widest",
                    selectedPatrol === patrol ? "bg-primary text-black" : "border-white/10 text-muted-foreground"
                  )}
                >
                  {patrol}
                </Button>
              ))}
            </div>

            <Card className="glass-panel border-none rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-0">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <div>
                    <h3 className="text-xl font-black gold-text uppercase tracking-tighter">{selectedPatrol} Patrol</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Monthly Wednesday Attendance • May 2026</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xl font-black text-primary">12</p>
                      <p className="text-[8px] uppercase font-bold text-muted-foreground">Members</p>
                    </div>
                    <div>
                      <p className="text-xl font-black text-green-500">92%</p>
                      <p className="text-[8px] uppercase font-bold text-muted-foreground">Average</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="grid grid-cols-12 text-[10px] font-black uppercase text-muted-foreground tracking-widest pb-4 border-b border-white/5">
                    <div className="col-span-4">Scout Name</div>
                    <div className="col-span-2 text-center">May 06</div>
                    <div className="col-span-2 text-center">May 13</div>
                    <div className="col-span-2 text-center">May 20</div>
                    <div className="col-span-2 text-center">May 27</div>
                  </div>

                  {[
                    { name: 'Sithum Nethsara', att: [true, true, true, false] },
                    { name: 'Amiru Perera', att: [true, true, true, true] },
                    { name: 'Heshan Silva', att: [false, true, true, true] },
                  ].map((scout, idx) => (
                    <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-white/[0.03] group">
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">{scout.name}</span>
                      </div>
                      {scout.att.map((present, i) => (
                        <div key={i} className="col-span-2 flex justify-center">
                          <button className="focus:outline-none">
                            {present ? 
                              <CheckCircle2 className="w-6 h-6 text-green-500" /> : 
                              <Circle className="w-6 h-6 text-white/10 hover:text-white/30 transition-colors" />
                            }
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}

                  {isLeader && (
                    <div className="flex gap-4 mt-8 pt-4">
                      <Input 
                        placeholder="Add new scout to patrol..." 
                        className="rounded-2xl bg-black/40 border-white/10 h-12 flex-1 pl-6"
                      />
                      <Button size="icon" className="h-12 w-12 rounded-2xl bg-primary text-black">
                        <Plus className="w-6 h-6" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
