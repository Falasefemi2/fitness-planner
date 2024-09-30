import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { User } from '../db/schema';
// import { auth } from '@clerk/nextjs/server';
import { db } from '../db';
// import { sql } from 'drizzle-orm';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { eq } from "drizzle-orm";
import { CheckUser } from '@/lib/CheckUser';


export default async function Navbar() {
    let user = null;

    try {
        // Get or create the user using the server-side function `CheckUser`
        user = await CheckUser();
        console.log("User fetched from auth:", user);

        if (!user) {
            console.log("User not authenticated");
        } else {
            const userId = user.id;

            // Check if user exists in the database
            const existingUser = await db
                .select()
                .from(User)
                .where(eq(User.id, userId))
                .execute();

            console.log("Existing user in DB:", existingUser);

            if (existingUser.length === 0) {
                // User does not exist, create a new user
                const newUser = await db.insert(User).values({
                    id: userId,
                    email: user.email || "", // Ensure email is not undefined
                    profileImageUrl: user.profileImageUrl || "",
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }).returning();

                console.log("New user created:", newUser);
            } else {
                // User exists, update the profile if needed
                const updatedUser = await db
                    .update(User)
                    .set({
                        email: user.email || "",
                        profileImageUrl: user.profileImageUrl || "",
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        updatedAt: new Date(),
                    })
                    .where(eq(User.id, userId))
                    .execute();

                console.log("User updated:", updatedUser);
            }
        }
    } catch (error) {
        console.error("Error managing user profile:", error);
    }

    // Define navigation links
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
    );

    // Adjusted authentication buttons
    const AuthButtons = () => (
        <>
            {!user ? (
                <>
                    <SignUpButton>
                        <Button>Sign Up</Button>
                    </SignUpButton>
                    <SignInButton>
                        <Button variant="outline">Log in</Button>
                    </SignInButton>
                </>
            ) : (
                <Button asChild>
                    <Link href="/profile-creation">Profile</Link>
                </Button>
            )}
        </>
    );

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
    );
}
