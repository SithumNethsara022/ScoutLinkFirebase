
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle, Search, Filter } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function BadgesAwardsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);
  
  // Badge Entry Form
  const [badgeCode, setBadgeCode] = useState('');
  const [badgeType, setBadgeType] = useState<'Junior' | 'Senior' | ''>('');

  const handleCodeChange = (code: string) => {
    setBadgeCode(code);
    if (code.toLowerCase().includes('s')) {
      setBadgeType('Senior');
    } else if (code.toLowerCase().includes('j')) {
      setBadgeType('Junior');
    } else {
      setBadgeType('');
    }
  };

  const handleCheckRequirements = async () => {
    if (!selectedAward) return;
    setLoading(true);
    try {
      const result = await awardPrerequisiteAdvisor({
        awardName: selectedAward as any,
        scoutProficiencyBadges: ['First Aid', 'Cook', 'Swimmer']
      });
      setAdvice(result);
    } catch (e) {
      toast({ title: "Error", description: "Could not fetch advice." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Badge & Award Tracker</h2>
        <p className="text-muted-foreground">Manage troop progress with automated award verification.</p>
      </header>

      {/* Filters Area */}
      <Card className="glass-panel border-none rounded-[2rem]">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest">Filter by Sub Troop</Label>
              <Select defaultValue="all">
                <SelectTrigger className="rounded-xl bg-black/20 border-white/10">
                  <SelectValue placeholder="All Sub Troops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sub Troops</SelectItem>
                  <SelectItem value="Gold I">Gold I</SelectItem>
                  <SelectItem value="Gold II">Gold II</SelectItem>
                  <SelectItem value="Gold III">Gold III</SelectItem>
                  <SelectItem value="Gold IV">Gold IV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest">Filter by Grade</Label>
              <Input placeholder="e.g. 10" className="rounded-xl bg-black/20 border-white/10" type="number" />
            </div>
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest">Filter by Role</Label>
              <Select defaultValue="all">
                <SelectTrigger className="rounded-xl bg-black/20 border-white/10">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="PL">Patrol Leader</SelectItem>
                  <SelectItem value="STL">Sub Troop Leader</SelectItem>
                  <SelectItem value="Senior">Senior Scout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="rounded-xl bg-primary text-black font-bold h-10 px-6">
              <Filter className="w-4 h-4 mr-2" /> Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-panel border-none rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 gold-text uppercase tracking-tight">
              <Award className="w-6 h-6" />
              Award Eligibility
            </CardTitle>
            <CardDescription>Verify progress towards major scouting milestones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Target Award</Label>
              <Select onValueChange={setSelectedAward}>
                <SelectTrigger className="rounded-xl bg-black/20 border-white/10">
                  <SelectValue placeholder="Select Award" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scout Award">Scout Award</SelectItem>
                  <SelectItem value="Chief Commissioner's Award">Chief Commissioner's Award</SelectItem>
                  <SelectItem value="Prime Minister's Award">Prime Minister's Award</SelectItem>
                  <SelectItem value="President's Scout Award">President's Scout Award</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 rounded-2xl font-bold uppercase bg-primary text-black" onClick={handleCheckRequirements} disabled={loading || !selectedAward}>
              {loading ? "Analyzing..." : "Check Requirements"}
            </Button>

            {advice && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  AI Advisor Results
                </h4>
                <div className="space-y-3">
                  {advice.requiredBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                      {badge.isCompleted ? 
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /> : 
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      }
                      <div>
                        <p className="font-bold text-sm">{badge.name}</p>
                        {badge.notes && <p className="text-[10px] text-muted-foreground mt-1 uppercase leading-relaxed">{badge.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-none rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 text-blue-400 uppercase tracking-tight">
              <Info className="w-6 h-6" />
              Log Proficiency Badge
            </CardTitle>
            <CardDescription>Badges are automatically classified as Junior/Senior based on code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
             <div className="space-y-2">
               <Label>Badge Code</Label>
               <Input 
                placeholder="e.g. SB-5 or JG-5" 
                className="rounded-xl bg-black/20 border-white/10 h-11"
                value={badgeCode}
                onChange={(e) => handleCodeChange(e.target.value)}
               />
               {badgeType && (
                 <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">
                   Auto-detected: {badgeType} Badge
                 </p>
               )}
             </div>
             <div className="space-y-2">
               <Label>Badge Name</Label>
               <Input placeholder="e.g. First Aid" className="rounded-xl bg-black/20 border-white/10 h-11" />
             </div>
             <div className="space-y-2">
               <Label>Category</Label>
               <Select>
                 <SelectTrigger className="rounded-xl bg-black/20 border-white/10 h-11">
                   <SelectValue placeholder="Select Category" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="Public Service">Public Service</SelectItem>
                   <SelectItem value="Camp Craft">Camp Craft</SelectItem>
                   <SelectItem value="Practical Science">Practical Science</SelectItem>
                   <SelectItem value="Sports">Sports</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="space-y-2">
               <Label>Passing Date</Label>
               <Input type="date" className="rounded-xl bg-black/20 border-white/10 h-11" />
             </div>
             <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 text-primary hover:bg-primary/10 uppercase font-black tracking-widest">
               Register Badge Entry
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
