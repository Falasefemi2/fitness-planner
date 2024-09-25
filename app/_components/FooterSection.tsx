import Link from "next/link"


export default function FooterSection() {
    return (
        <>
            <footer className="w-full py-6 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                            <Link className="flex items-center space-x-2" href="/">
                                <span className="font-bold">FitnessPro</span>
                            </Link>
                            <nav className="flex items-center space-x-4 text-sm">
                                <Link className="text-muted-foreground hover:text-foreground" href="#features">
                                    Features
                                </Link>
                                <Link className="text-muted-foreground hover:text-foreground" href="#pricing">
                                    Pricing
                                </Link>
                                <Link className="text-muted-foreground hover:text-foreground" href="#testimonials">
                                    Testimonials
                                </Link>
                            </nav>
                        </div>
                        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                            © 2023 FitnessPro. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}