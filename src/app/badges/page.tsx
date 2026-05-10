"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle, Trash2, Layers, Calendar, Search, Filter } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Badge Master Data from Handbook Images
const BADGE_DATABASE = [
  // Senior Public Service
  { name: 'Interpreter', code: 'SA-1', group: 'Public Service', type: 'Senior' },
  { name: 'Public Health', code: 'SA-2', group: 'Public Service', type: 'Senior' },
  { name: 'Fireman', code: 'SA-3', group: 'Public Service', type: 'Senior' },
  { name: 'Leading Signaller', code: 'SA-4', group: 'Public Service', type: 'Senior' },
  { name: 'Dispatch Rider', code: 'SA-5', group: 'Public Service', type: 'Senior' },
  { name: 'Path Finder', code: 'SA-6', group: 'Public Service', type: 'Senior' },
  { name: 'Ambulance', code: 'SA-7', group: 'Public Service', type: 'Senior' },
  { name: 'Rescuer', code: 'SA-8', group: 'Public Service', type: 'Senior' },
  { name: 'Pilot', code: 'SA-9', group: 'Public Service', type: 'Senior' },
  { name: 'Handyman', code: 'SA-10', group: 'Public Service', type: 'Senior' },
  { name: 'Civics', code: 'SA-11', group: 'Public Service', type: 'Senior' },
  // Senior Camp Craft
  { name: 'Camp Warden', code: 'SB-1', group: 'Camp Craft', type: 'Senior' },
  { name: 'Master Cook', code: 'SB-2', group: 'Camp Craft', type: 'Senior' },
  { name: 'Naturalist', code: 'SB-3', group: 'Camp Craft', type: 'Senior' },
  { name: 'Senior Pioneer', code: 'SB-4', group: 'Camp Craft', type: 'Senior' },
  { name: 'Venturer', code: 'SB-5', group: 'Camp Craft', type: 'Senior' },
  { name: 'Quarter Master', code: 'SB-6', group: 'Camp Craft', type: 'Senior' },
  // Senior Education
  { name: 'Bookman', code: 'SC-1', group: 'Education', type: 'Senior' },
  { name: 'Orator', code: 'SC-2', group: 'Education', type: 'Senior' },
  { name: 'Senior Scholar', code: 'SC-3', group: 'Education', type: 'Senior' },
  { name: 'Clerk', code: 'SC-4', group: 'Education', type: 'Senior' },
  // Senior Sports
  { name: 'Senior Athlete', code: 'SD-1', group: 'Sports', type: 'Senior' },
  { name: 'Master Swimmer', code: 'SD-2', group: 'Sports', type: 'Senior' },
  { name: 'Master Sportsman', code: 'SD-3', group: 'Sports', type: 'Senior' },
  { name: 'Horseman', code: 'SD-4', group: 'Sports', type: 'Senior' },
  { name: 'Archery', code: 'SD-5', group: 'Sports', type: 'Senior' },
  // Senior Social
  { name: 'World Friendship', code: 'SE-1', group: 'Social', type: 'Senior' },
  { name: 'Organiser', code: 'SE-2', group: 'Social', type: 'Senior' },
  { name: 'Hiker', code: 'SE-3', group: 'Social', type: 'Senior' },
  // Senior Culture
  { name: 'Artist', code: 'SF-1', group: 'Culture', type: 'Senior' },
  { name: 'Musician', code: 'SF-2', group: 'Culture', type: 'Senior' },
  { name: 'Play Actor', code: 'SF-3', group: 'Culture', type: 'Senior' },
  // Senior Explorer
  { name: 'Tracker', code: 'SH-1', group: 'Explorer', type: 'Senior' },
  { name: 'Senior Hiker', code: 'SH-2', group: 'Explorer', type: 'Senior' },
  { name: 'Surveyor', code: 'SH-3', group: 'Explorer', type: 'Senior' },
  { name: 'Astronomer', code: 'SH-4', group: 'Explorer', type: 'Senior' },
  { name: 'Meteorologist', code: 'SH-5', group: 'Explorer', type: 'Senior' },
  // Junior
  { name: 'Junior Swimmer', code: 'JD-2', group: 'Sports', type: 'Junior' },
  { name: 'Junior Sportsman', code: 'JD-3', group: 'Sports', type: 'Junior' },
  { name: 'Junior Pen-friend', code: 'JE-1', group: 'Social', type: 'Junior' },
  { name: 'Junior Organiser', code: 'JE-2', group: 'Social', type: 'Junior' },
  { name: 'Junior Designer', code: 'JF-1', group: 'Culture', type: 'Junior' },
  { name: 'Junior Happy Home', code: 'JM-1', group: 'Family Life', type: 'Junior' },
  // BWF
  { name: 'Messengers of Peace', code: 'BWF-1', group: 'BWF', type: 'Senior' },
  { name: 'Scouts of the World', code: 'BWF-2', group: 'BWF', type: 'Senior' },
  { name: 'Champions for Nature', code: 'BWF-4', group: 'BWF', type: 'Senior' },
  { name: 'Scouts Go Solar', code: 'BWF-6', group: 'BWF', type: 'Senior' },
];

