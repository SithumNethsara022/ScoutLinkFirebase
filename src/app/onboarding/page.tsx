
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Camera, Award, BookOpen, CheckCircle2 } from 'lucide-react';
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
  });

  const grade = formData.birthday ? calculateGrade(formData.birthday) : null;

  const noPatrolRoles = ['Instructor', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 'Assistant Scout Leader', 'Scout Leader'];
  const noPatrolSubTroopOnlyRoles = ['Senior Scout'];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.birthday || !formData.role || !formData.homeAddress || !formData.phoneNumber || !formData.parentsNames) {
        toast({ title: "Required Fields", description: "Please complete all identity details in Section 1.", variant: "destructive" });
        return;
      }
      setStep(2);
    } else {
      toast({ 
        title: "Induction Requested", 
        description: "Your profile has been transmitted to the Scout Leader for validation.",
      });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 forest-gradient">
      <Card className="w-full max-w-3xl glass-panel border-none rounded-[3.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1.5 bg-primary transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
        
        <CardHeader className="p-12 pb-6 text-center">
           <div className="w-20 h-20 rounded-[2rem] liquid-glass flex items-center justify-center mx-auto mb-6 border border-primary/20">
             <Shield className="w-10 h-10 text-primary" />
           </div>
           <CardTitle className="text-3xl font-black gold-text uppercase tracking-tight">Troop Induction</CardTitle>
           <p className="text-muted-foreground uppercase tracking-[0.3em] text-[9px] font-black mt-3">
             {step === 1 ? 'Section I: Identity & Command' : 'Section II: Badge Work Registry'}
           </p>
        </CardHeader>
        
        <CardContent className="p-12 pt-0 space-y-10">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Full Name</Label>
                  <Input placeholder="Full Name" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Email Address</Label>
                  <Input type="email" placeholder="Email" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Birthday</Label>
                  <Input type="date" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Grade (Auto-Calculated)</Label>
                  <div className="h-14 flex items-center px-6 rounded-2xl bg-white/5 border border-white/5 text-primary font-black uppercase text-xs">
                    {grade ? `Grade ${grade}` : 'Select Birthday'}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                   <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Troop Appointment</Label>
                   <Select onValueChange={(v) => setFormData({...formData, role: v as Role})}>
                     <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold">
                       <SelectValue placeholder="Select Role" />
                     </SelectTrigger>
                     <SelectContent className="rounded-2xl bg-background border-white/10">
                       {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                     </SelectContent>
                   </Select>
                </div>
                
                {!noPatrolRoles.includes(formData.role) && (
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Sub Troop</Label>
                    <Select onValueChange={(v) => setFormData({...formData, subTroop: v})}>
                      <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold">
                        <SelectValue placeholder="Select Sub Troop" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl bg-background border-white/10">
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
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Patrol</Label>
                    <Input placeholder="e.g. Eagles" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, patrol: e.target.value})} />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Phone Number</Label>
                  <Input placeholder="07x xxxxxxx" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Parents' Names</Label>
                  <Input placeholder="Parents' Names" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, parentsNames: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2 tracking-widest">Home Address</Label>
                  <Input placeholder="Residential Address" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, homeAddress: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 py-8 border-t border-white/5">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-[2.5rem] liquid-glass flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors">
                    <Camera className="w-8 h-8 text-primary/50" />
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-center">
                  Requirement: Formal photo in full scout uniform
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  <h4 className="text-xs uppercase font-black tracking-widest">Membership & Core Progress</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Membership Number</Label>
                    <Input placeholder="xx/xxxx/xx/(J or S)" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-muted-foreground ml-2">Passing Date</Label>
                    <Input type="date" className="rounded-2xl bg-black/20 border-white/5 h-14 px-6 font-bold" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-blue-400">
                  <Award className="w-6 h-6" />
                  <h4 className="text-xs uppercase font-black tracking-widest">Initial Award Alignment</h4>
                </div>
                <div className="grid gap-4">
                  {['Scout Award', "Chief Commissioner's Award", "Prime Minister's Award", "President's Scout Award"].map(award => (
                    <div key={award} className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                       <span className="text-[11px] font-black uppercase tracking-widest">{award}</span>
                       <Select>
                         <SelectTrigger className="w-[220px] rounded-2xl h-12 text-[10px] uppercase font-black bg-black/40 border-white/10">
                            <SelectValue placeholder="Current Status" />
                         </SelectTrigger>
                         <SelectContent className="rounded-2xl bg-background border-white/10">
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="passed">Passed (Verified)</SelectItem>
                            <SelectItem value="pending">In Progress / Pending</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 flex gap-6">
             {step > 1 && (
               <Button variant="ghost" className="h-16 rounded-[2rem] flex-1 uppercase tracking-[0.2em] font-black border border-white/5" onClick={() => setStep(step - 1)}>
                 Back
               </Button>
             )}
             <Button className="h-16 rounded-[2rem] flex-[2] uppercase tracking-[0.2em] font-black bg-primary hover:bg-primary/90 text-black shadow-[0_0_30px_rgba(212,175,55,0.2)]" onClick={handleNext}>
                {step === 1 ? 'Next Step' : 'Request Induction'}
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
