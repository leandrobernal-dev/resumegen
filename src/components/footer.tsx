import Link from "next/link";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-secondary/30">
            <div className="container flex flex-col gap-8 py-12 md:flex-row md:justify-between">
                <div className="space-y-4 md:max-w-xs">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                            Resume<span className="gradient-text">A</span>
                        </span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Create your professional resume in minutes. Free,
                        easy-to-use, and packed with features.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="space-y-4">
                        <h5 className="text-base font-medium">Product</h5>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/builder"
                                    className="hover:text-primary"
                                >
                                    CV Maker
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/templates"
                                    className="hover:text-primary"
                                >
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/examples"
                                    className="hover:text-primary"
                                >
                                    Examples
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="hover:text-primary"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-base font-medium">Company</h5>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-primary"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-primary"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="hover:text-primary"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-base font-medium">Legal</h5>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-primary"
                                >
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-primary"
                                >
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookies"
                                    className="hover:text-primary"
                                >
                                    Cookies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/licenses"
                                    className="hover:text-primary"
                                >
                                    Licenses
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t">
                <div className="container flex flex-col gap-4 py-6 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
                    <p>
                        © {new Date().getFullYear()} ResumeA. All rights
                        reserved.
                    </p>
                    <p>Made with ❤️ for job seekers worldwide</p>
                </div>
            </div>
        </footer>
    );
}
