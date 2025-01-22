"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./countdown-timer";
import { useDetectAdBlock } from "adblock-detect-react";
import { pdf } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import DynamicTemplateRenderer from "./resume-templates/DynamicTemplateRenderer";

interface DownloadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ResumeData;
}

export function DownloadDialog({
    open,
    onOpenChange,
    data,
}: DownloadDialogProps) {
    const adBlockDetected = useDetectAdBlock();

    const [hasAdBlock, setHasAdBlock] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    useEffect(() => {
        // Reset state when dialog opens
        if (open) {
            setShowDownloadButton(false);
            checkAdBlocker();
        }
    }, [open]);

    const checkAdBlocker = async () => {
        if (adBlockDetected) {
            setHasAdBlock(true);
        }
    };

    const handleDownload2 = async () => {
        try {
            // Generate the PDF as a blob
            const blob = await pdf(
                <DynamicTemplateRenderer data={data} />
            ).toBlob();

            // Create a temporary anchor element for the download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${data.personalInfo.fullName}_Resume.pdf`;

            // Programmatically trigger the download
            link.click();

            // Clean up the URL object
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Download Resume</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {hasAdBlock ? (
                        <div className="space-y-4">
                            <p className="text-sm text-red-500 font-bold">
                                We noticed you're using an ad blocker. We
                                understand if you prefer to keep it enabled, but
                                seeing our ads helps keep this service free.
                            </p>
                            {!showDownloadButton && (
                                <CountdownTimer
                                    seconds={5}
                                    onComplete={() =>
                                        setShowDownloadButton(true)
                                    }
                                />
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="min-h-[250px] bg-muted rounded-lg flex items-center justify-center">
                                <ins
                                    className="adsbygoogle"
                                    style={{ display: "block" }}
                                    data-ad-client="ca-pub-1347372836296078"
                                    data-ad-slot="1231628567"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"
                                ></ins>
                                Ads
                            </div>
                            {!showDownloadButton && (
                                <div className="flex justify-center gap-4 items-center flex-col">
                                    <CountdownTimer
                                        seconds={15}
                                        onComplete={() =>
                                            setShowDownloadButton(true)
                                        }
                                    />
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                </div>
                            )}
                        </div>
                    )}
                    {showDownloadButton && (
                        <Button onClick={handleDownload2}>
                            Continue to Download
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
