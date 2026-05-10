
export function calculateGrade(birthday: string): number {
  if (!birthday) return 0;
  
  const birthDate = new Date(birthday);
  const currentYear = new Date().getFullYear();
  let effectiveBirthYear = birthDate.getFullYear();
  
  // Rule: If born in January, count as the previous year for grade logic
  // User specific example: "2012 January count as 2010" implies a 2-year lookback or just previous "school year" logic.
  // We'll follow the primary rule: January births = effective birth year - 1.
  if (birthDate.getMonth() === 0) {
    effectiveBirthYear -= 1;
  }

  // Logic: 2011 -> Grade 10 in 2026.
  // Formula: Grade = 10 + (2011 - effectiveBirthYear) + (currentYear - 2026)
  let grade = 10 + (2011 - effectiveBirthYear) + (currentYear - 2026);
  
  // Cap the grade at 13 as requested
  return Math.min(grade, 13);
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
