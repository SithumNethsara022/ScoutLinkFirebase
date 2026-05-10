"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { 
  ClipboardCheck, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  MessageSquare, 
  Calendar, 
  MessageCircle, 
  Video,
  Bell,
  User,
  Shield,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  { title: 'Attendance', desc: 'Mark & view attendance', icon: ClipboardCheck, color: 'text-green-500' },
  { title: 'Programmes', desc: 'Weekly programmes', icon: BookOpen, color: 'text-blue-500' },
  { title: 'Badge Works', desc: 'Awards & badges', icon: Award, color: 'text-yellow-500' },
  { title: 'Discipline', desc: 'Discipline issues', icon: AlertTriangle, color: 'text-red-500' },
  { title: 'Appointments', desc: 'Interview bookings & hikes', icon: MessageSquare, color: 'text-purple-500' },
  { title: 'Calendar', desc: 'Events & schedule', icon: Calendar, color: 'text-cyan-500' },
  { title: 'Messages', desc: 'Chat with scouts', icon: MessageCircle, color: 'text-green-400' },
  { title: 'Meetings', desc: 'Schedule & join meetings', icon: Video, color: 'text-blue-400' },
];

export default function Home() {
  return (
    <div className="space-y-8 pb-20">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl font-bold tracking-widest gold-text uppercase">42nd Colombo Gold Troop</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-1.5 border border-muted/50 rounded-full hover:bg-white/5 transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Hero Welcome Section */}
      <section className="hero-section rounded-2xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center bg-primary/5">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gold-text uppercase tracking-wide">Welcome, Sithum Nethsara</h2>
          <p className="text-sm text-muted-foreground/80 mt-1">
            Assistant Sub Troop Leader • Swans • Gold IV • Grade 10
          </p>
        </div>
      </section>

      {/* Action Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <div key={i} className="action-card group">
            <action.icon className={cn("w-8 h-8", action.color)} />
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-1">{action.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight">{action.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Re-integrated Leaderboard and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0d281a] border-none rounded-2xl overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 gold-text uppercase tracking-widest">
                <AlertCircle className="w-5 h-5" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border-l-4 border-primary">
                <h4 className="font-semibold mb-1 text-sm">Cantlay Challenge Shield 2024</h4>
                <p className="text-xs text-muted-foreground mb-2">Registration is now open for all patrols. Ensure your patrol count is above 4 members.</p>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-tighter">
                  <span>Posted by Admin</span>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border-l-4 border-blue-500">
                <h4 className="font-semibold mb-1 text-sm">New Proficiency Badge Class</h4>
                <p className="text-xs text-muted-foreground mb-2">Pioneer and Backwoodsman sessions start this Saturday at 0900 hrs.</p>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-tighter">
                  <span className="text-blue-400">Posted by Instructor Sophie</span>
                  <span>Yesterday</span>
                </div>
              </div>
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
