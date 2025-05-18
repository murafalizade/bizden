import {Button, Form, Input} from "antd";

export const ContactSection = () => {
    return (
        <section
            id="contact"
            style={{
                padding: "80px 20px",
                backgroundColor: "#fafafa",
                textAlign: "center",
            }}
        >
            <h2>Əlaqə</h2>
            <p>Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlayın.</p>
            <Form
                // form={form}
                layout="vertical"
                // onFinish={handleFormSubmit}
                style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}
            >
                <Form.Item
                    name="fullName"
                    label="Adınız"
                    rules={[{ required: true, message: "Zəhmət olmasa adınızı daxil edin"}]}
                >
                    <Input placeholder="Adınız" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Zəhmət olmasa email daxil edin" },
                        { type: "email", message: "Düzgün email formatı deyil" },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="message"
                    label="Mesaj"
                    rules={[{ required: true, message: "Zəhmət olmasa mesaj daxil edin" , max: 300}]}
                >
                    <Input.TextArea placeholder="Mesajınız" rows={4} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Göndər
                    </Button>
                </Form.Item>
            </Form>
        </section>
    )
}
