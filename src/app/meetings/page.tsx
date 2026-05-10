
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Video, Mic, Monitor, Search, Calendar, Users, Shield, Plus, 
  Clock, Share2, UserPlus, X, LayoutGrid, MessageSquare, 
  Settings, MicOff, VideoOff, Send, Users2
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function MeetingsPage() {
  const [isLive, setIsLive] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showInMeetingChat, setShowInMeetingChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<any[]>([]);

  const startMeeting = () => {
    setIsLive(true);
    toast({ title: "Troop Meet Live", description: "You have initialized the virtual troop meet." });
  };

  const filteredScouts = searchQuery 
    ? MOCK_SCOUTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleInvite = (scout: any) => {
    if (!selectedAttendees.find(a => a.id === scout.id)) {
      setSelectedAttendees([...selectedAttendees, scout]);
    }
  };

  if (isLive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#020a07] flex flex-col p-6">
        <div className="flex-1 rounded-[4rem] bg-black/40 border border-white/5 relative overflow-hidden flex flex-row gap-6 p-6">
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar p-4">
              {/* Host View */}
              <div className="aspect-video rounded-[3rem] bg-black/60 border-2 border-primary/30 relative overflow-hidden group">
                 <img src="https://picsum.photos/seed/host/800/450" className="w-full h-full object-cover" />
                 <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10">
                    <Badge className="bg-primary text-black text-[8px] font-black uppercase">Host</Badge>
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">You (Asher)</span>
                 </div>
              </div>
              
              {/* Participant Views */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden group hover:scale-[1.02] transition-all">
                  <img src={`https://picsum.photos/seed/user${i}/800/450`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                    <Avatar className="w-6 h-6 border-2 border-white/10">
                      <AvatarImage src={`https://picsum.photos/seed/user${i}/50`} />
                    </Avatar>
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Scout {i}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* In-Meeting Controls */}
            <div className="h-32 bg-black/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 flex items-center justify-between px-16 shadow-2xl">
              <div className="flex gap-6">
                 <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
                    <Mic className="w-6 h-6 text-primary" />
                 </Button>
                 <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
                    <Video className="w-6 h-6 text-primary" />
                 </Button>
              </div>
              
              <div className="flex gap-6 items-center">
                <Button variant="ghost" className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 group">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </Button>
                <div className="w-px h-12 bg-white/10" />
                <Button 
                  onClick={() => setIsLive(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-black rounded-3xl px-12 h-16 uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                >
                  Terminate
                </Button>
              </div>

              <div className="flex gap-6">
                <Button 
                  variant="ghost" 
                  onClick={() => { setShowParticipants(!showParticipants); setShowInMeetingChat(false); }}
                  className={cn("w-16 h-16 rounded-3xl bg-white/5 border border-white/10", showParticipants && "bg-primary/20")}
                >
                  <Users2 className="w-6 h-6 text-primary" />
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => { setShowInMeetingChat(!showInMeetingChat); setShowParticipants(false); }}
                  className={cn("w-16 h-16 rounded-3xl bg-white/5 border border-white/10", showInMeetingChat && "bg-primary/20")}
                >
                  <MessageSquare className="w-6 h-6 text-primary" />
                </Button>
              </div>
            </div>
          </div>

          {/* Side Panel (Participants or Chat) */}
          {(showParticipants || showInMeetingChat) && (
            <div className="w-[400px] flex flex-col gap-6">
               <Card className="flex-1 glass-panel border-none rounded-[3rem] flex flex-col overflow-hidden">
                  <CardHeader className="p-8 border-b border-white/5">
                     <CardTitle className="text-sm font-black gold-text uppercase tracking-widest">
                       {showParticipants ? 'Troop Personnel' : 'Direct Comms'}
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 overflow-y-auto custom-scrollbar">
                     {showParticipants ? (
                       <div className="p-6 space-y-4">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                               <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8"><AvatarImage src={`https://picsum.photos/seed/p${i}/50`} /></Avatar>
                                  <span className="text-[10px] font-black uppercase text-white">Personnel {i}</span>
                               </div>
                               <div className="flex gap-2">
                                  <MicOff className="w-3 h-3 text-muted-foreground" />
                                  <VideoOff className="w-3 h-3 text-muted-foreground" />
                               </div>
                            </div>
                          ))}
                          <Button className="w-full mt-4 rounded-xl bg-primary text-black font-black uppercase text-[9px] tracking-widest h-11">
                             <UserPlus className="w-4 h-4 mr-2" /> Add Personnel
                          </Button>
                       </div>
                     ) : (
                       <div className="p-8 flex flex-col h-full">
                          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                             <div className="p-4 rounded-2xl bg-white/5 text-[10px] uppercase font-black text-muted-foreground italic">Meeting chat is active...</div>
                          </div>
                          <div className="mt-4 relative">
                             <Input placeholder="Message troop..." className="rounded-2xl bg-black/40 border-white/10 h-14 pl-6 pr-14 text-[10px] font-black uppercase" />
                             <Button size="icon" className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary text-black"><Send className="w-4 h-4" /></Button>
                          </div>
                       </div>
                     )}
                  </CardContent>
               </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black gold-text uppercase tracking-widest leading-none">Troop Comms</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-[0.2em] font-black mt-3">Unified Deployment & Collaboration Environment</p>
        </div>
        <div className="flex gap-4">
          <Button 
            className="rounded-[2rem] bg-primary text-black font-black uppercase tracking-widest h-14 px-10 shadow-2xl transition-transform active:scale-95"
            onClick={startMeeting}
          >
            <Video className="w-5 h-5 mr-3" /> Initialize Meet
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 space-y-8">
           <Card className="glass-panel border-none rounded-[3.5rem] p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-black uppercase tracking-widest gold-text">Deployment Plan</h3>
                 <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-4 py-1.5">4 Active Sessions</Badge>
              </div>
              
              <div className="space-y-4">
                 {[
                   { title: 'PIC - Patrol Inter Council', type: 'PIC', host: 'Asher Quinn', time: '14:00 Today', members: 12 },
                   { title: 'Pioneering Theory', type: 'Standard', host: 'Sophie Turner', time: '16:00 Today', members: 45 }
                 ].map((meet, i) => (
                   <div key={i} className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all cursor-pointer">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                          <Video className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-lg font-black uppercase tracking-tighter leading-none">{meet.title}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-3">Scheduled: {meet.time} • Host: {meet.host}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/10 rounded-2xl px-8 h-12">Join Link</Button>
                   </div>
                 ))}
              </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-panel border-none rounded-[3rem] p-8 border-l-4 border-l-primary">
                 <p className="text-[11px] font-black gold-text uppercase mb-2">PIC (Patrol Inter Council)</p>
                 <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-bold">Mandatory monthly session for all Patrol Leaders. Status: Due in 4 days.</p>
              </Card>
              <Card className="glass-panel border-none rounded-[3rem] p-8 border-l-4 border-l-blue-400">
                 <p className="text-[11px] font-black text-blue-400 uppercase mb-2">STPLM (Sub Troop PLC)</p>
                 <p className="text-[9px] text-muted-foreground uppercase leading-relaxed font-bold">Mandatory monthly sub-troop leader alignment. Status: Pending Jun 02.</p>
              </Card>
           </div>
        </div>

        <div className="space-y-8">
           <Card className="glass-panel border-none rounded-[3rem] p-8 space-y-6">
              <CardTitle className="text-sm font-black gold-text uppercase tracking-widest">Identity Search</CardTitle>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input placeholder="Search personnel..." className="pl-12 rounded-2xl bg-black/40 border-white/5 h-14 text-[10px] uppercase font-black" />
              </div>
              <div className="space-y-4">
                 {MOCK_SCOUTS.slice(0, 5).map(scout => (
                   <div key={scout.id} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                         <Avatar className="w-10 h-10 border border-white/10"><AvatarImage src={`https://picsum.photos/seed/${scout.id}/50`} /></Avatar>
                         <div>
                            <p className="text-[10px] font-black uppercase text-white leading-none">{scout.name}</p>
                            <p className="text-[8px] text-muted-foreground uppercase font-black mt-1.5">{scout.role}</p>
                         </div>
                      </div>
                      <Plus className="w-4 h-4 text-primary/30 group-hover:text-primary transition-colors" />
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="glass-panel border-none rounded-[3rem] bg-blue-500/5 p-8 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                 <Shield className="w-5 h-5" />
                 <p className="text-[10px] font-black uppercase tracking-widest">Protocol Rules</p>
              </div>
              <p className="text-[9px] text-muted-foreground uppercase font-black leading-relaxed">
                • STLs and above have direct initialization authority.<br/>
                • Hosts must select attendees from verified profiles.<br/>
                • Automatic 30m/10m push notifications for all participants.
              </p>
           </Card>
        </div>
      </div>
    </div>
  );
}
