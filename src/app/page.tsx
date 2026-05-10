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
  { title: 'Programmes', desc: 'Patrol plans', icon: BookOpen, color: 'text-blue-500', href: '/programmes' },
  { title: 'Badge Works', desc: 'Progress', icon: Award, color: 'text-yellow-500', href: '/badges' },
  { title: 'Discipline', desc: 'Conduct', icon: ShieldAlert, color: 'text-red-500', href: '/discipline' },
  { title: 'Appointments', desc: 'Interviews', icon: MessageSquare, color: 'text-purple-500', href: '/appointments' },
  { title: 'Events', desc: 'Schedule', icon: Calendar, color: 'text-cyan-500', href: '/events' },
  { title: 'Committees', desc: 'Groups', icon: Layers, color: 'text-emerald-400', href: '/committees' },
  { title: 'Meetings', desc: 'Virtual', icon: Video, color: 'text-blue-400', href: '/meetings' },
];

const announcements = [
  { id: 1, title: 'Wednesday Scouting', desc: 'Full Uniform required for all Grade 6-12 Scouts. Pioneering practicals at 14:00.', poster: 'Scout Leader', color: 'border-primary' },
  { id: 2, title: 'SA Hike Window', desc: 'Registrations now open for the June 2026 window. Visit appointments to book.', poster: 'STL Anthony', color: 'border-blue-500' },
  { id: 3, title: 'Cantlay Training', desc: 'All nominated patrol leaders must attend the preparation session this Friday.', poster: 'JTL Asher', color: 'border-green-500' },
];

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-10 pb-24 max-w-[100vw] overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between py-2 px-4 md:px-0">
        <div className="flex flex-col">
          <h1 className="text-base md:text-2xl font-black tracking-[0.1em] md:tracking-[0.2em] gold-text uppercase leading-none">42nd Colombo Gold Troop</h1>
          <p className="text-[7px] md:text-[9px] text-muted-foreground uppercase tracking-[0.2em] mt-1.5 font-black">Leading Excellence Since 1920</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button className="w-8 h-8 md:w-11 md:h-11 glass-panel rounded-xl flex items-center justify-center border border-white/10 relative">
            <Bell className="w-3.5 h-3.5 md:w-5 md:h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-background animate-pulse" />
          </button>
          <Link href="/profile/1">
            <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl glass-panel border border-white/10 overflow-hidden">
              <img src="https://picsum.photos/seed/user1/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Welcome Slide */}
      <section className="hero-section mx-4 md:mx-0 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative z-10">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl liquid-glass flex items-center justify-center border-2 border-primary/30 rotate-3 shadow-xl shrink-0">
            <Shield className="w-6 h-6 md:w-10 md:h-10 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-3xl font-black gold-text uppercase tracking-tight">Welcome, Asher Quinn</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-2">
              <span className="text-[6px] md:text-[9px] font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/5 uppercase tracking-widest">Scout Leader</span>
              <span className="text-[6px] md:text-[9px] font-black px-2 py-0.5 rounded-md bg-white/5 border border-white/5 uppercase tracking-widest text-primary">Grade 12</span>
            </div>
          </div>
          <div className="flex gap-6 md:ml-auto">
            <div className="text-center">
               <p className="text-xl md:text-3xl font-black gold-text leading-none">850</p>
               <p className="text-[6px] md:text-[8px] uppercase font-black text-muted-foreground mt-1">Points</p>
            </div>
            <div className="text-center">
               <p className="text-xl md:text-3xl font-black text-blue-400 leading-none">1st</p>
               <p className="text-[6px] md:text-[8px] uppercase font-black text-muted-foreground mt-1">Rank</p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Announcements - Responsive */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-6 md:px-0">
          <ScrollText className="w-3.5 h-3.5 text-primary" />
          <h3 className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-widest">Troop Broadcasts</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 md:px-0 pb-2 no-scrollbar snap-x snap-mandatory">
          {announcements.map((ann) => (
            <div key={ann.id} className={cn("min-w-[85%] md:min-w-[400px] snap-center glass-panel p-5 rounded-[2.5rem] border-l-4 transition-all shrink-0", ann.color)}>
              <h4 className="font-black text-[10px] md:text-xs mb-1 uppercase tracking-tight truncate">{ann.title}</h4>
              <p className="text-[8px] md:text-[10px] text-muted-foreground mb-3 font-bold uppercase leading-relaxed line-clamp-2">{ann.desc}</p>
              <div className="flex justify-between items-center text-[7px] text-muted-foreground font-black uppercase">
                <span className="flex items-center gap-1.5"><User className="w-2.5 h-2.5" /> {ann.poster}</span>
                <span className="opacity-50">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Grid - Fluid sizes for any aspect ratio */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card p-4 md:p-6 border-white/5 hover:border-primary/20 h-full flex flex-col items-center text-center">
              <div className={cn("w-7 h-7 md:w-9 md:h-9 rounded-xl bg-black/40 flex items-center justify-center mb-3 shrink-0", action.color)}>
                <action.icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-[8px] md:text-[11px] leading-tight mb-1">{action.title}</h3>
              <p className="text-[6px] md:text-[8px] text-muted-foreground uppercase font-bold tracking-tighter opacity-60 line-clamp-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Leaderboard Section - Full Width & Fluid */}
      <div className="px-4 md:px-0">
        <Leaderboard />
      </div>

      {/* Activity Logs */}
      <div className="space-y-4 px-4 md:px-0 pb-10">
        <h3 className="text-[8px] md:text-[10px] font-black gold-text uppercase tracking-widest ml-2">Recent Logistics</h3>
        <div className="grid gap-3">
           {[
             { title: 'New Report Filed', desc: 'Mark Anthony uploaded Annual Camp Logistics.', time: '2h ago', icon: ScrollText },
             { title: 'Badge Verified', desc: 'Asher Quinn confirmed First Aid for 3 scouts.', time: '5h ago', icon: Award },
           ].map((item, i) => (
             <div key={i} className="glass-panel p-4 rounded-2xl flex items-center gap-3 hover:bg-white/[0.08] transition-colors">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                   <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter truncate">{item.title}</p>
                   <p className="text-[8px] text-muted-foreground uppercase font-bold truncate">{item.desc}</p>
                </div>
                <span className="text-[7px] text-muted-foreground uppercase font-black shrink-0">{item.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
