import React, { useEffect, useState } from 'react';
import { Steps, Spin } from 'antd';
import { RegisterStep } from '@app/(authless)/register/libs/models';
import { RegisterAccountForm } from '@app/(authless)/register/components/RegisterAccountForm';
import { ProfileInfoForm } from '@app/(authless)/register/components/ProfileInfoForm';
import { SubmissionForm } from '@app/(authless)/register/components/SubmissionForm';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { setStep } from '@app/(authless)/register/libs/slice';
import { jwtDecoder } from '@shared/libs/helpers';
import { IJwtPayload } from '@shared/libs/models';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';
import { useMutation } from '@tanstack/react-query';

const { Step } = Steps;

export const RegisterForm: React.FC = () => {
  const step = useAppSelector(state => state.register.step);
  const dispatch = useAppDispatch();
  const [jwtPayload, setJwtPayload] = useState<IJwtPayload | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => ClientCookieManager.getCookie(),
    onSuccess: jwt => {
      if (jwt) {
        const decoded = jwtDecoder(jwt);
        if (decoded) {
          setJwtPayload(decoded);
          if (!decoded.isCompleted) {
            dispatch(setStep(RegisterStep.ProfileInfo));
          }
        }
      }
    },
  });

  useEffect(() => {
    mutate();
  }, [dispatch]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Yüklənir..." />
      </div>
    );
  }

  console.log(jwtPayload);

  return (
    <>
      <Steps current={step} className="custom-steps">
        <Step title="Hesab Məlumatları" />
        <Step title="Əlavə Məlumat" disabled={!jwtPayload} />
        <Step title="Təsdiq" disabled={!jwtPayload} />
      </Steps>

      {step === RegisterStep.RegisterAccount && <RegisterAccountForm />}
      {step === RegisterStep.ProfileInfo && jwtPayload && (
        <ProfileInfoForm role={jwtPayload.role} />
      )}
      {step === RegisterStep.Submission && jwtPayload && (
        <SubmissionForm role={jwtPayload.role} userId={jwtPayload.sub!} />
      )}
    </>
  );
};
