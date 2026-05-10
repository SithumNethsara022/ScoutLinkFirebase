
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, CheckCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type MessageStatus = 'sending' | 'sent' | 'received' | 'seen';

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
  { id: '5', senderId: 'user', text: 'Actually, I might be 5 mins late.', timestamp: '10:10 AM', status: 'sending' },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState('Ethan Hunt');

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case 'sending': return 'text-red-500'; // Red if stuck/sending
      case 'sent': return 'text-yellow-500'; // Yellow if sent but not received
      case 'received': return 'text-blue-500'; // Blue if received but not seen
      case 'seen': return 'text-green-500'; // Green if seen
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 pb-6">
      {/* Sidebar - Contacts */}
      <div className="w-80 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search scouts..." className="pl-10 rounded-2xl bg-white/5 border-white/10 h-11" />
        </div>
        <Card className="flex-1 glass-panel border-none rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-2 space-y-1 overflow-y-auto">
            {['Ethan Hunt', 'Sarah Miller', 'Lucas Gray', 'Mark Anthony'].map(name => (
              <button
                key={name}
                onClick={() => setActiveChat(name)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-3xl transition-all",
                  activeChat === name ? "bg-primary text-black" : "hover:bg-white/5 text-foreground"
                )}
              >
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarImage src={`https://picsum.photos/seed/${name}/100`} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-left min-w-0">
                  <p className="font-bold text-sm truncate">{name}</p>
                  <p className={cn("text-[10px] truncate uppercase tracking-tighter", activeChat === name ? "text-black/60" : "text-muted-foreground")}>
                    Active 2m ago
                  </p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 glass-panel border-none rounded-[3rem] overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={`https://picsum.photos/seed/${activeChat}/100`} />
              <AvatarFallback>{activeChat[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-black gold-text uppercase tracking-widest text-sm">{activeChat}</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Patrol Leader • Eagles</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10">
             <User className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MOCK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[70%]",
                msg.senderId === 'user' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "px-5 py-3 rounded-[2rem] text-sm",
                  msg.senderId === 'user' ? "bg-primary text-black font-medium" : "bg-white/5 text-foreground border border-white/10"
                )}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-1 px-2">
                <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">{msg.timestamp}</span>
                {msg.senderId === 'user' && (
                  <CheckCheck className={cn("w-3 h-3", getStatusColor(msg.status))} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5">
          <div className="flex gap-4 items-center">
            <Input 
              placeholder="Type your message..." 
              className="flex-1 rounded-[2rem] bg-black/40 border-none h-14 px-6 text-sm placeholder:text-muted-foreground/30 focus-visible:ring-primary/20"
            />
            <Button size="icon" className="h-14 w-14 rounded-[2rem] bg-primary hover:bg-primary/90 text-black shadow-lg">
              <Send className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
