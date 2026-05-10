
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Mic, Monitor, Search, Calendar, Users, Shield, Plus, Clock, Share2, UserPlus, X, LayoutGrid } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function MeetingsPage() {
  const [isLive, setIsLive] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<typeof MOCK_SCOUTS>([]);

  // Simulation of permissions
  const USER_ROLE = 'Scout Leader';
  const canStartMeeting = ['Sub Troop Leader', 'Junior Troop Leader', 'Senior Troop Leader', 'Scout Leader', 'Senior Scout', 'Instructor'].includes(USER_ROLE);

  const startMeeting = () => {
    if (!canStartMeeting) {
      toast({ title: "Permission Denied", description: "You must request permission to start a meeting.", variant: "destructive" });
      return;
    }
    setIsLive(true);
    toast({ title: "Troop Meet Live", description: "You are now hosting the virtual troop meet." });
  };

  const handleParticipantSelect = (scout: typeof MOCK_SCOUTS[0]) => {
    if (selectedParticipants.find(p => p.id === scout.id)) return;
    setSelectedParticipants([...selectedParticipants, scout]);
    setSearchQuery('');
  };

  const removeParticipant = (id: string) => {
    setSelectedParticipants(selectedParticipants.filter(p => p.id !== id));
  };

  const filteredScouts = searchQuery 
    ? MOCK_SCOUTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  if (isLive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05140d] flex flex-col p-4 md:p-8">
        <div className="flex-1 rounded-[3rem] bg-black/40 border border-white/5 relative overflow-hidden flex flex-col">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 overflow-y-auto">
            {/* Self view */}
            <div className="aspect-video rounded-[2.5rem] bg-white/10 border-2 border-primary/40 relative group overflow-hidden">
               <img src="https://picsum.photos/seed/me/600/400" className="w-full h-full object-cover" />
               <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10">
                  <Badge className="bg-primary text-black text-[8px] font-black uppercase">Host</Badge>
                  <span className="text-[10px] font-black uppercase tracking-widest">You (Asher)</span>
               </div>
            </div>
            
            {/* Other participants */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-video rounded-[2.5rem] bg-white/5 border border-white/10 relative group overflow-hidden hover:scale-[1.02] transition-all">
                <img src={`https://picsum.photos/seed/user${i}/600/400`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                  <Avatar className="w-6 h-6 border-2 border-white/10">
                    <AvatarImage src={`https://picsum.photos/seed/user${i}/50`} />
                  </Avatar>
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Scout {i}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-28 bg-black/60 backdrop-blur-3xl border-t border-white/5 flex items-center justify-center gap-8 px-12">
            <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
              <Mic className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
              <Video className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
              <Monitor className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
              <Share2 className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </Button>
            <div className="w-px h-12 bg-white/10" />
            <Button className="bg-red-500 hover:bg-red-600 text-white font-black rounded-3xl px-12 h-16 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.3)]" onClick={() => setIsLive(false)}>
              End Meeting
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Troop Connect</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-black mt-2">Next-Gen Virtual Collaboration for the Golden Troop</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="ghost"
            className="rounded-2xl border border-white/10 h-12 px-6 uppercase font-black text-[10px] tracking-widest"
            onClick={() => setShowSchedule(true)}
          >
            <Calendar className="w-4 h-4 mr-2" /> Schedule Meet
          </Button>
          <Button 
            className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-12 px-8 shadow-xl"
            onClick={startMeeting}
          >
            <Video className="w-5 h-5 mr-2" /> Instant Meet
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-panel border-none rounded-[3rem]">
            <CardHeader>
              <CardTitle className="text-xl gold-text uppercase tracking-tight flex items-center gap-3">
                <LayoutGrid className="w-6 h-6" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { title: 'Patrol Leader Council (PIC)', type: 'PIC', time: 'LIVE', host: 'Asher Quinn', participants: 12 },
                 { title: 'Pioneering Workshop', type: 'Standard', time: 'Scheduled: 18:00', host: 'Sophie Turner', participants: 45 }
               ].map((meet, i) => (
                 <div key={i} className="p-6 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-6">
                      <div className={cn("p-4 rounded-2xl", meet.time === 'LIVE' ? "bg-red-500/20 text-red-500 animate-pulse" : "bg-primary/10 text-primary")}>
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <p className="font-black text-xs uppercase tracking-tighter">{meet.title}</p>
                           <Badge variant="outline" className="text-[7px] uppercase font-black border-white/10">{meet.type}</Badge>
                        </div>
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-1">{meet.time} • Host: {meet.host}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/10 rounded-xl px-6">Join Session</Button>
                 </div>
               ))}
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[3rem]">
             <CardHeader>
               <CardTitle className="text-[10px] uppercase tracking-widest gold-text font-black">Monthly Mandatory Meetings</CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 border-l-4 border-l-primary">
                   <p className="text-[10px] font-black uppercase text-primary mb-1">PIC (Patrol Inter Council)</p>
                   <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Required for all PLs. Next due by May 28th.</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 border-l-4 border-l-blue-400">
                   <p className="text-[10px] font-black uppercase text-blue-400 mb-1">STPLM (Sub Troop PLC)</p>
                   <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Required for all STLs. Next session Jun 02.</p>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="glass-panel border-none rounded-[2.5rem] bg-blue-500/5">
            <CardHeader>
               <CardTitle className="text-xl uppercase tracking-tight text-blue-400 flex items-center gap-2">
                 <Shield className="w-5 h-5" /> Protocols
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                 <div className="w-2 h-12 rounded-full bg-blue-400/20" />
                 <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-black tracking-widest">STLs and above can initiate meetings instantly. Others must request permission.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-2 h-12 rounded-full bg-blue-400/20" />
                 <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-black tracking-widest">Host controls participant entry via profile-based invitations.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-[10px] uppercase tracking-widest gold-text font-black">Frequent Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_SCOUTS.slice(0, 4).map((scout) => (
                <div key={scout.id} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-primary/20 group-hover:border-primary transition-all">
                      <AvatarImage src={`https://picsum.photos/seed/${scout.id}/50`} />
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#05140d]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tighter">{scout.name}</p>
                    <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">{scout.patrol} Patrol</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <Card className="w-full max-w-2xl glass-panel border-none rounded-[3rem] p-12 space-y-8 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
             <header className="flex justify-between items-center">
                <h3 className="text-2xl font-black gold-text uppercase tracking-tight">Schedule New Session</h3>
                <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => setShowSchedule(false)}>
                  <X className="w-6 h-6" />
                </Button>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Session Title</Label>
                  <Input placeholder="e.g. Patrol Council #5" className="rounded-2xl bg-black/20 border-white/5 h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Date & Time</Label>
                  <Input type="datetime-local" className="rounded-2xl bg-black/20 border-white/5 h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Estimated Duration (Mins)</Label>
                  <Input type="number" placeholder="45" className="rounded-2xl bg-black/20 border-white/5 h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Meeting Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl bg-black/20 border-white/5 h-14">
                      <SelectValue placeholder="Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard Meeting</SelectItem>
                      <SelectItem value="PIC">PIC (Patrol Council)</SelectItem>
                      <SelectItem value="STPLM">STPLM (Sub Troop Council)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>

             <div className="space-y-3">
                <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Invite Participants (Profile Selection)</Label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name or patrol..." 
                    className="rounded-2xl bg-black/20 border-white/5 h-14 pl-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#0d281a] border border-white/10 rounded-2xl shadow-2xl z-10 max-h-60 overflow-y-auto p-2 space-y-1">
                       {filteredScouts.map(s => (
                         <button 
                            key={s.id}
                            className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-colors"
                            onClick={() => handleParticipantSelect(s)}
                         >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://picsum.photos/seed/${s.id}/50`} />
                            </Avatar>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-tighter">{s.name}</p>
                               <p className="text-[8px] uppercase font-bold text-muted-foreground">{s.patrol} Patrol</p>
                            </div>
                         </button>
                       ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedParticipants.map(p => (
                    <Badge key={p.id} className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-2 px-4 gap-2 text-[8px] uppercase font-black">
                      {p.name}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeParticipant(p.id)} />
                    </Badge>
                  ))}
                </div>
             </div>

             <Button className="w-full h-16 rounded-[2rem] bg-primary text-black font-black uppercase tracking-[0.2em] shadow-xl" onClick={() => {
               toast({ title: "Session Scheduled", description: "All participants will receive notifications 30m and 10m before start." });
               setShowSchedule(false);
             }}>
               Finalize Schedule
             </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
