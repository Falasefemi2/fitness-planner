import { CheckCircle } from "lucide-react"

export default function FeaturesSection() {
    return (
        <>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="rounded-full bg-primary p-3">
                                <CheckCircle className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">Personalized Workouts</h3>
                            <p className="text-muted-foreground">Get custom workout plans tailored to your fitness goals and experience level.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="rounded-full bg-primary p-3">
                                <CheckCircle className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">Nutrition Guidance</h3>
                            <p className="text-muted-foreground">Access meal plans and nutritional advice to support your fitness journey.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="rounded-full bg-primary p-3">
                                <CheckCircle className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">Progress Tracking</h3>
                            <p className="text-muted-foreground">Monitor your progress with advanced analytics and performance metrics.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}