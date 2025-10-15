import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isAuthenticated) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      isAuthenticated: true,
      email: session.email,
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
