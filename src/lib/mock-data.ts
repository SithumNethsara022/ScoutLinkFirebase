import { ScoutProfile, Role } from './types';

export const MOCK_SCOUTS: ScoutProfile[] = [
  {
    id: '1',
    name: 'Asher Quinn',
    role: 'Scout Leader',
    position: 'Scout Leader',
    grade: 12,
    homeAddress: '123 Forest Trail, Greenwoods',
    phoneNumber: '+1-555-0101',
    awards: [
      { name: 'Membership', passingDate: '2018-05-20' },
      { name: 'Scout Award', passingDate: '2019-06-15' },
      { name: "Chief Commissioner's Award", passingDate: '2020-08-10' },
      { name: "Prime Minister's Award", passingDate: '2021-12-05' },
      { name: "President's Scout Award", passingDate: '2023-01-20' },
    ],
    badges: [
      { name: 'First Aid', category: 'Public Service', passingDate: '2019-01-10' },
      { name: 'Cook', category: 'Camp Craft', passingDate: '2019-02-15' },
    ],
    attendancePoints: 120,
    disciplinePoints: 0,
    eventPoints: 340,
    totalPoints: 850,
  },
  {
    id: '2',
    name: 'Ethan Hunt',
    role: 'Senior Scout',
    position: 'Troop Leader',
    subTroop: 'Sub Troop A',
    patrol: 'Tiger',
    grade: 11,
    homeAddress: '456 Ridge Path, Heights',
    phoneNumber: '+1-555-0102',
    awards: [
      { name: 'Membership', passingDate: '2020-05-20' },
      { name: 'Scout Award', passingDate: '2021-06-15' },
    ],
    badges: [
      { name: 'Swimmer', category: 'Sports', passingDate: '2020-08-10' },
    ],
    attendancePoints: 95,
    disciplinePoints: -5,
    eventPoints: 210,
    totalPoints: 450,
  },
  {
    id: '3',
    name: 'Sarah Miller',
    role: 'Scout',
    position: 'Patrol Leader',
    subTroop: 'Sub Troop B',
    patrol: 'Eagle',
    grade: 10,
    homeAddress: '789 Oak Lane, Valley',
    phoneNumber: '+1-555-0103',
    awards: [
      { name: 'Membership', passingDate: '2022-01-10' },
    ],
    badges: [],
    attendancePoints: 45,
    disciplinePoints: 0,
    eventPoints: 85,
    totalPoints: 240,
  }
];

export const AUTHORITY_CHART = {
  gsl: { name: 'Dr. Robert Harrison', position: 'GSL', contact: false },
  mic: { name: 'Mrs. Linda Foster', position: 'MIC', contact: false },
  leader: { id: '1', name: 'Asher Quinn', position: 'Scout Leader', contact: true },
  asls: [
    { name: 'James Wilson', position: 'ASL', contact: true },
    { name: 'Mary Chen', position: 'ASL', contact: true },
  ],
  instructors: [
    { name: 'David Lee', position: 'STL', contact: true },
    { name: 'Sophie Turner', position: 'Badge Secretary', contact: true },
  ],
  subTroops: [
    {
      name: 'Sub Troop A',
      leader: 'Mark Anthony',
      patrols: [
        { name: 'Tiger', leader: 'Ethan Hunt', assistant: 'Leo G' },
        { name: 'Eagle', leader: 'Chris P', assistant: 'Alex D' },
      ]
    },
    {
      name: 'Sub Troop B',
      leader: 'Sarah Jane',
      patrols: [
        { name: 'Cobra', leader: 'John D', assistant: 'Mike S' },
        { name: 'Woodpecker', leader: 'Emily R', assistant: 'Toby F' },
      ]
    }
  ]
};