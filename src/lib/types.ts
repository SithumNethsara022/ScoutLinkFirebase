
export type Role = 'Scout' | 'Senior Scout' | 'Instructor' | 'Asst Scout Leader' | 'Scout Leader' | 'Admin';

export type SubTroop = 'Gold I' | 'Gold II' | 'Gold III' | 'Gold IV';
export type Patrol = 'Kingfishers' | 'Eagles' | 'Seagulls' | 'Woodpeckers' | 'Parrots' | 'Salalihini' | 'Buzzards' | 'Hawks' | 'Falcons' | 'Swans' | 'Peacocks' | 'Flamingo';

export interface Award {
  name: string;
  passingDate: string;
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
  role: Role;
  position: string;
  extraPositions?: string[];
  subTroop?: SubTroop;
  patrol?: Patrol;
  grade: number;
  homeAddress: string;
  phoneNumber: string;
  awards: Award[];
  badges: ProficiencyBadge[];
  attendancePoints: number;
  disciplinePoints: number;
  eventPoints: number;
  totalPoints: number;
  committees?: string[];
}

export type EventType = 
  | 'troop' 
  | 'district' 
  | 'national' 
  | 'international' 
  | 'district committee' 
  | 'national committee';

export interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  type: EventType;
}

export interface Meeting {
  id: string;
  title: string;
  hostId: string;
  scheduledAt: string;
  duration: number;
  reason: string;
  attendees: string[];
  status: 'Scheduled' | 'Live' | 'Ended';
}

export interface Committee {
  id: string;
  name: string;
  chairmanId: string;
  members: string[];
  approved: boolean;
}
