import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { submissionSchema } from '@app/(authless)/register/libs/schemas';
import { useMutation } from '@tanstack/react-query';
import {
  postVerificationBusinessProfile,
  postVerificationProfile,
  postVerificationVeteranProfile,
  refreshToken,
} from '@app/(authless)/register/libs/services';
import { UserRole } from '@shared/libs/models';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { RegisterStep, SubmissionPayload } from '@app/(authless)/register/libs/models';
import { setStep } from '@app/(authless)/register/libs/slice';
import { useRouter } from 'next/navigation';
import { ClientCookieManager } from '@shared/libs/cookie-manager/client-cookie-manager';

interface SubmissionFormProps {
  userId: string;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ userId }) => {
  const profileInfo = useAppSelector(state => state.register);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const backStep = () => {
    dispatch(setStep(RegisterStep.ProfileInfo));
  };

  const { mutateAsync: tokenRenew } = useMutation({
    mutationFn: refreshToken,
    onSuccess: token => {
      ClientCookieManager.setCookie(token);
      router.push('/dashboard');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(submissionSchema),
    reValidateMode: 'onChange',
  });

  const { mutateAsync: verifyStudentProfile } = useMutation({
    mutationFn: postVerificationProfile,
    onSuccess: async () => {
      await tokenRenew();
    },
  });

  const { mutateAsync: verifyVeteranProfile } = useMutation({
    mutationFn: postVerificationVeteranProfile,
    onSuccess: async () => {
      await tokenRenew();
    },
  });

  const { mutateAsync: verifyBusinessProfile } = useMutation({
    mutationFn: postVerificationBusinessProfile,
    onSuccess: async () => {
      await tokenRenew();
    },
  });

  const onSubmit = async (variables: SubmissionPayload) => {
    if (profileInfo.selectedRole === UserRole.Business && profileInfo.businessInfoPayload) {
      await verifyBusinessProfile({
        userId,
        note: variables?.note,
        businessInfo: profileInfo.businessInfoPayload,
        role: UserRole.Business,
      });
    } else if (profileInfo.selectedRole === UserRole.Veteran) {
      await verifyVeteranProfile({
        userId,
        note: variables?.note,
        veteranInfo: profileInfo?.veteranInfoPayload,
        role: UserRole.Veteran,
      });
    } else {
      await verifyStudentProfile({
        userId,
        note: variables?.note,
        studentInfo: profileInfo?.studentInfoPayload,
        role: UserRole.Student,
      });
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        <Form.Item
          label="Əlavə qeyd"
          validateStatus={errors.note ? 'error' : ''}
          help={errors.note?.message}
        >
          <Controller
            control={control}
            name="note"
            render={({ field }) => <Input {...field} placeholder="Əlavə qeydlərinizi daxil edin" />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.confirmation ? 'error' : ''}
          help={errors.confirmation?.message}
        >
          <Controller
            control={control}
            name="confirmation"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={e => field.onChange(e.target.checked)}
                style={{ textAlign: 'left' }}
              >
                Mən daxil etdiyim məlumatların doğru olduğunu təsdiqləyirəm. Yanlış məlumat təqdim
                etmək və ya saxtakarlıq törətmək Azərbaycan Respublikasının qanunvericiliyinə əsasən
                cinayət məsuliyyətinə səbəb ola bilər.
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item>
          <div className={'text-right'}>
            <Button style={{ marginRight: '8px' }} onClick={backStep}>
              Geri
            </Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Təsdiq et
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
