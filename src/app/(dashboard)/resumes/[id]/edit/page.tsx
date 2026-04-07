import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ResumeEditor } from '@/components/resume/ResumeEditor';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit Resume` };
}

export default async function EditResumePage({ params }: PageProps) {
  const { id } = await params;
  let resume = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();
    resume = data;
  } catch {
    // Database not configured
  }

  if (!resume && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col">
      <ResumeEditor
        resumeId={id}
        initialTitle={resume?.title ?? 'My Resume'}
        initialTemplate={resume?.template ?? 'modern'}
        initialData={resume?.resume_data}
      />
    </div>
  );
}
