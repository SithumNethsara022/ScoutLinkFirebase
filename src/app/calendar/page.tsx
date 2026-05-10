
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const EVENT_TYPES = {
  Troop: { label: 'Troop Event', color: 'bg-green-500', text: 'text-green-500' },
  School: { label: 'School Event', color: 'bg-blue-500', text: 'text-blue-500' },
  District: { label: 'District Event', color: 'bg-primary', text: 'text-primary' },
};

export default function CalendarPage() {
  const [view, setView] = useState('monthly');
  const [typeFilter, setTypeFilter] = useState('all');

  const events: any[] = [];

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Troop Schedule</h2>
          <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.2em] mt-2">Central Deployment Hub</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-white/10 h-12 px-6 uppercase font-black text-[10px] tracking-widest gap-2">
            <Plus className="w-4 h-4" /> Log Event
          </Button>
        </div>
      </header>

      <Tabs defaultValue="monthly" className="w-full" onValueChange={setView}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12 w-full md:w-auto">
            <TabsTrigger value="annual" className="rounded-xl px-8 text-[10px] font-black uppercase">Annual</TabsTrigger>
            <TabsTrigger value="monthly" className="rounded-xl px-8 text-[10px] font-black uppercase">Monthly</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select onValueChange={setTypeFilter}>
               <SelectTrigger className="w-[180px] rounded-xl h-12 bg-black/20 border-white/5 text-[9px] font-black uppercase">
                  <SelectValue placeholder="All Categories" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="Troop">Troop (Green)</SelectItem>
                  <SelectItem value="School">School (Blue)</SelectItem>
                  <SelectItem value="District">District (Gold)</SelectItem>
               </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="annual">
           <Card className="glass-panel border-none rounded-[3rem] p-12 text-center opacity-30">
              <CalendarIcon className="w-16 h-16 mx-auto mb-6" />
              <p className="text-[10px] font-black uppercase tracking-widest">No events scheduled for this year</p>
           </Card>
        </TabsContent>

        <TabsContent value="monthly">
           <Card className="glass-panel border-none rounded-[3rem] p-10 min-h-[600px]">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black gold-text uppercase tracking-widest">Current Month</h3>
                 <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl border border-white/5"><ChevronLeft className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl border border-white/5"><ChevronRight className="w-5 h-5" /></Button>
                 </div>
              </div>
              <div className="grid grid-cols-7 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                   <div key={day} className="p-4 bg-black/20 text-center text-[9px] font-black uppercase text-muted-foreground tracking-widest">{day}</div>
                 ))}
                 {[...Array(31)].map((_, i) => (
                   <div key={i} className="min-h-[120px] p-4 bg-black/40 hover:bg-white/[0.02] transition-colors relative group">
                      <span className="text-[10px] font-black uppercase text-muted-foreground/50">{i + 1}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
