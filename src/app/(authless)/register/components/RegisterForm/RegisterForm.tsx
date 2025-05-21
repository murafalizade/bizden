import React from 'react';
import {Steps} from "antd";
import {RegisterStep} from "@app/(authless)/register/libs/models";
import {RegisterAccountForm} from "@app/(authless)/register/components/RegisterAccountForm";
import {ProfileInfoForm} from "@app/(authless)/register/components/ProfileInfoForm";
import {SubmissionForm} from "@app/(authless)/register/components/SubmissionForm";
import {useJwtController} from "@shared/hooks/useJwtController";

const {Step} = Steps;

export const RegisterForm: React.FC = () => {
    const [step, setStep] = React.useState<RegisterStep>(RegisterStep.Submission);
    const {getJwtPayload} = useJwtController();
    const jwt = getJwtPayload();

    const moveInformationStep = () => {
        setStep(RegisterStep.ProfileInfo);
    }

    const moveSubmissionStep = () => {
        setStep(RegisterStep.Submission);
    }

    return (
        <>
            <Steps current={step} onChange={setStep} className="custom-steps">
                <Step title="Hesab Məlumatları" />
                <Step title="Əlavə Məlumat" disabled={!jwt} />
                <Step title="Təsdiq" disabled={!jwt}/>
            </Steps>

            {step === RegisterStep.RegisterAccount && <RegisterAccountForm nextStep={moveInformationStep} />}
            {step === RegisterStep.ProfileInfo && <ProfileInfoForm/>}
            {step === RegisterStep.Submission && <SubmissionForm/>}
        </>
    );
};
