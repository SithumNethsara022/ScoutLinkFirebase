
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, CheckCheck, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type MessageStatus = 'stuck' | 'sent' | 'received' | 'seen';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: MessageStatus;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', senderId: 'user', text: 'Hey, when is the next patrol meeting?', timestamp: '10:00 AM', status: 'seen' },
  { id: '2', senderId: 'other', text: 'It is scheduled for this Wednesday at 1400 hrs.', timestamp: '10:02 AM', status: 'seen' },
  { id: '3', senderId: 'user', text: 'Got it. I will bring the ropes for Pioneering.', timestamp: '10:05 AM', status: 'received' },
  { id: '4', senderId: 'user', text: 'Can we also discuss the Cantlay Challenge?', timestamp: '10:06 AM', status: 'sent' },
  { id: '5', senderId: 'user', text: 'Actually, I might be 5 mins late.', timestamp: '10:10 AM', status: 'stuck' },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState('Ethan Hunt');

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case 'stuck': return 'text-red-500'; // Red: Failed/Stuck
      case 'sent': return 'text-yellow-500'; // Yellow: Sent
      case 'received': return 'text-blue-500'; // Blue: Received
      case 'seen': return 'text-green-500'; // Green: Seen
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-8 pb-6">
      {/* Contacts Column */}
      <div className="w-80 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search troop..." className="pl-12 rounded-2xl bg-white/5 border-white/10 h-14 text-[10px] uppercase font-black" />
        </div>
        <Card className="flex-1 glass-panel border-none rounded-[3rem] overflow-hidden">
          <CardContent className="p-3 space-y-2 overflow-y-auto custom-scrollbar">
            {['Ethan Hunt', 'Sarah Miller', 'Lucas Gray', 'Mark Anthony'].map(name => (
              <button
                key={name}
                onClick={() => setActiveChat(name)}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all relative group",
                  activeChat === name ? "bg-primary text-black" : "hover:bg-white/5 text-foreground"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11 border border-white/10">
                    <AvatarImage src={`https://picsum.photos/seed/${name}/100`} />
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-black text-xs uppercase tracking-tighter truncate">{name}</p>
                  <p className={cn("text-[9px] truncate uppercase font-bold tracking-widest", activeChat === name ? "text-black/60" : "text-muted-foreground")}>
                    Active 2m ago
                  </p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Conversation Area */}
      <Card className="flex-1 glass-panel border-none rounded-[3.5rem] overflow-hidden flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-5">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src={`https://picsum.photos/seed/${activeChat}/100`} />
            </Avatar>
            <div>
              <h3 className="font-black gold-text uppercase tracking-widest text-lg leading-none">{activeChat}</h3>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2">Patrol Leader • Eagles</p>
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10 h-12 w-12 border border-white/5">
                <User className="w-5 h-5 text-primary" />
             </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {MOCK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[70%] group",
                msg.senderId === 'user' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "px-8 py-5 rounded-[2.5rem] text-[13px] leading-relaxed",
                  msg.senderId === 'user' 
                    ? "bg-primary text-black font-black" 
                    : "bg-white/5 text-foreground border border-white/10"
                )}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-3 mt-2 px-4">
                <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                  {msg.timestamp}
                </span>
                {msg.senderId === 'user' && (
                  <CheckCheck className={cn("w-4 h-4", getStatusColor(msg.status))} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-white/[0.02] border-t border-white/5">
          <div className="flex gap-4 items-center">
            <Input 
              placeholder="Type your transmission..." 
              className="flex-1 rounded-[2.5rem] bg-black/40 border-none h-16 px-10 text-sm placeholder:text-muted-foreground/30 focus-visible:ring-primary/20"
            />
            <Button size="icon" className="h-16 w-16 rounded-[2.5rem] bg-primary hover:bg-primary/90 text-black shadow-2xl transition-transform active:scale-90 shrink-0">
              <Send className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
