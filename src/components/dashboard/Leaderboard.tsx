"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Crown } from 'lucide-react';

const INDIVIDUALS = [
  { rank: 1, name: 'Asher Quinn', points: 850, patrol: 'Tiger' },
  { rank: 2, name: 'Ethan Hunt', points: 450, patrol: 'Tiger' },
  { rank: 3, name: 'Lucas Gray', points: 420, patrol: 'Lion' },
  { rank: 4, name: 'Sarah Miller', points: 240, patrol: 'Eagle' },
];

export function Leaderboard() {
  return (
    <Card className="border-none rounded-2xl bg-[#0d281a]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg gold-text font-bold flex items-center gap-2 uppercase tracking-widest">
          <Trophy className="w-5 h-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/20 rounded-xl">
            <TabsTrigger value="individual" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black">Individual</TabsTrigger>
            <TabsTrigger value="patrol" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-black">Patrol</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="space-y-3">
              {INDIVIDUALS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:bg-black/30 transition-colors">
                  <div className="flex-shrink-0 w-6 text-center font-bold text-xs">
                    {item.rank === 1 ? <Crown className="w-4 h-4 text-primary mx-auto" /> : <span>{item.rank}</span>}
                  </div>
                  <Avatar className="h-8 w-8 border border-white/10">
                    <AvatarImage src={`https://picsum.photos/seed/${item.name}/100`} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.patrol}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold gold-text text-sm">{item.points}</span>
                    <span className="text-[10px] block text-muted-foreground uppercase tracking-tighter">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patrol">
             <div className="text-center py-10">
               <Medal className="w-10 h-10 text-muted/30 mx-auto mb-2" />
               <p className="text-xs text-muted-foreground">Patrol rankings update weekly</p>
             </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
