
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, UserCheck, ShieldAlert, Mountain, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock user role for demonstration
const USER_ROLE = 'Scout'; // Change to 'Assistant Sub Troop Leader' to see list

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(['', '', '', '', '']);

  // Permission Logic
  const canViewAppointments = ['Assistant Sub Troop Leader', 'Sub Troop Leader', 'Junior Troop Leader', 'Senior Troop Leader', 'Scout Leader', 'Asst Scout Leader', 'Instructor', 'Senior Scout'].includes(USER_ROLE);
  const canConfirmInstructor = ['Senior Scout', 'Instructor', 'Senior Troop Leader', 'Asst Senior Troop Leader'].includes(USER_ROLE);
  const canConfirmScoutLeader = ['Scout Leader', 'Asst Scout Leader'].includes(USER_ROLE);

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
        <p className="text-muted-foreground">Book your progress interviews or SA Hikes. All awards require interviews.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <CalendarIcon className="w-6 h-6" />
                Book New Interview
              </CardTitle>
              <CardDescription>Select 5 dates you are available. Relevant leaders will confirm one.</CardDescription>
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

          {canViewAppointments && (
            <Card className="glass-panel border-none rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl gold-text uppercase tracking-tight">Incoming Requests</CardTitle>
                <CardDescription>View and confirm interview slots for your sub-troop/troop.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, name: 'Sithum Nethsara', type: 'Instructor Interview', award: 'Scout Award', status: 'Pending' },
                  { id: 2, name: 'Heshan Silva', type: 'Scout Leader Interview', award: 'Membership', status: 'Pending' }
                ].map((req) => (
                  <div key={req.id} className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">{req.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{req.type} • {req.award}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full text-green-500 hover:bg-green-500/10">
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full text-red-500 hover:bg-red-500/10">
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest gold-text">Your Request Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-yellow-500 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm">Instructor Interview</p>
                  <Badge className="bg-yellow-500/20 text-yellow-500 text-[9px] uppercase">Pending Confirmation</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">Target: Scout Award</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
             <CardHeader>
                <CardTitle className="text-xl text-blue-400 uppercase tracking-tight flex items-center gap-3">
                  <Mountain className="w-6 h-6" />
                  SA Hikes
                </CardTitle>
                <CardDescription>Any scout can request a Scout Award qualification hike slot.</CardDescription>
             </CardHeader>
             <CardContent>
                <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-xl h-12 uppercase font-black text-[10px] tracking-widest">
                  Request SA Hike
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
