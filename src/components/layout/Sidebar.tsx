
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserCircle, 
  Award, 
  Calendar, 
  Users, 
  TrendingUp, 
  ClipboardCheck,
  Menu,
  X,
  MessageSquare,
  CalendarCheck,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'My Profile', icon: UserCircle, href: '/profile/1' },
  { label: 'Attendance', icon: ClipboardCheck, href: '/attendance' },
  { label: 'Badges & Awards', icon: Award, href: '/badges' },
  { label: 'Events', icon: Calendar, href: '/events' },
  { label: 'Appointments', icon: CalendarCheck, href: '/appointments' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Authority Chart', icon: Users, href: '/org-chart' },
  { label: 'Leaderboard', icon: TrendingUp, href: '/leaderboard' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Skip sidebar on onboarding
  if (pathname === '/onboarding') return null;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 sidebar-bg transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-black font-black rotate-3">42</div>
            <h1 className="text-xl font-black tracking-tighter gold-text uppercase">ScoutLink</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-black font-bold shadow-lg" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  pathname === item.href ? "text-black" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className="text-xs uppercase tracking-widest">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-4 bg-white/[0.03] rounded-[2rem] border border-white/5">
              <div className="w-10 h-10 rounded-[1.25rem] border-2 border-primary/20 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black truncate gold-text uppercase">Asher Quinn</p>
                <p className="text-[9px] text-muted-foreground truncate uppercase font-bold">Scout Leader</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
