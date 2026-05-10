export type Role = 'Scout' | 'Senior Scout' | 'Instructor' | 'Asst Scout Leader' | 'Scout Leader' | 'Admin';

export type SubTroop = 'Sub Troop A' | 'Sub Troop B' | 'Sub Troop C' | 'Sub Troop D';
export type Patrol = 'Tiger' | 'Eagle' | 'Cobra' | 'Woodpecker' | 'Lion' | 'Wolf' | 'Panther' | 'Rhino';

export interface Award {
  name: string;
  passingDate: string;
}

export interface ProficiencyBadge {
  name: string;
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

export interface ParticipationRecord {
  id: string;
  scoutId: string;
  eventName: string;
  date: string;
  place: '1st' | '2nd' | '3rd' | '4th' | '5th' | 'participation' | 'above minimum';
  type: EventType;
  confirmed: boolean;
}