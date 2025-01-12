"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    seconds: number;
    onComplete: () => void;
}

export function CountdownTimer({ seconds, onComplete }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    return (
        <div className="text-sm text-muted-foreground">
            Continue in {timeLeft} seconds...
        </div>
    );
}
