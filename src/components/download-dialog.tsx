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

interface DownloadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDownload: () => void;
}

export function DownloadDialog({
    open,
    onOpenChange,
    onDownload,
}: DownloadDialogProps) {
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
        try {
            const testAd = document.createElement("div");
            testAd.innerHTML = "&nbsp;";
            testAd.className = "adsbox";
            document.body.appendChild(testAd);

            // Wait for potential ad blocker to hide the element
            await new Promise((resolve) => setTimeout(resolve, 100));

            const isBlocked = testAd.offsetHeight === 0;
            setHasAdBlock(isBlocked);

            // Clean up test element
            document.body.removeChild(testAd);

            // If no ad blocker, show ad
            if (!isBlocked) {
                // Simulate ad loading time
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setShowDownloadButton(true);
            }
        } catch (error) {
            console.error("Error checking for ad blocker:", error);
            setHasAdBlock(true);
        }
    };

    const handleDownload = () => {
        onOpenChange(false);
        onDownload();
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
                            <p className="text-sm">
                                We noticed you're using an ad blocker. We
                                understand if you prefer to keep it enabled, but
                                seeing our ads helps keep this service free.
                            </p>
                            {!showDownloadButton && (
                                <CountdownTimer
                                    seconds={10}
                                    onComplete={() =>
                                        setShowDownloadButton(true)
                                    }
                                />
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="min-h-[250px] bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">
                                    Advertisement
                                </p>
                            </div>
                            {!showDownloadButton && (
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                </div>
                            )}
                        </div>
                    )}
                    {showDownloadButton && (
                        <Button onClick={handleDownload}>
                            Continue to Download
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}