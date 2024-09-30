/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from 'react'
// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from '@/lib/utils';
// import man from "../../gymman.jpg"
// import woman from "../../sportwoman.jpg"

type Gender = "male" | "female";

interface GenderStepProps {
    onNext: (data: { gender: Gender }) => void;
}


// export default function GenderStep({ onNext }: { onNext: (data: { gender: string }) => void }) {
//     const [selectedGender, setSelectedGender] = useState<string | null>(null);

//     const handleGenderSelect = (gender: string) => {
//         setSelectedGender(gender);
//     };

//     const handleNextPage = () => {
//         if (selectedGender) {
//             onNext({ gender: selectedGender });
//         }
//     };

//     return (
//         <div className="flex flex-col">
//             <main className="flex-grow flex flex-col items-center justify-center p-4">
//                 <Card className="w-full max-w-md p-6 space-y-6">
//                     <h1 className="text-2xl font-bold text-center">What's your gender?</h1>
//                     <div className="flex justify-center space-x-8">
//                         {/* Male Selection */}
//                         <button
//                             onClick={() => handleGenderSelect("male")}
//                             className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${selectedGender === "male" ? "bg-primary" : "hover:bg-muted"
//                                 }`}
//                         >
//                             <Image src={man} width={100} height={100} alt="Male" className="rounded-full" />
//                             <span className="font-medium">Male</span>
//                         </button>

//                         {/* Female Selection */}
//                         <button
//                             onClick={() => handleGenderSelect("female")}
//                             className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${selectedGender === "female" ? "bg-primary" : "hover:bg-muted"
//                                 }`}
//                         >
//                             <Image src={woman} width={100} height={100} alt="Female" className="rounded-full" />
//                             <span className="font-medium">Female</span>
//                         </button>
//                     </div>

//                     {/* Next Button */}
//                     <Button className="w-full" onClick={handleNextPage} disabled={!selectedGender}>
//                         Next
//                     </Button>
//                 </Card>
//             </main>
//         </div>
//     );
// }


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
                {['male', 'female'].map((gender) => (
                    <Card
                        key={gender}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:shadow-lg",
                            selectedGender === gender ? "ring-2 ring-primary" : ""
                        )}
                        onClick={() => handleGenderSelect(gender as Gender)}
                    >
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold text-center capitalize">{gender}</h2>
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