"use client";

import { useState } from "react";
import GenderStep from "./GenderStep";
import GoalsStep from "./GoalsStep";

export default function ProfileSteps() {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (
        <>
            {currentStep === 1 && (
                <GenderStep onNext={handleNextStep} />
            )}
            {currentStep === 2 && (
                <GoalsStep onNext={handleNextStep} />
            )}
        </>
    )
}