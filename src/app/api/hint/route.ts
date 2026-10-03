import { NextRequest, NextResponse } from 'next/server';
import { fetchHintFromAI } from '@/lib/ai';
import { HintRequest } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body: HintRequest = await req.json();

    if (!body.problemDescription || !body.problemDescription.trim()) {
      return NextResponse.json(
        { success: false, error: 'Problem description is required.' },
        { status: 400 }
      );
    }

    if (!body.targetLevel) {
      return NextResponse.json(
        { success: false, error: 'Target hint level is required.' },
        { status: 400 }
      );
    }

    const hintResult = await fetchHintFromAI({
      problemTitle: body.problemTitle || 'DSA Problem',
      problemDescription: body.problemDescription,
      userAttempt: body.userAttempt || 'No specific attempt detailed.',
      targetLevel: body.targetLevel,
      customQuery: body.customQuery,
    });

    return NextResponse.json(hintResult);
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'An internal error occurred while generating the hint.',
      },
      { status: 500 }
    );
  }
}
