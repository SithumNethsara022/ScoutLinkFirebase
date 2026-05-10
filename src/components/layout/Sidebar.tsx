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
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'My Profile', icon: UserCircle, href: '/profile/1' },
  { label: 'Badges & Awards', icon: Award, href: '/badges' },
  { label: 'Events', icon: Calendar, href: '/events' },
  { label: 'Authority Chart', icon: Users, href: '/org-chart' },
  { label: 'Leaderboard', icon: TrendingUp, href: '/leaderboard' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
        "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">SL</div>
            <h1 className="text-xl font-bold tracking-tight gold-text">ScoutLink</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                  pathname === item.href 
                    ? "bg-sidebar-accent text-primary" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
                <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Asher Quinn</p>
                <p className="text-xs text-muted-foreground truncate italic">Scout Leader</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}