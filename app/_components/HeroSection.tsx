import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-text-reveal">
                                <span className="inline-block">Transform Your Body,</span>{" "}
                                <span className="inline-block">Transform Your Life</span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Join FitnessPro and get access to personalized workout plans, nutrition guides, and expert coaching.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button>Start Free Trial</Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}