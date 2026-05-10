
import { ScoutProfile } from './types';

export const MOCK_SCOUTS: ScoutProfile[] = [];

export const AUTHORITY_CHART = {
  gsl: { name: 'To be assigned', position: 'GSL', contact: false },
  mic: { name: 'To be assigned', position: 'MIC', contact: false },
  leader: { id: '', name: 'To be assigned', position: 'Scout Leader', contact: false },
  asls: [],
  instructors: [],
  subTroops: [
    {
      name: 'Gold I',
      leader: 'To be assigned',
      patrols: []
    },
    {
      name: 'Gold II',
      leader: 'To be assigned',
      patrols: []
    },
    {
      name: 'Gold III',
      leader: 'To be assigned',
      patrols: []
    },
    {
      name: 'Gold IV',
      leader: 'To be assigned',
      patrols: []
    }
  ]
};
