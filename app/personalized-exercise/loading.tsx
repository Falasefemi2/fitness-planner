import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dumbbell } from "lucide-react"

export default function ExercisePlanLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Personalized Exercise Plan</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-primary text-primary-foreground">
                            <CardTitle className="flex items-center justify-between">
                                <Skeleton className="h-6 w-32 bg-primary-foreground/20" />
                                <Dumbbell className="h-6 w-6" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Badge variant="secondary" className="mr-2">
                                        Sets & Reps
                                    </Badge>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                        Equipment
                                    </Badge>
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}