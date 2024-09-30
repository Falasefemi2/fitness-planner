/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */

"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import weight from "../../sportman.jpg"
import abs from "../../abs.jpg"
import fit from "../../thumbs.jpg"

type Goal = "lose-weight" | "build-muscle" | "keep-fit"

interface GoalsStepProps {
    onNext: (data: { goal: Goal }) => void
    onBack: () => void
}

export default function GoalsStep({ onNext, onBack }: GoalsStepProps) {
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

    const handleGoalSelect = (goal: Goal) => {
        setSelectedGoal(goal)
    }

    const handleNext = () => {
        if (selectedGoal) {
            onNext({ goal: selectedGoal })
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const goals: { goal: Goal; image: any; alt: string }[] = [
        { goal: "lose-weight", image: weight, alt: "Person exercising to lose weight" },
        { goal: "build-muscle", image: abs, alt: "Person with visible abs" },
        { goal: "keep-fit", image: fit, alt: "Person giving thumbs up" }
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">What's your fitness goal?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {goals.map(({ goal, image, alt }) => (
                    <Card
                        key={goal}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedGoal === goal ? "ring-2 ring-primary" : ""
                        )}
                        onClick={() => handleGoalSelect(goal)}
                    >
                        <CardContent className="p-4">
                            <Image
                                src={image}
                                alt={alt}
                                width={300}
                                height={200}
                                objectFit="cover"
                                className="rounded-md mb-2"
                            />
                            <p className="text-center font-semibold capitalize">{goal.replace('-', ' ')}</p>
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
    )
}