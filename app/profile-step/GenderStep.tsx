/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */

"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from '@/lib/utils'
import man from "../../gymman.jpg"
import woman from "../../sportwoman.jpg"
import Image from 'next/image'


type Gender = "male" | "female";

interface GenderStepProps {
    onNext: (data: { gender: Gender }) => void;
}

export default function GenderStep({ onNext }: GenderStepProps) {
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

    const handleGenderSelect = (gender: Gender) => {
        setSelectedGender(gender);
    };

    const handleNext = () => {
        if (selectedGender) {
            onNext({ gender: selectedGender });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">What's your gender?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                    { gender: 'male', imageSrc: man },
                    { gender: 'female', imageSrc: woman }
                ].map(({ gender, imageSrc }) => (
                    <Card
                        key={gender}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedGender === gender ? "ring-2 ring-primary" : ""
                        )}
                        onClick={() => handleGenderSelect(gender as Gender)}
                    >
                        <CardContent className="p-4">
                            <Image
                                src={imageSrc}
                                alt={`${gender} representative image`}
                                className="w-full h-auto object-cover rounded-md"
                            />
                            <p className="text-center mt-2 capitalize">{gender}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-end mt-6">
                <Button onClick={handleNext} disabled={!selectedGender}>
                    Next
                </Button>
            </div>
        </div>
    );
}