import React from 'react';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InfoCircleOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { veteranInfoSchema } from '@app/(authless)/register/libs/schemas';
import FileUploader from '@shared/components/FileUploader/FileUploader';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { RegisterStep, VeteranProfilePayload } from '@app/(authless)/register/libs/models';
import { setStep, setVeteranInfoPayload } from '@app/(authless)/register/libs/slice';
import { mapperFileUploader } from '@shared/libs/helpers';

interface VeteranInfoFormProps {}

export const VeteranInfoForm: React.FC<VeteranInfoFormProps> = () => {
  const veteranInfo = useAppSelector(state => state.register.veteranInfoPayload)!;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(veteranInfoSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...veteranInfo,
    },
  });

  const dispatch = useAppDispatch();
  const nextStep = () => {
    dispatch(setStep(RegisterStep.Submission));
  };

  const onSubmit = (variables: VeteranProfilePayload) => {
    dispatch(setVeteranInfoPayload(variables));
    nextStep();
  };

  return (
    <Form layout="vertical" style={{ marginTop: 20 }} onFinish={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 600 }}>Veteran Məlumatları</span>
        <Tooltip title="Bu məlumatlar yalnız doğrulama məqsədilə istifadə olunacaq və üçüncü şəxslərlə paylaşılmayacaq.">
          <InfoCircleOutlined style={{ color: '#1890ff' }} />
        </Tooltip>
      </div>

      <Form.Item
        label="Status"
        required
        validateStatus={errors.type ? 'error' : ''}
        help={errors.type?.message}
      >
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              placeholder="Statusunuzu seçin"
              status={fieldState.error ? 'error' : ''}
            >
              <Select.Option value={0}>Müharibə Veteranı</Select.Option>
              <Select.Option value={1}>Şəhid Ailəsi Üzvü</Select.Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Əlaqədar Sahə"
        required
        validateStatus={errors.relevanceType ? 'error' : ''}
        help={errors.relevanceType?.message}
      >
        <Controller
          control={control}
          name="relevanceType"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              maxLength={100}
              placeholder="Əlaqədar sahəni daxil edin (məs: Ordu, Təqaüdçü, Daxili İşlər və s.)"
              status={fieldState.error ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Təsvir"
        required
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
      >
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Input.TextArea
              {...field}
              maxLength={500}
              placeholder="Ətraflı məlumat daxil edin"
              status={fieldState.error ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Təsdiqləyici Sənəd"
        required
        validateStatus={errors.veteranProofFiles ? 'error' : ''}
        help={errors.veteranProofFiles?.message}
      >
        <Controller
          control={control}
          name="veteranProofFiles"
          render={({ field }) => (
            <FileUploader
              onSuccess={file => {
                const newList = [...(field.value || []), file];
                field.onChange(newList);
              }}
              onRemove={fileToRemove => {
                const updatedFiles = (field.value || []).filter(file => file !== fileToRemove);
                field.onChange(updatedFiles);
              }}
              multiple
              defaultFiles={mapperFileUploader(veteranInfo?.veteranProofFiles)}
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
