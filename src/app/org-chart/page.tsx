
"use client";

import { AUTHORITY_CHART } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, User, ChevronRight, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AuthorityChartPage() {
  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black gold-text uppercase tracking-widest leading-none">Authority Chart</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em]">Interactive organizational hierarchy of the Golden Troop</p>
      </header>

      <div className="space-y-16">
        {/* Top Leadership */}
        <section className="flex flex-col items-center space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl w-full">
              <div className="glass-panel rounded-[3rem] p-8 text-center border-l-4 border-l-primary/50">
                 <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                 <h3 className="font-black text-xl gold-text uppercase tracking-tight">{AUTHORITY_CHART.gsl.name}</h3>
                 <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase mt-2">{AUTHORITY_CHART.gsl.position}</Badge>
              </div>
              <div className="glass-panel rounded-[3rem] p-8 text-center border-l-4 border-l-primary/50">
                 <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                 <h3 className="font-black text-xl gold-text uppercase tracking-tight">{AUTHORITY_CHART.mic.name}</h3>
                 <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase mt-2">{AUTHORITY_CHART.mic.position}</Badge>
              </div>
           </div>

           <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />

           <Link href={`/profile/${AUTHORITY_CHART.leader.id}`} className="w-full max-w-md group">
             <div className="hero-section text-center p-10 hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="w-20 h-20 rounded-[2rem] liquid-glass mx-auto mb-6 flex items-center justify-center border-2 border-primary/30 group-hover:rotate-6 transition-transform">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-black text-3xl gold-text uppercase tracking-tighter leading-none">{AUTHORITY_CHART.leader.name}</h3>
                <Badge variant="outline" className="mt-4 border-primary/40 text-[10px] font-black uppercase tracking-widest px-6 py-2">{AUTHORITY_CHART.leader.position}</Badge>
             </div>
           </Link>
        </section>

        {/* ASLs & Instructors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="glass-panel border-none rounded-[3.5rem] p-4">
             <CardHeader className="pb-4">
               <CardTitle className="text-sm font-black gold-text uppercase tracking-widest flex items-center gap-3">
                 <Users className="w-6 h-6 text-blue-400" />
                 Assistant Scout Leaders
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {AUTHORITY_CHART.asls.map(asl => (
                 <Link href={`/profile/${asl.id}`} key={asl.id}>
                    <div className="flex justify-between items-center p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User className="w-5 h-5 text-blue-400" />
                         </div>
                         <span className="font-black text-xs uppercase tracking-tighter">{asl.name}</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10">{asl.position}</Badge>
                    </div>
                 </Link>
               ))}
             </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[3.5rem] p-4">
             <CardHeader className="pb-4">
               <CardTitle className="text-sm font-black gold-text uppercase tracking-widest flex items-center gap-3">
                 <Shield className="w-6 h-6 text-amber-500" />
                 Instructors & Staff
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {AUTHORITY_CHART.instructors.map(inst => (
                 <Link href={`/profile/${inst.id}`} key={inst.id}>
                    <div className="flex justify-between items-center p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-black/40 flex items-center justify-center">
                            <User className="w-5 h-5 text-amber-500" />
                         </div>
                         <div>
                            <p className="font-black text-xs uppercase tracking-tighter leading-none">{inst.name}</p>
                            {inst.extra && <p className="text-[8px] uppercase font-bold text-primary mt-1">{inst.extra}</p>}
                         </div>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10">{inst.position}</Badge>
                    </div>
                 </Link>
               ))}
             </CardContent>
          </Card>
        </div>

        {/* Sub-Troops Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {AUTHORITY_CHART.subTroops.map(st => (
             <div key={st.name} className="space-y-6">
                <div className="hero-section p-8 text-center !rounded-[3rem]">
                   <h3 className="text-2xl font-black gold-text uppercase tracking-tighter leading-none">{st.name}</h3>
                   <p className="text-[10px] font-black uppercase text-muted-foreground mt-3 tracking-widest">Sub Troop Leader: {st.leader}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   {st.patrols.map(p => (
                     <div key={p.name} className="glass-panel p-6 rounded-[2rem] border-none group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                          <span className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {p.name} Patrol
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-3 rounded-xl bg-black/20">
                             <p className="text-[8px] uppercase font-black text-muted-foreground mb-1">PL</p>
                             <p className="text-[10px] font-black uppercase truncate">{p.leader}</p>
                           </div>
                           <div className="p-3 rounded-xl bg-black/20">
                             <p className="text-[8px] uppercase font-black text-muted-foreground mb-1">APL</p>
                             <p className="text-[10px] font-black uppercase truncate">{p.assistant}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
