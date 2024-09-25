/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import man from "../../gymman.jpg"
import woman from "../../sportwoman.jpg"

export default function GenderStep({ onNext }: { onNext: () => void }) {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
        onNext(); // Call onNext when a gender is selected
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-5 py-5">
                <h1 className='text-center font-light text-sm mb-4'><span className=' text-primary'>01</span> GOAL & FOCUS</h1>
                <Progress value={33} className="w-full" />
            </div>

            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-md p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">What's your gender?</h1>

                    <div className="flex justify-center space-x-8">
                        <button
                            onClick={() => handleGenderSelect('male')}
                            className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${selectedGender === 'male' ? 'bg-primary/10' : 'hover:bg-muted'
                                }`}
                        >
                            <Image
                                src={man}
                                width={100}
                                height={100}
                                alt="Male"
                                className="rounded-full"
                            />
                            <span className="font-medium">Male</span>
                        </button>

                        <button
                            onClick={() => handleGenderSelect('female')}
                            className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${selectedGender === 'female' ? 'bg-primary/10' : 'hover:bg-muted'
                                }`}
                        >
                            <Image
                                src={woman}
                                width={100}
                                height={100}
                                alt="Female"
                                className="rounded-full"
                            />
                            <span className="font-medium">Female</span>
                        </button>
                    </div>

                    <Button className="w-full" >
                        Next
                    </Button>
                </Card>
            </main>
        </div>
    )
}