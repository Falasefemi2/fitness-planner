import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="flex items-center justify-between sticky top-0 z-50 w-full max-w-4xl mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-2">
                <Link href="/">
                    <span className="font-bold">FitnessPro</span>
                </Link>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <main>
                {children}
            </main>
        </>
    )
}