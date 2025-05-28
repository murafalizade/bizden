import React from 'react';
import { Button, DatePicker, Flex, Form, Input, Select, Tooltip } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { UNIVERSITY_LIST } from '@app/(authless)/register/libs/constants';
import { InfoCircleOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentInfoSchema } from '@app/(authless)/register/libs/schemas';
import FileUploader from '@shared/components/FileUploader/FileUploader';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { setStep, setStudentInfoPayload } from '@app/(authless)/register/libs/slice';
import { RegisterStep, StudentProfilePayload } from '@app/(authless)/register/libs/models';
import dayjs from 'dayjs';
import { mapperFileUploader } from '@shared/libs/helpers';
import { UserRole } from '@shared/libs/models';

interface StudentInfoFormProps {}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = () => {
  const studentInfo = useAppSelector(state => state.register.studentInfoPayload)!;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(studentInfoSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...studentInfo,
    },
  });

  const dispatch = useAppDispatch();

  const nextStep = () => {
    dispatch(setStep(RegisterStep.Submission));
  };

  const onSubmit = (variables: StudentProfilePayload) => {
    dispatch(setStudentInfoPayload(variables));
    nextStep();
  };

  return (
    <Form layout="vertical" style={{ marginTop: 20 }} onFinish={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 600 }}>Tələbə Məlumatları</span>
        <Tooltip title="Daxil etdiyiniz məlumatlar yalnız identifikasiya məqsədi ilə istifadə olunacaq.">
          <InfoCircleOutlined style={{ color: '#1890ff' }} />
        </Tooltip>
      </div>
      <Form.Item
        label="Universitet"
        required
        validateStatus={errors.universityName ? 'error' : ''}
        help={errors.universityName?.message}
      >
        <Controller
          control={control}
          name="universityName"
          render={({ field }) => (
            <Select
              {...field}
              showSearch
              placeholder="Universitet adını seçin"
              optionFilterProp="children"
            >
              {UNIVERSITY_LIST.map((uni: string) => (
                <Select.Option key={uni} value={uni}>
                  {uni}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="İxtisas"
        required
        validateStatus={errors.major ? 'error' : ''}
        help={errors.major?.message}
      >
        <Controller
          control={control}
          name="major"
          render={({ field, fieldState }) => (
            <Input {...field} placeholder="İxtisasınızı daxil edin" maxLength={100} />
          )}
        />
      </Form.Item>

      <Flex justify="space-between" gap={8}>
        <Form.Item
          label="Başlama İli"
          style={{ width: '48%' }}
          required
          validateStatus={errors.startYear ? 'error' : ''}
          help={errors.startYear?.message}
        >
          <Controller
            control={control}
            name="startYear"
            render={({ field }) => (
              <DatePicker
                picker="year"
                placeholder="Seçin"
                style={{ width: '100%' }}
                {...field}
                value={field.value ? dayjs(`${field.value}`) : null}
                onChange={date => field.onChange(date?.year())}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Bitirmə İli"
          style={{ width: '48%' }}
          required
          validateStatus={errors.endYear ? 'error' : ''}
          help={errors.endYear?.message}
        >
          <Controller
            control={control}
            name="endYear"
            render={({ field }) => (
              <DatePicker
                picker="year"
                placeholder="Seçin"
                {...field}
                value={field.value ? dayjs(`${field.value}`) : null}
                onChange={date => field.onChange(date?.year())}
                style={{ width: '100%' }}
                // onChange={(_, dateString) => field.onChange(parseInt(dateString as string))}
              />
            )}
          />
        </Form.Item>
      </Flex>

      <Form.Item
        label="Tələbə bileti"
        required
        validateStatus={errors.studentIdFiles ? 'error' : ''}
        help={errors.studentIdFiles?.message}
      >
        <Controller
          name="studentIdFiles"
          control={control}
          render={({ field }) => (
            <FileUploader
              onSuccess={(file: string) => {
                field.onChange([...(field.value || []), file]);
              }}
              onRemove={(fileToRemove: string) => {
                const updatedFiles = (field.value || []).filter(file => file !== fileToRemove);
                field.onChange(updatedFiles);
              }}
              defaultFiles={mapperFileUploader(field.value)}
              multiple
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <div className={'text-right'}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            İrəli
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
