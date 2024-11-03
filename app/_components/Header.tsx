// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"
// import { SignInButton, SignUpButton } from '@clerk/nextjs';
// import { ModeToggle } from './ModeToggle';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// // import { CheckUser } from '@/lib/CheckUser';
// import React from 'react';
// import { auth, currentUser } from "@clerk/nextjs/server"
// import { db } from '../db';
// import { eq } from 'drizzle-orm';
// import { User } from '../db/schema';



// export default async function Navbar() {

//     const { userId } = auth();
//     const user = await currentUser();



//     // Define navigation links
//     const NavItems = () => (
//         <>
//             <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
//                 Features
//             </Link>
//             <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#pricing">
//                 Pricing
//             </Link>
//             <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="#testimonials">
//                 Testimonials
//             </Link>
//         </>
//     );

//     // Adjusted authentication buttons
//     const AuthButtons = () => (
//         <>
//             {!user ? (
//                 <>
//                     <SignUpButton>
//                         <Button>Sign Up</Button>
//                     </SignUpButton>
//                     <SignInButton>
//                         <Button variant="outline">Log in</Button>
//                     </SignInButton>
//                 </>
//             ) : (
//                 <Button asChild>
//                     <Link href="/profile-creation">Profile</Link>
//                 </Button>
//             )}
//         </>
//     );

//     if (user && userId) {
//         try {
//             // First, try to find the user by email
//             const existingUser = await db
//                 .select()
//                 .from(User)
//                 .where(eq(User.email, user.emailAddresses[0]?.emailAddress || ""))
//                 .limit(1);

//             if (existingUser.length > 0) {
//                 // User exists, update their information
//                 const updatedUser = await db
//                     .update(User)
//                     .set({
//                         profileImageUrl: user.imageUrl || "",
//                         firstName: user.firstName || "",
//                         lastName: user.lastName || "",
//                         updatedAt: new Date(),
//                     })
//                     .where(eq(User.id, existingUser[0].id))
//                     .returning();

//                 console.log("User updated:", updatedUser[0]);
//             } else {
//                 // User doesn't exist, insert new user
//                 const newUser = await db
//                     .insert(User)
//                     .values({
//                         id: user.id,
//                         email: user.emailAddresses[0]?.emailAddress || "",
//                         profileImageUrl: user.imageUrl || "",
//                         firstName: user.firstName || "",
//                         lastName: user.lastName || "",
//                         createdAt: new Date(),
//                         updatedAt: new Date(),
//                     })
//                     .returning();

//                 console.log("New user created:", newUser[0]);
//             }
//         } catch (error) {
//             console.error("Error updating or creating user in database:", error);
//         }
//     }


//     return (
//         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//             <div className="container flex h-14 items-center mx-auto">
//                 <div className="mr-4 hidden md:flex">
//                     <Link className="mr-6 flex items-center space-x-2" href="/">
//                         <span className="hidden font-bold sm:inline-block">FitnessPro</span>
//                     </Link>
//                     <nav className="flex items-center space-x-6 text-sm font-medium">
//                         <NavItems />
//                     </nav>
//                 </div>
//                 <Sheet>
//                     <SheetTrigger asChild>
//                         <Button variant="outline" size="icon" className="shrink-0 md:hidden">
//                             <Menu className="h-5 w-5" />
//                             <span className="sr-only">Toggle menu</span>
//                         </Button>
//                     </SheetTrigger>
//                     <SheetContent side="left">
//                         <div className="flex flex-col space-y-4 mt-4">
//                             <Link className="font-bold text-lg" href="/">FitnessPro</Link>
//                             <nav className="flex flex-col space-y-4 text-sm font-medium">
//                                 <NavItems />
//                             </nav>
//                             <div className="flex flex-col space-y-2">
//                                 <AuthButtons />
//                             </div>
//                         </div>
//                     </SheetContent>
//                 </Sheet>
//                 <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
//                     <div className="w-full flex-1 md:w-auto md:flex-none">
//                         <div className="hidden md:flex space-x-2">
//                             <AuthButtons />
//                         </div>
//                     </div>
//                     <ModeToggle />
//                 </div>
//             </div>
//         </header>
//     );
// }



import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { User } from '../db/schema';
import { redirect } from 'next/navigation';

export default async function Navbar() {
    const { userId } = auth();
    const user = await currentUser();

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

    if (user && userId) {
        try {
            // Validate required fields
            if (!user.emailAddresses[0]?.emailAddress) {
                throw new Error('Email address is required');
            }

            if (!user.firstName || !user.lastName) {
                // Redirect to profile completion if required fields are missing
                redirect('/profile-creation');
            }

            // First, try to find the user by email
            const existingUser = await db
                .select()
                .from(User)
                .where(eq(User.email, user.emailAddresses[0].emailAddress))
                .limit(1);

            if (existingUser.length > 0) {
                // Only update if there are changes
                const currentData = existingUser[0];
                const hasChanges =
                    currentData.profileImageUrl !== user.imageUrl ||
                    currentData.firstName !== user.firstName ||
                    currentData.lastName !== user.lastName;

                if (hasChanges) {
                    await db
                        .update(User)
                        .set({
                            profileImageUrl: user.imageUrl || null,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            updatedAt: new Date(),
                        })
                        .where(eq(User.id, currentData.id));
                }
            } else {
                // Create new user only if all required fields are present
                await db
                    .insert(User)
                    .values({
                        id: userId,
                        email: user.emailAddresses[0].emailAddress,
                        profileImageUrl: user.imageUrl || null,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
            }
        } catch (error) {
            console.error("Error updating or creating user in database:", error);
            // Redirect to profile creation page if there's an error
            redirect('/profile-creation');
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center mx-auto">
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