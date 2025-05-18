import {Col, Row} from "antd"
import {SearchOutlined, SmileOutlined, UserAddOutlined} from "@ant-design/icons";

export const HowSection = () => {
    return (
        <section
            id="how"
            style={{
                padding: "80px 20px",
                backgroundColor: "white",
                textAlign: "center",
            }}
        >
            <h4>Necə işləyir?</h4>
            <Row gutter={[24, 24]} justify="center">
                {[
                    {
                        title: "1. Qeydiyyatdan keç",
                        desc: "Hesab yarat və məlumatlarını doldur.",
                        icon: <UserAddOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
                    },
                    {
                        title: "2. Xidmətləri araşdır",
                        desc: "Sənə uyğun endirim və imkanları tap.",
                        icon: <SearchOutlined style={{ fontSize: "48px", color: "#52c41a" }} />,
                    },
                    {
                        title: "3. Faydalan",
                        desc: "Seçdiyin xidmətdən rahatlıqla istifadə et.",
                        icon: <SmileOutlined style={{ fontSize: "48px", color: "#faad14" }} />,
                    },
                ].map((step, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <div
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "12px",
                                padding: "30px 20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                minHeight: "240px",
                            }}
                        >
                            <div style={{ marginBottom: 20 }}>{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </section>
    )
}
