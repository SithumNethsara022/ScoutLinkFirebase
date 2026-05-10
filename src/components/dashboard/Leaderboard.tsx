"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Crown, Users, Target } from 'lucide-react';

const INDIVIDUALS = [
  { rank: 1, name: 'Asher Quinn', points: 850, patrol: 'Eagles' },
  { rank: 2, name: 'Ethan Hunt', points: 450, patrol: 'Tiger' },
  { rank: 3, name: 'Lucas Gray', points: 420, patrol: 'Lion' },
  { rank: 4, name: 'Sarah Miller', points: 240, patrol: 'Woodpeckers' },
];

const PATROLS = [
  { rank: 1, name: 'Eagles', points: 1240, subTroop: 'Gold I' },
  { rank: 2, name: 'Tiger', points: 1120, subTroop: 'Gold I' },
  { rank: 3, name: 'Woodpeckers', points: 980, subTroop: 'Gold II' },
];

const SUB_TROOPS = [
  { rank: 1, name: 'Gold I', points: 3450, avg: 1150 },
  { rank: 2, name: 'Gold II', points: 2890, avg: 963 },
  { rank: 3, name: 'Gold III', points: 2100, avg: 700 },
];

export function Leaderboard() {
  return (
    <Card className="border-none rounded-[3rem] glass-panel overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-sm gold-text font-black flex items-center gap-3 uppercase tracking-[0.2em]">
          <Trophy className="w-5 h-5" />
          Elite Standings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/40 rounded-2xl h-12 p-1">
            <TabsTrigger value="individual" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black text-[9px] font-black uppercase tracking-widest">Individual</TabsTrigger>
            <TabsTrigger value="patrol" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black text-[9px] font-black uppercase tracking-widest">Patrol</TabsTrigger>
            <TabsTrigger value="subtroop" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black text-[9px] font-black uppercase tracking-widest">Sub Troop</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-4">
            {INDIVIDUALS.map((item) => (
              <div key={item.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all group">
                <div className="flex-shrink-0 w-8 text-center font-black text-[10px]">
                  {item.rank === 1 ? <Crown className="w-4 h-4 text-primary mx-auto" /> : <span>{item.rank}</span>}
                </div>
                <Avatar className="h-10 w-10 border-2 border-white/10 group-hover:border-primary/40 transition-all">
                  <AvatarImage src={`https://picsum.photos/seed/${item.name}/100`} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase tracking-tighter truncate group-hover:text-primary transition-colors">{item.name}</p>
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">{item.patrol} Patrol</p>
                </div>
                <div className="text-right">
                  <span className="font-black gold-text text-sm">{item.points}</span>
                  <span className="text-[8px] block text-muted-foreground uppercase font-black tracking-widest">Points</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="patrol" className="space-y-4">
            {PATROLS.map((item) => (
              <div key={item.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex-shrink-0 w-8 text-center font-black text-[10px]">
                   {item.rank === 1 ? <Trophy className="w-4 h-4 text-primary mx-auto" /> : <span>{item.rank}</span>}
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                   <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase tracking-tighter">{item.name} Patrol</p>
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">{item.subTroop}</p>
                </div>
                <div className="text-right">
                  <span className="font-black gold-text text-sm">{item.points}</span>
                  <span className="text-[8px] block text-muted-foreground uppercase font-black tracking-widest">Combined</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="subtroop" className="space-y-4">
            {SUB_TROOPS.map((item) => (
              <div key={item.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex-shrink-0 w-8 text-center font-black text-[10px]">
                   {item.rank}
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                   <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase tracking-tighter">{item.name}</p>
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Average {item.avg} pts/scout</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-blue-400 text-sm">{item.points}</span>
                  <span className="text-[8px] block text-muted-foreground uppercase font-black tracking-widest">Total</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}