"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return show ? (
        <Button
            className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg transition-transform hover:scale-110"
            size="icon"
            onClick={scrollToTop}
        >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Back to top</span>
        </Button>
    ) : null;
}
