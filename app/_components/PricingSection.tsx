import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"


export default function PricingFeatures() {
    return (
        <>
            <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic</CardTitle>
                                <CardDescription>For casual fitness enthusiasts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">$9.99</div>
                                <div className="text-muted-foreground">per month</div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Access to basic workout plans
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Limited nutrition guidance
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Progress tracking
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Choose Plan</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pro</CardTitle>
                                <CardDescription>For dedicated fitness lovers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">$19.99</div>
                                <div className="text-muted-foreground">per month</div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Access to all workout plans
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Full nutrition guidance
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Advanced progress tracking
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        1-on-1 coaching sessions
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Choose Plan</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Elite</CardTitle>
                                <CardDescription>For professional athletes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">$39.99</div>
                                <div className="text-muted-foreground">per month</div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Customized workout plans
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Personalized nutrition plans
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Real-time performance tracking
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Unlimited 1-on-1 coaching
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                        Priority support
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Choose Plan</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}