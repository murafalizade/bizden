import { Typography, Form, Input, Button } from 'antd'

const { Title, Paragraph } = Typography

export function ContactSection() {


    return (
        <section
            id="contact"
            style={{ padding: '80px 20px', backgroundColor: '#fafafa', textAlign: 'center' }}
        >
            <Title level={2}>Əlaqə</Title>
            <Paragraph>Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlayın.</Paragraph>

            <Form
                layout="vertical"
                style={{ maxWidth: 600, margin: '0 auto', textAlign: 'left' }}
            >
                <Form.Item
                    name="name"
                    label="Adınız"
                    rules={[{ required: true, message: 'Zəhmət olmasa adınızı daxil edin', max: 100 }]}
                >
                    <Input placeholder="Adınız" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Zəhmət olmasa email daxil edin' },
                        { type: 'email', message: 'Düzgün email formatı deyil' },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="message"
                    label="Mesaj"
                    rules={[{ required: true, message: 'Zəhmət olmasa mesaj daxil edin', max: 300 }]}
                >
                    <Input.TextArea placeholder="Mesajınız" rows={4} />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Göndər
                    </Button>
                </Form.Item>
            </Form>
        </section>
    )
}
