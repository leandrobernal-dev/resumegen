"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";
import DynamicTemplateRenderer from "./resume-templates/DynamicTemplateRenderer";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PDFPreviewProps {
    data: ResumeData;
}

export function PDFPreview({ data }: PDFPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
    const [scale] = useState(1.5);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

    const handleCanvasRef = useCallback(
        (index: number) => (el: HTMLCanvasElement | null) => {
            canvasRefs.current[index] = el;
        },
        []
    );

    useEffect(() => {
        setIsLoading(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (pdfDoc) {
            pdfDoc.destroy();
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                // Generate PDF Blob using @react-pdf/renderer
                const pdfBlob = await pdf(
                    <DynamicTemplateRenderer data={data} />
                ).toBlob();

                // Load the Blob into pdfjs-dist
                const loadedPdf = await pdfjsLib.getDocument({
                    data: await pdfBlob.arrayBuffer(),
                }).promise;

                setPdfDoc(loadedPdf);
                setNumPages(loadedPdf.numPages);
                canvasRefs.current = new Array(loadedPdf.numPages).fill(null);
            } catch (error) {
                console.error("Error generating PDF preview:", error);
            } finally {
                setIsLoading(false);
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
        async function renderPages() {
            if (!pdfDoc || !containerRef.current) return;

            try {
                const pages = await Promise.all(
                    Array.from({ length: numPages }, (_, i) =>
                        pdfDoc.getPage(i + 1)
                    )
                );

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    const canvas = canvasRefs.current[i];
                    if (!canvas) continue;

                    const viewport = page.getViewport({ scale });
                    const context = canvas.getContext("2d");

                    if (!context) continue;

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Make canvas width responsive
                    const containerWidth = containerRef.current.clientWidth;
                    const ratio = containerWidth / viewport.width;
                    canvas.style.width = "100%";
                    canvas.style.height = `${viewport.height * ratio}px`;

                    await page.render({
                        canvasContext: context,
                        viewport,
                    }).promise;
                }
            } catch (error) {
                console.error("Error rendering PDF pages:", error);
            }
        }

        renderPages();
    }, [pdfDoc, scale, numPages]);

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
        <div ref={containerRef} className="relative w-full space-y-4">
            {isLoading && (
                <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="bg-background/95 p-4 rounded-lg shadow-lg flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        <span className="text-sm">Updating preview...</span>
                    </div>
                </div>
            )}
            {!pdfDoc ? (
                <div className="w-full h-[842px] bg-muted animate-pulse rounded-lg" />
            ) : (
                Array.from({ length: numPages }, (_, i) => (
                    <div
                        key={i}
                        className="bg-white  shadow-lg overflow-hidden"
                    >
                        <canvas ref={handleCanvasRef(i)} className="w-full" />
                    </div>
                ))
            )}
        </div>
    );
}
