
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

export type SubTroop = 'Gold I' | 'Gold II' | 'Gold III' | 'Gold IV';
export type Patrol = 'Kingfishers' | 'Eagles' | 'Seagulls' | 'Woodpeckers' | 'Parrots' | 'Salalihini' | 'Buzzards' | 'Hawks' | 'Falcons' | 'Swans' | 'Peacocks' | 'Flamingo';

export interface AwardProgress {
  name: string;
  status: 'Not Started' | 'Test Passing' | 'Instructor Interview Pending' | 'Scout Leader Interview Pending' | 'ADC Interview Pending' | 'Passed';
  hikeDone?: boolean;
  badgesDone?: boolean;
  passingDate?: string;
  membershipNumber?: string; // Format: xx/xxxx/xx/(J or S)
}

export interface ProficiencyBadge {
  name: string;
  code: string;
  type: 'Junior' | 'Senior';
  category: string;
  passingDate: string;
}

export interface ScoutProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  position: string;
  subTroop?: SubTroop;
  patrol?: Patrol;
  grade: number;
  birthday: string;
  homeAddress: string;
  phoneNumber: string;
  parentsNames: string;
  awards: AwardProgress[];
  badges: ProficiencyBadge[];
  totalPoints: number;
  profilePicUrl?: string;
  committees?: string[];
  status: 'Pending' | 'Approved';
}

export interface Report {
  id: string;
  title: string;
  authorId: string;
  dateOfEvent: string;
  description: string;
  documentUrl?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  scope: 'Patrol' | 'SubTroop' | 'Troop';
  targetId?: string; // Patrol ID or SubTroop ID
  readBy: string[];
  archivedBy: string[];
  createdAt: string;
}
