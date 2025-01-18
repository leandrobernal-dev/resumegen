import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAdsense from "@/components/adsense";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ResumeGen",
    description: "Generate a resume in seconds",
    other: {
        monetag: "e773c8e0eb75005895b66d306bfe0f20",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8F9FA]`}
            >
                {children}
                <GoogleAnalytics gaId="G-YLVVD3KLEL" />
            </body>
        </html>
    );
}
