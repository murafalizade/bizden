import React, {useEffect, useState} from 'react';
import {Steps} from "antd";
import {RegisterStep} from "@app/(authless)/register/libs/models";
import {RegisterAccountForm} from "@app/(authless)/register/components/RegisterAccountForm";
import {ProfileInfoForm} from "@app/(authless)/register/components/ProfileInfoForm";
import {SubmissionForm} from "@app/(authless)/register/components/SubmissionForm";
import {useAppDispatch, useAppSelector} from "@shared/store/store";
import {setStep} from "@app/(authless)/register/libs/slice";
import {CookieManager} from "@shared/libs/cookieManager";
import {jwtDecoder} from "@shared/libs/helpers";
import {IJwtPayload} from "@shared/libs/models";

const {Step} = Steps;

export const RegisterForm: React.FC = () => {
    const step = useAppSelector(state => state.register.step);
    const dispatch = useAppDispatch();
    const [jwtPayload, setJwtPayload] = useState<IJwtPayload | null>(null);

    useEffect(() => {
        const fetchJWT = async () => {
            const jwt = await CookieManager.getCookie();
            if (!jwt) return;

            const decoded = jwtDecoder(jwt);
            setJwtPayload(decoded);

            if (!decoded?.isCompleted) {
                dispatch(setStep(RegisterStep.ProfileInfo));
            }
        };

        fetchJWT();
    }, []);


    return (
        <>
            <Steps current={step} className="custom-steps">
                <Step title="Hesab Məlumatları" />
                <Step title="Əlavə Məlumat" disabled={!jwtPayload} />
                <Step title="Təsdiq" disabled={!jwtPayload}/>
            </Steps>

            {step === RegisterStep.RegisterAccount && <RegisterAccountForm />}
            {step === RegisterStep.ProfileInfo && <ProfileInfoForm role={jwtPayload?.role!}/>}
            {step === RegisterStep.Submission && <SubmissionForm role={jwtPayload?.role!} userId={jwtPayload?.sub!}/>}
        </>
    );
};
