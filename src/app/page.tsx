"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { 
  BadgeCheck, 
  Users, 
  Calendar, 
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 pb-10">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold gold-text">Welcome back, Asher!</h2>
        <p className="text-muted-foreground">Here's what's happening in the Golden Troop today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Troop Attendance</CardTitle>
            <Clock className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">+4% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Awards Pending</CardTitle>
            <BadgeCheck className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">2 Prime Minister's Awards</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Scouts</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">Across 4 sub-troops</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Upcoming Events</CardTitle>
            <Calendar className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Next: Job Week (12 May)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border/40 overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 border-l-4 border-primary">
                <h4 className="font-semibold mb-1">Cantlay Challenge Shield 2024</h4>
                <p className="text-sm text-muted-foreground mb-2">Registration is now open for all patrols. Ensure your patrol count is above 4 members.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary/80">Posted by Admin</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border-l-4 border-blue-500">
                <h4 className="font-semibold mb-1">New Proficiency Badge Class</h4>
                <p className="text-sm text-muted-foreground mb-2">Pioneer and Backwoodsman sessions start this Saturday at 0900 hrs.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-400">Posted by Instructor Sophie</span>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Recent Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic mb-4">"Sub Troop A has shown exceptional discipline this month with zero negative points recorded. Average individual attendance is at an all-time high of 98%."</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Tiger Patrol</span>
                  <span className="gold-text">Best Patrol Candidate</span>
                </div>
                <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '85%' }} />
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