"use client";

import { useEffect, useRef, useState } from "react";
import type { ResumeData } from "../types/resume";
import { generatePDF } from "@/utils/generatePdf";

interface PDFPreviewProps {
    data: ResumeData;
}

export function PDFPreview({ data }: PDFPreviewProps) {
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Clear previous timeout to prevent multiple renders
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Debounce the PDF generation
        timeoutRef.current = setTimeout(() => {
            const pdf = generatePDF(data);
            const pdfBlob = pdf.output("bloburl");
            setPdfUrl(pdfBlob);
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Clean up previous PDF URL
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [data]);

    if (!pdfUrl) {
        return (
            <div className="w-full h-[842px] bg-muted animate-pulse rounded-lg" />
        );
    }

    return (
        <iframe
            src={pdfUrl}
            className="w-full h-[842px] rounded-lg border"
            title="Resume PDF Preview"
        />
    );
}
