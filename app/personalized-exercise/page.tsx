import { currentUser } from "@clerk/nextjs/server";
import { getLatestExercisesForUser, getPersonalizedExercises } from "../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge"


type Exercise = {
    name: string;
    description: string;
    setsAndReps: string;
    equipment: string;
};

type GeneratedExercises = {
    id: string;
    userId: string;
    exercises: Exercise[];
    createdAt: Date;
};

export default async function PersonalizedExercisePage() {
    const user = await currentUser(); // Get the authenticated user
    if (!user) return <p>User not found</p>;

    const userId = user.id;
    let exercises: GeneratedExercises | null = null;

    // Fetch latest exercises for the user
    exercises = await getLatestExercisesForUser(userId);
    console.log(exercises);


    // If no exercises are found, generate new ones
    if (!exercises) {
        exercises = await getPersonalizedExercises(userId);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Your Personalized Exercise Plan</h1>
            {exercises ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {exercises.exercises.map((exercise, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardHeader className="bg-primary text-primary-foreground">
                                <CardTitle className="flex items-center justify-between">
                                    <span>{exercise.name}</span>
                                    <Dumbbell className="h-6 w-6" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Badge variant="secondary" className="mr-2">
                                            Sets & Reps
                                        </Badge>
                                        <span className="text-sm">{exercise.setsAndReps}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2">
                                            Equipment
                                        </Badge>
                                        <span className="text-sm">{exercise.equipment || "No equipment needed"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-600">No exercises available.</p>
            )}
        </div>
    )
}