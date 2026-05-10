
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, UserCheck, ShieldAlert, Mountain } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(['', '', '', '', '']);

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleBooking = () => {
    if (dates.some(d => !d)) {
      toast({ title: "Missing Dates", description: "Please provide all 5 available dates.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Booking Requested", description: "Your interview request has been sent to the relevant leaders." });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Interview Appointments</h2>
        <p className="text-muted-foreground">Book your progress interviews or SA Hikes with Troop Leaders.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <CalendarIcon className="w-6 h-6" />
                Book New Interview
              </CardTitle>
              <CardDescription>All awards require a series of interviews. Select your preferred options below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Interview Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/10">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instructor">Instructor Interview</SelectItem>
                      <SelectItem value="scout-leader">Scout Leader Interview</SelectItem>
                      <SelectItem value="adc">ADC Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Award</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/10">
                      <SelectValue placeholder="Select Award" />
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
                <Label className="text-primary font-bold uppercase text-xs tracking-widest">Provide 5 Available Dates</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dates.map((date, i) => (
                    <div key={i} className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground uppercase">Option {i + 1}</Label>
                      <Input 
                        type="date" 
                        className="rounded-xl bg-black/20 border-white/10 h-11" 
                        value={date}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full h-12 rounded-2xl font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-black" onClick={handleBooking} disabled={loading}>
                  {loading ? "Processing..." : "Submit Booking Request"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
             <CardHeader>
                <CardTitle className="text-xl text-blue-400 uppercase tracking-tight flex items-center gap-3">
                  <Mountain className="w-6 h-6" />
                  SA Hikes (Scout Award)
                </CardTitle>
                <CardDescription>Register for your mandatory Scout Award qualification hike.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="p-6 rounded-3xl bg-white/5 border border-blue-500/20 text-center">
                  <p className="text-sm text-muted-foreground mb-4">Hikes are organized monthly. Next window: June 2026.</p>
                  <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl px-8 h-10">
                    Request SA Hike Slot
                  </Button>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest gold-text">Active Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-yellow-500 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm">Instructor Interview</p>
                  <Badge className="bg-yellow-500/20 text-yellow-500 text-[9px] uppercase">Pending</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">For: Scout Award</p>
                <p className="text-[10px] flex items-center gap-1"><Clock className="w-3 h-3" /> Requested 2h ago</p>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-green-500 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm">Scout Leader Int.</p>
                  <Badge className="bg-green-500/20 text-green-400 text-[9px] uppercase">Confirmed</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">For: Membership Award</p>
                <p className="text-[10px] font-bold text-primary">June 12, 16:00 hrs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] bg-red-500/5">
             <CardHeader>
                <CardTitle className="text-sm uppercase tracking-widest text-red-400">Important</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-muted-foreground">Wear your full uniform for all interviews. Bring your logbook.</p>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <UserCheck className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-muted-foreground">Instructor interviews can be verified by Seniors (Grade 12+).</p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
