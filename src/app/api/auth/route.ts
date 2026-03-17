import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, email, password, isLogin } = await req.json();

    let user;
    if (isLogin) {
      user = await User.findOne({ $or: [{ email }, { username }] });
      if (!user) {
        return NextResponse.json({ error: "Identity not found" }, { status: 404 });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    } else {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return NextResponse.json({ error: "Identity already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName: username,
        clerkId: `user_${Date.now()}_${username}`,
        steamId: `steam_${Date.now()}_${username}`,
        coins: 1000,
        avatar: '',
        role: 'Pro Creator',
        isVerified: true,
      });
    }

    const response = NextResponse.json({ 
      message: isLogin ? "Authenticated" : "Created",
      user 
    });

    response.cookies.set('auth_token', user.username, {
      path: '/',
      maxAge: 86400,
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookies.set('vault_username', user.username, {
      path: '/',
      maxAge: 86400,
      httpOnly: false,
    });

    return response;
  } catch (error: any) {
    console.error("Auth API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
