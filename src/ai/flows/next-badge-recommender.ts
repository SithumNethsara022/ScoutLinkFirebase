'use server';
/**
 * @fileOverview An AI agent that recommends the next proficiency badges for a scout.
 *
 * - nextBadgeRecommender - A function that handles the badge recommendation process.
 * - NextBadgeRecommenderInput - The input type for the nextBadgeRecommender function.
 * - NextBadgeRecommenderOutput - The return type for the nextBadgeRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NextBadgeRecommenderInputSchema = z.object({
  completedBadges: z
    .array(z.string())
    .describe('A list of proficiency badges the scout has already completed.'),
  age: z.number().describe('The current age of the scout.'),
  interests: z
    .string()
    .describe(
      'A description of the scout\u0027s personal interests and hobbies.'
    ),
});
export type NextBadgeRecommenderInput = z.infer<
  typeof NextBadgeRecommenderInputSchema
>;

const NextBadgeRecommenderOutputSchema = z.object({
  recommendedBadges: z
    .array(z.string())
    .describe('A list of proficiency badges recommended for the scout.'),
  justification: z
    .string()
    .describe(
      'A detailed explanation for why these badges are recommended, considering the scout\u0027s age, interests, and progress towards higher awards.'
    ),
});
export type NextBadgeRecommenderOutput = z.infer<
  typeof NextBadgeRecommenderOutputSchema
>;

export async function nextBadgeRecommender(
  input: NextBadgeRecommenderInput
): Promise<NextBadgeRecommenderOutput> {
  return nextBadgeRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nextBadgeRecommenderPrompt',
  input: {schema: NextBadgeRecommenderInputSchema},
  output: {schema: NextBadgeRecommenderOutputSchema},
  prompt: `You are an AI assistant specialized in scouting and badge progression.
Your task is to recommend the next relevant proficiency badges for a scout.
Consider the scout's age, personal interests, and their completed badges to suggest badges that align with their development and help them efficiently progress towards higher awards (e.g., Scout Award, Chief Commissioner's Award, Prime Minister's Award, President's Scout Award).

Here is the scout's information:
Age: {{{age}}}
Interests: {{{interests}}}
Completed Badges: {{{#each completedBadges}}}- {{{this}}}
{{{/each}}}

Based on this information, provide a list of recommended badges and a detailed justification for each recommendation, explaining how they fit the scout's profile and contribute to their overall scouting journey and award progression.`,
});

const nextBadgeRecommenderFlow = ai.defineFlow(
  {
    name: 'nextBadgeRecommenderFlow',
    inputSchema: NextBadgeRecommenderInputSchema,
    outputSchema: NextBadgeRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
