import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Steps } from 'antd';
import { RegisterStep } from '@app/(authless)/register/libs/models';
import { RegisterAccountForm } from '@app/(authless)/register/components/RegisterAccountForm';
import { ProfileInfoForm } from '@app/(authless)/register/components/ProfileInfoForm';
import { SubmissionForm } from '@app/(authless)/register/components/SubmissionForm';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { setStep } from '@app/(authless)/register/libs/slice';
import { jwtDecoder } from '@shared/libs/helpers';
import { IJwtPayload } from '@shared/libs/models';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';
import { useRouter } from 'next/navigation';

const { Step } = Steps;

export const RegisterForm: React.FC = () => {
  const step = useAppSelector(state => state.register.step);
  const dispatch = useAppDispatch();
  const [jwtPayload, setJwtPayload] = useState<IJwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const jwt = ClientCookieManager.getCookie();
    const decoded = jwtDecoder(jwt);
    console.log(decoded);
    if (decoded && !decoded?.isCompleted) {
      setJwtPayload(decoded);
      dispatch(setStep(RegisterStep.ProfileInfo));
    } else if (decoded?.isCompleted) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <>
      <Form.Item>
        <Button
          type="default"
          className="w-full"
          icon={<img src="/assets/google.svg" alt="Google" style={{ width: 18, marginRight: 8 }} />}
        >
          Google ilə davam et
        </Button>
      </Form.Item>

      <Divider plain>və ya email ilə qeydiyyat</Divider>

      <Steps current={step} className="custom-steps">
        <Step title="Hesab Məlumatları" />
        <Step title="Əlavə Məlumat" disabled={!jwtPayload} />
        <Step title="Təsdiq" disabled={!jwtPayload} />
      </Steps>

      {step === RegisterStep.RegisterAccount && <RegisterAccountForm />}
      {step === RegisterStep.ProfileInfo && <ProfileInfoForm />}
      {step === RegisterStep.Submission && <SubmissionForm userId={jwtPayload?.sub!} />}
    </>
  );
};
