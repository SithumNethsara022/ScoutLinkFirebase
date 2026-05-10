
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, UserPlus, Crown, ShieldCheck, Plus, Search } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const MOCK_COMMITTEES = [
  { id: '1', name: 'IT Committee', chairman: 'Asher Quinn', members: 4, approved: true },
  { id: '2', name: 'Logistics Team', chairman: 'Ethan Hunt', members: 6, approved: true },
  { id: '3', name: 'Event Planning', chairman: 'Sarah Miller', members: 3, approved: false },
];

export default function CommitteesPage() {
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = () => {
    toast({ title: "Request Sent", description: "Committee creation request sent to Junior Troop Leader for approval." });
    setShowCreate(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest">Committees</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold">Troop specialized working groups</p>
        </div>
        <Button 
          className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-12 px-8"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="w-5 h-5 mr-2" /> Create Committee
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COMMITTEES.map((committee) => (
          <Card key={committee.id} className="glass-panel border-none rounded-[2.5rem] group hover:scale-[1.02] transition-transform">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                {!committee.approved && (
                   <span className="text-[8px] font-black uppercase bg-red-500/20 text-red-500 px-2 py-1 rounded-full">Pending Approval</span>
                )}
              </div>
              <CardTitle className="text-lg gold-text uppercase tracking-tighter mt-4">{committee.name}</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                <Crown className="w-3 h-3 text-primary" /> Chairman: {committee.chairman}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-3 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-8 h-8">
                    <AvatarImage src={`https://picsum.photos/seed/comm${i}/100`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold border-2 border-background">
                  +{committee.members}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl text-[10px] uppercase font-bold border-white/10 hover:bg-white/5">View Members</Button>
                <Button variant="outline" className="flex-1 rounded-xl text-[10px] uppercase font-bold border-white/10 hover:bg-white/5">Meetings</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md glass-panel border-none rounded-[3rem] p-10 space-y-6">
            <h3 className="text-2xl font-black gold-text uppercase tracking-tight text-center">New Committee</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Committee Name</Label>
                <Input placeholder="e.g. Fundraising Team" className="rounded-2xl bg-black/20 border-white/10 h-12" />
              </div>
              <div className="space-y-2">
                <Label>Initial Members</Label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search scouts..." className="rounded-2xl bg-black/20 border-white/10 h-12 pl-12" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
               <Button variant="ghost" className="flex-1 rounded-2xl h-12 uppercase font-bold" onClick={() => setShowCreate(false)}>Cancel</Button>
               <Button className="flex-[2] rounded-2xl h-12 bg-primary text-black font-black uppercase" onClick={handleCreate}>Request Approval</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
