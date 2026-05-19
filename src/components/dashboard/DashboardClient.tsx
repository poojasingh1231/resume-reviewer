"use client";

import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { reviewSchema } from "@/lib/schema";
import { ResumeDropzone } from "@/components/upload/ResumeDropzone";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { KeyStrengths, SuggestedImprovements } from "@/components/dashboard/ActionableFeedback";
import { AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DashboardClient() {
  const [hasStarted, setHasStarted] = useState(false);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/review",
    schema: reviewSchema,
  });

  const handleTextExtracted = (text: string) => {
    setHasStarted(true);
    submit({ text });
  };

  return (
    <div className="space-y-12">
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <section className="space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          AI Resume <span className="text-primary">Reviewer</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your resume and get an instant ATS score, key strengths, and actionable feedback.
        </p>
      </section>

      <section>
        <ResumeDropzone onTextExtracted={handleTextExtracted} isLoading={isLoading} />
        {error && (
          <div className="mt-6 p-4 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20 text-center max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p><strong>Error analyzing resume:</strong> {error.message || "An unexpected error occurred. Please try again."}</p>
          </div>
        )}
      </section>

      {(hasStarted || object) && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-1">
              <ScoreCard score={object?.atsScore} isLoading={isLoading} />
            </div>
            <div className="md:col-span-2">
              <KeyStrengths data={object} isLoading={isLoading} />
            </div>
          </section>
          
          <section>
            <SuggestedImprovements data={object} isLoading={isLoading} />
          </section>
        </div>
      )}
    </div>
  );
}