export default function BadgesAwardsPage() {
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [passingDate, setPassingDate] = useState('');
  
  // Simulation of current user for permissions
  const USER_ROLE = 'Scout Leader'; 
  const canDelete = ['Senior Troop Leader', 'Assistant Senior Troop Leader', 'Scout Leader', 'Assistant Scout Leader'].includes(USER_ROLE);

  const filteredBadgeSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    return BADGE_DATABASE.filter(b => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.code.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleCheckRequirements = async () => {
    if (!selectedAward) return;
    const scout = MOCK_SCOUTS[0];
    if (!scout) {
      toast({ title: "Profile Missing", description: "No scout profile found. Please complete onboarding first.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const result = await awardPrerequisiteAdvisor({
        awardName: selectedAward as any,
        scoutProficiencyBadges: scout.badges.map(b => b.name)
      });
      setAdvice(result);
    } catch (e) {
      toast({ title: "Error", description: "Prerequisite check failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogBadge = (badgeName: string) => {
    if (!passingDate) {
      toast({ title: "Date Required", description: "Please enter the passing date.", variant: "destructive" });
      return;
    }
    toast({ title: "Badge Logged", description: `${badgeName} has been submitted for authentication.` });
    setSearchQuery('');
    setPassingDate('');
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
                      {["Membership Award", "Scout Award", "Chief Commissioner's Award", "Prime Minister's Award", "President's Scout Award"].map(a => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-14 rounded-2xl bg-primary text-black font-black uppercase tracking-widest shadow-xl" onClick={handleCheckRequirements} disabled={loading}>
                  {loading ? "Analyzing..." : "Verify Status"}
                </Button>
              </div>
            </Card>

            <Card className="lg:col-span-2 glass-panel border-none rounded-[3.5rem] p-10 min-h-[400px]">
              <div className="space-y-4">
                {advice ? (
                  <>
                    <h3 className="text-lg font-black uppercase gold-text mb-6">Requirements for {advice.awardName}</h3>
                    {advice.requiredBadges.map((badge, idx) => (
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
                    ))}
                    {advice.overallGuidance && (
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mt-8">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">AI Guidance</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{advice.overallGuidance}</p>
                      </div>
                    )}
                  </>
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
          <div className="max-w-4xl mx-auto">
            <Card className="glass-panel border-none rounded-[4rem] p-12 space-y-10">
              <CardTitle className="text-2xl gold-text uppercase tracking-tight flex items-center gap-4">
                <ShieldCheck className="w-10 h-10" /> Log Badge Completion
              </CardTitle>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 relative">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Search Proficiency Badge</Label>
                    <div className="relative">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        placeholder="Type Badge Name or Code (e.g. SA-7)" 
                        className="pl-14 rounded-2xl bg-black/20 border-white/5 h-16 font-black uppercase"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {filteredBadgeSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-[#05140d] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                        {filteredBadgeSuggestions.map(badge => (
                          <button 
                            key={badge.code}
                            onClick={() => {
                              setSearchQuery(badge.name);
                              handleLogBadge(badge.name);
                            }}
                            className="w-full text-left p-4 hover:bg-white/5 border-b border-white/5 flex justify-between items-center transition-colors"
                          >
                            <div>
                              <p className="text-xs font-black uppercase">{badge.name}</p>
                              <p className="text-[8px] text-muted-foreground uppercase">{badge.group} • {badge.code}</p>
                            </div>
                            <Badge variant="outline" className="text-[8px] uppercase">{badge.type}</Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground ml-2">Passing Date (Required)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        type="date" 
                        className="pl-16 rounded-2xl bg-black/20 border-white/5 h-16 font-black" 
                        value={passingDate}
                        onChange={(e) => setPassingDate(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h4 className="text-[10px] font-black uppercase gold-text mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Entry Controls
                </h4>
                <p className="text-[9px] text-muted-foreground uppercase font-black leading-relaxed">
                  • Proficiency badges must match current handbook nomenclature.<br/>
                  • All entries are subject to authentication by the Badge Secretary.<br/>
                  • Removal of authenticated entries is restricted to STL and higher roles.
                </p>
              </div>

              {canDelete && MOCK_SCOUTS[0] && (
                <div className="pt-8 border-t border-white/5">
                  <h4 className="text-sm font-black text-red-400 uppercase mb-6 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Delete Entry (Leader Restricted)
                  </h4>
                  <div className="space-y-2">
                    {MOCK_SCOUTS[0].badges.map(b => (
                      <div key={b.code} className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between group">
                        <span className="text-[10px] font-black uppercase">{b.name} ({b.code})</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:bg-red-500/10 rounded-lg"
                          onClick={() => toast({ title: "Removed", description: `${b.name} entry deleted.` })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
