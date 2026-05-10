"use client";

import { use, useState } from 'react';
import { MOCK_SCOUTS } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, 
  Phone, 
  MapPin, 
  Award as AwardIcon, 
  BookOpen, 
  Edit3, 
  Save,
  ShieldAlert,
  CalendarCheck
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const scout = MOCK_SCOUTS.find(s => s.id === id) || MOCK_SCOUTS[0];
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(scout);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your personal details have been securely saved.",
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="forest-gradient border-border/40 text-center overflow-hidden">
             <div className="h-24 bg-primary/20 relative">
               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                 <div className="w-24 h-24 rounded-full border-4 border-background bg-card overflow-hidden">
                   <img src={`https://picsum.photos/seed/${profile.name}/200`} alt={profile.name} className="w-full h-full object-cover" />
                 </div>
               </div>
             </div>
             <CardContent className="pt-16 pb-6">
               <h2 className="text-2xl font-bold gold-text">{profile.name}</h2>
               <p className="text-muted-foreground italic mb-4">{profile.position}</p>
               <div className="flex flex-wrap justify-center gap-2">
                 <Badge variant="secondary">{profile.role}</Badge>
                 {profile.patrol && <Badge variant="outline">{profile.patrol} Patrol</Badge>}
                 {profile.subTroop && <Badge variant="outline">{profile.subTroop}</Badge>}
               </div>
             </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Scout Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Points</p>
                <p className="text-xl font-bold gold-text">{profile.totalPoints}</p>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Badges</p>
                <p className="text-xl font-bold gold-text">{profile.badges.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-muted/20">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="badges">Badges & Awards</TabsTrigger>
              <TabsTrigger value="participation">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card className="bg-card border-border/40">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <><Save className="w-4 h-4 mr-2" /> Save Changes</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={profile.name} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="phone" className="pl-10" value={profile.phoneNumber} disabled={!isEditing} />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Home Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input id="address" className="pl-10" value={profile.homeAddress} disabled={!isEditing} />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="extra">Extra Positions</Label>
                      <Input id="extra" value={profile.extraPositions?.join(', ') || 'None'} disabled={!isEditing} placeholder="e.g. IT Committee Chairman" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-card border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AwardIcon className="w-5 h-5 text-amber-500" />
                      Award Progression
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-border/50 ml-4 space-y-8 py-2">
                      {profile.awards.map((award, idx) => (
                        <div key={award.name} className="relative pl-8">
                          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                          <div>
                            <p className="font-semibold text-primary">{award.name}</p>
                            <p className="text-sm text-muted-foreground">Passed: {award.passingDate}</p>
                          </div>
                        </div>
                      ))}
                      {profile.awards.length < 5 && (
                        <div className="relative pl-8 grayscale opacity-50">
                          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-muted border-4 border-background" />
                          <div>
                            <p className="font-semibold">Next Award Target</p>
                            <p className="text-sm">In Progress...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      Proficiency Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profile.badges.length > 0 ? profile.badges.map((badge) => (
                        <div key={badge.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20">
                          <div className="w-10 h-10 rounded-md bg-card flex items-center justify-center border border-primary/20">
                             <AwardIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{badge.name}</p>
                            <p className="text-[10px] uppercase text-muted-foreground">{badge.category}</p>
                          </div>
                        </div>
                      )) : (
                        <p className="text-muted-foreground text-sm col-span-2">No proficiency badges logged yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participation" className="mt-6">
               <Card className="bg-card border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-green-500" />
                      Logged Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/20">
                      <div>
                        <p className="font-semibold">Cantlay Challenge Shield</p>
                        <p className="text-sm text-muted-foreground">2nd Place • 15 Apr 2024</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">Confirmed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/20">
                      <div>
                        <p className="font-semibold">District Camp</p>
                        <p className="text-sm text-muted-foreground">Participation • 02 Mar 2024</p>
                      </div>
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">Pending Approval</Badge>
                    </div>
                  </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}