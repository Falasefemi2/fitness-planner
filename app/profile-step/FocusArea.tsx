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

// export default function FocusArea({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
//     const [selectedFocus, setSelectedFocus] = useState<string | null>(null)

//     const handleFocusSelect = (focus: string) => {
//         setSelectedFocus(focus === selectedFocus ? null : focus)
//     }

//     const focusAreas = [
//         { name: "Full Body", image: fullbody },
//         { name: "Arm", image: arm },
//         { name: "Chest", image: chest },
//         { name: "Abs", image: abs },
//         { name: "Leg", image: leg },
//     ]

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-center mb-8">What's your focus area?</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {focusAreas.map((area, index) => (
//                     <Card
//                         key={index}
//                         className={cn(
//                             "cursor-pointer transition-all duration-300 hover:shadow-lg",
//                             selectedFocus === area.name ? "ring-2 ring-primary" : ""
//                         )}
//                         onClick={() => handleFocusSelect(area.name)}
//                     >
//                         <CardContent className="p-4">
//                             <div className="aspect-square relative mb-4">
//                                 <Image
//                                     src={area.image}
//                                     alt={`${area.name} focus area`}
//                                     fill
//                                     className="object-cover rounded-md"
//                                 />
//                             </div>
//                             <h2 className="text-xl font-semibold text-center">{area.name}</h2>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//             <div className="flex justify-between mt-6">
//                 <Button variant="outline" onClick={onBack}>
//                     Back
//                 </Button>
//                 <Button onClick={onComplete} disabled={!selectedFocus}>
//                     Complete
//                 </Button>
//             </div>
//         </div>
//     )
// }


export default function FocusArea({ onNext, onBack }: { onNext: (data: { focusArea: string }) => void; onBack: () => void }) {
    const [selectedFocus, setSelectedFocus] = useState<string | null>(null)

    const handleFocusSelect = (focus: string) => {
        setSelectedFocus(focus === selectedFocus ? null : focus)
    }

    const handleNextPage = () => {
        if (selectedFocus) {
            onNext({ focusArea: selectedFocus });
        }
    }

    const focusAreas = [
        { name: "Full Body", image: fullbody },
        { name: "Arm", image: arm },
        { name: "Chest", image: chest },
        { name: "Abs", image: abs },
        { name: "Leg", image: leg },
    ]

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
                <Button onClick={handleNextPage} disabled={!selectedFocus}>
                    Next
                </Button>
            </div>
        </div>
    )
}