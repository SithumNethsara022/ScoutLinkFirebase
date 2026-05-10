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
    <div className="space-y-6 md:space-y-8 pb-24 overflow-x-hidden">
      <header className="flex items-center justify-between py-2 md:py-4 px-2">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-black tracking-[0.15em] md:tracking-[0.2em] gold-text uppercase leading-none">42nd Colombo Gold Troop</h1>
          <p className="text-[7px] md:text-[9px] text-muted-foreground uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1.5 md:mt-2 font-black">Leading Excellence Since 1920</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="w-10 h-10 md:w-12 md:h-12 glass-panel rounded-xl md:rounded-2xl transition-all hover:scale-105 relative flex items-center justify-center border border-white/10 shrink-0">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border border-background animate-pulse" />
          </button>
          <Link href="/profile/1" className="shrink-0">
            <button className="w-10 h-10 md:w-12 md:h-12 glass-panel rounded-xl md:rounded-2xl transition-all hover:scale-105 flex items-center justify-center border border-white/10 overflow-hidden">
               <img src="https://picsum.photos/seed/user1/100" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Welcome Slide - Fully Responsive */}
      <section className="hero-section group shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] mx-2">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] liquid-glass flex items-center justify-center rotate-3 md:rotate-6 group-hover:rotate-0 transition-all duration-700 border-2 border-primary/40 shadow-2xl shrink-0">
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-primary" />
          </div>
          <div className="text-center md:text-left space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-4xl font-black gold-text uppercase tracking-tighter leading-none">Welcome, Asher Quinn</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
              <span className="text-[7px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl bg-white/5 uppercase tracking-widest border border-white/5">Scout Leader</span>
              <span className="text-[7px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl bg-white/5 uppercase tracking-widest border border-white/5">Gold IV</span>
              <span className="text-[7px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl bg-white/5 uppercase tracking-widest text-primary border border-primary/20">Grade 12</span>
            </div>
          </div>
          <div className="md:ml-auto flex gap-6 md:gap-10 mt-2 md:mt-0">
            <div className="text-center">
               <p className="text-2xl md:text-4xl font-black gold-text leading-none">850</p>
               <p className="text-[7px] md:text-[8px] uppercase font-black text-muted-foreground mt-1 md:mt-2 tracking-widest">Points</p>
            </div>
            <div className="text-center">
               <p className="text-2xl md:text-4xl font-black text-blue-400 leading-none">1st</p>
               <p className="text-[7px] md:text-[8px] uppercase font-black text-muted-foreground mt-1 md:mt-2 tracking-widest">Rank</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrollable Announcements */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center gap-2 px-4">
          <ScrollText className="w-3.5 h-3.5 md:w-4 md:h-4 gold-text" />
          <h3 className="text-[8px] md:text-[10px] font-black gold-text uppercase tracking-widest">Troop Broadcasts</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 custom-scrollbar snap-x snap-mandatory scroll-smooth">
          {announcements.map((ann) => (
            <div key={ann.id} className={cn("min-w-[260px] md:min-w-[400px] p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] glass-panel border-l-[6px] md:border-l-8 snap-center hover:bg-white/[0.08] transition-all shrink-0", ann.color)}>
              <h4 className="font-black text-xs md:text-sm mb-1.5 md:mb-2 uppercase tracking-tight truncate">{ann.title}</h4>
              <p className="text-[8px] md:text-[10px] text-muted-foreground mb-3 md:mb-4 font-bold uppercase leading-relaxed line-clamp-2">{ann.desc}</p>
              <div className="flex justify-between items-center text-[7px] md:text-[8px] text-muted-foreground uppercase tracking-widest font-black">
                <span className="flex items-center gap-1.5 md:gap-2"><User className="w-2.5 h-2.5 md:w-3 md:h-3" /> {ann.poster}</span>
                <span>Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Grid - Adjusted for Mobile Aspect Ratios */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card p-4 md:p-6 border-white/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500">
              <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-black/40 flex items-center justify-center mb-3 md:mb-4 shrink-0", action.color)}>
                <action.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-widest text-[9px] md:text-[11px] mb-0.5 md:mb-1 truncate">{action.title}</h3>
                <p className="text-[7px] md:text-[9px] text-muted-foreground leading-relaxed font-bold uppercase tracking-tighter truncate">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="pt-2 md:pt-6 px-2 md:px-0">
        <Leaderboard />
      </div>

      {/* Activity Feed Inspiration */}
      <div className="pt-4 md:pt-6 space-y-4 md:space-y-6 px-4">
        <div className="flex items-center justify-between">
           <h3 className="text-[8px] md:text-[10px] font-black gold-text uppercase tracking-widest">Troop Activity Feed</h3>
           <span className="text-[7px] md:text-[8px] text-muted-foreground uppercase font-black">Recent Logs</span>
        </div>
        <div className="space-y-3 md:space-y-4">
           {[
             { title: 'New Report Filed', desc: 'Mark Anthony uploaded Annual Camp Logistics.', time: '2h ago', icon: ScrollText },
             { title: 'Badge Verified', desc: 'Asher Quinn confirmed First Aid for 3 scouts.', time: '5h ago', icon: Award },
           ].map((item, i) => (
             <div key={i} className="glass-panel p-4 md:p-5 rounded-2xl md:rounded-[2rem] flex items-center gap-3 md:gap-4 hover:bg-white/10 transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                   <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter truncate">{item.title}</p>
                   <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase font-bold truncate">{item.desc}</p>
                </div>
                <span className="text-[7px] md:text-[8px] text-muted-foreground uppercase font-black whitespace-nowrap">{item.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
