
'use client';

import { useUser, useDoc, useFirestore } from '@/firebase';
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
import { doc } from 'firebase/firestore';

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
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 max-w-[100vw] overflow-x-hidden animate-in fade-in duration-1000">
      <header className="flex items-center justify-between py-2 px-4 md:px-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-widest gold-text uppercase leading-none drop-shadow-lg">42nd Colombo Gold Troop</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mt-2 font-black">Central Operations Command</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center border border-white/10 relative hover:bg-white/10 transition-all hover:scale-105">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-ping" />
          </button>
          <Link href={`/profile/${user?.uid}`}>
            <Avatar className="w-14 h-14 rounded-[1.5rem] glass-panel border border-white/20 overflow-hidden bg-white/5 flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
              <AvatarImage src={profile?.profilePicUrl} className="object-cover" />
              <AvatarFallback><User className="w-6 h-6 text-muted-foreground" /></AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <section className="hero-section mx-4 md:mx-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] animate-in zoom-in-95 duration-700">
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 p-4">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-[2.5rem] md:rounded-[3.5rem] liquid-glass flex items-center justify-center border-2 border-primary/30 rotate-2 shadow-2xl shrink-0 overflow-hidden group">
             {profile?.profilePicUrl ? (
               <img src={profile.profilePicUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
             ) : (
               <Shield className="w-12 h-12 md:w-20 md:h-20 text-primary" />
             )}
          </div>
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-6xl font-black gold-text uppercase tracking-tighter leading-none">Vandé, {profile?.name?.split(' ')[0] || 'Scout'}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="text-[10px] md:text-[12px] font-black px-6 py-2 rounded-xl bg-white/10 border border-white/10 uppercase tracking-widest backdrop-blur-md">{profile?.role || 'Awaiting Induction'}</span>
              <span className="text-[10px] md:text-[12px] font-black px-6 py-2 rounded-xl bg-primary/20 text-primary border border-primary/40 uppercase tracking-widest backdrop-blur-md">Status: Active</span>
            </div>
          </div>
          <div className="flex gap-12 md:ml-auto">
            <div className="text-center">
               <p className="text-4xl md:text-7xl font-black gold-text leading-none drop-shadow-2xl">{profile?.totalPoints || 0}</p>
               <p className="text-[10px] uppercase font-black text-muted-foreground mt-3 tracking-widest opacity-60">Points</p>
            </div>
            <div className="text-center">
               <p className="text-4xl md:text-7xl font-black text-blue-400 leading-none drop-shadow-2xl">#{profile?.rank || '--'}</p>
               <p className="text-[10px] uppercase font-black text-muted-foreground mt-3 tracking-widest opacity-60">Rank</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 md:px-0">
        {actions.map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="action-card p-8 border-white/5 hover:border-primary/40 h-full flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2">
              <div className={cn("w-16 h-16 rounded-[2rem] bg-black/50 flex items-center justify-center mb-6 shrink-0 transition-all group-hover:scale-110 group-hover:bg-primary/20 group-hover:rotate-6 shadow-xl", action.color)}>
                <action.icon className="w-8 h-8" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-[13px] leading-tight mb-2">{action.title}</h3>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter opacity-50 group-hover:opacity-80 transition-opacity line-clamp-1">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4 md:px-0 animate-in slide-in-from-bottom-10 duration-1000">
        <Leaderboard />
      </div>

      <div className="space-y-6 px-4 md:px-0 pb-16">
        <h3 className="text-[11px] font-black gold-text uppercase tracking-widest ml-4 flex items-center gap-3">
           <ScrollText className="w-6 h-6" /> Recent Transmission Activity
        </h3>
        <div className="grid gap-4">
           <div className="glass-panel p-20 rounded-[4rem] text-center opacity-40 border-dashed border-2 border-white/10 hover:opacity-60 transition-opacity cursor-default">
              <p className="text-[12px] font-black uppercase tracking-widest">No recent registry activity detected at HQ</p>
           </div>
        </div>
      </div>
    </div>
  );
}
