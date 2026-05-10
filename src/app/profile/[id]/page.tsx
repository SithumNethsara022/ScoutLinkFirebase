
'use client';

import { use, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, Phone, MapPin, Award as AwardIcon, Edit3, Save, 
  MessageSquare, Shield, Star, Camera
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { data: profile, loading } = useDoc(db ? doc(db, 'users', id) : null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);

  useEffect(() => {
    if (profile) setEditedProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    if (!db || !id) return;
    try {
      await updateDoc(doc(db, 'users', id), editedProfile);
      setIsEditing(false);
      toast({ title: "Registry Updated", description: "Your changes have been authenticated." });
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profilePicUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in duration-500">
        <h2 className="text-2xl font-black gold-text uppercase">Personnel Missing</h2>
        <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-black">Record not found in troop registry.</p>
        <Link href="/">
           <Button className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest px-8 h-12">Return to HQ</Button>
        </Link>
      </div>
    );
  }

  const isOwnProfile = user?.uid === id;

  return (
    <div className="space-y-10 pb-24 max-w-7xl mx-auto animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-[420px] space-y-8">
          <Card className="hero-section border-none text-center overflow-hidden !rounded-[4rem] shadow-2xl relative">
             <div className="h-40 bg-gradient-to-br from-primary/30 to-transparent relative">
               <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                 <div className="w-40 h-40 rounded-[3.5rem] border-8 border-background bg-card overflow-hidden shadow-2xl relative group">
                   <img 
                     src={editedProfile?.profilePicUrl || profile.profilePicUrl} 
                     alt={profile.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                   />
                   {isEditing && (
                     <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-8 h-8 text-primary" />
                        <input type="file" className="sr-only" onChange={handleFileChange} />
                     </label>
                   )}
                 </div>
               </div>
             </div>
             <CardContent className="pt-20 pb-12 px-8">
               <h2 className="text-3xl font-black gold-text uppercase tracking-tighter leading-none">{profile.name}</h2>
               <p className="text-muted-foreground uppercase font-black text-[10px] tracking-[0.3em] mt-4">{profile.role}</p>
               
               <div className="mt-8 flex flex-wrap justify-center gap-3">
                 <Badge className="bg-primary/10 text-primary border border-primary/20 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">{profile.position || 'Registered'}</Badge>
                 {profile.patrol && <Badge variant="outline" className="border-white/10 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">{profile.patrol} Patrol</Badge>}
               </div>

               <div className="mt-10 flex flex-col gap-3">
                  {isOwnProfile && (
                    <Button 
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                      className="h-14 rounded-3xl bg-primary text-black font-black uppercase text-[10px] tracking-widest shadow-xl transition-all active:scale-95"
                    >
                      {isEditing ? <Save className="w-5 h-5 mr-3" /> : <Edit3 className="w-5 h-5 mr-3" />}
                      {isEditing ? 'Commit Changes' : 'Modify Registry'}
                    </Button>
                  )}
                  <Button variant="outline" className="h-14 rounded-3xl border-white/5 text-muted-foreground font-black uppercase text-[10px] tracking-widest">
                    <MessageSquare className="w-5 h-5 mr-3" /> Encrypted Transmission
                  </Button>
               </div>
             </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[3.5rem] p-8 space-y-6 shadow-xl">
            <CardTitle className="text-[10px] font-black gold-text uppercase tracking-widest flex items-center gap-3">
              <Star className="w-5 h-5" /> Efficiency Stats
            </CardTitle>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-3xl bg-white/[0.03] text-center border border-white/5">
                  <p className="text-[8px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Points</p>
                  <p className="text-2xl font-black text-primary">{profile.totalPoints || 0}</p>
               </div>
               <div className="p-6 rounded-3xl bg-white/[0.03] text-center border border-white/5">
                  <p className="text-[8px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Grade</p>
                  <p className="text-2xl font-black text-primary">{profile.grade || '--'}</p>
               </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 space-y-10">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-black/20 border border-white/5 p-1.5 rounded-3xl h-16">
              <TabsTrigger value="details" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest">Identity</TabsTrigger>
              <TabsTrigger value="registry" className="rounded-2xl px-12 text-[10px] font-black uppercase tracking-widest">Registry</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-10 space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
              <Card className="glass-panel border-none rounded-[4rem] p-10 shadow-2xl">
                <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4 mb-10">
                  <User className="w-8 h-8" /> Archive Profile
                </CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Display Name</Label>
                    <Input 
                      value={editedProfile?.name || ''} 
                      disabled={!isEditing} 
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black uppercase text-xs" 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Contact Number</Label>
                    <Input 
                      value={editedProfile?.phoneNumber || ''} 
                      disabled={!isEditing} 
                      onChange={(e) => setEditedProfile({...editedProfile, phoneNumber: e.target.value})}
                      className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black text-xs" 
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground ml-2">Residential Address</Label>
                    <Input 
                      value={editedProfile?.homeAddress || ''} 
                      disabled={!isEditing} 
                      onChange={(e) => setEditedProfile({...editedProfile, homeAddress: e.target.value})}
                      className="rounded-2xl bg-black/40 border-white/5 h-16 px-6 font-black text-xs" 
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="registry" className="mt-10 animate-in fade-in slide-in-from-right-5 duration-500">
               <Card className="glass-panel border-none rounded-[4rem] p-10 shadow-2xl">
                  <CardTitle className="text-xl font-black gold-text uppercase tracking-tight flex items-center gap-4 mb-10">
                    <AwardIcon className="w-8 h-8" /> Badge Progression
                  </CardTitle>
                  <div className="space-y-6">
                    {profile.awards?.length > 0 ? profile.awards.map((a: any, i: number) => (
                      <div key={i} className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 flex items-center justify-between">
                         <div>
                            <p className="font-black text-lg uppercase tracking-tight text-primary">{a.name}</p>
                            <p className="text-[9px] uppercase font-black text-muted-foreground mt-2 tracking-widest">Status: {a.status}</p>
                         </div>
                      </div>
                    )) : (
                      <div className="py-20 text-center opacity-30">
                        <AwardIcon className="w-12 h-12 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No awards registered</p>
                      </div>
                    )}
                  </div>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
