import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About ResumeA</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-xl mb-6">
                        ResumeA is a free online CV maker that helps job seekers
                        create professional resumes in minutes. Our platform
                        combines ease of use with professional designs to help
                        you stand out in your job search.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">
                        Our Mission
                    </h2>
                    <p className="mb-6">
                        We believe that everyone deserves access to professional
                        tools for their job search. That's why we've created a
                        completely free, no-registration-required CV maker that
                        helps you create impressive resumes quickly and easily.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-4">
                        Why Choose ResumeA?
                    </h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Completely free to use</li>
                        <li>No registration required</li>
                        <li>Professional templates</li>
                        <li>Easy-to-use interface</li>
                        <li>Instant PDF download</li>
                        <li>ATS-friendly formats</li>
                    </ul>

                    <div className="mt-12">
                        <Link href="/builder">
                            <Button
                                size="lg"
                                className="bg-[#00BFA6] hover:bg-[#00BFA6]/90"
                            >
                                Create Your CV Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
