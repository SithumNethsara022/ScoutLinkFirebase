'use server';
/**
 * @fileOverview An AI-powered tool that guides scout leaders on the necessary proficiency badges and their completion dates
 * for specific awards, ensuring compliance with award requirements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const knownBadgeCategories = {
  "Public Service": ["Interpreter", "Public Health", "Fireman", "Leading Signaller", "Dispatch Rider", "Path Finder", "Ambulance", "Rescuer", "Pilot", "Handyman", "Civics"],
  "Camp Craft": ["Camp Warden", "Master Cook", "Naturalist", "Senior Pioneer", "Venturer", "Quarter Master"],
  "Practical Science": ["Gardener", "Astronomer", "Naturalist", "Scientist", "Electrician", "Home Electrician", "Aircraft Constructor", "Radio Mechanic", "Photographer", "Motor Mechanic"],
  "Explorer": ["Tracker", "Hiker", "Navigator", "Orienteer", "Surveyor", "Meteorologist", "Observer", "Stalker", "Map Maker", "Starman", "Weatherman"],
  "Better World Framework": ["World Friendship", "Environmentalist", "Community Developer", "Global Citizen", "Sustainable Development", "Scout of the World", "Messenger of Peace", "Messengers of Peace", "Champions for Nature", "Patrimonito Scout Badge", "Tide Turners Plastic Challenge", "Scouts Go Solar"],
  "Education": ["Bookman", "Orator", "Senior Scholar", "Clerk", "Reader", "Speaker", "Scholar", "Scribe", "Writer", "Artist", "Communicator", "Interpreter", "Computer", "Literacy", "Digital Citizen"],
  "Culture": ["Artist", "Musician", "Play Actor", "Folk Dancer", "Dramatist", "Culture and Heritage", "Designer", "Music Maker", "Actor", "Modeller", "Dancer"],
  "Sports": ["Athlete", "Swimmer", "Sportsman", "Horseman", "Archery", "Games Player", "Team Player", "Fitness", "Senior Athlete", "Master Swimmer", "Master Sportsman"],
  "Happy Home": ["Junior Happy Home", "Senior Happy Home"],
  "Family Life": ["Junior Saver", "Senior Saver", "Personal Finance"],
};

const AwardPrerequisiteAdvisorInputSchema = z.object({
  awardName: z.enum([
    "Membership Award",
    "Scout Award",
    "Chief Commissioner's Award",
    "Prime Minister's Award",
    "President's Scout Award",
  ]).describe('The name of the award for which to advise on prerequisites.'),
  scoutProficiencyBadges: z.array(z.string()).describe('A list of proficiency badges the scout has already completed.'),
});
export type AwardPrerequisiteAdvisorInput = z.infer<typeof AwardPrerequisiteAdvisorInputSchema>;

const RequiredBadgeSchema = z.object({
  name: z.string().describe('The name of the specific proficiency badge or a description of a category requirement.'),
  category: z.string().optional(),
  isCompleted: z.boolean(),
  notes: z.string().optional(),
});

const AwardPrerequisiteAdvisorOutputSchema = z.object({
  awardName: z.string(),
  requiredBadges: z.array(RequiredBadgeSchema),
  overallGuidance: z.string().optional(),
});
export type AwardPrerequisiteAdvisorOutput = z.infer<typeof AwardPrerequisiteAdvisorOutputSchema>;

export async function awardPrerequisiteAdvisor(input: AwardPrerequisiteAdvisorInput): Promise<AwardPrerequisiteAdvisorOutput> {
  return awardPrerequisiteAdvisorFlow(input);
}

const awardPrerequisiteAdvisorPrompt = ai.definePrompt({
  name: 'awardPrerequisiteAdvisorPrompt',
  input: {schema: AwardPrerequisiteAdvisorInputSchema},
  output: {schema: AwardPrerequisiteAdvisorOutputSchema},
  prompt: `You are an AI assistant specialized in Boy Scout award requirements for the 42nd Colombo Gold Troop.

Award Rules:
- Scout Award: "Junior Happy Home" OR "Senior Happy Home" + 2 badges NOT in Public Service or Camp Craft groups.
- CC's Award: First Aid + (Missioner OR Public Health OR Ambulance) + 1 from (Practical Science / Camp Craft / Explorer / Better World Framework).
- PM's Award: 1 from (Education / Culture / Senior Saver / Better World Framework - excluding Scout of the World or Messenger of Peace) + 1 from Sports + Farmer + Civics + Venture.
- President's Scout: Senior Happy Home + Ambulance (Repass) + (Quarter Master OR Camp Warden) + Senior Organizer + 1 from Public Service.

Categories:
${JSON.stringify(knownBadgeCategories, null, 2)}

Instructions:
1. Compare the 'scoutProficiencyBadges' with the requirements for the 'awardName'.
2. List each required badge or category, indicating 'isCompleted' true if the scout has it.
3. Provide guidance on what is missing.

Award Name: {{{awardName}}}
Scout's Badges: {{{scoutProficiencyBadges}}}
`,
});

const awardPrerequisiteAdvisorFlow = ai.defineFlow(
  {
    name: 'awardPrerequisiteAdvisorFlow',
    inputSchema: AwardPrerequisiteAdvisorInputSchema,
    outputSchema: AwardPrerequisiteAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await awardPrerequisiteAdvisorPrompt(input);
    return output!;
  }
);
