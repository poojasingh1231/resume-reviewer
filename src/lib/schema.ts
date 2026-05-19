import { z } from "zod";

export const reviewSchema = z.object({
  atsScore: z.number().describe("The overall ATS score for the resume, from 0 to 100."),
  keyStrengths: z.array(z.string()).describe("A list of key strengths identified in the resume."),
  suggestedEdits: z.array(
    z.object({
      originalText: z.string().describe("The original text from the resume that needs improvement."),
      improvedText: z.string().describe("The suggested improved text."),
      reason: z.string().optional().describe("Reason for the suggested edit."),
    })
  ).describe("A list of suggested edits to improve the resume."),
});

export type ReviewData = z.infer<typeof reviewSchema>;
