"use client";

import { useState } from "react";
import GenderStep from "./GenderStep";
import GoalsStep from "./GoalsStep";
import { Progress } from "@/components/ui/progress";
import FocusAra from "./FocusArea";

export default function ProfileSteps() {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const finalSubmit = () => {
        console.log("Submitted");
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
                <FocusAra onComplete={finalSubmit} onBack={handlePreviousStep} />
            )}
        </>
    )
}