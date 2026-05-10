
export function calculateGrade(birthday: string): number {
  const birthDate = new Date(birthday);
  const currentYear = new Date().getFullYear();
  let birthYear = birthDate.getFullYear();
  
  // Rule: If born in January, count as the previous year for grade logic
  if (birthDate.getMonth() === 0) {
    birthYear -= 1;
  }

  // Logic: 2011 -> Grade 10 in 2026.
  // Formula for 2026: Grade = 10 + (2011 - birthYear)
  // General Formula: Grade = 10 + (2011 - birthYear) + (currentYear - 2026)
  const grade = 10 + (2011 - birthYear) + (currentYear - 2026);
  
  return grade;
}

export function getSubTroopForPatrol(patrolName: string): string {
  const mapping: Record<string, string> = {
    'Kingfishers': 'Gold I',
    'Eagles': 'Gold I',
    'Seagulls': 'Gold I',
    'Woodpeckers': 'Gold II',
    'Parrots': 'Gold II',
    'Salalihini': 'Gold II',
    'Buzzards': 'Gold III',
    'Hawks': 'Gold III',
    'Falcons': 'Gold III',
    'Swans': 'Gold IV',
    'Peacocks': 'Gold IV',
    'Flamingo': 'Gold IV',
  };
  return mapping[patrolName] || 'Gold I';
}
