
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Target, Shield } from 'lucide-react';

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

          <TabsContent value="individual" className="py-10 text-center opacity-20">
            <Shield className="w-10 h-10 mx-auto mb-4" />
            <p className="text-[9px] font-black uppercase tracking-widest">Standings not yet calculated</p>
          </TabsContent>

          <TabsContent value="patrol" className="py-10 text-center opacity-20">
             <Target className="w-10 h-10 mx-auto mb-4" />
             <p className="text-[9px] font-black uppercase tracking-widest">Standings not yet calculated</p>
          </TabsContent>

          <TabsContent value="subtroop" className="py-10 text-center opacity-20">
             <Target className="w-10 h-10 mx-auto mb-4" />
             <p className="text-[9px] font-black uppercase tracking-widest">Standings not yet calculated</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
