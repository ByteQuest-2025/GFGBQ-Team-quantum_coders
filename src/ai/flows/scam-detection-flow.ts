'use server';
/**
 * @fileOverview A scam detection AI agent.
 *
 * - analyzeTranscript - A function that handles the scam detection process.
 * - AnalyzeTranscriptInput - The input type for the analyzeTranscript function.
 * - AnalyzeTranscriptOutput - The return type for the analyzeTranscript function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeTranscriptInputSchema = z.object({
  transcript: z.string().describe('The full transcript of the conversation.'),
});
export type AnalyzeTranscriptInput = z.infer<typeof AnalyzeTranscriptInputSchema>;

const AnalyzeTranscriptOutputSchema = z.object({
  detectedKeywords: z
    .array(z.string())
    .describe(
      'A list of detected scam-related keywords like "OTP", "PIN", "bank", "fraud", "urgent", "money request", "impersonation".'
    ),
  detectedTones: z
    .array(z.string())
    .describe('A list of detected emotional tones like "urgency", "panic", "pressure", "threat".'),
  reason: z.string().describe('A simple explanation for the calculated risk score.'),
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A risk score from 0 to 100. Calculated based on: +15 for each keyword, +20 for urgency tone, +25 for threat/pressure/panic tone. Capped at 100.'
    ),
});
export type AnalyzeTranscriptOutput = z.infer<typeof AnalyzeTranscriptOutputSchema>;

export async function analyzeTranscript(
  input: AnalyzeTranscriptInput
): Promise<AnalyzeTranscriptOutput> {
  return scamDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scamDetectionPrompt',
  input: { schema: AnalyzeTranscriptInputSchema },
  output: { schema: AnalyzeTranscriptOutputSchema },
  prompt: `You are a scam detection expert. Analyze the following conversation transcript and identify indicators of a potential scam.

Transcript:
{{{transcript}}}

Based on your analysis:
1. Identify specific keywords related to scams (e.g., "OTP", "PIN", "bank", "fraud", "urgent money request", "impersonation").
2. Identify emotional tones like "urgency", "panic", or "pressure".
3. Calculate a risk score based on the following rules:
    - Start with a score of 0.
    - Add 15 points for each unique scam keyword detected.
    - Add 20 points if a tone of "urgency" is detected.
    - Add 25 points if a tone of "threat", "pressure", or "panic" is detected.
    - The final score must be capped at 100.
4. Provide a brief, simple reasoning for the score.
5. Return the results in the specified JSON format.`,
});

const scamDetectionFlow = ai.defineFlow(
  {
    name: 'scamDetectionFlow',
    inputSchema: AnalyzeTranscriptInputSchema,
    outputSchema: AnalyzeTranscriptOutputSchema,
  },
  async (input) => {
    if (!input.transcript.trim()) {
      return {
        detectedKeywords: [],
        detectedTones: [],
        reason: 'No conversation to analyze.',
        riskScore: 0,
      };
    }

    const { output } = await prompt(input);
    return output!;
  }
);
