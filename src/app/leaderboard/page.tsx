"use client";

import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  getPerformanceImprovementInsights, 
  PerformanceImprovementInsightsOutput 
} from '@/ai/flows/performance-improvement-insights';
import { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LeaderboardPage() {
  const [insights, setInsights] = useState<PerformanceImprovementInsightsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const result = await getPerformanceImprovementInsights({
        scoutName: 'Asher Quinn',
        currentLeaderboardStanding: {
          rank: 1,
          totalPoints: 850,
          averagePointsPerMonth: 65,
          totalScouts: 48
        },
        individualPointHistory: [
          { activityType: 'Award', name: 'President\'s Scout Award', points: 50, date: '2023-01-20' },
          { activityType: 'Attendance', points: 10, date: '2024-04-01' },
          { activityType: 'Event', name: 'Cantlay Challenge', points: 15, date: '2024-04-15' }
        ]
      });
      setInsights(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-bold gold-text">Leaderboards</h2>
        <p className="text-muted-foreground">Track individual and collective excellence across the troop.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <Leaderboard />
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-card border-primary/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Performance Advisor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!insights && !loading ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-4">Analyze your current standing and get personalized strategies to stay at the top.</p>
                    <Button onClick={fetchInsights} className="w-full">Generate My Insights</Button>
                  </div>
                ) : loading ? (
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 rounded bg-primary/10 border border-primary/20">
                      <p className="text-sm font-semibold mb-1">Summary</p>
                      <p className="text-xs text-muted-foreground">{insights?.overallPerformanceSummary}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm font-semibold">Strategies</p>
                       <ul className="space-y-2">
                          {insights?.suggestions.map((s, i) => (
                            <li key={i} className="text-xs flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {s}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Button variant="ghost" className="w-full text-xs" onClick={fetchInsights}>Refresh Analysis</Button>
                  </div>
                )}
              </CardContent>
           </Card>

           <Card className="bg-card border-border/40">
             <CardHeader>
               <CardTitle className="text-lg">Points System</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-border/20 pb-2">
                  <span>Major Awards</span>
                  <span className="gold-text">10 - 50 pts</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2">
                  <span>Proficiency Badges</span>
                  <span className="gold-text">5 pts each</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2">
                  <span>Daily Attendance</span>
                  <span className="gold-text">1 pt + Bonus</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2">
                  <span>Job Week</span>
                  <span className="gold-text">3 - 10 pts</span>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}