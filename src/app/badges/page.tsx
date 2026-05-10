"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle, Trash2, Layers, Calendar } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MOCK_SCOUTS } from '@/lib/mock-data';

export default function BadgesAwardsPage() {
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [passingDate, setPassingDate] = useState('');

  // Fixed award order
  const AWARDS = ["Membership Award", "Scout Award", "Chief Commissioner's Award", "Prime Minister's Award", "President's Scout Award"];

  const handleCheckRequirements = async () => {
    if (!selectedAward) return;
    setLoading(true);
    try {
      const result = await awardPrerequisiteAdvisor({
        awardName: selectedAward as any,
        scoutProficiencyBadges: ['First Aid', 'Camper', 'Swimmer']
      });
      setAdvice(result);
    } catch (e) {
      toast({ title: "Error", description: "Prerequisite check failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      <header>
        <h2 className="text-4xl font-black gold-text uppercase tracking-widest leading-none">Badge Work Ecosystem</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-4">Authenticated Troop Progression Hub</p>
      </header>

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="bg-black/20 border border-white/5 p-1 rounded-3xl h-16 mb-12">
          <TabsTrigger value="status" className="rounded-2xl px-12 text-[10px] font-black uppercase">My Progression</TabsTrigger>
          <TabsTrigger value="log" className="rounded-2xl px-12 text-[10px] font-black uppercase">Log New Entry</TabsTrigger>
          <TabsTrigger value="troop" className="rounded-2xl px-12 text-[10px] font-black uppercase">Troop Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="lg:col-span-1 glass-panel border-none rounded-[3.5rem] p-8">
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-4 mb-8">
                <Award className="w-8 h-8" /> Eligibility Advisor
              </CardTitle>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Target Milestone</Label>
                  <Select onValueChange={setSelectedAward}>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14">
                      <SelectValue placeholder="Select Award" />
                    </SelectTrigger>
                    <SelectContent>
                      {AWARDS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest shadow-xl" onClick={handleCheckRequirements} disabled={loading}>
                  {loading ? "Analyzing..." : "Verify Status"}
                </Button>
              </div>
            </Card>

            <Card className="lg:col-span-2 glass-panel border-none rounded-[3.5rem] p-10">
              <div className="space-y-8">
                {advice ? (
                  advice.requiredBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group">
                      <div className="flex gap-6 items-center">
                        {badge.isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
                        <div>
                          <p className="font-black text-sm uppercase tracking-tighter">{badge.name}</p>
                          <p className="text-[9px] uppercase font-black text-muted-foreground mt-1">{badge.notes || 'Requirement Pending'}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={badge.isCompleted ? "border-green-500/40 text-green-500" : "border-red-500/40 text-red-500"}>
                        <span className="text-[8px] font-black uppercase px-2">{badge.isCompleted ? 'PASSED' : 'REQUIRED'}</span>
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 opacity-30">
                    <Layers className="w-16 h-16 mx-auto mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Select an award to view prerequisites</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="log">
          <div className="max-w-3xl mx-auto">
            <Card className="glass-panel border-none rounded-[4rem] p-12 space-y-10">
              <CardTitle className="text-2xl gold-text uppercase tracking-tight flex items-center gap-4">
                <ShieldCheck className="w-10 h-10" /> Log Badge Completion
              </CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Badge / Award Name</Label>
                  <Input placeholder="e.g. First Aid" className="rounded-2xl bg-black/20 border-white/5 h-16 px-6 font-black uppercase" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Passing Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input type="date" className="pl-16 rounded-2xl bg-black/20 border-white/5 h-16 font-black" required />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Badge Group</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-16">
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public Service Group</SelectItem>
                      <SelectItem value="camp">Camp Craft Group</SelectItem>
                      <SelectItem value="edu">Education Group</SelectItem>
                      <SelectItem value="award">Major Award Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full h-16 rounded-3xl bg-primary text-black font-black uppercase tracking-widest shadow-2xl">
                Submit for Authentication
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
