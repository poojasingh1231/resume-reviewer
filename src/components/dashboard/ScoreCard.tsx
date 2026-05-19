import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreCardProps {
  score?: number;
  isLoading?: boolean;
}

export function ScoreCard({ score, isLoading }: ScoreCardProps) {
  const displayScore = score ?? 0;
  
  // Determine color and status based on score
  let scoreColor = "text-red-500";
  let strokeColor = "stroke-red-500";
  let badgeBg = "bg-red-500/10";
  let statusText = "Needs work";

  if (displayScore >= 75) {
    scoreColor = "text-green-500";
    strokeColor = "stroke-green-500";
    badgeBg = "bg-green-500/10";
    statusText = "Good";
  } else if (displayScore >= 50) {
    scoreColor = "text-yellow-500";
    strokeColor = "stroke-yellow-500";
    badgeBg = "bg-yellow-500/10";
    statusText = "Fair";
  }

  if (isLoading && displayScore === 0) {
    statusText = "Analyzing...";
    scoreColor = "text-muted-foreground";
    strokeColor = "stroke-muted";
    badgeBg = "bg-muted/10";
  }

  // SVG Circle properties
  const radius = 60;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <Card className="w-full h-full flex flex-col border-border/50 shadow-sm relative overflow-hidden bg-card/50">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          ATS Score
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center pt-3 pb-4 flex-1 space-y-4">
        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90 transform"
          >
            {/* Background Circle */}
            <circle
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="text-muted/20"
            />
            {/* Progress Circle */}
            <circle
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={`${strokeColor} transition-all duration-1000 ease-in-out`}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-bold tracking-tighter ${scoreColor}`}>
              {isLoading && displayScore === 0 ? "--" : displayScore}
            </span>
            <span className="text-sm text-muted-foreground font-medium">/100</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-1 rounded-full ${badgeBg} border border-border/50`}>
          <span className={`text-sm font-medium ${scoreColor}`}>{statusText}</span>
        </div>

        {/* Scale Indicator */}
        <div className="w-full max-w-[200px] mt-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div className="h-1 w-full flex rounded-full overflow-hidden mb-1">
            <div className="h-full bg-red-500 w-1/2" />
            <div className="h-full bg-yellow-500 w-1/4" />
            <div className="h-full bg-green-500 w-1/4" />
          </div>
          <div className="flex justify-between text-[10px] uppercase font-semibold">
            <span className="text-red-500/80">Poor</span>
            <span className="text-yellow-500/80">Fair</span>
            <span className="text-green-500/80">Good</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
