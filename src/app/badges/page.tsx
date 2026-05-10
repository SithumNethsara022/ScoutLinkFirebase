
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle, Search, Filter, Trash2 } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock role for testing
const USER_ROLE = 'Scout'; 

export default function BadgesAwardsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);
  const [badgeCode, setBadgeCode] = useState('');
  const [badgeType, setBadgeType] = useState<'Junior' | 'Senior' | ''>('');

  const canRemoveBadge = ['Senior Troop Leader', 'Asst Senior Troop Leader', 'Scout Leader', 'Asst Scout Leader'].includes(USER_ROLE);

  const handleCodeChange = (code: string) => {
    setBadgeCode(code);
    const c = code.toLowerCase();
    if (c.includes('s')) setBadgeType('Senior');
    else if (c.includes('j')) setBadgeType('Junior');
    else setBadgeType('');
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
        <p className="text-muted-foreground">Accessible to all scouts. Entries confirmed by PLs.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-panel border-none rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3 gold-text uppercase tracking-tight">
              <Award className="w-6 h-6" />
              Award Eligibility
            </CardTitle>
            <CardDescription>Track status: Test Passing → Instructor → Scout Leader → Passed.</CardDescription>
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
              {loading ? "Analyzing Status..." : "Check My Progress"}
            </Button>

            {advice && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-3">
                  {advice.requiredBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex gap-3">
                        {badge.isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                        <div>
                          <p className="font-bold text-sm">{badge.name}</p>
                          <p className="text-[9px] text-muted-foreground uppercase">{badge.isCompleted ? 'Verified' : 'In Progress'}</p>
                        </div>
                      </div>
                      {canRemoveBadge && badge.isCompleted && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
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
            <CardDescription>Scouts & PLs can enter. Removal by Senior Troop Leader+ only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
             <div className="space-y-2">
               <Label>Badge Code</Label>
               <Input 
                placeholder="e.g. SB-5 (Senior) or JG-5 (Junior)" 
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
               <Label>Badge Name (International allowed)</Label>
               <Input placeholder="e.g. Amateur Radio" className="rounded-xl bg-black/20 border-white/10 h-11" />
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
                   <SelectItem value="International">International</SelectItem>
                 </SelectContent>
               </Select>
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
