
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, UserCircle, Award, Calendar, Users, 
  TrendingUp, ClipboardCheck, Menu, X, MessageSquare, 
  CalendarCheck, Video, Layers, ShieldAlert, BookOpen, 
  FileText, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useUser, useFirestore, useDoc, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Attendance', icon: ClipboardCheck, href: '/attendance' },
  { label: 'Reports', icon: FileText, href: '/reports' },
  { label: 'Programmes', icon: BookOpen, href: '/programmes' },
  { label: 'Badges & Awards', icon: Award, href: '/badges' },
  { label: 'Discipline', icon: ShieldAlert, href: '/discipline' },
  { label: 'Events', icon: Calendar, href: '/events' },
  { label: 'Appointments', icon: CalendarCheck, href: '/appointments' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Meetings', icon: Video, href: '/meetings' },
  { label: 'Committees', icon: Layers, href: '/committees' },
  { label: 'Authority Chart', icon: Users, href: '/org-chart' },
  { label: 'Leaderboard', icon: TrendingUp, href: '/leaderboard' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const db = useFirestore();
  const authInstance = useAuth();
  const router = useRouter();
  const { data: profile } = useDoc(user && db ? doc(db, 'users', user.uid) : null);

  const handleLogout = async () => {
    if (!authInstance) return;
    await signOut(authInstance);
    router.push('/login');
  };

  if (pathname === '/login' || pathname === '/onboarding') return null;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden bg-background/50 backdrop-blur-md border border-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 sidebar-bg transform transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-white/5",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2 group">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-black font-black rotate-3 group-hover:rotate-12 transition-transform">42</div>
            <h1 className="text-xl font-black tracking-tighter gold-text uppercase">ScoutLink</h1>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-black font-black shadow-lg" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  pathname === item.href ? "text-black" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 space-y-4">
            <Link href={`/profile/${user?.uid}`} className="block">
              <div className="flex items-center gap-3 px-3 py-4 bg-white/[0.03] rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                <Avatar className="w-10 h-10 rounded-xl border-2 border-primary/20 overflow-hidden shrink-0">
                  <AvatarImage src={profile?.profilePicUrl} className="object-cover" />
                  <AvatarFallback className="bg-black/20"><UserCircle className="w-6 h-6 text-primary/40" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black truncate gold-text uppercase tracking-tight">{profile?.name || 'Loading...'}</p>
                  <p className="text-[9px] text-muted-foreground truncate uppercase font-black opacity-60">{profile?.role}</p>
                </div>
              </div>
            </Link>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="w-full h-12 rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-500/10 font-black uppercase tracking-widest text-[9px] gap-3"
            >
              <LogOut className="w-4 h-4" /> End Session
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
