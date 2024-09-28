/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import weight from "../../sportman.jpg"
import abs from "../../abs.jpg"
import fit from "../../thumbs.jpg"


export default function GoalsStep({ onNext, onBack }: { onNext: (data: { goal: string }) => void; onBack: () => void }) {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

    const handleGoalSelect = (goal: string) => {
        setSelectedGoal(goal)
    }

    const handleNextPage = () => {
        if (selectedGoal) {
            onNext({ goal: selectedGoal });
        }
    }

    const goals = [
        { id: 'lose-weight', title: 'Lose Weight', image: weight },
        { id: 'build-muscle', title: 'Build Muscle', image: abs },
        { id: 'keep-fit', title: 'Keep Fit', image: fit },
    ]

    return (
        <div className="flex flex-col bg-background">
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-center mb-8">What's your main goal?</h1>

                <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
                    {goals.map((goal) => (
                        <Card
                            key={goal.id}
                            className={`p-6 cursor-pointer transition-colors rounded-xl ${selectedGoal === goal.id ? 'bg-primary' : 'hover:bg-muted'}`}
                            onClick={() => handleGoalSelect(goal.id)}
                        >
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="text-xl font-semibold">{goal.title}</h2>
                                <Image
                                    src={goal.image}
                                    width={80}
                                    height={80}
                                    alt={goal.title}
                                    className="rounded-lg"
                                />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between w-full max-w-4xl mt-8">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button disabled={!selectedGoal} onClick={handleNextPage}>
                        Next
                    </Button>
                </div>
            </main>
        </div>
    )
}