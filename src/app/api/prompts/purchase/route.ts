import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Prompt from '@/models/Prompt';

export async function POST(req: NextRequest) {
  try {
    const { promptId } = await req.json();
    await connectDB();

    const prompt = await Prompt.findById(promptId);
    if (!prompt) return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });

    const user = await User.findOne({ username: 'Global_Engineer' });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (user.coins < prompt.price) {
      return NextResponse.json({ error: 'Insufficient coins' }, { status: 400 });
    }

    user.coins -= prompt.price;
    if (!user.purchasedPrompts) user.purchasedPrompts = [];
    if (!user.purchasedPrompts.includes(promptId)) {
      user.purchasedPrompts.push(promptId);
    }
    await user.save();

    await Prompt.findByIdAndUpdate(promptId, { 
      $inc: { sales: 1 } 
    });

    return NextResponse.json({ 
      success: true, 
      newBalance: user.coins,
      message: `Successfully unlocked ${prompt.title}`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
