import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {submissionSchema} from "@app/(authless)/register/libs/schemas";
import {useMutation} from "@tanstack/react-query";
import {postVerificationBusinessProfile, postVerificationProfile} from "@app/(authless)/register/libs/services";
import {UserRole} from "@shared/libs/models";
import {useAppDispatch, useAppSelector} from "@shared/store/store";
import {RegisterStep, SubmissionPayload} from "@app/(authless)/register/libs/models";
import {setStep} from "@app/(authless)/register/libs/slice";
import {redirect} from "next/navigation";

interface SubmissionFormProps {
  role: UserRole;
  userId: string;
}


export const SubmissionForm: React.FC<SubmissionFormProps> = ({ role, userId}) => {

    const profileInfo = useAppSelector(state => state.register);
    const dispatch = useAppDispatch();

    const backStep = () => {
        dispatch(setStep(RegisterStep.ProfileInfo));
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(submissionSchema),
        reValidateMode: 'onChange'
    });

    const {mutateAsync: verifyProfile} = useMutation({
        mutationFn: postVerificationProfile,
        onSuccess: () => {
            redirect('/dashboard');
        }
    });

    const {mutateAsync: verifyBusinessProfile} = useMutation({
        mutationFn: postVerificationBusinessProfile,
        onSuccess: () => {
            redirect('/dashboard');
        }
    });

    const onSubmit = async (variables: SubmissionPayload) => {
        if(role === UserRole.Business && profileInfo.businessInfoPayload){
            await verifyBusinessProfile({
                userId,
                note: variables?.note,
                businessInfo: profileInfo.businessInfoPayload,
            });
        }
        else{
            await verifyProfile({
                userId,
                note: variables?.note,
                studentInfo: profileInfo?.studentInfoPayload,
                veteranInfo: profileInfo?.veteranInfoPayload,
            });
        }
    }

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        <Form.Item label="Əlavə qeyd" validateStatus={errors.note ? 'error' : ''} help={errors.note?.message}>
          <Controller
              control={control}
              name="note"
              render={({ field }) => <Input {...field} placeholder="Əlavə qeydlərinizi daxil edin" />}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.confirmation ? 'error' : ''} help={errors.confirmation?.message}>
          <Controller
              control={control}
              name="confirmation"
              render={({ field }) => (
                  <Checkbox style={{textAlign: 'left'}} {...field}>
                    Mən daxil etdiyim məlumatların doğru olduğunu təsdiqləyirəm. Yanlış məlumat təqdim etmək və ya saxtakarlıq
                    törətmək Azərbaycan Respublikasının qanunvericiliyinə əsasən cinayət məsuliyyətinə səbəb ola bilər.
                  </Checkbox>
              )}
          />
        </Form.Item>

        <Form.Item>
          <div className={'text-right'}>
            <Button style={{marginRight: '8px'}} onClick={backStep}>
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
