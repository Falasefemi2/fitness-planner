"use client";

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "./ModeToggle";
// import ModeToggle from "./ModeToggle"; // Import ModeToggle

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    return (
        <>
            <header className="sticky top-0 z-50 w-full max-w-4xl mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link className="mr-6 flex items-center space-x-2" href="/">
                            <span className="hidden font-bold sm:inline-block">FitnessPro</span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">Features</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">Pricing</Link>
                            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#testimonials">Testimonials</Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <ModeToggle /> {/* Add ModeToggle here */}
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <Button className="hidden md:inline-flex">Sign Up</Button>
                        </div>
                        <Button variant="outline" className="hidden md:inline-flex">Log in</Button>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </header>
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-background p-6 md:hidden">
                    <div className="space-y-4">
                        <ModeToggle /> {/* Add ModeToggle here for mobile */}
                        <Link className="block" href="#features" onClick={toggleMenu}>Features</Link>
                        <Link className="block" href="#pricing" onClick={toggleMenu}>Pricing</Link>
                        <Link className="block" href="#testimonials" onClick={toggleMenu}>Testimonials</Link>
                        <Button className="w-full" onClick={toggleMenu}>Sign Up</Button>
                        <Button variant="outline" className="w-full" onClick={toggleMenu}>Log in</Button>
                    </div>
                </div>
            )}
        </>
    )
}