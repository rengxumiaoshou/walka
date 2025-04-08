import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // 查找用户
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // 简单验证密码
    if (!user || user.password !== password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 返回用户信息
    return NextResponse.json({
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    });
}
