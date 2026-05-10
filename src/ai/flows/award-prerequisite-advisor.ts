'use server';
/**
 * @fileOverview An AI-powered tool that guides scout leaders on the necessary proficiency badges and their completion dates
 * for specific awards, ensuring compliance with award requirements.
 *
 * - awardPrerequisiteAdvisor - A function that handles the award prerequisite advising process.
 * - AwardPrerequisiteAdvisorInput - The input type for the awardPrerequisiteAdvisor function.
 * - AwardPrerequisiteAdvisorOutput - The return type for the awardPrerequisiteAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define known badge categories and example badges within them for the AI's reference.
// This list helps the AI categorize the scout's existing badges and determine if category-based requirements are met.
const knownBadgeCategories = {
  "Public Service": ["First Aid", "Missioner", "Public Health", "Ambulance", "Senior Organizer", "Civics", "Fireman", "Policeman", "Community Developer"],
  "Camp Craft": ["Cook", "Campcraft", "Backwoodsman", "Pioneer", "Quarter Master", "Camp Warden"],
  "Practical Science": ["Gardener", "Astronomer", "Naturalist", "Scientist", "Electrician", "Home Electrician"],
  "Explorer": ["Explorer", "Hiker", "Navigator", "Orienteer"],
  "Better World Framework": ["World Friendship", "Environmentalist", "Community Developer", "Global Citizen", "Sustainable Development", "Scout of the World", "Messenger of Peace"],
  "Education": ["Reader", "Writer", "Artist", "Communicator", "Interpreter", "Computer", "Literacy", "Digital Citizen"],
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
  name: z.string().describe('The name of the specific proficiency badge (e.g., "First Aid") or a description of a category requirement (e.g., "One from Sports category").'),
  category: z.string().optional().describe('The general category of the badge, if applicable (e.g., "Public Service", "Camp Craft", "Sports"). This field is optional and may not be present for generic category requirements.'),
  isCompleted: z.boolean().describe('True if the scout has already completed this specific badge or met this category requirement, otherwise false.'),
  notes: z.string().optional().describe('Any specific guidance or details for this badge or category requirement.'),
});

const AwardPrerequisiteAdvisorOutputSchema = z.object({
  awardName: z.string().describe('The name of the award being advised on.'),
  requiredBadges: z.array(RequiredBadgeSchema).describe('A list of proficiency badges or category requirements needed for the award, including their completion status.'),
  overallGuidance: z.string().optional().describe('Overall guidance or summary for the scout leader regarding the award prerequisites.'),
});
export type AwardPrerequisiteAdvisorOutput = z.infer<typeof AwardPrerequisiteAdvisorOutputSchema>;

export async function awardPrerequisiteAdvisor(input: AwardPrerequisiteAdvisorInput): Promise<AwardPrerequisiteAdvisorOutput> {
  return awardPrerequisiteAdvisorFlow(input);
}

const awardPrerequisiteAdvisorPrompt = ai.definePrompt({
  name: 'awardPrerequisiteAdvisorPrompt',
  input: {schema: AwardPrerequisiteAdvisorInputSchema},
  output: {schema: AwardPrerequisiteAdvisorOutputSchema},
  prompt: `You are an AI assistant specialized in Boy Scout award requirements. Your task is to guide a scout leader on the necessary proficiency badges for a given award, based on specific rules and the scout's already completed badges.

You will determine the completion status for each requirement based on the provided 'scoutProficiencyBadges' and the 'knownBadgeCategories' list. For each specific badge requirement, if the scout has completed it, set its 'category' field to its corresponding category from 'knownBadgeCategories'. For category-based requirements, specify the general category in the 'category' field.

Here is a list of known proficiency badges and their typical categories for your reference:
${JSON.stringify(knownBadgeCategories, null, 2)}

Here are the specific rules for each award:

Award: Scout Award
Requirements:
- "Junior Happy Home" OR "Senior Happy Home"
- Two proficiency badges that are NOT from the "Public Service" category and NOT from the "Camp Craft" category.

Award: Chief Commissioner's Award
Requirements:
- "First Aid"
- "Missioner" OR "Public Health" OR "Ambulance"
- One proficiency badge from the "Practical Science" category OR "Camp Craft" category OR "Explorer" category OR "Better World Framework" category.

Award: Prime Minister's Award
Requirements:
- One proficiency badge from the "Education" category OR "Culture" category OR "Senior Saver" category OR "Better World Framework" category (EXCLUDING "Scout of the World" and "Messenger of Peace").
- One proficiency badge from the "Sports" category.
- "Farmer"
- "Civics"
- "Venture"

Award: President's Scout Award
Requirements:
- "Senior Happy Home"
- "Ambulance" (Note: Repass required if previously passed for another award.)
- "Quarter Master" OR "Camp Warden"
- "Senior Organizer"
- One proficiency badge from the "Public Service" category.

Analyze the 'awardName' provided and the 'scoutProficiencyBadges' to accurately fill out the 'requiredBadges' array in the JSON output. For each requirement, include it in the 'requiredBadges' array.
Set 'isCompleted' to true if the scout has met that requirement based on their completed badges and the 'knownBadgeCategories'. Otherwise, set it to false.
Provide 'notes' where specific clarification is needed, especially for category-based requirements, conditional requirements like "Ambulance (Repass)", or when suggesting options for uncompleted category requirements.

If a category requirement is not met, provide specific examples of badges from 'knownBadgeCategories' that would fulfill it in the 'notes' field.

Award Name: {{{awardName}}}
Scout's Completed Proficiency Badges: {{{scoutProficiencyBadges}}}
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
