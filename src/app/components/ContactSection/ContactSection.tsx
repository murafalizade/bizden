import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Button, message } from 'antd';
import { IFeedbackPayload } from '@/app/libs/models';
import { useMutation } from '@tanstack/react-query';
import { sendFeedback } from '@/app/libs/services';

const schema = yup.object({
  fullName: yup
    .string()
    .required('Zəhmət olmasa adınızı daxil edin')
    .max(100, 'Ad 100 simvoldan çox ola bilməz'),
  email: yup
    .string()
    .email('Düzgün email formatı deyil')
    .required('Zəhmət olmasa email daxil edin'),
  message: yup
    .string()
    .required('Zəhmət olmasa mesaj daxil edin')
    .max(300, 'Mesaj 300 simvoldan çox ola bilməz'),
});

export function ContactSection() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFeedbackPayload>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  const [messageApi, context] = message.useMessage();

  const { mutateAsync } = useMutation({
    mutationFn: sendFeedback,
    onSuccess: async () => {
      messageApi.success('Mesajınız göndərildi!');
      reset();
    },
    onError: async () => {
      await messageApi.error('Xəta baş verdi!');
    },
  });

  const onSubmit = async (data: IFeedbackPayload) => {
    await mutateAsync(data);
  };

  return (
    <section
      id="contact"
      style={{ padding: '80px 20px', backgroundColor: '#fafafa', textAlign: 'center' }}
    >
      {context}
      <h2 className="text-3xl font-semibold mb-4">Əlaqə</h2>
      <p>Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlayın.</p>

      <Form
        layout="vertical"
        style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Adınız"
          validateStatus={errors.fullName ? 'error' : ''}
          help={errors.fullName?.message}
          required
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => <Input placeholder="Adınız" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          required
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Mesaj"
          validateStatus={errors.message ? 'error' : ''}
          help={errors.message?.message}
          required
        >
          <Controller
            name="message"
            control={control}
            render={({ field }) => <Input.TextArea placeholder="Mesajınız" rows={4} {...field} />}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Göndər
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
