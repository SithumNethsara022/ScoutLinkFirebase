"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, MapPin, Trophy, Flag, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Participation Logged",
        description: "Your record has been sent to Senior Scouts for confirmation.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-bold gold-text">Events & Participation</h2>
        <p className="text-muted-foreground">Log your event participation to earn individual and patrol points.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-lg">Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-border/20 bg-muted/10"
              />
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40">
             <CardHeader>
               <CardTitle className="text-lg flex items-center gap-2">
                 <Flag className="w-5 h-5 text-primary" />
                 Upcoming Events
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="flex gap-4 items-start">
                  <div className="p-2 rounded bg-primary/20 text-primary text-center min-w-[50px]">
                    <span className="block text-xs uppercase">May</span>
                    <span className="block text-xl font-bold">12</span>
                  </div>
                  <div>
                    <p className="font-semibold">Job Week 2024</p>
                    <p className="text-xs text-muted-foreground">National Event • All Sub-Troops</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="p-2 rounded bg-muted/20 text-muted-foreground text-center min-w-[50px]">
                    <span className="block text-xs uppercase">May</span>
                    <span className="block text-xl font-bold">28</span>
                  </div>
                  <div>
                    <p className="font-semibold">District Hiking Trial</p>
                    <p className="text-xs text-muted-foreground">District Event • Registered Patrols</p>
                  </div>
               </div>
             </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-card border-border/40 h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Log Event Participation
              </CardTitle>
              <CardDescription>Records are verified by Senior Scouts. Job Week defaults to 'Above Minimum'.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label>Event Name</Label>
                   <Select>
                     <SelectTrigger>
                       <SelectValue placeholder="Select from Calendar" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="Job Week 2024">Job Week 2024</SelectItem>
                       <SelectItem value="Cantlay Challenge Shield">Cantlay Challenge Shield</SelectItem>
                       <SelectItem value="National Jamboree">National Jamboree</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label>Date of Event</Label>
                   <Input type="date" />
                 </div>
                 <div className="space-y-2">
                   <Label>Event Type</Label>
                   <Select>
                     <SelectTrigger>
                       <SelectValue placeholder="Select Type" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="troop">Troop Event</SelectItem>
                       <SelectItem value="district">District Event</SelectItem>
                       <SelectItem value="national">National Event</SelectItem>
                       <SelectItem value="international">International Event</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label>Place / Achievement</Label>
                   <Select>
                     <SelectTrigger>
                       <SelectValue placeholder="Select Place" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1st">1st Place</SelectItem>
                       <SelectItem value="2nd">2nd Place</SelectItem>
                       <SelectItem value="3rd">3rd Place</SelectItem>
                       <SelectItem value="participation">Participation</SelectItem>
                       <SelectItem value="above minimum">Above Minimum (Job Week)</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Input placeholder="Additional details about your role or contribution" />
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Logging..." : "Submit for Confirmation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}