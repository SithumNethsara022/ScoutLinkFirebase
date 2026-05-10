"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileSpreadsheet, Plus, MoreHorizontal, GripVertical, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock rank check: PL or above
// In a real app, this would come from an auth hook/context
const CURRENT_USER = {
  name: "Asher Quinn",
  role: "Scout Leader",
  position: "Scout Leader"
};

const isAllowedToEdit = (position: string) => {
  const privileged = ["Leader", "Admin", "Instructor", "Patrol Leader", "Troop Leader", "Sub Troop Leader"];
  return privileged.some(p => position.includes(p));
};

const PATROLS = [
  { name: 'KINGFISHERS', sessions: 4 },
  { name: 'EAGLES', sessions: 4 },
  { name: 'SEAGULLS', sessions: 4 },
];

const DATES = ['May 6', 'May 13', 'May 20', 'May 27'];

export default function AttendancePage() {
  const [selectedTroop, setSelectedTroop] = useState('Gold I');
  const canEdit = isAllowedToEdit(CURRENT_USER.position);

  return (
    <div className="min-h-screen space-y-6 pb-20">
      {/* Custom Header matching screenshot */}
      <header className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5 gold-text" />
          </Link>
          <h1 className="text-lg font-bold tracking-widest gold-text uppercase">Attendance</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-1.5 border border-muted/50 rounded-full hover:bg-white/5 transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Date and Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </Button>
            <h2 className="text-xl font-bold gold-text uppercase tracking-wider">May 2026</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-xl h-10 px-6 gap-2">
          <Download className="w-4 h-4" />
          Download Excel
        </Button>
      </div>

      {/* Troop Tabs */}
      <Tabs defaultValue="Gold I" className="w-full" onValueChange={setSelectedTroop}>
        <TabsList className="bg-[#0a1f14] border border-white/5 p-1 rounded-2xl h-12 inline-flex">
          {['Gold I', 'Gold II', 'Gold III', 'Gold IV'].map((troop) => (
            <TabsTrigger
              key={troop}
              value={troop}
              className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-black transition-all text-xs uppercase font-semibold"
            >
              {troop}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Patrol Sections */}
      <div className="space-y-4">
        {PATROLS.map((patrol) => (
          <Card key={patrol.name} className="bg-[#0d281a] border-none rounded-2xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              {/* Patrol Header Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-sm tracking-widest uppercase">{patrol.name}</h3>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 border-none rounded-lg font-bold text-[10px] px-2">
                    OP total
                  </Badge>
                  <Badge variant="outline" className="border-white/10 text-muted-foreground text-[10px] rounded-lg">
                    {patrol.sessions} sessions
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-white/5 text-[10px] uppercase font-bold gap-2">
                    <GripVertical className="w-4 h-4" />
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10 rounded-lg h-8 px-3 text-[10px] font-bold gap-2">
                    <Download className="w-3 h-3" />
                    CSV
                  </Button>
                </div>
              </div>

              {/* Table Headers */}
              <div className="grid grid-cols-5 text-[11px] font-bold text-muted-foreground uppercase tracking-tighter pb-2 border-b border-white/5">
                <div className="col-span-1">Scout</div>
                {DATES.map((date, i) => (
                  <div key={date} className={cn("text-center flex flex-col items-center", i === 0 && "relative")}>
                    <span>{date}</span>
                    {i === 0 && <span className="absolute -bottom-4 text-[14px] gold-text">▾</span>}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground/50 font-medium">No scouts added yet</p>
              </div>

              {/* Add Scout Input (Only for Privileged Users) */}
              {canEdit && (
                <div className="flex gap-2 pt-2">
                  <Input 
                    placeholder="Add scout name..." 
                    className="bg-[#0a1f14] border-none rounded-xl h-11 text-sm placeholder:text-muted-foreground/30"
                  />
                  <Button size="icon" className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 text-black">
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
