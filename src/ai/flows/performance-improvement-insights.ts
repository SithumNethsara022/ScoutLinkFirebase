'use server';
/**
 * @fileOverview An AI-powered insights tool that analyzes a scout's individual point history and current leaderboard standing
 * to provide personalized suggestions and strategies on how they can improve their points and overall performance.
 *
 * - getPerformanceImprovementInsights - A function that handles the generation of performance improvement insights.
 * - PerformanceImprovementInsightsInput - The input type for the getPerformanceImprovementInsights function.
 * - PerformanceImprovementInsightsOutput - The return type for the getPerformanceImprovementInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PerformanceImprovementInsightsInputSchema = z.object({
  scoutName: z.string().describe("The name of the scout."),
  individualPointHistory: z.array(
    z.object({
      activityType: z.string().describe('The type of activity (e.g., Award, Proficiency Badge, Attendance, Event).'),
      name: z.string().optional().describe('The specific name of the award, badge, or event.'),
      points: z.number().describe('Points gained or lost for this activity.'),
      date: z.string().describe('The date of the activity in YYYY-MM-DD format.'),
    })
  ).describe('A chronological list of the scout\'s point-earning activities.'),
  currentLeaderboardStanding: z.object({
    rank: z.number().describe('The scout\'s current rank on the leaderboard.'),
    totalPoints: z.number().describe('The scout\'s current total points.'),
    averagePointsPerMonth: z.number().optional().describe('The scout\'s average points per month, if available.'),
    topScoutPoints: z.number().optional().describe('The total points of the top-ranked scout, for comparison.'),
    totalScouts: z.number().optional().describe('The total number of scouts on the leaderboard.'),
  }).describe('The scout\'s current standing on the leaderboard.'),
});

export type PerformanceImprovementInsightsInput = z.infer<typeof PerformanceImprovementInsightsInputSchema>;

const PerformanceImprovementInsightsOutputSchema = z.object({
  overallPerformanceSummary: z.string().describe('A summary of the scout\'s current performance.'),
  suggestions: z.array(z.string()).describe('A list of personalized, actionable suggestions to improve points and performance.'),
});

export type PerformanceImprovementInsightsOutput = z.infer<typeof PerformanceImprovementInsightsOutputSchema>;

export async function getPerformanceImprovementInsights(input: PerformanceImprovementInsightsInput): Promise<PerformanceImprovementInsightsOutput> {
  return performanceImprovementInsightsFlow(input);
}

const performanceImprovementInsightsPrompt = ai.definePrompt({
  name: 'performanceImprovementInsightsPrompt',
  input: { schema: PerformanceImprovementInsightsInputSchema },
  output: { schema: PerformanceImprovementInsightsOutputSchema },
  prompt: `You are an AI-powered scout performance advisor. Your goal is to analyze a scout's point history and leaderboard standing and provide actionable insights.

Scout Name: {{{scoutName}}}

Individual Point History:
{{#each individualPointHistory}}
- Activity: {{{activityType}}}{{#if name}} ({{{name}}}){{/if}}, Points: {{{points}}}, Date: {{{date}}}
{{/each}}

Current Leaderboard Standing:
Rank: {{{currentLeaderboardStanding.rank}}}
Total Points: {{{currentLeaderboardStanding.totalPoints}}}
{{#if currentLeaderboardStanding.averagePointsPerMonth}}Average Points Per Month: {{{currentLeaderboardStanding.averagePointsPerMonth}}}{{/if}}
{{#if currentLeaderboardStanding.topScoutPoints}}Top Scout Points: {{{currentLeaderboardStanding.topScoutPoints}}}{{/if}}
{{#if currentLeaderboardStanding.totalScouts}}Total Scouts: {{{currentLeaderboardStanding.totalScouts}}}{{/if}}

Analyze the provided data to:
1. Provide a concise overall performance summary for {{{scoutName}}}, highlighting strengths and areas for improvement based on point trends and standing.
2. Generate personalized, actionable suggestions and strategies to help {{{scoutName}}} improve their points and overall performance. Focus on specific activities, areas to focus on, or types of events that could yield higher points.

Please structure your response strictly as a JSON object matching the PerformanceImprovementInsightsOutputSchema, with 'overallPerformanceSummary' as a single string and 'suggestions' as an array of strings.`,
});

const performanceImprovementInsightsFlow = ai.defineFlow(
  {
    name: 'performanceImprovementInsightsFlow',
    inputSchema: PerformanceImprovementInsightsInputSchema,
    outputSchema: PerformanceImprovementInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await performanceImprovementInsightsPrompt(input);
    return output!;
  }
);
