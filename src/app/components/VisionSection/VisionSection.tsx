import { Typography } from 'antd'
const { Title, Paragraph } = Typography

export function VisionSection() {
    return (
        <section
            id="vision"
            style={{
                padding: '80px 20px', backgroundColor: '#fafafa',
                textAlign: 'center',
            }}
        >
            <Title level={2}>Vizyonumuz</Title>
            <Paragraph style={{ maxWidth: 800, margin: '0 auto' }}>
                Gələcəyin rifahlı cəmiyyətini qurmaq üçün, hər bir gəncin və
                veteranın dəstəklənməsi bizim əsas məqsədimizdir.
            </Paragraph>
        </section>
    )
}
