import Image from "next/image"
import { Button } from "@/components/ui/button"
import fitness from "../../fitnessman.jpg"
import Link from "next/link"

export default function ProfileCreation() {
    return (
        <div className="flex flex-col items-center justify-center bg-background text-foreground p-4 mt-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <Image
                    src={fitness}
                    alt="A man holding a book"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full"
                />
                <h1 className="text-4xl font-bold tracking-tight">Hello!</h1>
                <p className="text-xl">I&apos;m your personal coach</p>
                <p className="text-lg text-muted-foreground">
                    Here are some questions to tailor your personalized plan.
                </p>
                <Button className="rounded-full" size="lg" asChild>
                    <Link href="/profile-step">
                        I&apos;m Ready
                    </Link>
                </Button>
            </div>
        </div>
    )
}