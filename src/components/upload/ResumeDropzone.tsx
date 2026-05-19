"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResumeDropzoneProps {
  onTextExtracted: (text: string) => void;
  isLoading?: boolean;
}

export function ResumeDropzone({ onTextExtracted, isLoading }: ResumeDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const extractTextFromPDF = async (file: File) => {
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n";
      }
      
      if (!fullText.trim()) {
        setError("Could not extract text from the PDF. It might be scanned or empty.");
        return;
      }
      
      onTextExtracted(fullText);
    } catch (err) {
      console.error("PDF Extraction Error:", err);
      setError("Failed to read the PDF file. Please try another one.");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      extractTextFromPDF(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden transition-all hover:shadow-lg border-dashed border-2 border-primary/20">
      <CardContent className="p-0">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center py-5 px-6 text-center cursor-pointer transition-colors
            ${isDragActive ? "bg-primary/5" : "bg-card hover:bg-muted/50"}
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
          ) : isDragActive ? (
            <FileText className="h-8 w-8 text-primary mb-3 animate-bounce" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
          )}
          
          <p className="text-base font-medium mb-1">
            {isLoading
              ? "Analyzing your resume..."
              : isDragActive
              ? "Drop your resume here"
              : <>Drag & drop your PDF here, or <span className="text-blue-500 hover:underline">browse files</span></>}
          </p>
          
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Our AI is reviewing your profile to provide actionable feedback."
              : "Text is extracted locally — your privacy is respected."}
          </p>

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md w-full">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
