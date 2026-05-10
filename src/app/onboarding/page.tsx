
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Camera, Award, CheckCircle2, MapPin, Phone, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculateGrade } from '@/lib/grade-utils';
import { toast } from '@/hooks/use-toast';
import { Role } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ROLES: Role[] = [
  'Scout', 'Patrol Leader', 'Assistant Patrol Leader', 'Sub Troop Leader',
  'Assistant Sub Troop Leader', 'Junior Troop Leader', 'Assistant Junior Troop Leader',
  'Senior Scout', 'Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader',
  'Assistant Scout Leader', 'Scout Leader'
];

const PATROLS = [
  'Kingfishers', 'Eagles', 'Seagulls', 'Woodpeckers', 'Parrots', 
  'Salalihini', 'Buzzards', 'Hawks', 'Falcons', 'Swans', 'Peacocks', 'Flamingo'
];

const SUB_TROOPS = ['Gold I', 'Gold II', 'Gold III', 'Gold IV'];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const db = useFirestore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    homeAddress: '',
    phoneNumber: '',
    parentsNames: '',
    patrol: '',
    subTroop: '',
    role: '' as Role,
    membershipNumber: '',
    profilePicUrl: '',
  });

  useEffect(() => {
    if (user && db) {
      const checkOnboarded = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().onboarded) {
          router.push('/');
        }
      };
      checkOnboarded();
    }
  }, [user, db, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.name || !formData.birthday || !formData.role || !formData.profilePicUrl || !formData.patrol || !formData.subTroop || !formData.homeAddress || !formData.phoneNumber || !formData.parentsNames) {
        toast({ 
          title: "Incomplete Identity", 
          description: "All personnel fields and a uniform photo are mandatory.", 
          variant: "destructive" 
        });
        return;
      }
      setStep(2);
    } else {
      if (!user || !db) return;
      setLoading(true);
      try {
        await setDoc(doc(db, 'users', user.uid), {
          ...formData,
          email: user.email,
          grade: calculateGrade(formData.birthday),
          onboarded: true,
          totalPoints: 0,
          awards: [],
        }, { merge: true });

        toast({ title: "Induction Complete", description: "Your profile is now live in the Gold Troop registry." });
        router.push('/');
      } catch (error: any) {
        toast({ title: "Registry Error", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient animate-in fade-in duration-1000">
      <Card className="w-full max-w-4xl glass-panel border-none rounded-[4rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 h-2 bg-primary transition-all duration-700 ease-out" style={{ width: `${(step / 2) * 100}%` }} />
        
        <CardHeader className="p-12 pb-6 text-center">
          <div className="w-24 h-24 rounded-[2.5rem] liquid-glass flex items-center justify-center mx-auto mb-6 border border-primary/20 animate-pulse">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-black gold-text uppercase tracking-tight">Troop Induction</CardTitle>
          <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-black mt-4">
            {step === 1 ? 'Phase I: Personnel Identity' : 'Phase II: Badge Registry'}
          </p>
        </CardHeader>
        
        <CardContent className="p-12 pt-0 space-y-12">
          {step === 1 ? (
            <div className="space-y-10 animate-in slide-in-from-right-10 duration-500">
              <div className="flex flex-col items-center gap-6 py-6">
                <div className="relative group cursor-pointer">
                  <div className="w-40 h-40 rounded-[3rem] liquid-glass flex items-center justify-center border-2 border-dashed border-primary/40 group-hover:border-primary transition-all overflow-hidden shadow-2xl">
                    {formData.profilePicUrl ? (
                      <img src={formData.profilePicUrl} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-primary/40" />
                    )}
                  </div>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="absolute -bottom-2 bg-primary text-black text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg">Uniform Photo Required</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Full Legal Name</Label>
                  <Input placeholder="Registry Name" className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold uppercase" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Birthday</Label>
                  <Input type="date" className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold" value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Appointment Role</Label>
                  <Select onValueChange={(v) => setFormData({...formData, role: v as Role})}>
                    <SelectTrigger className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Contact Number</Label>
                  <Input placeholder="07x xxxxxxx" className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Sub Troop</Label>
                  <Select onValueChange={(v) => setFormData({...formData, subTroop: v})}>
                    <SelectTrigger className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold">
                      <SelectValue placeholder="Select Sub Troop" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUB_TROOPS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Patrol</Label>
                  <Select onValueChange={(v) => setFormData({...formData, patrol: v})}>
                    <SelectTrigger className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold">
                      <SelectValue placeholder="Select Patrol" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATROLS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Parents' / Guardians' Names</Label>
                  <Input placeholder="Full Names" className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold" value={formData.parentsNames} onChange={(e) => setFormData({...formData, parentsNames: e.target.value})} />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Home Address</Label>
                  <Input placeholder="Residential Address" className="rounded-2xl bg-black/30 border-white/5 h-14 px-6 font-bold" value={formData.homeAddress} onChange={(e) => setFormData({...formData, homeAddress: e.target.value})} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
              <div className="p-10 rounded-[3.5rem] bg-white/[0.04] border border-white/10 space-y-10">
                <div className="flex items-center gap-4 text-primary">
                  <Award className="w-8 h-8" />
                  <h4 className="text-sm uppercase font-black tracking-widest">Initial Badge Alignment</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Membership ID (e.g. 24/1234/G1/S)</Label>
                    <Input placeholder="Registry Code" className="rounded-2xl bg-black/40 border-white/10 h-16 px-6 font-black uppercase" value={formData.membershipNumber} onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})} />
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[10px] text-muted-foreground uppercase font-black leading-relaxed tracking-widest text-center italic">
                     "I solemnly declare that the information provided is accurate and I will maintain the standards of the 42nd Colombo Gold Troop."
                   </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 flex gap-8">
            {step > 1 && (
              <Button variant="ghost" className="h-16 rounded-[2rem] flex-1 uppercase font-black border border-white/10 hover:bg-white/5" onClick={() => setStep(step - 1)}>
                Identity
              </Button>
            )}
            <Button className="h-16 rounded-[2rem] flex-[2] uppercase font-black bg-primary text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] active:scale-95" onClick={handleNext} disabled={loading}>
              {loading ? 'Transmitting...' : (step === 1 ? 'Align Badge Status' : 'Request Final Induction')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
