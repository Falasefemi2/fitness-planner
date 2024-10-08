/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState } from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import fullbody from "../../fit1.jpg"
import arm from "../../fit2.jpg"
import chest from "../../fit3.jpg"
import abs from "../../fit4.jpg"
import leg from "../../fit5.jpg"
import { z } from 'zod'
import { userProfileSchema } from '../types/user-profile'
import { Loader2 } from 'lucide-react'
import React from 'react'



type FocusAreaType = z.infer<typeof userProfileSchema>['focusArea'];

interface FocusAreaProps {
    onBack: () => void;
    handleSubmit: (values: z.infer<typeof userProfileSchema>) => void;
    formData: z.infer<typeof userProfileSchema>;
}

export default function FocusArea({ onBack, handleSubmit, formData }: FocusAreaProps) {
    const [selectedFocus, setSelectedFocus] = useState<FocusAreaType | null>(
        formData.focusArea || null
    );
    const [loading, setLoading] = useState(false); // {{ edit_1 }}


    const handleFocusSelect = (focus: FocusAreaType) => {
        setSelectedFocus(focus === selectedFocus ? null : focus);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const focusAreas: { name: FocusAreaType; image: any }[] = [
        { name: "Full-Body", image: fullbody },
        { name: "Arm", image: arm },
        { name: "Chest", image: chest },
        { name: "Abs", image: abs },
        { name: "Leg", image: leg },
    ];

    const onSubmit = () => {
        if (selectedFocus) {
            setLoading(true);
            const updatedFormData: z.infer<typeof userProfileSchema> = {
                ...formData,
                focusArea: selectedFocus,
            };
            handleSubmit(updatedFormData);
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">What's your focus area?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {focusAreas.map((area, index) => (
                    <Card
                        key={index}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedFocus === area.name ? "ring-2 ring-primary" : ""
                        )}
                        onClick={() => handleFocusSelect(area.name)}
                    >
                        <CardContent className="p-4">
                            <div className="aspect-square relative mb-4">
                                <Image
                                    src={area.image}
                                    alt={`${area.name} focus area`}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-center">{area.name}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onSubmit} disabled={!selectedFocus || loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>

            </div>
        </div>
    );
}