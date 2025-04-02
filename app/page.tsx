'use client';
import { Layout, Menu, Typography, Row, Col, Card, Image } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function AboriginalTourismHomePage() {
    console.log(Layout)
    return (
        <Layout style={{ minHeight: '100vh', backgroundImage: 'url(/assets/aboriginal/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Header style={{ background: 'rgba(61, 38, 20, 0.9)', display: 'flex', alignItems: 'center' }}>
                <Image src="/assets/aboriginal/logo.png" alt="Walka Logo" style={{ height: 40, marginRight: 24 }} ></Image>
                <Menu mode="horizontal" theme="dark" style={{ background: 'transparent', flex: 1 }} defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><a href="#about">About</a></Menu.Item>
                    <Menu.Item key="2"><a href="#tours">Tours</a></Menu.Item>
                    <Menu.Item key="3"><a href="#support">Support</a></Menu.Item>
                    <Menu.Item key="4"><a href="#contact">Contact</a></Menu.Item>
                </Menu>
            </Header>

            <Content style={{ padding: '48px 24px' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: 48, borderRadius: 12, textAlign: 'center', color: 'white' }}>
                    <Title level={1} style={{ color: '#FFD666' }}>Explore Culture. Empower Communities.</Title>
                    <Paragraph style={{ color: '#FFF1B8', fontSize: '1.2rem', maxWidth: 800, margin: '0 auto' }}>
                        Experience authentic Aboriginal and Yizu culture through guided tours, art, and storytelling. Your journey supports Indigenous communities.
                    </Paragraph>
                </div>

                <div id="about" style={{ marginTop: 64 }}>
                    <Title level={2} style={{ color: '#FFD666' }}>Our Mission</Title>
                    <Paragraph style={{ color: 'white', maxWidth: 800 }}>
                        `Walka` means pattern, story, or journey. We are a platform that promotes sustainable tourism while preserving and supporting Aboriginal and Yizu traditions. We partner with local guides, artists, and historians to offer immersive cultural experiences.
                    </Paragraph>
                </div>

                <div id="tours" style={{ marginTop: 64 }}>
                    <Title level={2} style={{ color: '#FFD666' }}>Featured Cultural Journeys</Title>
                    <Row gutter={[24, 24]} justify="center" style={{ marginTop: 24 }}>
                        <Col xs={24} md={8}>
                            <Card style={{ backgroundColor: '#3E2A18', color: '#FFF1B8' }} title="Dreamtime Walk">
                                A guided hike through sacred Aboriginal lands, with storytelling around fire under the stars.
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ backgroundColor: '#3E2A18', color: '#FFF1B8' }} title="Yizu Textile Workshop">
                                Hands-on experience with traditional Yizu weaving, dyeing, and embroidery.
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ backgroundColor: '#3E2A18', color: '#FFF1B8' }} title="Indigenous Art Tour">
                                Visit local art centers, meet artists, and learn the meanings behind Aboriginal and Yizu patterns.
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div id="support" style={{ marginTop: 64 }}>
                    <Title level={2} style={{ color: '#FFD666' }}>Tourism That Gives Back</Title>
                    <Paragraph style={{ color: 'white', maxWidth: 800 }}>
                        Every booking funds education, community health, and cultural preservation programs. We ensure a fair share goes back to local creators and guides.
                    </Paragraph>
                </div>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#1C1109', color: '#FFF1B8' }}>
                © 2025 Walka Cultural Journeys. All rights reserved.
            </Footer>
        </Layout>
    );
}
