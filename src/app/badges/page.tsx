
"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, ShieldCheck, Info, CheckCircle2, AlertCircle, Search, Filter, Trash2, Users, Layers } from 'lucide-react';
import { awardPrerequisiteAdvisor, AwardPrerequisiteAdvisorOutput } from '@/ai/flows/award-prerequisite-advisor';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MOCK_SCOUTS } from '@/lib/mock-data';

// Mock role for testing
const USER_ROLE = 'Scout Leader'; 

export default function BadgesAwardsPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAward, setSelectedAward] = useState<string>('');
  const [advice, setAdvice] = useState<AwardPrerequisiteAdvisorOutput | null>(null);
  const [badgeCode, setBadgeCode] = useState('');
  const [badgeType, setBadgeType] = useState<'Junior' | 'Senior' | ''>('');
  
  // Filters
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const canRemoveBadge = ['Senior Troop Leader', 'Asst Senior Troop Leader', 'Scout Leader', 'Asst Scout Leader'].includes(USER_ROLE);

  const filteredScouts = useMemo(() => {
    return MOCK_SCOUTS.filter(scout => {
      const matchesGrade = gradeFilter === 'all' || scout.grade === parseInt(gradeFilter);
      const matchesRole = roleFilter === 'all' || scout.role === roleFilter;
      const matchesSearch = scout.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGrade && matchesRole && matchesSearch;
    });
  }, [gradeFilter, roleFilter, searchQuery]);

  const scoutsByPatrol = useMemo(() => {
    const groups: Record<string, typeof MOCK_SCOUTS> = {};
    filteredScouts.forEach(s => {
      const patrol = s.patrol || 'Unassigned';
      if (!groups[patrol]) groups[patrol] = [];
      groups[patrol].push(s);
    });
    return groups;
  }, [filteredScouts]);

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
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Badge & Award Ecosystem</h2>
          <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-2">Authenticated Troop Progression Track</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Filter by name..." 
              className="pl-12 rounded-2xl bg-black/20 border-white/5 h-12 text-[10px] uppercase font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12 mb-8">
          <TabsTrigger value="tracker" className="rounded-xl px-10 text-[10px] font-black uppercase">Troop Tracker</TabsTrigger>
          <TabsTrigger value="eligibility" className="rounded-xl px-10 text-[10px] font-black uppercase">My Eligibility</TabsTrigger>
          <TabsTrigger value="log" className="rounded-xl px-10 text-[10px] font-black uppercase">Log Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-8">
           <div className="flex gap-4">
              <Select onValueChange={setGradeFilter}>
                <SelectTrigger className="w-[180px] rounded-xl bg-black/20 border-white/5 h-11 text-[9px] uppercase font-black">
                  <SelectValue placeholder="Grade: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Grade: All</SelectItem>
                  {[6, 7, 8, 9, 10, 11, 12, 13].map(g => (
                    <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] rounded-xl bg-black/20 border-white/5 h-11 text-[9px] uppercase font-black">
                  <SelectValue placeholder="Role: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Role: All</SelectItem>
                  <SelectItem value="Patrol Leader">Patrol Leader</SelectItem>
                  <SelectItem value="Scout">Scout</SelectItem>
                  <SelectItem value="Senior Scout">Senior Scout</SelectItem>
                  <SelectItem value="Scout Leader">Scout Leader</SelectItem>
                </SelectContent>
              </Select>
           </div>

           {Object.entries(scoutsByPatrol).map(([patrol, scouts]) => (
             <div key={patrol} className="space-y-4">
                <h3 className="text-sm font-black gold-text uppercase tracking-widest flex items-center gap-3">
                  <Users className="w-5 h-5" /> {patrol} Patrol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scouts.map(scout => (
                    <Card key={scout.id} className="glass-panel border-none rounded-[2rem] p-6 hover:bg-white/5 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl border-2 border-primary/20 overflow-hidden shrink-0">
                            <img src={`https://picsum.photos/seed/${scout.name}/100`} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="font-black text-xs uppercase tracking-tighter truncate">{scout.name}</p>
                             <p className="text-[9px] uppercase font-bold text-muted-foreground">Grade {scout.grade} • {scout.role}</p>
                          </div>
                       </div>
                       <div className="mt-4 flex gap-2 flex-wrap">
                          {scout.awards.map((a, i) => (
                            <Badge key={i} className="bg-primary/10 text-primary border-none text-[8px] uppercase font-black">{a.name}</Badge>
                          ))}
                          <Badge variant="outline" className="border-white/10 text-[8px] uppercase font-black">+{scout.badges.length} Badges</Badge>
                       </div>
                    </Card>
                  ))}
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="eligibility">
           <div className="max-w-2xl mx-auto">
             <Card className="glass-panel border-none rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 gold-text uppercase tracking-tight">
                  <Award className="w-6 h-6" />
                  Eligibility Advisor
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Target status: Instructors → Scout Leader → ADC → Passed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Target Award</Label>
                  <Select onValueChange={setSelectedAward}>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/5 h-12">
                      <SelectValue placeholder="Choose Award" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scout Award">Scout Award</SelectItem>
                      <SelectItem value="Chief Commissioner's Award">Chief Commissioner's Award</SelectItem>
                      <SelectItem value="Prime Minister's Award">Prime Minister's Award</SelectItem>
                      <SelectItem value="President's Scout Award">President's Scout Award</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full h-12 rounded-2xl font-black uppercase tracking-widest bg-primary text-black" onClick={handleCheckRequirements} disabled={loading || !selectedAward}>
                  {loading ? "Analyzing record..." : "Verify My Progress"}
                </Button>

                {advice && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    {advice.requiredBadges.map((badge, idx) => (
                      <div key={idx} className="flex items-start justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex gap-4">
                          {badge.isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                          <div>
                            <p className="font-black text-xs uppercase tracking-tighter">{badge.name}</p>
                            <p className="text-[9px] text-muted-foreground uppercase font-bold">{badge.isCompleted ? 'Verified' : 'Action Required'}</p>
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
                )}
              </CardContent>
            </Card>
           </div>
        </TabsContent>

        <TabsContent value="log">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-panel border-none rounded-[2.5rem]">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3 text-blue-400 uppercase tracking-tight">
                    <Info className="w-6 h-6" />
                    Badge Logging
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-2">
                     <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Badge Code</Label>
                     <Input 
                      placeholder="e.g. SB-10 (Senior) or JG-2 (Junior)" 
                      className="rounded-xl bg-black/20 border-white/10 h-12"
                      value={badgeCode}
                      onChange={(e) => handleCodeChange(e.target.value)}
                     />
                     {badgeType && (
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                         Auto-detected: {badgeType} Division
                       </p>
                     )}
                   </div>
                   <div className="space-y-2">
                     <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">International/Local Name</Label>
                     <Input placeholder="e.g. Amateur Radio" className="rounded-xl bg-black/20 border-white/10 h-12" />
                   </div>
                   <div className="space-y-2">
                     <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Category</Label>
                     <Select>
                       <SelectTrigger className="rounded-xl bg-black/20 border-white/10 h-12">
                         <SelectValue placeholder="Category" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Public Service">Public Service</SelectItem>
                         <SelectItem value="Camp Craft">Camp Craft</SelectItem>
                         <SelectItem value="Sports">Sports</SelectItem>
                         <SelectItem value="International">International</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 text-primary hover:bg-primary/10 uppercase font-black tracking-widest">
                     Request Validation
                   </Button>
                </CardContent>
              </Card>

              <Card className="glass-panel border-none rounded-[2.5rem] bg-amber-500/5">
                 <CardHeader>
                    <CardTitle className="text-xl text-amber-500 uppercase tracking-tight flex items-center gap-3">
                      <Layers className="w-6 h-6" /> Permission Rules
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4 text-[10px] uppercase font-black text-muted-foreground leading-relaxed">
                    <p>• Scouts may enter their own badge completions.</p>
                    <p>• Patrol Leaders can enter badges for their members.</p>
                    <p className="text-amber-500">• Only Senior Troop Leader or higher can remove verified entries.</p>
                    <p>• International badges must be authenticated by the Badge Secretary.</p>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
