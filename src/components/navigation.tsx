import Link from "next/link";

export function Navigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                        Resume<span className="gradient-text">A</span>
                    </span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        href="/builder"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Free CV maker
                    </Link>
                    <Link
                        href="/#templates"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Free CV template
                    </Link>
                    <Link
                        href="/blog"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
