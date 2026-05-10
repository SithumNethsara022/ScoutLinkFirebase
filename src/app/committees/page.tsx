
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, UserPlus, Crown, ShieldCheck, Plus, Search, X, Settings, UserCog, Video } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { MOCK_SCOUTS } from '@/lib/mock-data';

const MOCK_COMMITTEES = [
  { 
    id: '1', 
    name: 'IT & Digital Strategy', 
    chairman: 'Asher Quinn', 
    chairmanId: '1',
    members: [
      { userId: '2', role: 'Dev Lead' },
      { userId: '3', role: 'UI Architect' }
    ], 
    approved: true 
  },
  { 
    id: '2', 
    name: 'Logistics Team', 
    chairman: 'Ethan Hunt', 
    chairmanId: '2',
    members: [
      { userId: '1', role: 'Procurement' }
    ], 
    approved: true 
  },
];

export default function CommitteesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<typeof MOCK_SCOUTS>([]);

  // Simulation of current user
  const CURRENT_USER_ID = '1';
  const USER_ROLE = 'Scout Leader';

  const handleCreate = () => {
    toast({ 
      title: "Request Transmitted", 
      description: "Committee approval request sent to Junior Troop Leader and higher ranks." 
    });
    setShowCreate(false);
  };

  const handleMemberSelect = (scout: typeof MOCK_SCOUTS[0]) => {
    if (selectedMembers.find(p => p.id === scout.id)) return;
    setSelectedMembers([...selectedMembers, scout]);
    setSearchQuery('');
  };

  const filteredScouts = searchQuery 
    ? MOCK_SCOUTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Working Groups</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-black mt-2">Specialized Troop Committees & Task Forces</p>
        </div>
        <Button 
          className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-12 px-8 shadow-xl"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="w-5 h-5 mr-2" /> New Committee
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COMMITTEES.map((committee) => {
          const isChairman = committee.chairmanId === CURRENT_USER_ID;
          return (
            <Card key={committee.id} className="glass-panel border-none rounded-[3rem] group hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  {isChairman && (
                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none text-[8px] font-black uppercase">Your Committee</Badge>
                  )}
                </div>
                <CardTitle className="text-xl gold-text uppercase tracking-tighter mt-6">{committee.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                   <Crown className="w-3 h-3 text-primary" />
                   <p className="text-[10px] uppercase font-black text-muted-foreground">Chairman: {committee.chairman}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex -space-x-4 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <Avatar key={i} className="border-4 border-[#05140d] w-10 h-10 shadow-xl">
                      <AvatarImage src={`https://picsum.photos/seed/comm${committee.id}${i}/100`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black border-4 border-[#05140d] text-muted-foreground">
                    +{committee.members.length}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="ghost" className="rounded-xl h-11 text-[9px] uppercase font-black tracking-widest bg-white/5 border border-white/5 hover:bg-white/10">Members</Button>
                  {isChairman ? (
                    <Button variant="ghost" className="rounded-xl h-11 text-[9px] uppercase font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                       <UserCog className="w-3 h-3 mr-1" /> Roles
                    </Button>
                  ) : (
                    <Button variant="ghost" className="rounded-xl h-11 text-[9px] uppercase font-black tracking-widest bg-white/5 border border-white/5">Details</Button>
                  )}
                </div>

                {isChairman && (
                   <div className="pt-2 flex gap-3">
                      <Button className="flex-1 rounded-xl h-11 bg-primary text-black font-black uppercase text-[9px] tracking-widest gap-2">
                        <Video className="w-3 h-3" /> Meet Now
                      </Button>
                      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white/5 border border-white/5 text-muted-foreground">
                         <Settings className="w-4 h-4" />
                      </Button>
                   </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <Card className="w-full max-w-xl glass-panel border-none rounded-[3rem] p-12 space-y-8 shadow-2xl">
            <header className="flex justify-between items-center">
               <h3 className="text-2xl font-black gold-text uppercase tracking-tight">Form New Committee</h3>
               <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => setShowCreate(false)}>
                  <X className="w-6 h-6" />
               </Button>
            </header>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Committee Intent / Name</Label>
                <Input placeholder="e.g. 2026 Jamboree Planning" className="rounded-2xl bg-black/20 border-white/5 h-14" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Select Founding Members (Profiles)</Label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name..." 
                    className="rounded-2xl bg-black/20 border-white/5 h-14 pl-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#0d281a] border border-white/10 rounded-2xl shadow-2xl z-20 max-h-48 overflow-y-auto p-2 space-y-1">
                       {filteredScouts.map(s => (
                         <button 
                            key={s.id}
                            className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-colors"
                            onClick={() => handleMemberSelect(s)}
                         >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://picsum.photos/seed/mem${s.id}/50`} />
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
                  {selectedMembers.map(p => (
                    <Badge key={p.id} className="bg-white/5 text-foreground border border-white/10 rounded-lg py-2 px-4 gap-2 text-[8px] uppercase font-black">
                      {p.name}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMembers(selectedMembers.filter(m => m.id !== p.id))} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               <Button variant="ghost" className="flex-1 rounded-2xl h-14 uppercase font-black tracking-widest border border-white/5" onClick={() => setShowCreate(false)}>Cancel</Button>
               <Button className="flex-[2] rounded-2xl h-14 bg-primary text-black font-black uppercase tracking-widest shadow-xl" onClick={handleCreate}>Send for Approval</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
