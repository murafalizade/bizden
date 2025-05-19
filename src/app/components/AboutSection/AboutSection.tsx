'use client'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

export function AboutSection() {
    return (
        <section
            id="about"
            style={{
                padding: '80px 20px', backgroundColor: '#fff',
                textAlign: 'center',
            }}
        >
            <Title level={2}>Haqqımızda</Title>
            <Paragraph style={{ maxWidth: 800, margin: '0 auto' }}>
                Platformamız tələbələr və veteranlar üçün müxtəlif xidmətlərə çıxışı
                asanlaşdırmaq və onların həyatını daha da rahatlaşdırmaq üçün
                yaradılmışdır.
            </Paragraph>
        </section>
    )
}
