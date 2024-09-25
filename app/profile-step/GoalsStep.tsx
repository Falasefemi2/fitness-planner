/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import weight from "../../sportman.jpg"
import abs from "../../abs.jpg"
import fit from "../../thumbs.jpg"

export default function GoalsStep({ onNext }: { onNext: () => void }) {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

    const handleGoalSelect = (goal: string) => {
        setSelectedGoal(goal)
    }

    const goals = [
        { id: 'lose-weight', title: 'Lose Weight', image: weight },
        { id: 'build-muscle', title: 'Build Muscle', image: abs },
        { id: 'keep-fit', title: 'Keep Fit', image: fit },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Progress value={66} className="w-full" />

            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-center mb-8">What's your main goal?</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {goals.map((goal) => (
                        <Card
                            key={goal.id}
                            className={`p-6 cursor-pointer transition-colors ${selectedGoal === goal.id ? 'bg-primary/10' : 'hover:bg-muted'
                                }`}
                            onClick={() => handleGoalSelect(goal.id)}
                        >
                            <div className="flex flex-row h-full items-center">
                                <h2 className="text-xl font-semibold mb-4">{goal.title}</h2>
                                <div className="flex-grow" />
                                <Image
                                    src={goal.image}
                                    width={100}
                                    height={100}
                                    alt={goal.title}
                                    className="self-end"
                                />
                            </div>
                        </Card>
                    ))}
                </div>

                <Button className="mt-8 w-full max-w-4xl" disabled={!selectedGoal} onClick={onNext}>
                    Next
                </Button>
            </main>
        </div>
    )
}