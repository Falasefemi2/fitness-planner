/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function TestimonialSection() {
    return (
        <>
            <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>John D.</CardTitle>
                                <CardDescription>Lost 30 lbs in 3 months</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    "FitnessPro has completely transformed my approach to fitness. The personalized workouts and nutrition
                                    advice have helped me achieve results I never thought possible."
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Sarah M.</CardTitle>
                                <CardDescription>Improved marathon time by 20 minutes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    "As a professional runner, I needed a program that could keep up with my demanding schedule. FitnessPro
                                    delivered with its customized plans and real-time tracking."
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Mike R.</CardTitle>
                                <CardDescription>Gained 10 lbs of muscle</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    "The nutrition guidance and workout plans on FitnessPro have been a game-changer for my muscle-building
                                    goals. I've seen more progress in the last 6 months than in years of training on my own."
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}