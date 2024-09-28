"use client";

import { useState } from "react";
import GenderStep from "./GenderStep";
import GoalsStep from "./GoalsStep";
import { Progress } from "@/components/ui/progress";
import FocusAra from "./FocusArea";
import { useRouter } from "next/navigation";
import { createUserProfile } from "../actions";


export default function ProfileSteps() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        gender: '',
        goal: '',
        focusArea: '',
    });
    const router = useRouter();

    const handleNextStep = (data: Partial<typeof formData>) => {
        console.log("Data received from step component:", data);
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => prev + 1);
        console.log("Updated form data:", { ...formData, ...data });
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    // Final submission
    const finalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form data at submission:", formData);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("gender", formData.gender);
        formDataToSubmit.append("goal", formData.goal);
        formDataToSubmit.append("focusArea", formData.focusArea);
        const result = await createUserProfile(formDataToSubmit);
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
        <form onSubmit={finalSubmit}>
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-sm font-bold mb-2">{stepText()}</h1>
                <Progress value={progressValue} className="h-2" />
            </div>
            {currentStep === 1 && <GenderStep onNext={handleNextStep} />}
            {currentStep === 2 && <GoalsStep onNext={handleNextStep} onBack={handlePreviousStep} />}
            {currentStep === 3 && <FocusAra onNext={handleNextStep} onBack={handlePreviousStep} />}

            {/* Hidden inputs */}
            <input type="hidden" name="gender" value={formData.gender} />
            <input type="hidden" name="goal" value={formData.goal} />
            <input type="hidden" name="focusArea" value={formData.focusArea} />

            {currentStep === 3 && <button type="submit">Submit</button>}
        </form>
    );
}
