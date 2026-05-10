
"use client";

import { use, useState, useEffect } from 'react';
import { MOCK_SCOUTS, AUTHORITY_CHART } from '@/lib/mock-data';
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
  Layers,
  Crown,
  Trophy,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  };

  const handleMessage = () => {
    router.push(`/messages?chat=${profile.id}`);
  };

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-[400px] space-y-8">
          <Card className="hero-section border-none text-center overflow-hidden !rounded-[4rem] shadow-2xl relative">
             <div className="h-40 bg-gradient-to-br from-primary/30 to-transparent relative">
               <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
                 <div className="w-40 h-40 rounded-[3.5rem] border-8 border-background bg-card overflow-hidden shadow-2xl relative group">
                   <img src={`https://picsum.photos/seed/${profile.name}/400`} alt={profile.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   {isEditing && (
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 className="w-8 h-8 text-primary" />
                     </div>
                   )}
                 </div>
               </div>
             </div>
             <CardContent className="pt-24 pb-12 px-8">
               <h2 className="text-3xl font-black gold-text uppercase tracking-tighter leading-none">{profile.name}</h2>
               <p className="text-muted-foreground uppercase font-black text-[10px] tracking-[0.3em] mt-4 mb-8">Identity: {profile.id} • {profile.role}</p>
               
               <div className="flex flex-wrap justify-center gap-3">
                 <Badge className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-widest px-4 py-1.5">{profile.position}</Badge>
                 {profile.patrol && <Badge variant="outline" className="border-white/10 text-[9px] font-black uppercase tracking-widest px-4 py-1.5">{profile.patrol} Patrol</Badge>}
               </div>

               <div className="mt-10 flex gap-4">
                  <Button onClick={handleMessage} className="flex-1 h-14 rounded-3xl bg-primary text-black font-black uppercase text-[10px] tracking-widest shadow-xl">
                    <MessageSquare className="w-5 h-5 mr-3" /> Message
                  </Button>
               </div>
             </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="glass-panel border-none rounded-[3rem] p-8 text-center shadow-xl">
                <p className="text-[9px] text-muted-foreground uppercase font-black mb-3 tracking-widest">Merit Points</p>
                <p className="text-4xl font-black gold-text tracking-tighter leading-none">{profile.totalPoints}</p>
            </Card>
            <Card className="glass-panel border-none rounded-[3rem] p-8 text-center shadow-xl">
                <p className="text-[9px] text-muted-foreground uppercase font-black mb-3 tracking-widest">Badge Count</p>
                <p className="text-4xl font-black gold-text tracking-tighter leading-none">{profile.badges.length}</p>
            </Card>
          </div>

          <Card className="glass-panel border-none rounded-[3.5rem] p-8 space-y-6 shadow-xl border-l-4 border-l-primary/30">
            <CardTitle className="text-xs font-black gold-text uppercase tracking-widest flex items-center gap-3">
              <Crown className="w-5 h-5" /> Extra Positions
            </CardTitle>
            <CardContent className="p-0 space-y-3">
              {(profile.extraPositions || ['IT Committee Chairman']).map((c, idx) => (
                <div key={idx} className="p-5 rounded-[1.75rem] bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-tighter text-foreground/80 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                   {c}
                </div>
              ))}
              <Button variant="ghost" className="w-full rounded-2xl border-dashed border-white/10 h-12 text-[9px] font-black uppercase text-muted-foreground hover:text-primary">
                 Add Position
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-black/20 border border-white/5 p-1.5 rounded-3xl h-16 w-full lg:w-auto">
              <TabsTrigger value="details" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Identity</TabsTrigger>
              <TabsTrigger value="badges" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Progression</TabsTrigger>
              <TabsTrigger value="participation" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black transition-all">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-10">
              <Card className="glass-panel border-none rounded-[4rem] p-4 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between p-8">
                  <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4">
                    <User className="w-8 h-8" />
                    Personal Record
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    className={cn(
                      "rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest",
                      isEditing ? "bg-primary text-black shadow-lg" : "text-primary hover:bg-primary/10 border border-primary/20"
                    )}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <><Save className="w-4 h-4 mr-2" /> Commit Changes</> : <><Edit3 className="w-4 h-4 mr-2" /> Modify Profile</>}
                  </Button>
                </CardHeader>
                <CardContent className="p-12 pt-0 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Full Legal Name</Label>
                      <Input 
                        value={profile.name} 
                        disabled={!isEditing} 
                        className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm"
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Contact No.</Label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          className="pl-16 rounded-2xl bg-black/40 border-white/5 h-16 text-sm font-black" 
                          value={profile.phoneNumber} 
                          disabled={!isEditing}
                          onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Troop Role / Rank</Label>
                      <Input 
                        value={profile.position} 
                        disabled={!isEditing} 
                        className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm"
                        onChange={(e) => setProfile({...profile, position: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Parents' Primary Names</Label>
                      <Input 
                        value={profile.parentsNames} 
                        disabled={!isEditing} 
                        className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm"
                        onChange={(e) => setProfile({...profile, parentsNames: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Residential Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-6 w-5 h-5 text-muted-foreground" />
                        <Input 
                          className="pl-16 rounded-2xl bg-black/40 border-white/5 h-16 text-sm font-black" 
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

            <TabsContent value="badges" className="mt-10">
              <div className="space-y-10">
                <Card className="glass-panel border-none rounded-[4rem] p-4 shadow-2xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4">
                      <AwardIcon className="w-8 h-8" />
                      Award Pathway
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-12 pb-12">
                    <div className="relative border-l-4 border-primary/20 ml-8 space-y-12 py-6">
                      {profile.awards.map((award, idx) => (
                        <div key={award.name} className="relative pl-12 group">
                          <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_rgba(212,175,55,0.8)] group-hover:scale-125 transition-transform" />
                          <div className="glass-panel p-6 rounded-[2rem] border-white/5 hover:bg-white/[0.04] transition-all">
                            <p className="font-black text-lg text-primary uppercase tracking-tighter leading-none">{award.name}</p>
                            <div className="flex items-center gap-6 mt-4">
                               <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Authenticated: {award.passingDate}</p>
                               <Badge className="bg-green-500/20 text-green-500 border-none text-[8px] font-black uppercase">Verified</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-none rounded-[4rem] p-4 shadow-2xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4">
                      <BookOpen className="w-8 h-8" />
                      Logged Proficiencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-12 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.badges.map((badge) => (
                        <div key={badge.name} className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.06] transition-all shadow-xl">
                          <div className="w-16 h-16 rounded-[1.75rem] bg-black/60 flex items-center justify-center border border-primary/20 shadow-inner group-hover:rotate-6 transition-transform">
                             <AwardIcon className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <p className="font-black text-sm uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">{badge.name}</p>
                            <p className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-widest">{badge.category}</p>
                            <p className="text-[8px] uppercase font-bold text-primary/60 mt-2">{badge.code} • {badge.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participation" className="mt-10">
               <Card className="glass-panel border-none rounded-[4rem] p-4 shadow-2xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4">
                      <Trophy className="w-8 h-8" />
                      Event Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-12 pb-12 space-y-6">
                    <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all shadow-xl group">
                      <div className="flex gap-8 items-center">
                        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/30 group-hover:scale-110 transition-transform">
                          <Trophy className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="font-black text-lg uppercase tracking-tight">Cantlay Challenge Shield</p>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2 italic">2nd Place Overall • 15 Apr 2024</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase tracking-widest px-6 py-2">Confirmed</Badge>
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
