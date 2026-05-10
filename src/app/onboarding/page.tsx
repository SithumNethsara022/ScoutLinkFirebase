
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Camera, Info, User, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { calculateGrade } from '@/lib/grade-utils';
import { toast } from '@/hooks/use-toast';
import { Role } from '@/lib/types';

const ROLES: Role[] = [
  'Scout', 'Patrol Leader', 'Assistant Patrol Leader', 'Sub Troop Leader', 
  'Assistant Sub Troop Leader', 'Junior Troop Leader', 'Assistant Junior Troop Leader', 
  'Senior Scout', 'Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 
  'Assistant Scout Leader', 'Scout Leader'
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '',
    homeAddress: '',
    phoneNumber: '',
    parentsNames: '',
    patrol: '',
    subTroop: '',
    role: '' as Role,
    membershipNumber: '',
    awardStatus: {} as any,
  });

  const grade = formData.birthday ? calculateGrade(formData.birthday) : null;

  // Roles that don't have patrols/subtroops
  const noPatrolRoles = ['Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 'Assistant Scout Leader', 'Scout Leader'];
  const noPatrolSubTroopOnlyRoles = ['Senior Scout'];

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.birthday || !formData.role)) {
      toast({ title: "Required Fields", description: "Please complete all identity details.", variant: "destructive" });
      return;
    }
    if (step === 2) {
      toast({ 
        title: "Request Transmitted", 
        description: "Your registration request has been sent to the Scout Leader for validation.",
      });
      router.push('/');
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient">
      <Card className="w-full max-w-3xl glass-panel border-none rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="h-2 bg-primary w-full" style={{ width: `${(step / 2) * 100}%` }} />
        <CardHeader className="p-10 pb-6 text-center">
           <div className="w-16 h-16 rounded-[1.5rem] liquid-glass flex items-center justify-center mx-auto mb-4">
             <Shield className="w-8 h-8 text-primary" />
           </div>
           <CardTitle className="text-2xl font-black gold-text uppercase tracking-tight">Troop Induction</CardTitle>
           <CardDescription className="text-muted-foreground uppercase tracking-widest text-[8px] mt-2">Section {step}: {step === 1 ? 'Identity & Role' : 'Badge Work Status'}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 pt-0 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Full Name</Label>
                  <Input placeholder="Full Name" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Email</Label>
                  <Input type="email" placeholder="Email" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Birthday</Label>
                  <Input type="date" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Grade (Auto)</Label>
                  <div className="h-12 flex items-center px-4 rounded-xl bg-white/5 border border-white/5 text-primary font-black uppercase text-xs">
                    {grade ? `Grade ${grade}` : 'Select Birthday'}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                   <Label className="text-[10px] uppercase font-black tracking-widest">Role within Troop</Label>
                   <Select onValueChange={(v) => setFormData({...formData, role: v as Role})}>
                     <SelectTrigger className="rounded-xl bg-black/20 border-white/5 h-12">
                       <SelectValue placeholder="Select Role" />
                     </SelectTrigger>
                     <SelectContent>
                       {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                     </SelectContent>
                   </Select>
                </div>
                
                {!noPatrolRoles.includes(formData.role) && (
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest">Sub Troop</Label>
                    <Select onValueChange={(v) => setFormData({...formData, subTroop: v})}>
                      <SelectTrigger className="rounded-xl bg-black/20 border-white/5 h-12">
                        <SelectValue placeholder="Select Sub Troop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gold I">Gold I</SelectItem>
                        <SelectItem value="Gold II">Gold II</SelectItem>
                        <SelectItem value="Gold III">Gold III</SelectItem>
                        <SelectItem value="Gold IV">Gold IV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!noPatrolRoles.includes(formData.role) && !noPatrolSubTroopOnlyRoles.includes(formData.role) && (
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest">Patrol</Label>
                    <Input placeholder="e.g. Eagles" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, patrol: e.target.value})} />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Contact Number</Label>
                  <Input placeholder="Contact Number" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Parents' Names</Label>
                  <Input placeholder="Parents' Names" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, parentsNames: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest">Home Address</Label>
                  <Input placeholder="Home Address" className="rounded-xl bg-black/20 border-white/5 h-12" onChange={(e) => setFormData({...formData, homeAddress: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 py-6 border-t border-white/5">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-[2rem] liquid-glass flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors">
                    <Camera className="w-6 h-6 text-primary/50" />
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-center">
                  Requirement: Upper body photo in full scout uniform
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <Award className="w-5 h-5" />
                    <h4 className="text-[10px] uppercase font-black tracking-widest">Membership Progress</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest">Membership Number</Label>
                      <Input placeholder="xx/xxxx/xx/(J or S)" className="rounded-xl bg-black/20 border-white/5 h-11" onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest">Date Passed</Label>
                      <Input type="date" className="rounded-xl bg-black/20 border-white/5 h-11" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-400">
                    <BookOpen className="w-5 h-5" />
                    <h4 className="text-[10px] uppercase font-black tracking-widest">Log Award Status</h4>
                  </div>
                  {['Scout Award', "Chief Commissioner's Award", "Prime Minister's Award", "President's Scout Award"].map(award => (
                    <div key={award} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                       <span className="text-[10px] font-black uppercase tracking-tighter">{award}</span>
                       <Select>
                         <SelectTrigger className="w-[200px] rounded-xl h-9 text-[9px] uppercase font-black bg-black/20">
                            <SelectValue placeholder="Status" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="passed">Passed</SelectItem>
                            <SelectItem value="pending">Pending Interview</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-4">
             {step > 1 && (
               <Button variant="ghost" className="h-14 rounded-2xl flex-1 uppercase tracking-widest font-black border border-white/5" onClick={() => setStep(step - 1)}>
                 Back
               </Button>
             )}
             <Button className="h-14 rounded-2xl flex-[2] uppercase tracking-widest font-black bg-primary hover:bg-primary/90 text-black shadow-xl" onClick={handleNext}>
                {step === 1 ? 'Configure Badge Work' : 'Request Access to Troop'}
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
