import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 查一下用户是否已经存在
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // 创建新用户（不加密密码，仅开发用）
    const newUser = await prisma.user.create({
        data: {
            email,
            password,
            name,
        },
    });

    return NextResponse.json({
        message: 'Registration successful',
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        },
    });
}
