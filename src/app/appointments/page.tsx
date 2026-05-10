
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, UserCheck, ShieldAlert, Mountain, CheckCircle, XCircle, Tent } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { MOCK_SCOUTS } from '@/lib/mock-data';

// Mock user role for demonstration
const USER_ROLE = 'Assistant Sub Troop Leader'; 

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(['', '', '', '', '']);

  // Permission Logic
  const canViewAppointments = ['Assistant Sub Troop Leader', 'Sub Troop Leader', 'Junior Troop Leader', 'Assistant Junior Troop Leader', 'Senior Troop Leader', 'Assistant Senior Troop Leader', 'Scout Leader', 'Assistant Scout Leader', 'Instructor', 'Senior Scout'].includes(USER_ROLE);

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleBooking = (type: string) => {
    if (dates.some(d => !d)) {
      toast({ title: "Missing Dates", description: "Please provide all 5 available dates.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Booking Requested", description: `Your ${type} request has been sent via email to the relevant leaders.` });
      
      // Simulate specialized email notification logic
      if (type === 'Instructor Interview') {
        console.log('Notifying Senior Scouts, Instructors, ASTL, STL via email');
      } else if (type === 'Scout Leader Interview') {
        console.log('Notifying Scout Leader and ASLs via email');
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Command Center</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-2">Book interviews, hikes, and progress milestones.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-panel border-none rounded-[3rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <CalendarIcon className="w-6 h-6" />
                Book Progress Interview
              </CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest">Select 5 dates you are available for authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Interview Division</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/10 h-12">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor Interview</SelectItem>
                      <SelectItem value="scout-leader">Scout Leader Interview</SelectItem>
                      <SelectItem value="adc">ADC Interview (CC+ Awards)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Target Award Milestone</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/10 h-12">
                      <SelectValue placeholder="Target Award" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membership">Membership Award</SelectItem>
                      <SelectItem value="scout">Scout Award</SelectItem>
                      <SelectItem value="cc">Chief Commissioner's Award</SelectItem>
                      <SelectItem value="pm">Prime Minister's Award</SelectItem>
                      <SelectItem value="president">President's Scout Award</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] uppercase font-black text-primary tracking-widest">Identify 5 Potential Time Slots</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dates.map((date, i) => (
                    <div key={i} className="space-y-1">
                      <Label className="text-[8px] text-muted-foreground uppercase font-black">Option {i + 1}</Label>
                      <Input 
                        type="date" 
                        className="rounded-xl bg-black/20 border-white/5 h-12" 
                        value={date}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-black shadow-xl" onClick={() => handleBooking('Interview')} disabled={loading}>
                  {loading ? "Transmitting..." : "Submit Appointment"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {canViewAppointments && (
            <Card className="glass-panel border-none rounded-[3rem]">
              <CardHeader>
                <CardTitle className="text-xl gold-text uppercase tracking-tight">Incoming Troop Requests</CardTitle>
                <CardDescription className="text-[10px] font-black uppercase tracking-widest">Accessible to AS-TL and higher.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: 'Sithum Nethsara', type: 'Instructor Interview', award: 'Scout Award', status: 'Pending' },
                  { id: 2, name: 'Heshan Silva', type: 'Scout Leader Interview', award: 'Membership', status: 'Pending' }
                ].map((req) => (
                  <div key={req.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl border-2 border-primary/20 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${req.name}/100`} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-xs uppercase tracking-tighter">{req.name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{req.type} • {req.award}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-green-500 hover:bg-green-500/10 border border-transparent hover:border-green-500/20">
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
             <CardHeader>
                <CardTitle className="text-xl text-blue-400 uppercase tracking-tight flex items-center gap-3">
                  <Mountain className="w-6 h-6" />
                  SA Hikes
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-black tracking-widest text-muted-foreground leading-relaxed">Qualification window for Scout Award. Authenticated by Instructors.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-black text-blue-400 tracking-widest">Window Preference</Label>
                   <Input type="month" className="rounded-xl bg-black/20 border-blue-500/10 h-12" />
                </div>
                <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-2xl h-14 uppercase font-black text-xs tracking-widest shadow-lg">
                  Register for SA Hike
                </Button>
             </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] bg-purple-500/5">
             <CardHeader>
                <CardTitle className="text-xl text-purple-400 uppercase tracking-tight flex items-center gap-3">
                  <Tent className="w-6 h-6" /> ADC Authentication
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-relaxed">
                  Required for:
                  <br />• CC's Award
                  <br />• PM's Award
                  <br />• President's Scout
                </p>
                <Button variant="outline" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-2xl h-14 uppercase font-black text-xs tracking-widest">
                  ADC Request
                </Button>
             </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-[10px] uppercase tracking-widest gold-text font-black">Your History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-yellow-500 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-black text-xs uppercase tracking-tighter">Instructor Interview</p>
                  <Badge className="bg-yellow-500/20 text-yellow-500 text-[8px] uppercase font-black">Pending</Badge>
                </div>
                <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Status: Waiting for verification</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
