import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import {RegisterPayload} from "@app/(authless)/register/libs/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserRole} from "@shared/libs/models";
import * as yup from "yup";

interface SubmissionFormProps {
  // Define your props here
}

const registerAccountSchema = yup.object({
    fullName: yup.string().required("Adınızı daxil edin!"),
    email: yup.string().email("Düzgün email daxil edin!").required("Email daxil edin!"),
    password: yup.string().required("Şifrənizi daxil edin!"),
    role: yup.mixed<UserRole>()
        .oneOf(Object.values(UserRole), 'Etibarsız rol seçildi')
        .required("Rol daxil edin!")
});

export const SubmissionForm: React.FC<SubmissionFormProps> = (props) => {

    const {
        control,
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

  return (
    <>
      <Form layout="vertical" style={{ marginTop: 20 }}>
        <Form.Item label="Əlavə qeyd">
          <Controller
              control={control}
              name="note"
              render={({ field }) => <Input {...field} placeholder="Əlavə qeydlərinizi daxil edin" />}
          />
        </Form.Item>

        <Form.Item>
          <Controller
              control={control}
              name="email"
              render={({ field }) => (
                  <Checkbox style={{textAlign: 'left'}}>
                    Mən daxil etdiyim məlumatların doğru olduğunu təsdiqləyirəm. Yanlış məlumat təqdim etmək və ya saxtakarlıq
                    törətmək Azərbaycan Respublikasının qanunvericiliyinə əsasən cinayət məsuliyyətinə səbəb ola bilər.
                  </Checkbox>
              )}
          />
        </Form.Item>


        <Form.Item>
          <div className={'text-right'}>
            <Button style={{marginRight: '8px'}}>
              Geri
            </Button>
            <Button type="primary" htmlType="submit">
              Təsdiq et
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
