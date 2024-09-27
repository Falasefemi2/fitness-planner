"use client";

import { useState } from "react";
import GenderStep from "./GenderStep";
import GoalsStep from "./GoalsStep";
import { Progress } from "@/components/ui/progress";
import FocusAra from "./FocusArea";
import { useRouter } from "next/navigation";
// import { useAuth } from "@clerk/nextjs";
import { createUserProfile } from "../actions";

export default function ProfileSteps() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        gender: '',
        goal: '',
        focusArea: '',
    })
    const router = useRouter();
    // const { userId } = useAuth();


    const handleNextStep = (data: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const finalSubmit = async (formData: FormData) => {
        const result = await createUserProfile(formData);
        if (result.success) {
            router.push('/');
        } else {
            console.error(result.message);
        }
    }

    const progressValue = (currentStep / 3) * 100;

    const stepText = () => {
        switch (currentStep) {
            case 1:
                return "01 Goals & Focus";
            case 2:
                return "Muscle Building";
            case 3:
                return "Focus Area";
            default:
                return "";
        }
    };



    return (
        <>
            {/* <div className="container mx-auto px-4 py-4">
                <h1 className="text-sm font-bold mb-2">
                    {stepText()}
                </h1>
                <Progress value={progressValue} className="h-2" />
            </div> */}

            <form action={finalSubmit}>
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-sm font-bold mb-2">
                        {stepText()}
                    </h1>
                    <Progress value={progressValue} className="h-2" />
                </div>
                {currentStep === 1 && (
                    <GenderStep onNext={handleNextStep} />
                )}
                {currentStep === 2 && (
                    <GoalsStep onNext={handleNextStep} onBack={handlePreviousStep} />
                )}
                {currentStep === 3 && (
                    // <FocusAra onComplete={finalSubmit} onBack={handlePreviousStep} />
                    <FocusAra onNext={(data) => handleNextStep(data)} onBack={handlePreviousStep} />
                )}

                <input type="hidden" name="gender" value={formData.gender} />
                <input type="hidden" name="goal" value={formData.goal} />
                <input type="hidden" name="focusArea" value={formData.focusArea} />

                {currentStep === 3 && (
                    <button type="submit">Submit</button>
                )}

            </form>
        </>
    )
}