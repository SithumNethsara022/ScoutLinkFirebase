
"use client";

import { useState } from 'react';
import { ChevronLeft, User, CheckCircle2, Circle, MessageSquare } from 'lucide-react';
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
  
  const scouts: any[] = [];

  const handleDownload = (option: 'month' | 'year') => {
    toast({ 
      title: "Generating Report", 
      description: "Excel file generation started...",
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
                <button
                  key={patrol}
                  onClick={() => setSelectedPatrol(patrol)}
                  className={cn(
                    "rounded-full px-6 h-9 text-[10px] uppercase font-black tracking-widest shrink-0 transition-all",
                    selectedPatrol === patrol ? "bg-primary text-black" : "border border-white/5 text-muted-foreground hover:bg-white/5"
                  )}
                >
                  {patrol}
                </button>
              ))}
            </div>

            <Card className="glass-panel border-none rounded-[3rem] overflow-hidden">
              <CardContent className="p-0">
                <div className="p-10 border-b border-white/5 flex justify-between items-end bg-white/[0.01]">
                  <div>
                    <h3 className="text-3xl font-black gold-text uppercase tracking-tighter leading-none">{selectedPatrol} Patrol</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-black mt-3 tracking-widest">Monthly Ledger</p>
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

                  {scouts.length > 0 ? scouts.map((scout, idx) => (
                    <div key={idx} className="grid grid-cols-12 items-center py-6 border-b border-white/[0.02] group hover:bg-white/[0.01] rounded-2xl px-2 -mx-2 transition-colors">
                      {/* Scout row content */}
                    </div>
                  )) : (
                    <div className="py-20 text-center opacity-20">
                      <User className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest">No scouts registered in this patrol</p>
                    </div>
                  )}

                  <div className="pt-8 space-y-6">
                    <div className="flex items-center gap-3 text-primary/60">
                       <MessageSquare className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Leadership Comments</span>
                    </div>
                    <div className="p-4 flex gap-4">
                      <Input 
                        placeholder="Add comment..." 
                        className="rounded-[2rem] bg-black/40 border-white/5 h-14 pl-8 text-xs font-medium"
                      />
                      <Button className="h-14 px-8 rounded-[2rem] bg-primary text-black font-black uppercase text-[10px] tracking-widest">
                        Post
                      </Button>
                    </div>
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
