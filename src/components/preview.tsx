"use client";

import { useEffect, useRef, useState } from "react";
import type { ResumeData } from "../types/resume";
import { generatePDF } from "@/utils/generatePdf";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";

// Initialize PDF.js worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PDFPreviewProps {
    data: ResumeData;
}

export function PDFPreview({ data }: PDFPreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
    const [scale] = useState(1.5);
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Clear previous timeout to prevent multiple renders
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Cleanup previous PDF document
        if (pdfDoc) {
            pdfDoc.destroy();
        }

        // Debounce the PDF generation
        timeoutRef.current = setTimeout(async () => {
            try {
                const pdf = generatePDF(data);
                const pdfData = pdf.output("arraybuffer");
                const loadedPdf = await pdfjsLib.getDocument({ data: pdfData })
                    .promise;
                setPdfDoc(loadedPdf);
            } catch (error) {
                console.error("Error generating PDF preview:", error);
            }
        }, 500);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (pdfDoc) {
                pdfDoc.destroy();
            }
        };
    }, [data]);

    useEffect(() => {
        async function renderPage() {
            if (!pdfDoc || !canvasRef.current) return;

            try {
                const page = await pdfDoc.getPage(1);
                const viewport = page.getViewport({ scale });
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                if (!context) return;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Make canvas width responsive
                if (containerRef.current) {
                    const containerWidth = containerRef.current.clientWidth;
                    const ratio = containerWidth / viewport.width;
                    canvas.style.width = "100%";
                    canvas.style.height = `${viewport.height * ratio}px`;
                }

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;
            } catch (error) {
                console.error("Error rendering PDF page:", error);
            }
        }

        renderPage();
    }, [pdfDoc, scale]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (pdfDoc) {
                const currentDoc = pdfDoc;
                setPdfDoc(null);
                setTimeout(() => setPdfDoc(currentDoc), 0);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [pdfDoc]);

    return (
        <div
            ref={containerRef}
            className="w-full bg-white rounded-lg shadow-2xl overflow-hidden"
        >
            {!pdfDoc ? (
                <div className="w-full h-[842px] bg-muted animate-pulse" />
            ) : (
                <canvas ref={canvasRef} className="w-full" />
            )}
        </div>
    );
}
