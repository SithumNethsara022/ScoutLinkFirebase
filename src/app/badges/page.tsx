"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';

export default function BadgesAwardsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);

  const handleCheckRequirements = async () => {
    if (!selectedAward) return;
    setLoading(true);
    try {
      // Simulation of current scout's badges for Ethan Hunt
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
        <h2 className="text-3xl font-bold gold-text">Badge & Award Tracker</h2>
        <p className="text-muted-foreground">Log new proficiency badges or verify award eligibility with AI Assistance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Award Eligibility Check
            </CardTitle>
            <CardDescription>Select an award to check if the scout meets all prerequisites.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Target Award</Label>
              <Select onValueChange={setSelectedAward}>
                <SelectTrigger>
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
            <Button className="w-full" onClick={handleCheckRequirements} disabled={loading || !selectedAward}>
              {loading ? "Analyzing Requirements..." : "Check Requirements"}
            </Button>

            {advice && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="font-bold flex items-center gap-2 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                  AI Advisor Results
                </h4>
                <div className="space-y-3">
                  {advice.requiredBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/20">
                      {badge.isCompleted ? 
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /> : 
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                      }
                      <div>
                        <p className="font-medium text-sm">{badge.name}</p>
                        {badge.notes && <p className="text-xs text-muted-foreground mt-1">{badge.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                {advice.overallGuidance && (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs italic text-primary-foreground/90">{advice.overallGuidance}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Log Proficiency Badge
            </CardTitle>
            <CardDescription>Enter details of a recently passed proficiency badge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <Label>Badge Name</Label>
               <Input placeholder="e.g. First Aid" />
             </div>
             <div className="space-y-2">
               <Label>Category</Label>
               <Select>
                 <SelectTrigger>
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
               <Input type="date" />
             </div>
             <Button variant="outline" className="w-full">Register Badge Entry</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}