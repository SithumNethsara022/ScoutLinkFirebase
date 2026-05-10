
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
  membershipNumber?: string;
}

export interface ProficiencyBadge {
  name: string;
  code: string;
  type: 'Junior' | 'Senior';
  category: string;
  passingDate: string;
}

export interface EventParticipation {
  id: string;
  name: string;
  date: string;
  type: 'Troop' | 'District' | 'National' | 'International' | 'District Committee' | 'National Committee';
  place: '1st' | '2nd' | '3rd' | '4th' | '5th' | 'Participation' | 'Above Minimum';
  points: number;
  confirmed: boolean;
}

export interface ScoutProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  position: string;
  extraPositions?: string[];
  subTroop?: SubTroop;
  patrol?: Patrol;
  grade: number;
  birthday: string;
  homeAddress: string;
  phoneNumber: string;
  parentsNames: string;
  awards: AwardProgress[];
  badges: ProficiencyBadge[];
  eventHistory: EventParticipation[];
  totalPoints: number;
  patrolPoints: number;
  subTroopPoints: number;
  status: 'Pending' | 'Approved';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'Award' | 'Badge' | 'Discipline' | 'Event' | 'System';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
