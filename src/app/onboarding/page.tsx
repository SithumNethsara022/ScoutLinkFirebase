
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Camera, Award, CheckCircle2 } from 'lucide-react';
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
      if (!formData.name || !formData.birthday || !formData.role || !formData.profilePicUrl) {
        toast({ title: "Required Fields", description: "Identity, Role, and Profile Picture are mandatory.", variant: "destructive" });
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

        toast({ title: "Induction Complete", description: "Welcome to the Gold Troop registry." });
        router.push('/');
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  const grade = formData.birthday ? calculateGrade(formData.birthday) : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient animate-in slide-in-from-bottom-10 duration-700">
      <Card className="w-full max-w-3xl glass-panel border-none rounded-[3.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1.5 bg-primary transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
        
        <CardHeader className="p-12 pb-6 text-center">
          <div className="w-20 h-20 rounded-[2rem] liquid-glass flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-black gold-text uppercase tracking-tight">Troop Induction</CardTitle>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-[9px] font-black mt-3">
            {step === 1 ? 'Step I: Command Identity' : 'Step II: Badge Registry'}
          </p>
        </CardHeader>
        
        <CardContent className="p-12 pt-0 space-y-10">
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-[2.5rem] liquid-glass flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary transition-all overflow-hidden">
                    {formData.profilePicUrl ? (
                      <img src={formData.profilePicUrl} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-10 h-10 text-primary/50" />
                    )}
                  </div>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-center">
                  Required: Formal photo in full scout uniform
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Full Name</Label>
                  <Input placeholder="Registry Name" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Birthday</Label>
                  <Input type="date" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Appointment</Label>
                  <Select onValueChange={(v) => setFormData({...formData, role: v as Role})}>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Phone</Label>
                  <Input placeholder="07x xxxxxxx" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Parents' Names</Label>
                  <Input placeholder="Primary Guardians" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.parentsNames} onChange={(e) => setFormData({...formData, parentsNames: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Address</Label>
                  <Input placeholder="Residential Address" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.homeAddress} onChange={(e) => setFormData({...formData, homeAddress: e.target.value})} />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  <h4 className="text-xs uppercase font-black tracking-widest">Initial Status</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Membership ID</Label>
                    <Input placeholder="xx/xxxx/xx/(J or S)" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" value={formData.membershipNumber} onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})} />
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground text-center font-black uppercase tracking-widest">Additional badge entries can be added from the dashboard.</p>
            </div>
          )}

          <div className="pt-6 flex gap-6">
            {step > 1 && (
              <Button variant="ghost" className="h-16 rounded-[2rem] flex-1 uppercase font-black border border-white/5" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button className="h-16 rounded-[2rem] flex-[2] uppercase font-black bg-primary text-black shadow-xl" onClick={handleNext} disabled={loading}>
              {loading ? 'Transmitting...' : (step === 1 ? 'Next Step' : 'Request Induction')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
