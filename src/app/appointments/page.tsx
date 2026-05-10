
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Mountain, CheckCircle, XCircle, Tent } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(['', '', '', '', '']);

  const incomingRequests: any[] = [];

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
      toast({ title: "Booking Requested", description: `Your request has been transmitted.` });
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Command Center</h2>
        <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest mt-2">Book interviews and milestones.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-panel border-none rounded-[3rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <CalendarIcon className="w-6 h-6" />
                Book Progress Interview
              </CardTitle>
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
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Target Award</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl bg-black/20 border-white/10 h-12">
                      <SelectValue placeholder="Target Award" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membership">Membership</SelectItem>
                      <SelectItem value="scout">Scout Award</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] uppercase font-black text-primary tracking-widest">5 Potential Slots</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dates.map((date, i) => (
                    <Input key={i} type="date" className="rounded-xl bg-black/20 border-white/5 h-12" value={date} onChange={(e) => handleDateChange(i, e.target.value)} />
                  ))}
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] bg-primary text-black" onClick={() => handleBooking('Interview')} disabled={loading}>
                {loading ? "Transmitting..." : "Submit Appointment"}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[3rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight">Incoming Troop Requests</CardTitle>
            </CardHeader>
            <CardContent className="py-10 text-center opacity-20">
               <p className="text-[10px] font-black uppercase tracking-widest">No pending requests</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
             <CardHeader>
                <CardTitle className="text-xl text-blue-400 uppercase tracking-tight flex items-center gap-3">
                  <Mountain className="w-6 h-6" />
                  SA Hikes
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 rounded-2xl h-14 uppercase font-black text-xs">
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
             <CardContent>
                <Button variant="outline" className="w-full border-purple-500/50 text-purple-400 rounded-2xl h-14 uppercase font-black text-xs">
                  ADC Request
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
