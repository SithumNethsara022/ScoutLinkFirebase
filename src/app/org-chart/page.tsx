"use client";

import { AUTHORITY_CHART } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AuthorityChartPage() {
  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-bold gold-text">Authority Chart</h2>
        <p className="text-muted-foreground">Interactive organizational hierarchy of the Golden Troop.</p>
      </header>

      <div className="space-y-12">
        {/* Top Leadership */}
        <section className="flex flex-col items-center space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
              <Card className="bg-card/50 border-primary/20 text-center p-4">
                 <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                 <h3 className="font-bold text-lg">{AUTHORITY_CHART.gsl.name}</h3>
                 <Badge className="bg-primary/20 text-primary border-primary/20">{AUTHORITY_CHART.gsl.position}</Badge>
              </Card>
              <Card className="bg-card/50 border-primary/20 text-center p-4">
                 <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                 <h3 className="font-bold text-lg">{AUTHORITY_CHART.mic.name}</h3>
                 <Badge className="bg-primary/20 text-primary border-primary/20">{AUTHORITY_CHART.mic.position}</Badge>
              </Card>
           </div>

           <div className="w-px h-12 bg-border/50" />

           <Link href="/profile/1" className="w-full max-w-sm">
             <Card className="forest-gradient border-primary/40 text-center p-6 hover:scale-105 transition-transform cursor-pointer">
                <User className="w-10 h-10 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-xl gold-text">{AUTHORITY_CHART.leader.name}</h3>
                <Badge variant="secondary" className="mt-2">{AUTHORITY_CHART.leader.position}</Badge>
             </Card>
           </Link>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border/40">
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2">
                 <Users className="w-5 h-5 text-blue-500" />
                 Assistant Scout Leaders (ASLs)
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               {AUTHORITY_CHART.asls.map(asl => (
                 <div key={asl.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/20">
                   <span className="font-medium">{asl.name}</span>
                   <Badge variant="outline">{asl.position}</Badge>
                 </div>
               ))}
             </CardContent>
          </Card>

          <Card className="bg-card border-border/40">
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2">
                 <Shield className="w-5 h-5 text-amber-500" />
                 Instructors & Staff
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               {AUTHORITY_CHART.instructors.map(inst => (
                 <div key={inst.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/20">
                   <span className="font-medium">{inst.name}</span>
                   <Badge variant="outline">{inst.position}</Badge>
                 </div>
               ))}
             </CardContent>
          </Card>
        </div>

        {/* Sub-Troops Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {AUTHORITY_CHART.subTroops.map(st => (
             <Card key={st.name} className="bg-card border-border/40 overflow-hidden">
                <div className="bg-primary/10 p-4 border-b border-border/40">
                   <h3 className="font-bold text-primary flex items-center justify-between">
                     {st.name}
                     <span className="text-xs text-muted-foreground">Leader: {st.leader}</span>
                   </h3>
                </div>
                <CardContent className="p-4 space-y-4">
                   {st.patrols.map(p => (
                     <div key={p.name} className="p-3 rounded-lg bg-muted/10 border border-border/10 space-y-2">
                       <div className="flex items-center justify-between">
                         <span className="font-bold flex items-center gap-2">
                           <ChevronRight className="w-4 h-4 text-primary" />
                           {p.name} Patrol
                         </span>
                       </div>
                       <div className="flex justify-between text-xs text-muted-foreground">
                         <span>PL: {p.leader}</span>
                         <span>APL: {p.assistant}</span>
                       </div>
                     </div>
                   ))}
                </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
}