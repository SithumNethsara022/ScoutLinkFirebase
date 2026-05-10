
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search, User, MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const contacts: any[] = [];
  const messages: any[] = [];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-8 pb-6">
      <div className="w-80 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search troop..." className="pl-12 rounded-2xl bg-white/5 border-white/10 h-14 text-[10px] uppercase font-black" />
        </div>
        <Card className="flex-1 glass-panel border-none rounded-[3rem] overflow-hidden flex flex-col justify-center items-center opacity-20 p-8 text-center">
          <MessageCircle className="w-12 h-12 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">No active contacts</p>
        </Card>
      </div>

      <Card className="flex-1 glass-panel border-none rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center">
        {activeChat ? (
          <div className="flex flex-col h-full w-full">
            {/* Active chat UI */}
          </div>
        ) : (
          <div className="text-center opacity-20">
            <User className="w-20 h-20 mx-auto mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest">Select a scout to begin transmission</p>
          </div>
        )}
      </Card>
    </div>
  );
}
