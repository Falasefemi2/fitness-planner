import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { User } from '../db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


export default async function Navbar() {
    const user = await currentUser();
    const { userId } = auth();

    if (user && userId) {
        try {
            const newUser = await db.insert(User).values({
                id: userId,
                email: user.emailAddresses[0]?.emailAddress || "",
                profileImageUrl: user.imageUrl || "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
                .onConflictDoUpdate({
                    target: User.id,
                    set: {
                        email: sql`${user.emailAddresses[0]?.emailAddress}`,
                        profileImageUrl: sql`${user.imageUrl}`,
                        firstName: sql`${user.firstName}`,
                        lastName: sql`${user.lastName}`,
                        updatedAt: sql`CURRENT_TIMESTAMP`,
                    },
                })
                .returning();

            console.log("User created or updated:", newUser[0]);
        } catch (error) {
            console.error("Error creating user in database:", error);
        }
    }

    const NavItems = () => (
        <>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
                Features
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">
                Pricing
            </Link>
            <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#testimonials">
                Testimonials
            </Link>
        </>
    )

    const AuthButtons = () => (
        user ? (
            <SignOutButton>
                <Button>Logout</Button>
            </SignOutButton>
        ) : (
            <>
                <SignUpButton>
                    <Button>Sign Up</Button>
                </SignUpButton>
                <SignInButton>
                    <Button variant="outline">Log in</Button>
                </SignInButton>
            </>
        )
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">FitnessPro</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <NavItems />
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link className="font-bold text-lg" href="/">FitnessPro</Link>
                            <nav className="flex flex-col space-y-4 text-sm font-medium">
                                <NavItems />
                            </nav>
                            <div className="flex flex-col space-y-2">
                                <AuthButtons />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="hidden md:flex space-x-2">
                            <AuthButtons />
                        </div>
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}