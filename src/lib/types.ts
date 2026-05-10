
export type Role = 
  | 'Scout' 
  | 'Patrol Leader' 
  | 'Assistant Patrol Leader' 
  | 'Sub Troop Leader' 
  | 'Assistant Sub Troop Leader' 
  | 'Junior Troop Leader' 
  | 'Assistant Junior Troop Leader' 
  | 'Senior Scout' 
  | 'Instructor' 
  | 'Senior Troop Leader' 
  | 'Assistant Senior Troop Leader' 
  | 'Assistant Scout Leader' 
  | 'Scout Leader';

export interface ScoutProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  position?: string;
  grade: number;
  birthday: string;
  homeAddress: string;
  phoneNumber: string;
  parentsNames: string;
  profilePicUrl: string;
  onboarded: boolean;
  totalPoints: number;
  awards: any[];
  membershipNumber?: string;
  patrol?: string;
  subTroop?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
