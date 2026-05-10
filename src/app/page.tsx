
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
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const actions = [
  { title: 'Attendance', desc: 'Monthly tracker', icon: ClipboardCheck, color: 'text-green-500', href: '/attendance' },
  { title: 'Programmes', desc: 'Patrol weekly plans', icon: BookOpen, color: 'text-blue-500', href: '/programmes' },
  { title: 'Badge Works', desc: 'Awards & Proficiency', icon: Award, color: 'text-yellow-500', href: '/badges' },
  { title: 'Discipline', desc: 'Conduct reports', icon: ShieldAlert, color: 'text-red-500', href: '/discipline' },
  { title: 'Appointments', desc: 'Interview bookings', icon: MessageSquare, color: 'text-purple-500', href: '/appointments' },
  { title: 'Calendar', desc: 'Troop schedule', icon: Calendar, color: 'text-cyan-500', href: '/events' },
  { title: 'Committees', desc: 'Working groups', icon: Layers, color: 'text-emerald-400', href: '/committees' },
  { title: 'Meetings', desc: 'Troop virtual meet', icon: Video, color: 'text-blue-400', href: '/meetings' },
];

export default function Home() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between py-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-[0.2em] gold-text uppercase">42nd Colombo Gold Troop</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Leading Excellence Since 1920</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 liquid-glass rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </button>
          <button className="p-1.5 liquid-glass rounded-full hover:bg-white/10 transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <section className="hero-section group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-[2rem] liquid-glass flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black gold-text uppercase tracking-tight">Welcome, Sithum Nethsara</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full liquid-glass uppercase tracking-tighter">Assistant Sub Troop Leader</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full liquid-glass uppercase tracking-tighter">Swans • Gold IV</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full liquid-glass uppercase tracking-tighter text-primary">Grade 10</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card group">
              <div className={cn("p-4 rounded-3xl bg-black/40", action.color)}>
                <action.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-widest text-xs mb-1 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-tight font-medium">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel rounded-[2.5rem] overflow-hidden border-none">
            <div className="h-1.5 bg-primary w-full" />
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2 gold-text uppercase tracking-[0.2em] font-black">
                <AlertCircle className="w-5 h-5" />
                Troop Broadcast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Wednesday Scouting', desc: 'Full Uniform required for all Grade 6-12 Scouts. Pioneering practicals at 14:00.', poster: 'Scout Leader', color: 'border-primary' },
                { title: 'SA Hike Window', desc: 'Registrations now open for the June 2026 window. Visit appointments to book.', poster: 'STL Anthony', color: 'border-blue-500' }
              ].map((ann, i) => (
                <div key={i} className={cn("p-5 rounded-3xl bg-white/5 border-l-4 transition-transform hover:translate-x-1 cursor-default", ann.color)}>
                  <h4 className="font-bold mb-1 text-sm">{ann.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{ann.desc}</p>
                  <div className="flex justify-between items-center text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                    <span>Posted by {ann.poster}</span>
                    <span>{i === 0 ? '2 hours ago' : 'Yesterday'}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
