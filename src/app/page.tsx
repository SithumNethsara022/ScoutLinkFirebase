
"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { 
  ClipboardCheck, 
  BookOpen, 
  Award, 
  ShieldAlert, 
  MessageSquare, 
  Calendar, 
  Video,
  Bell,
  User,
  Shield,
  AlertCircle,
  Layers,
  Trophy,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const actions = [
  { title: 'Attendance', desc: 'Monthly tracker', icon: ClipboardCheck, color: 'text-green-500', href: '/attendance' },
  { title: 'Programmes', desc: 'Patrol weekly plans', icon: BookOpen, color: 'text-blue-500', href: '/programmes' },
  { title: 'Badge Works', desc: 'Awards & Proficiency', icon: Award, color: 'text-yellow-500', href: '/badges' },
  { title: 'Discipline', desc: 'Conduct reports', icon: ShieldAlert, color: 'text-red-500', href: '/discipline' },
  { title: 'Appointments', desc: 'Interview bookings', icon: MessageSquare, color: 'text-purple-500', href: '/appointments' },
  { title: 'Events', desc: 'Troop schedule', icon: Calendar, color: 'text-cyan-500', href: '/events' },
  { title: 'Committees', desc: 'Working groups', icon: Layers, color: 'text-emerald-400', href: '/committees' },
  { title: 'Meetings', desc: 'Troop virtual meet', icon: Video, color: 'text-blue-400', href: '/meetings' },
];

export default function Home() {
  return (
    <div className="space-y-12 pb-24">
      <header className="flex items-center justify-between py-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-[0.2em] gold-text uppercase leading-none">42nd Colombo Gold Troop</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] mt-3 font-bold">Leading Excellence Since 1920</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="w-14 h-14 liquid-glass rounded-3xl transition-all hover:scale-110 relative flex items-center justify-center border border-white/10 shadow-xl">
            <Bell className="w-6 h-6 text-muted-foreground" />
            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          </button>
          <Link href="/profile/1">
            <button className="w-14 h-14 liquid-glass rounded-3xl transition-all hover:scale-110 flex items-center justify-center border border-white/10 shadow-xl overflow-hidden">
               <img src="https://picsum.photos/seed/user1/100" className="w-full h-full object-cover" />
            </button>
          </Link>
        </div>
      </header>

      <section className="hero-section group p-12 !rounded-[4rem] border-primary/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-32 h-32 rounded-[2.5rem] liquid-glass flex items-center justify-center rotate-6 group-hover:rotate-0 transition-all duration-700 border-2 border-primary/40 shadow-2xl">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-5xl font-black gold-text uppercase tracking-tighter leading-none">Welcome, Asher Quinn</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="text-[11px] font-black px-6 py-2 rounded-2xl liquid-glass uppercase tracking-widest border border-white/5 shadow-lg">Scout Leader</span>
              <span className="text-[11px] font-black px-6 py-2 rounded-2xl liquid-glass uppercase tracking-widest border border-white/5 shadow-lg">Gold IV • Leader</span>
              <span className="text-[11px] font-black px-6 py-2 rounded-2xl liquid-glass uppercase tracking-widest text-primary border border-primary/20 shadow-lg">Grade 12</span>
            </div>
          </div>
          <div className="md:ml-auto flex gap-12">
            <div className="text-center">
               <p className="text-5xl font-black gold-text leading-none">850</p>
               <p className="text-[9px] uppercase font-black text-muted-foreground mt-3 tracking-widest">Global Points</p>
            </div>
            <div className="text-center">
               <p className="text-5xl font-black text-blue-400 leading-none">1st</p>
               <p className="text-[9px] uppercase font-black text-muted-foreground mt-3 tracking-widest">Rank Position</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card group !rounded-[3rem] p-8 border-white/5 hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 shadow-xl">
              <div className={cn("w-16 h-16 rounded-[1.75rem] bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform", action.color)}>
                <action.icon className="w-8 h-8" />
              </div>
              <div className="mt-4">
                <h3 className="font-black uppercase tracking-widest text-sm mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed font-bold uppercase tracking-tighter">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        <div className="lg:col-span-2 space-y-10">
          <Card className="glass-panel rounded-[4rem] overflow-hidden border-none shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-primary/50 to-primary w-full" />
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-lg flex items-center gap-4 gold-text uppercase tracking-[0.3em] font-black">
                <AlertCircle className="w-6 h-6" />
                Troop Broadcast
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              {[
                { title: 'Wednesday Scouting', desc: 'Full Uniform required for all Grade 6-12 Scouts. Pioneering practicals at 14:00.', poster: 'Scout Leader', color: 'border-primary' },
                { title: 'SA Hike Window', desc: 'Registrations now open for the June 2026 window. Visit appointments to book.', poster: 'STL Anthony', color: 'border-blue-500' }
              ].map((ann, i) => (
                <div key={i} className={cn("p-8 rounded-[2.5rem] bg-white/[0.03] border-l-8 transition-all hover:bg-white/[0.05] cursor-default group", ann.color)}>
                  <h4 className="font-black text-lg mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">{ann.title}</h4>
                  <p className="text-xs text-muted-foreground mb-6 font-bold uppercase leading-relaxed">{ann.desc}</p>
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                    <div className="flex items-center gap-2">
                       <User className="w-3 h-3" />
                       <span>Posted by {ann.poster}</span>
                    </div>
                    <span>{i === 0 ? '2 hours ago' : 'Yesterday'}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
             <Leaderboard />
             <Link href="/org-chart">
               <button className="w-full mt-8 h-20 rounded-[2.5rem] liquid-glass border border-primary/20 text-primary font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-primary/10 transition-all">
                  <Users className="w-6 h-6" />
                  View Authority Chart
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
