import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Lightbulb, AlertTriangle, Check } from "lucide-react";

export interface ActionableFeedbackProps {
  data?: any;
  isLoading?: boolean;
}

export function KeyStrengths({ data, isLoading }: ActionableFeedbackProps) {
  const strengths: any[] = data?.keyStrengths || [];

  if (!isLoading && strengths.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center border-dashed">
        <div className="text-center p-8 text-muted-foreground">
          <Lightbulb className="mx-auto h-12 w-12 opacity-20 mb-4" />
          <p>Upload a resume to see actionable feedback and suggestions.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full border-border/50 shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-green-600 dark:text-green-500 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Key strengths
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {strengths.map((strength, idx) => (
            <li key={idx} className="flex items-start py-1">
              <Check className="h-4 w-4 mt-1 mr-3 text-green-500 shrink-0" />
              <span className="text-sm text-foreground/90 leading-relaxed">{strength}</span>
            </li>
          ))}
          {isLoading && strengths.length === 0 && (
            <li className="animate-pulse flex items-start py-1">
              <div className="h-4 w-4 mt-1 mr-3 rounded-full bg-green-500/50 shrink-0" />
              <div className="h-4 bg-muted rounded w-3/4 mt-1" />
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}

export function SuggestedImprovements({ data, isLoading }: ActionableFeedbackProps) {
  const edits: any[] = data?.suggestedEdits || [];

  if (!isLoading && edits.length === 0) return null;

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-amber-600 dark:text-amber-500 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Suggested improvements
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {edits.map((edit, idx) => (
          <div key={idx} className="group flex flex-col rounded-xl border border-border/50 bg-card/50 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_auto_1fr] relative">
              {/* Original */}
              <div className="p-4 space-y-2 border-b md:border-b-0 md:border-r border-border/50">
                <p className="text-xs font-bold text-destructive uppercase tracking-wider">Original</p>
                <p className="text-sm text-muted-foreground line-through decoration-destructive/40 leading-relaxed">
                  {edit.originalText}
                </p>
              </div>
              
              {/* Arrow for desktop */}
              <div className="hidden md:flex items-center justify-center -mx-4 z-10 relative">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-card border border-border/50 shadow-sm">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Improved */}
              <div className="p-4 space-y-2 md:pl-8">
                <p className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-wider">Improved</p>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  {edit.improvedText}
                </p>
              </div>
            </div>
            {edit.reason && (
              <div className="px-4 py-3 bg-muted/30 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground mr-1">Why:</span>
                  {edit.reason}
                </p>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && edits.length === 0 && (
          <div className="animate-pulse rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-4/5 bg-muted rounded" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
