
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Camera, Info, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculateGrade } from '@/lib/grade-utils';
import { toast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '',
    patrol: '',
    position: '',
    profilePic: null as File | null
  });

  const grade = formData.birthday ? calculateGrade(formData.birthday) : null;

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.birthday)) {
      toast({ title: "Required Fields", description: "Please fill in all identity details.", variant: "destructive" });
      return;
    }
    if (step === 2) {
      router.push('/');
      toast({ title: "Welcome Aboard!", description: `Profile created for Grade ${grade} Scout.` });
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient">
      <Card className="w-full max-w-2xl glass-panel border-none rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="h-2 bg-primary w-full" style={{ width: `${(step / 2) * 100}%` }} />
        <CardHeader className="p-10 pb-6 text-center">
           <div className="w-20 h-20 rounded-[2rem] liquid-glass flex items-center justify-center mx-auto mb-6">
             <Shield className="w-10 h-10 text-primary" />
           </div>
           <CardTitle className="text-3xl font-black gold-text uppercase tracking-tight">Troop Onboarding</CardTitle>
           <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] mt-2">Leading Excellence Since 1920</CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 pt-0 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="Sithum Nethsara" 
                    className="rounded-2xl bg-black/20 border-white/10 h-12" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    type="email" 
                    placeholder="scout@42colombo.com" 
                    className="rounded-2xl bg-black/20 border-white/10 h-12" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Birthday</Label>
                  <Input 
                    type="date" 
                    className="rounded-2xl bg-black/20 border-white/10 h-12" 
                    onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                  />
                </div>
                {grade !== null && (
                  <div className="space-y-2">
                    <Label>Calculated Grade</Label>
                    <div className="h-12 flex items-center px-4 rounded-2xl bg-primary/10 border border-primary/20 gold-text font-black uppercase text-sm">
                      Grade {grade}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-[2.5rem] liquid-glass flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors overflow-hidden">
                    <Camera className="w-8 h-8 text-primary/50 group-hover:text-primary" />
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-primary uppercase">Profile Photo Required</p>
                  <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 justify-center">
                    <Info className="w-3 h-3" /> Upper body photo in full scout uniform
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Patrol</Label>
                  <Select onValueChange={(v) => setFormData({...formData, patrol: v})}>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/10 h-12">
                      <SelectValue placeholder="Select Patrol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eagles">Eagles</SelectItem>
                      <SelectItem value="Tiger">Tiger</SelectItem>
                      <SelectItem value="Peacocks">Peacocks</SelectItem>
                      <SelectItem value="Swans">Swans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Position</Label>
                  <Select onValueChange={(v) => setFormData({...formData, position: v})}>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/10 h-12">
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Patrol Leader">Patrol Leader</SelectItem>
                      <SelectItem value="Assistant Patrol Leader">Assistant Patrol Leader</SelectItem>
                      <SelectItem value="Sub Troop Leader">Sub Troop Leader</SelectItem>
                      <SelectItem value="Senior Scout">Senior Scout</SelectItem>
                      <SelectItem value="Scout">Scout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-4">
             {step > 1 && (
               <Button variant="ghost" className="h-14 rounded-2xl flex-1 uppercase tracking-widest font-bold border border-white/5" onClick={() => setStep(step - 1)}>
                 Back
               </Button>
             )}
             <Button className="h-14 rounded-2xl flex-[2] uppercase tracking-widest font-bold bg-primary hover:bg-primary/90 text-black shadow-xl" onClick={handleNext}>
                {step === 1 ? 'Continue to Role' : 'Complete Registration'}
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
