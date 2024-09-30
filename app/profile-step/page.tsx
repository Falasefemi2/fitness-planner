"use client";

import { useState } from "react";
import GenderStep from "./GenderStep";
import GoalsStep from "./GoalsStep";
import { Progress } from "@/components/ui/progress";
import FocusAra from "./FocusArea";
import { useRouter } from "next/navigation";
import { createUserProfile } from "../actions";
import { userProfileSchema } from "../types/user-profile";
import { z } from "zod";

type FormData = z.infer<typeof userProfileSchema>;

export default function ProfileSteps() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const router = useRouter();

    const handleGenderStep = (data: { gender: "male" | "female" }) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => prev + 1);
    };

    const handleGoalsStep = (data: { goal: "lose-weight" | "build-muscle" | "keep-fit" }) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (values: FormData) => {
        console.log("Final form data:", values);
        const result = await createUserProfile(values);
        if (result.success) {
            router.push('/');
        } else {
            console.error(result.message);
        }
    };


    const progressValue = (currentStep / 3) * 100;

    const stepText = () => {
        switch (currentStep) {
            case 1:
                return "01 Gender";
            case 2:
                return "02 Goals";
            case 3:
                return "03 Focus Area";
            default:
                return "";
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-sm font-bold mb-2">{stepText()}</h1>
            <Progress value={progressValue} className="h-2" />

            {currentStep === 1 && <GenderStep onNext={handleGenderStep} />}
            {currentStep === 2 && <GoalsStep onNext={handleGoalsStep} onBack={handlePreviousStep} />}
            {currentStep === 3 && (
                <FocusAra
                    onBack={handlePreviousStep}
                    handleSubmit={handleSubmit}
                    formData={formData as FormData}
                />
            )}
        </div>

    );
}

