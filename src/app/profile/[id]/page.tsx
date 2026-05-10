"use client";

import { use, useState } from 'react';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, Phone, MapPin, Award as AwardIcon, BookOpen, 
  Edit3, Save, MessageSquare, Crown, Trophy, Users, Shield, Star
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
    toast({ title: "Profile Transmitted", description: "Changes saved to the troop registry." });
  };

  return (
    <div className="space-y-10 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-[420px] space-y-8">
          <Card className="hero-section border-none text-center overflow-hidden !rounded-[4rem] shadow-2xl relative">
             <div className="h-40 bg-gradient-to-br from-primary/30 to-transparent relative">
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                 <div className="w-40 h-40 rounded-[3.5rem] border-8 border-background bg-card overflow-hidden shadow-2xl relative group">
                   <img src={`https://picsum.photos/seed/${profile.name}/400`} alt={profile.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   {isEditing && (
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 className="w-8 h-8 text-primary" />
                     </div>
                   )}
                 </div>
               </div>
             </div>
             <CardContent className="pt-20 pb-12 px-8">
               <h2 className="text-3xl font-black gold-text uppercase tracking-tighter leading-none">{profile.name}</h2>
               <p className="text-muted-foreground uppercase font-black text-[10px] tracking-[0.3em] mt-4">{profile.role}</p>
               
               <div className="mt-8 flex flex-wrap justify-center gap-3">
                 <Badge className="bg-primary/10 text-primary border border-primary/20 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">{profile.position}</Badge>
                 {profile.patrol && <Badge variant="outline" className="border-white/10 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">{profile.patrol} Patrol</Badge>}
               </div>

               <div className="mt-10 flex flex-col gap-3">
                  <Link href="/org-chart" className="w-full">
                    <Button variant="outline" className="w-full h-14 rounded-3xl border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/10">
                      <Shield className="w-5 h-5 mr-3" /> Authorities Chart
                    </Button>
                  </Link>
                  <Button onClick={() => router.push(`/messages?chat=${profile.id}`)} className="h-14 rounded-3xl bg-primary text-black font-black uppercase text-[10px] tracking-widest shadow-xl">
                    <MessageSquare className="w-5 h-5 mr-3" /> Send Message
                  </Button>
               </div>
             </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="glass-panel border-none rounded-[3rem] p-8 text-center shadow-xl">
                <p className="text-[9px] text-muted-foreground uppercase font-black mb-3 tracking-widest">Total Points</p>
                <p className="text-4xl font-black gold-text tracking-tighter leading-none">{profile.totalPoints}</p>
            </Card>
            <Card className="glass-panel border-none rounded-[3rem] p-8 text-center shadow-xl">
                <p className="text-[9px] text-muted-foreground uppercase font-black mb-3 tracking-widest">Rank Position</p>
                <p className="text-4xl font-black gold-text tracking-tighter leading-none">#1</p>
            </Card>
          </div>

          <Card className="glass-panel border-none rounded-[3.5rem] p-8 space-y-6 shadow-xl">
            <CardTitle className="text-[10px] font-black gold-text uppercase tracking-widest flex items-center gap-3">
              <Star className="w-5 h-5" /> Extra Positions
            </CardTitle>
            <div className="space-y-3">
              {(profile.extraPositions || []).map((pos, idx) => (
                <div key={idx} className="p-5 rounded-[1.75rem] bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                   {pos}
                </div>
              ))}
              {isEditing && (
                <Button variant="ghost" className="w-full rounded-2xl border-dashed border-white/10 h-12 text-[9px] font-black uppercase text-muted-foreground">
                  + Add Position
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="flex-1 space-y-10">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-black/20 border border-white/5 p-1.5 rounded-3xl h-16 w-full lg:w-auto">
              <TabsTrigger value="details" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest transition-all">Identity</TabsTrigger>
              <TabsTrigger value="badges" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest transition-all">Badge Works</TabsTrigger>
              <TabsTrigger value="events" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest transition-all">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-10">
              <Card className="glass-panel border-none rounded-[4rem] p-8 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between p-0 mb-10">
                  <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4">
                    <User className="w-8 h-8" /> Personal Archive
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    className={isEditing ? "bg-primary text-black" : "text-primary border border-primary/20"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    <span className="text-[9px] font-black uppercase tracking-widest">{isEditing ? 'Commit' : 'Modify'}</span>
                  </Button>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Name</Label>
                    <Input value={profile.name} disabled={!isEditing} className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Contact</Label>
                    <Input value={profile.phoneNumber} disabled={!isEditing} className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm" />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Residential Address</Label>
                    <Input value={profile.homeAddress} disabled={!isEditing} className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-sm" />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="mt-10">
              <div className="space-y-10">
                <Card className="glass-panel border-none rounded-[4rem] p-8 shadow-2xl">
                  <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4 mb-10">
                    <AwardIcon className="w-8 h-8" /> Award Progress
                  </CardTitle>
                  <div className="space-y-6">
                    {profile.awards.map((a, i) => (
                      <div key={i} className="p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex items-center justify-between hover:bg-white/[0.06] transition-all">
                        <div>
                          <p className="font-black text-sm uppercase tracking-tighter text-primary">{a.name}</p>
                          <p className="text-[9px] uppercase font-black text-muted-foreground mt-1">Status: {a.status} • Passed: {a.passingDate || 'N/A'}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-none text-[8px] font-black uppercase">Verified</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-10">
               <Card className="glass-panel border-none rounded-[4rem] p-8 shadow-2xl">
                  <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4 mb-10">
                    <Trophy className="w-8 h-8" /> Event Participation
                  </CardTitle>
                  <div className="space-y-4">
                    <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 flex items-center justify-between group">
                       <div className="flex gap-8 items-center">
                          <div className="w-16 h-16 rounded-[2rem] bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:rotate-6 transition-transform">
                             <Trophy className="w-8 h-8 text-amber-500" />
                          </div>
                          <div>
                             <p className="font-black text-lg uppercase tracking-tight">Cantlay Challenge Shield</p>
                             <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2">2nd Place Overall • 2024-04-15</p>
                          </div>
                       </div>
                       <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase px-4 py-2">Confirmed</Badge>
                    </div>
                  </div>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
