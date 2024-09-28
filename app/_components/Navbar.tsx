import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button"
import {
    SignInButton,
    SignOutButton,
    SignUpButton,
} from '@clerk/nextjs'
import { auth, currentUser } from "@clerk/nextjs/server";
import { User } from "../db/schema";
import { db } from "../db";
import { sql } from "drizzle-orm";


export default async function NavbarClient() {
    const user = await currentUser();
    const { userId } = auth();


    if (user && userId) {
        try {
            const newUser = await db.insert(User).values({
                id: userId,
                email: user.emailAddresses[0]?.emailAddress || "", // Use the first email address
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

    return (
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
                    <ModeToggle />
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {user ? ( // Updated to show logout when user is logged in
                            <>
                                <SignOutButton>
                                    <Button>
                                        Logout
                                    </Button>
                                </SignOutButton>

                            </>
                        ) : (
                            <>
                                <SignUpButton>
                                    <Button className="hidden md:inline-flex">Sign Up</Button>
                                </SignUpButton>
                                <SignInButton>
                                    <Button variant="outline" className="hidden md:inline-flex">Log in</Button>
                                </SignInButton>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

