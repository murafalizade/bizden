import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from "react";
import {Button, Form, Input, Select} from 'antd';
import {RegisterPayload, RegisterStep} from "@app/(authless)/register/libs/models";
import {UserRole} from "@shared/libs/models";
import {useMutation} from "@tanstack/react-query";
import {postRegister} from "@app/(authless)/register/libs/services";
import {useAppDispatch} from "@shared/store/store";
import {setStep} from "@app/(authless)/register/libs/slice";
import Cookies from 'js-cookie';


const Option = Select.Option;

const registerAccountSchema = yup.object({
  fullName: yup.string().required("Adınızı daxil edin!"),
  email: yup.string().email("Düzgün email daxil edin!").required("Email daxil edin!"),
  password: yup.string().required("Şifrənizi daxil edin!"),
  role: yup.mixed<UserRole>()
      .oneOf(Object.values(UserRole), 'Etibarsız rol seçildi')
      .required("Rol daxil edin!")
});

interface RegisterAccountFormProps {
}

export const RegisterAccountForm: React.FC<RegisterAccountFormProps> = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerAccountSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: UserRole.Student
    }
  });

  const {mutateAsync} = useMutation({
    mutationFn: postRegister,
    onSuccess: async data => {
        Cookies.set('myCookie', 'HelloFromClient', { expires: 7 });
        dispatch(setStep(RegisterStep.ProfileInfo))
    }
  });

  const onSubmit = async (variables: RegisterPayload) => {
    await mutateAsync(variables)
  }

  return (
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        <Form.Item label="Ad və Soyad" validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message}>
          <Controller
              control={control}
              name="fullName"
              render={({ field }) => <Input {...field} placeholder="Tam adınızı daxil edin" />}
          />
        </Form.Item>

        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller
              control={control}
              name="email"
              render={({ field }) => <Input {...field} placeholder="Email daxil edin" />}
          />
        </Form.Item>

        <Form.Item label="Şifrə" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller
              control={control}
              name="password"
              render={({ field }) => <Input.Password {...field} placeholder="Şifrə daxil edin" />}
          />
        </Form.Item>

        <Form.Item label="Mən" validateStatus={errors.role ? 'error' : ''} help={errors.role?.message}>
          <Controller
              control={control}
              name="role"
              render={({ field }) => (
                  <Select {...field} placeholder="Rol seçin" allowClear>
                    <Option value="Student">Tələbəyəm</Option>
                    <Option value="Veteran">Veteran və ya Şəhid Ailəsi üzvüyəm</Option>
                    <Option value="Business">Dəstək olmaq istəyirəm</Option>
                  </Select>
              )}
          />
        </Form.Item>

          <Form.Item>
              <div style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit" loading={isSubmitting}>
                      Davam et
                  </Button>
              </div>
          </Form.Item>
      </Form>
  );
};
