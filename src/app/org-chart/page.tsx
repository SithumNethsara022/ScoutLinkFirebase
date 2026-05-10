"use client";

import { AUTHORITY_CHART, MOCK_SCOUTS } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, User, ChevronRight, Phone, Mail, Users, Info } from 'lucide-react';
import Link from 'next/link';

export default function AuthorityChartPage() {
  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      <header className="text-center space-y-6">
        <h2 className="text-5xl font-black gold-text uppercase tracking-widest leading-none drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">Authorities Chart</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em] opacity-60">Complete Organizational Hierarchy of the 42nd Colombo Gold Troop</p>
      </header>

      <div className="space-y-16">
        {/* Top Level: GSL, SL, MIC */}
        <section className="flex flex-col items-center space-y-12">
          <div className="flex gap-8 md:gap-24 items-center">
            {/* GSL */}
            <div className="glass-panel rounded-[2.5rem] p-6 text-center border-l-4 border-l-primary w-56 transform hover:scale-105 transition-all">
              <p className="text-[8px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Group Scout Leader</p>
              <h3 className="font-black text-sm gold-text uppercase tracking-tight">{AUTHORITY_CHART.gsl.name}</h3>
            </div>

            {/* Scout Leader */}
            <Link href={`/profile/${AUTHORITY_CHART.leader.id}`} className="group">
              <div className="hero-section text-center p-12 !rounded-[4rem] border-2 border-primary/40 hover:border-primary transition-all shadow-2xl scale-110">
                <div className="w-16 h-16 rounded-[1.75rem] liquid-glass mx-auto mb-4 flex items-center justify-center border border-primary/30 group-hover:rotate-6 transition-transform">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-black text-2xl gold-text uppercase tracking-tighter leading-none">{AUTHORITY_CHART.leader.name}</h3>
                <Badge variant="outline" className="mt-3 border-primary/40 text-[9px] font-black uppercase tracking-widest">{AUTHORITY_CHART.leader.position}</Badge>
              </div>
            </Link>

            {/* MIC */}
            <div className="glass-panel rounded-[2.5rem] p-6 text-center border-r-4 border-r-primary w-56 transform hover:scale-105 transition-all">
              <p className="text-[8px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Master in Charge</p>
              <h3 className="font-black text-sm gold-text uppercase tracking-tight">{AUTHORITY_CHART.mic.name}</h3>
            </div>
          </div>

          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />

          {/* ASLs */}
          <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
            {AUTHORITY_CHART.asls.map(asl => (
              <Link href={`/profile/${asl.id}`} key={asl.id} className="glass-panel p-6 rounded-[3rem] text-center hover:bg-white/10 transition-all border-b-2 border-b-blue-500/30">
                <p className="text-[8px] uppercase font-black text-muted-foreground mb-2">Assistant Scout Leader</p>
                <h4 className="font-black text-sm uppercase tracking-tighter">{asl.name}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* Instructors, STL, ASTL, Secretaries */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 px-8">
            <Shield className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-black gold-text uppercase tracking-widest">Instructional Staff & Special Roles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTHORITY_CHART.instructors.map(inst => (
              <Link href={`/profile/${inst.id}`} key={inst.id} className="glass-panel p-6 rounded-[2.5rem] group hover:bg-white/10 transition-all">
                <p className="text-[8px] font-black uppercase text-amber-500 mb-1">{inst.position}</p>
                <h4 className="font-black text-xs uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{inst.name}</h4>
                {inst.extra && <Badge variant="outline" className="text-[7px] font-black uppercase border-white/10">{inst.extra}</Badge>}
              </Link>
            ))}
          </div>
        </section>

        {/* Sub-Troops & Patrols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {AUTHORITY_CHART.subTroops.map(st => (
            <Card key={st.name} className="glass-panel border-none rounded-[4rem] p-4 bg-white/[0.02]">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-black gold-text uppercase tracking-tighter">{st.name}</CardTitle>
                <p className="text-[10px] font-black uppercase text-muted-foreground mt-2 tracking-widest">STL: {st.leader}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {st.patrols.map(p => (
                  <div key={p.name} className="p-6 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-4 hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <h5 className="font-black text-xs uppercase tracking-widest flex items-center gap-3">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {p.name}
                      </h5>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 text-center">
                        <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">PL</p>
                        <p className="text-[10px] font-black uppercase truncate">{p.leader}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 text-center">
                        <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">APL</p>
                        <p className="text-[10px] font-black uppercase truncate">{p.assistant}</p>
                      </div>
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
