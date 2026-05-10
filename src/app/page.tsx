
'use client';

import { initializeFirebase, useUser, useDoc, useFirestore } from '@/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { 
  ClipboardCheck, BookOpen, Award, ShieldAlert, 
  MessageSquare, Calendar, Video, Bell, User, 
  Shield, Layers, ScrollText 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function Home() {
  const { user } = useUser();
  const db = useFirestore();
  const { data: profile, loading } = useDoc(user && db ? doc(db, 'users', user.uid) : null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile && !profile.onboarded) {
      router.push('/onboarding');
    }
  }, [profile, loading, router]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 md:space-y-10 pb-24 max-w-[100vw] overflow-x-hidden animate-in fade-in duration-1000">
      <header className="flex items-center justify-between py-2 px-4 md:px-0">
        <div className="flex flex-col">
          <h1 className="text-base md:text-2xl font-black tracking-widest gold-text uppercase leading-none">42nd Colombo Gold Troop</h1>
          <p className="text-[7px] md:text-[9px] text-muted-foreground uppercase tracking-[0.2em] mt-1.5 font-black">Central Operations Command</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button className="w-8 h-8 md:w-11 md:h-11 glass-panel rounded-xl flex items-center justify-center border border-white/10 relative hover:bg-white/5 transition-colors">
            <Bell className="w-3.5 h-3.5 md:w-5 md:h-5 text-muted-foreground" />
          </button>
          <Link href={`/profile/${user?.uid}`}>
            <Avatar className="w-8 h-8 md:w-11 md:h-11 rounded-xl glass-panel border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center hover:scale-110 transition-transform">
              <AvatarImage src={profile?.profilePicUrl} className="object-cover" />
              <AvatarFallback><User className="w-4 h-4 text-muted-foreground" /></AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <section className="hero-section mx-4 md:mx-0 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative z-10">
          <div className="w-12 h-12 md:w-24 md:h-24 rounded-3xl liquid-glass flex items-center justify-center border-2 border-primary/30 rotate-3 shadow-xl shrink-0 overflow-hidden">
             {profile?.profilePicUrl ? (
               <img src={profile.profilePicUrl} className="w-full h-full object-cover" />
             ) : (
               <Shield className="w-6 h-6 md:w-10 md:h-10 text-primary" />
             )}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-3xl font-black gold-text uppercase tracking-tight">Vandé, {profile?.name?.split(' ')[0]}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-3">
              <span className="text-[6px] md:text-[9px] font-black px-3 py-1 rounded-md bg-white/5 border border-white/5 uppercase tracking-widest">{profile?.role}</span>
              <span className="text-[6px] md:text-[9px] font-black px-3 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">Active Status</span>
            </div>
          </div>
          <div className="flex gap-10 md:ml-auto">
            <div className="text-center">
               <p className="text-2xl md:text-4xl font-black gold-text leading-none">{profile?.totalPoints || 0}</p>
               <p className="text-[6px] md:text-[8px] uppercase font-black text-muted-foreground mt-1 tracking-widest">Points</p>
            </div>
            <div className="text-center">
               <p className="text-2xl md:text-4xl font-black text-blue-400 leading-none">#1</p>
               <p className="text-[6px] md:text-[8px] uppercase font-black text-muted-foreground mt-1 tracking-widest">Rank</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card p-4 md:p-8 border-white/5 hover:border-primary/20 h-full flex flex-col items-center text-center group">
              <div className={cn("w-7 h-7 md:w-12 md:h-12 rounded-2xl bg-black/40 flex items-center justify-center mb-4 shrink-0 transition-all group-hover:scale-110 group-hover:bg-primary/10", action.color)}>
                <action.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-[8px] md:text-[11px] leading-tight mb-1">{action.title}</h3>
              <p className="text-[6px] md:text-[8px] text-muted-foreground uppercase font-black tracking-tighter opacity-60 line-clamp-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4 md:px-0">
        <Leaderboard />
      </div>

      <div className="space-y-4 px-4 md:px-0 pb-16">
        <h3 className="text-[8px] md:text-[10px] font-black gold-text uppercase tracking-widest ml-2 flex items-center gap-2">
           <ScrollText className="w-4 h-4" /> Recent Logistics
        </h3>
        <div className="grid gap-3">
           <div className="glass-panel p-12 rounded-3xl text-center opacity-20 border-dashed">
              <p className="text-[10px] font-black uppercase tracking-widest">No recent registry activity detected</p>
           </div>
        </div>
      </div>
    </div>
  );
}

import { doc } from 'firebase/firestore';
