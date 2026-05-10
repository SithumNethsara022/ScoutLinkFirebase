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
  Layers,
  ScrollText
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

const announcements = [
  { id: 1, title: 'Wednesday Scouting', desc: 'Full Uniform required for all Grade 6-12 Scouts. Pioneering practicals at 14:00.', poster: 'Scout Leader', color: 'border-primary' },
  { id: 2, title: 'SA Hike Window', desc: 'Registrations now open for the June 2026 window. Visit appointments to book.', poster: 'STL Anthony', color: 'border-blue-500' },
  { id: 3, title: 'Cantlay Training', desc: 'All nominated patrol leaders must attend the preparation session this Friday.', poster: 'JTL Asher', color: 'border-green-500' },
];

export default function Home() {
  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-center justify-between py-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-[0.2em] gold-text uppercase leading-none">42nd Colombo Gold Troop</h1>
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mt-2 font-black">Leading Excellence Since 1920</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 glass-panel rounded-2xl transition-all hover:scale-110 relative flex items-center justify-center border border-white/10">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-background animate-pulse" />
          </button>
          <Link href="/profile/1">
            <button className="w-12 h-12 glass-panel rounded-2xl transition-all hover:scale-110 flex items-center justify-center border border-white/10 overflow-hidden">
               <img src="https://picsum.photos/seed/user1/100" className="w-full h-full object-cover" />
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Welcome Slide */}
      <section className="hero-section group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-[2rem] liquid-glass flex items-center justify-center rotate-6 group-hover:rotate-0 transition-all duration-700 border-2 border-primary/40 shadow-2xl">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-4xl font-black gold-text uppercase tracking-tighter leading-none">Welcome, Asher Quinn</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="text-[10px] font-black px-4 py-1.5 rounded-xl bg-white/5 uppercase tracking-widest border border-white/5">Scout Leader</span>
              <span className="text-[10px] font-black px-4 py-1.5 rounded-xl bg-white/5 uppercase tracking-widest border border-white/5">Gold IV</span>
              <span className="text-[10px] font-black px-4 py-1.5 rounded-xl bg-white/5 uppercase tracking-widest text-primary border border-primary/20">Grade 12</span>
            </div>
          </div>
          <div className="md:ml-auto flex gap-10">
            <div className="text-center">
               <p className="text-4xl font-black gold-text leading-none">850</p>
               <p className="text-[8px] uppercase font-black text-muted-foreground mt-2 tracking-widest">Points</p>
            </div>
            <div className="text-center">
               <p className="text-4xl font-black text-blue-400 leading-none">1st</p>
               <p className="text-[8px] uppercase font-black text-muted-foreground mt-2 tracking-widest">Rank</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrollable Announcements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <ScrollText className="w-4 h-4 gold-text" />
          <h3 className="text-[10px] font-black gold-text uppercase tracking-widest">Troop Broadcasts</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 px-2 custom-scrollbar snap-x snap-mandatory">
          {announcements.map((ann) => (
            <div key={ann.id} className={cn("min-w-[300px] md:min-w-[400px] p-6 rounded-[2.5rem] glass-panel border-l-8 snap-center hover:bg-white/[0.08] transition-all", ann.color)}>
              <h4 className="font-black text-sm mb-2 uppercase tracking-tight">{ann.title}</h4>
              <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase leading-relaxed line-clamp-2">{ann.desc}</p>
              <div className="flex justify-between items-center text-[8px] text-muted-foreground uppercase tracking-widest font-black">
                <span className="flex items-center gap-2"><User className="w-3 h-3" /> {ann.poster}</span>
                <span>Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Grid with Smaller Icons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card p-6 border-white/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500">
              <div className={cn("w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center mb-4", action.color)}>
                <action.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-widest text-[11px] mb-1">{action.title}</h3>
                <p className="text-[9px] text-muted-foreground leading-relaxed font-bold uppercase tracking-tighter truncate">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="pt-6">
        <Leaderboard />
      </div>

      {/* Activity Feed Inspiration */}
      <div className="pt-6 space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[10px] font-black gold-text uppercase tracking-widest">Troop Activity Feed</h3>
           <span className="text-[8px] text-muted-foreground uppercase font-black">Scroll for recent logs</span>
        </div>
        <div className="space-y-4">
           {[
             { title: 'New Report Filed', desc: 'Mark Anthony uploaded Annual Camp Logistics.', time: '2h ago', icon: ScrollText },
             { title: 'Badge Verified', desc: 'Asher Quinn confirmed First Aid for 3 scouts.', time: '5h ago', icon: Award },
           ].map((item, i) => (
             <div key={i} className="glass-panel p-5 rounded-[2rem] flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                   <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-tighter">{item.title}</p>
                   <p className="text-[9px] text-muted-foreground uppercase font-bold">{item.desc}</p>
                </div>
                <span className="text-[8px] text-muted-foreground uppercase font-black">{item.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}