import { Row, Col, Typography } from 'antd'
import {
  UserAddOutlined,
  SearchOutlined,
  SmileOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography

const steps = [
  {
    title: '1. Qeydiyyatdan keç',
    desc: 'Hesab yarat və məlumatlarını doldur.',
    icon: <UserAddOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
  },
  {
    title: '2. Xidmətləri araşdır',
    desc: 'Sənə uyğun endirim və imkanları tap.',
    icon: <SearchOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
  },
  {
    title: '3. Faydalan',
    desc: 'Seçdiyin xidmətdən rahatlıqla istifadə et.',
    icon: <SmileOutlined style={{ fontSize: 48, color: '#faad14' }} />,
  },
]

export const HowSection = () => {
  return (
    <section
      id="how"
      style={{ padding: '80px 20px', backgroundColor: 'white', textAlign: 'center' }}
    >
      <Title level={2}>Necə işləyir?</Title>
      <Row gutter={[24, 24]} justify="center">
        {steps.map((step, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px 20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minHeight: '240px',
              }}
            >
              <div style={{ marginBottom: 20 }}>{step.icon}</div>
              <Title level={3}>{step.title}</Title>
              <Paragraph>{step.desc}</Paragraph>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  )
}
