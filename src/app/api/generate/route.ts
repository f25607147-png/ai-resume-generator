import { NextRequest, NextResponse } from 'next/server';
import { generateResumeContent } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'AI generation is not configured. Please add GROQ_API_KEY.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { job_title, job_description, current_data } = body;

    if (!job_title) {
      return NextResponse.json({ error: 'job_title is required' }, { status: 400 });
    }

    const result = await generateResumeContent(
      job_title,
      job_description ?? '',
      current_data ?? {}
    );

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
