
"use client";

import { use, useState, useEffect } from 'react';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, 
  Phone, 
  MapPin, 
  Award as AwardIcon, 
  BookOpen, 
  Edit3, 
  Save,
  ShieldAlert,
  CalendarCheck,
  MessageSquare,
  Layers
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const scout = MOCK_SCOUTS.find(s => s.id === id) || MOCK_SCOUTS[0];
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(scout);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Role changes will notify the Junior Troop Leader for confirmation.",
    });
    // Trigger mock notification for role change if changed
    if (profile.position !== scout.position) {
      console.log('Notification sent to Junior Troop Leader about role change');
    }
  };

  const handleMessage = () => {
    router.push(`/messages?chat=${profile.id}`);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="forest-gradient border-border/40 text-center overflow-hidden rounded-[3rem]">
             <div className="h-24 bg-primary/20 relative">
               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                 <div className="w-24 h-24 rounded-full border-4 border-background bg-card overflow-hidden">
                   <img src={`https://picsum.photos/seed/${profile.name}/200`} alt={profile.name} className="w-full h-full object-cover" />
                 </div>
               </div>
             </div>
             <CardContent className="pt-16 pb-6">
               <h2 className="text-2xl font-black gold-text uppercase tracking-tight">{profile.name}</h2>
               <p className="text-muted-foreground italic mb-4 text-xs font-bold uppercase tracking-widest">{profile.position}</p>
               <div className="flex flex-wrap justify-center gap-2">
                 <Badge className="bg-primary/20 text-primary border-primary/20 text-[9px] uppercase font-black">{profile.role}</Badge>
                 {profile.patrol && <Badge variant="outline" className="border-white/10 text-[9px] uppercase font-black">{profile.patrol} Patrol</Badge>}
               </div>
               <div className="mt-6">
                  <Button onClick={handleMessage} className="w-full rounded-2xl bg-primary text-black font-black uppercase tracking-widest gap-2">
                    <MessageSquare className="w-4 h-4" /> Message Scout
                  </Button>
               </div>
             </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Scout Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-3xl text-center border border-white/5">
                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Total Points</p>
                <p className="text-2xl font-black gold-text tracking-tighter">{profile.totalPoints}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-3xl text-center border border-white/5">
                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Badges</p>
                <p className="text-2xl font-black gold-text tracking-tighter">{profile.badges.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] uppercase font-black tracking-widest gold-text flex items-center gap-2">
                <Layers className="w-4 h-4" /> Committees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(profile.committees || ['IT Committee', 'Logistics']).map((c, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[9px] uppercase font-black text-muted-foreground">
                  {c}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-black/20 border border-white/5 p-1 rounded-2xl h-12">
              <TabsTrigger value="details" className="rounded-xl px-8 text-[10px] font-black uppercase">Identity</TabsTrigger>
              <TabsTrigger value="badges" className="rounded-xl px-8 text-[10px] font-black uppercase">Progression</TabsTrigger>
              <TabsTrigger value="participation" className="rounded-xl px-8 text-[10px] font-black uppercase">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card className="glass-panel border-none rounded-[3rem]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-black gold-text uppercase tracking-tight flex items-center gap-3">
                    <User className="w-6 h-6" />
                    Personal Record
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-xl font-black uppercase text-[10px] tracking-widest",
                      isEditing ? "bg-primary text-black" : "text-primary hover:bg-primary/10"
                    )}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <><Save className="w-4 h-4 mr-2" /> Commit Changes</> : <><Edit3 className="w-4 h-4 mr-2" /> Modify Profile</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Full Legal Name</Label>
                      <Input 
                        value={profile.name} 
                        disabled={!isEditing} 
                        className="rounded-xl bg-black/20 border-white/10 h-12"
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Contact No.</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          className="pl-12 rounded-xl bg-black/20 border-white/10 h-12" 
                          value={profile.phoneNumber} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Troop Role / Rank</Label>
                      <Input 
                        value={profile.position} 
                        disabled={!isEditing} 
                        className="rounded-xl bg-black/20 border-white/10 h-12"
                        onChange={(e) => setProfile({...profile, position: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Residential Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                        <Input 
                          className="pl-12 rounded-xl bg-black/20 border-white/10 h-12" 
                          value={profile.homeAddress} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, homeAddress: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="mt-6">
              <div className="space-y-6">
                <Card className="glass-panel border-none rounded-[3rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-black gold-text uppercase tracking-tight flex items-center gap-3">
                      <AwardIcon className="w-6 h-6" />
                      Award Pathway
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-primary/20 ml-6 space-y-10 py-4">
                      {profile.awards.map((award, idx) => (
                        <div key={award.name} className="relative pl-10">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                          <div>
                            <p className="font-black text-sm text-primary uppercase tracking-tighter">{award.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Authenticated: {award.passingDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-none rounded-[3rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-black gold-text uppercase tracking-tight flex items-center gap-3">
                      <BookOpen className="w-6 h-6" />
                      Logged Proficiencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profile.badges.map((badge) => (
                        <div key={badge.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                          <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center border border-primary/20">
                             <AwardIcon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="font-black text-xs uppercase tracking-tighter">{badge.name}</p>
                            <p className="text-[9px] uppercase font-bold text-muted-foreground">{badge.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participation" className="mt-6">
               <Card className="glass-panel border-none rounded-[3rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-black gold-text uppercase tracking-tight flex items-center gap-3">
                      <CalendarCheck className="w-6 h-6" />
                      Event History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5">
                      <div>
                        <p className="font-black text-sm uppercase tracking-tighter">Cantlay Challenge Shield</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">2nd Place • 15 Apr 2024</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 border-none text-[8px] font-black uppercase">Confirmed</Badge>
                    </div>
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
