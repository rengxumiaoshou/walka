// app/generate/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Typography, Row, Col, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function GeneratePage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const [plan, setPlan] = useState<any>(null);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchInitialPlan() {
            const res = await fetch('/api/gemini/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });
            const data = await res.json();
            console.log(query)
            console.log('Plan:', data);
            setPlan(data);
        }

        if (query) {
            fetchInitialPlan();
        }
    }, [query]);

    return (
        <Row gutter={24} style={{ padding: 24 }}>
            <Col span={12} style={{ background: 'brown', padding: 24 }}>
                <Title level={3}>Generated Plan</Title>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(plan, null, 2)}</pre>
            </Col>
            <Col span={12} style={{ background: '#fff', padding: 24 }}>
                <Title level={3}>Make a Change ✏️</Title>
                <Input.TextArea
                    rows={6}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g. 请去掉所有需要爬山的点"
                />
                <Button type="primary" style={{ marginTop: 12 }}>
                    Submit Change
                </Button>
            </Col>
        </Row>
    );
}
