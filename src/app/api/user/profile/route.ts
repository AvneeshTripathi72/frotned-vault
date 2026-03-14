import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Prompt from '@/models/Prompt';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const authToken = req.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ username: authToken }).populate('purchasedPrompts');

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    
    const authToken = req.cookies.get('auth_token')?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    
    const user = await User.findOneAndUpdate(
      { username: authToken },
      { $set: body },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "Identity not recognized" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Profile Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
