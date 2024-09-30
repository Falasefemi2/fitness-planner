/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from '@/lib/utils';
// import weight from "../../sportman.jpg"
// import abs from "../../abs.jpg"
// import fit from "../../thumbs.jpg"

type Goal = "lose-weight" | "build-muscle" | "keep-fit";
interface GoalsStepProps {
    onNext: (data: { goal: Goal }) => void;
    onBack: () => void;
}



// export default function GoalsStep({ onNext, onBack }: { onNext: (data: { goal: string }) => void; onBack: () => void }) {
//     const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

//     const handleGoalSelect = (goal: string) => {
//         setSelectedGoal(goal)
//     }

//     const handleNextPage = () => {
//         if (selectedGoal) {
//             onNext({ goal: selectedGoal });
//         }
//     }

//     const goals = [
//         { id: 'lose-weight', title: 'Lose Weight', image: weight },
//         { id: 'build-muscle', title: 'Build Muscle', image: abs },
//         { id: 'keep-fit', title: 'Keep Fit', image: fit },
//     ]

//     return (
//         <div className="flex flex-col bg-background">
//             <main className="flex-grow flex flex-col items-center justify-center p-4">
//                 <h1 className="text-3xl font-bold text-center mb-8">What's your main goal?</h1>

//                 <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
//                     {goals.map((goal) => (
//                         <Card
//                             key={goal.id}
//                             className={`p-6 cursor-pointer transition-colors rounded-xl ${selectedGoal === goal.id ? 'bg-primary' : 'hover:bg-muted'}`}
//                             onClick={() => handleGoalSelect(goal.id)}
//                         >
//                             <div className="flex flex-row items-center justify-between">
//                                 <h2 className="text-xl font-semibold">{goal.title}</h2>
//                                 <Image
//                                     src={goal.image}
//                                     width={80}
//                                     height={80}
//                                     alt={goal.title}
//                                     className="rounded-lg"
//                                 />
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//                 <div className="flex justify-between w-full max-w-4xl mt-8">
//                     <Button variant="outline" onClick={onBack}>
//                         Back
//                     </Button>
//                     <Button disabled={!selectedGoal} onClick={handleNextPage}>
//                         Next
//                     </Button>
//                 </div>
//             </main>
//         </div>
//     )
// }

export default function GoalsStep({ onNext, onBack }: GoalsStepProps) {
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const handleGoalSelect = (goal: Goal) => {
        setSelectedGoal(goal);
    };

    const handleNext = () => {
        if (selectedGoal) {
            onNext({ goal: selectedGoal });
        }
    };

    const goals: Goal[] = ["lose-weight", "build-muscle", "keep-fit"];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">What's your fitness goal?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {goals.map((goal) => (
                    <Card
                        key={goal}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedGoal === goal ? "ring-2 ring-primary" : ""
                        )}
                        onClick={() => handleGoalSelect(goal)}
                    >
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold text-center capitalize">{goal.replace('-', ' ')}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedGoal}>
                    Next
                </Button>
            </div>
        </div>
    );
}