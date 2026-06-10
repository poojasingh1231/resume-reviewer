import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { reviewSchema } from "@/lib/schema";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Please add it to your Vercel project." }), { status: 500 });
    }

    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response("Invalid request: text is required.", { status: 400 });
    }

    const result = streamObject({
      model: google("gemini-1.5-flash"),
      temperature: 0,
      schema: reviewSchema,
      prompt: `You are an expert ATS (Applicant Tracking System) and senior technical recruiter.
Today's date is ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}. Please evaluate dates in the resume relative to this current date, and do not flag recent or current dates as "future dates".
Review the following resume text and provide a structured JSON response evaluating it.
Provide an ATS score from 0 to 100 based on standard ATS parsing rules, clarity, impact, and formatting.
List the key strengths of the resume.
Provide a list of actionable suggested edits. For each edit, include the 'originalText', the 'improvedText', and the 'reason' for the change.

Resume Text:
"""
${text}
"""`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
