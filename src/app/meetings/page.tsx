
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Mic, Monitor, Search, Calendar, Users, Shield, Plus, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

export default function MeetingsPage() {
  const [isLive, setIsLive] = useState(false);

  const startMeeting = () => {
    setIsLive(true);
    toast({ title: "Meeting Started", description: "You are now hosting the virtual troop meet." });
  };

  if (isLive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05140d] flex flex-col p-4 md:p-8">
        {/* Meeting Interface */}
        <div className="flex-1 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden flex flex-col">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video rounded-[2.5rem] bg-white/5 border border-white/10 relative group overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/600/400`} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={`https://picsum.photos/seed/user${i}/50`} />
                  </Avatar>
                  <span className="text-[10px] font-bold uppercase text-white">Scout {i}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="h-24 bg-black/60 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center gap-6 px-10">
            <Button variant="outline" className="w-12 h-12 rounded-2xl border-white/10 hover:bg-white/5"><Mic className="w-5 h-5 text-primary" /></Button>
            <Button variant="outline" className="w-12 h-12 rounded-2xl border-white/10 hover:bg-white/5"><Video className="w-5 h-5 text-primary" /></Button>
            <Button variant="outline" className="w-12 h-12 rounded-2xl border-white/10 hover:bg-white/5"><Monitor className="w-5 h-5 text-blue-400" /></Button>
            <div className="w-px h-8 bg-white/10 mx-2" />
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl px-8 h-12 uppercase tracking-widest" onClick={() => setIsLive(false)}>Leave</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Troop Virtual Meet</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Secure video conferencing for the Golden Troop</p>
        </div>
        <Button 
          className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-12 px-8"
          onClick={startMeeting}
        >
          <Plus className="w-5 h-5 mr-2" /> Start Meeting
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Schedule Meeting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="e.g. Weekly Patrol Council" className="rounded-xl bg-black/20 border-white/10 h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Date & Time</Label>
                  <Input type="datetime-local" className="rounded-xl bg-black/20 border-white/10 h-11" />
                </div>
                <div className="space-y-2">
                  <Label>Duration (Minutes)</Label>
                  <Input type="number" placeholder="45" className="rounded-xl bg-black/20 border-white/10 h-11" />
                </div>
                <div className="space-y-2">
                   <Label>Invite Participants</Label>
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input placeholder="Search scouts..." className="rounded-xl bg-black/20 border-white/10 h-11 pl-10" />
                   </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason for Meeting</Label>
                <Input placeholder="Describe purpose..." className="rounded-xl bg-black/20 border-white/10 h-11" />
              </div>
              <Button className="w-full h-12 rounded-2xl font-bold bg-primary text-black uppercase tracking-widest mt-4">Create Schedule</Button>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
             <CardHeader>
               <CardTitle className="text-sm uppercase tracking-widest gold-text">Recent Meetings</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {[
                 { title: 'Patrol Leader Council', time: 'Today, 18:00', duration: '60m', host: 'Asher Quinn' },
                 { title: 'Badgework Session', time: 'Yesterday', duration: '45m', host: 'Sophie Turner' }
               ].map((meet, i) => (
                 <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{meet.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{meet.time} • Hosted by {meet.host}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[10px] uppercase font-bold text-primary">Join Room</Button>
                 </div>
               ))}
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
            <CardHeader>
               <CardTitle className="text-xs uppercase tracking-widest text-blue-400">Meeting Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                 <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                 <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-bold">Only Sub Troop Leaders and above can initiate non-scheduled meetings.</p>
              </div>
              <div className="flex gap-3">
                 <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                 <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-bold">Patrol Councils (PIC) must be held monthly on this platform.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest gold-text">Active Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://picsum.photos/seed/active${i}/50`} />
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0d281a]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Scout Name {i}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
