'use server';
/**
 * @fileOverview An AI-powered tool that guides scout leaders on the necessary proficiency badges and their completion dates
 * for specific awards, ensuring compliance with award requirements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const knownBadgeCategories = {
  "Public Service": ["Linguist", "Missioner", "Fire-Fighter", "Signaller", "Cyclist", "Guide", "First Aid", "Life Saver", "Coxswain", "Jobman", "Ambulance", "Senior Organizer", "Civics"],
  "Camp Craft": ["Camper", "Cook", "Woodcraftsman", "Pioneer", "Backwoodsman", "Quarter Master", "Camp Warden"],
  "Practical Science": ["Gardener", "Astronomer", "Naturalist", "Scientist", "Electrician", "Home Electrician"],
  "Explorer": ["Explorer", "Hiker", "Navigator", "Orienteer"],
  "Better World Framework": ["World Friendship", "Environmentalist", "Community Developer", "Global Citizen", "Sustainable Development", "Scout of the World", "Messenger of Peace"],
  "Education": ["Reader", "Speaker", "Scholar", "Scribe", "Writer", "Artist", "Communicator", "Interpreter", "Computer", "Literacy", "Digital Citizen"],
  "Culture": ["Musician", "Folk Dancer", "Dramatist", "Culture and Heritage"],
  "Sports": ["Athlete", "Swimmer", "Cyclist", "Games Player", "Team Player", "Fitness"],
  "Happy Home": ["Junior Happy Home", "Senior Happy Home"],
  "Farmer": ["Farmer", "Agriculture"],
  "Venture": ["Venture", "Entrepreneur"],
  "Senior Saver": ["Senior Saver", "Personal Finance"],
};

const AwardPrerequisiteAdvisorInputSchema = z.object({
  awardName: z.enum([
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
  prompt: `You are an AI assistant specialized in Boy Scout award requirements.

Award Rules:
- Scout Award: "Junior Happy Home" OR "Senior Happy Home" + 2 badges NOT in Public Service or Camp Craft groups.
- CC's Award: First Aid + (Missioner OR Public Health OR Ambulance) + 1 from (Practical Science / Camp Craft / Explorer / Better World Framework).
- PM's Award: 1 from (Education / Culture / Senior Saver / Better World Framework - excl SOTW/MOP) + 1 from Sports + Farmer + Civics + Venture.
- President's Scout: Senior Happy Home + Ambulance (Repass) + (Quarter Master OR Camp Warden) + Senior Organizer + 1 from Public Service.

Categories:
${JSON.stringify(knownBadgeCategories, null, 2)}

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
