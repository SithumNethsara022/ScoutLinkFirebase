
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CommitteesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const committees: any[] = [];

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gold-text uppercase tracking-widest leading-none">Working Groups</h2>
          <p className="text-muted-foreground uppercase text-[10px] tracking-widest font-black mt-2">Specialized Troop Committees</p>
        </div>
        <Button 
          className="rounded-2xl bg-primary text-black font-black uppercase tracking-widest h-12 px-8 shadow-xl"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="w-5 h-5 mr-2" /> New Committee
        </Button>
      </header>

      {committees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Committee Cards */}
        </div>
      ) : (
        <Card className="glass-panel border-none rounded-[3rem] p-20 text-center opacity-20">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <p className="text-[10px] font-black uppercase tracking-widest">No active committees found</p>
        </Card>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <Card className="w-full max-w-xl glass-panel border-none rounded-[3rem] p-12 space-y-8 shadow-2xl">
            <header className="flex justify-between items-center">
               <h3 className="text-2xl font-black gold-text uppercase tracking-tight">Form New Committee</h3>
               <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => setShowCreate(false)}>
                  <X className="w-6 h-6" />
               </Button>
            </header>
            <p className="text-muted-foreground text-sm">Please search and select members to form a new committee.</p>
            <Button className="w-full h-14 bg-primary text-black font-black uppercase rounded-2xl" onClick={() => setShowCreate(false)}>
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
