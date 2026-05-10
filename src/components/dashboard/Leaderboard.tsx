"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const INDIVIDUALS = [
  { rank: 1, name: 'Asher Quinn', points: 850, patrol: 'Tiger' },
  { rank: 2, name: 'Ethan Hunt', points: 450, patrol: 'Tiger' },
  { rank: 3, name: 'Lucas Gray', points: 420, patrol: 'Lion' },
  { rank: 4, name: 'Sarah Miller', points: 240, patrol: 'Eagle' },
  { rank: 5, name: 'Oliver Twist', points: 180, patrol: 'Cobra' },
];

const PATROLS = [
  { rank: 1, name: 'Tiger', points: 650, subTroop: 'Sub Troop A' },
  { rank: 2, name: 'Lion', points: 580, subTroop: 'Sub Troop C' },
  { rank: 3, name: 'Eagle', points: 510, subTroop: 'Sub Troop B' },
];

const SUB_TROOPS = [
  { rank: 1, name: 'Sub Troop A', points: 615 },
  { rank: 2, name: 'Sub Troop C', points: 540 },
  { rank: 3, name: 'Sub Troop B', points: 490 },
];

export function Leaderboard() {
  return (
    <Card className="border-border/40 shadow-xl forest-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl gold-text font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/20">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="patrol">Patrol</TabsTrigger>
            <TabsTrigger value="subtroop">Sub-Troop</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="space-y-4">
              {INDIVIDUALS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/20 hover:border-primary/50 transition-colors">
                  <div className="flex-shrink-0 w-8 text-center font-bold">
                    {item.rank === 1 ? <Crown className="w-5 h-5 text-primary mx-auto" /> : <span>{item.rank}</span>}
                  </div>
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={`https://picsum.photos/seed/${item.name}/100`} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.patrol} Patrol</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold gold-text">{item.points}</span>
                    <span className="text-[10px] block text-muted-foreground">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patrol">
            <div className="space-y-4">
              {PATROLS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/20">
                  <div className="flex-shrink-0 w-8 text-center font-bold">
                    {item.rank === 1 ? <Medal className="w-5 h-5 text-primary mx-auto" /> : <span>{item.rank}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{item.name} Patrol</p>
                    <p className="text-xs text-muted-foreground">{item.subTroop}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold gold-text">{item.points}</span>
                    <span className="text-[10px] block text-muted-foreground">avg pts</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subtroop">
             <div className="space-y-4">
              {SUB_TROOPS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/20">
                  <div className="flex-shrink-0 w-8 text-center font-bold">
                    <span>{item.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold gold-text">{item.points}</span>
                    <span className="text-[10px] block text-muted-foreground">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}