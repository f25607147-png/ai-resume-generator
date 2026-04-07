import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: 'View Resume' };
}

export default async function ViewResumePage({ params }: PageProps) {
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

  const defaultData = {
    personal_info: { full_name: 'Preview', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">{resume?.title ?? 'Resume Preview'}</h1>
        <div className="flex gap-2">
          <Link href={`/resumes/${id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/resumes">
            <Button variant="ghost">Back to resumes</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <ResumePreview
          data={resume?.resume_data ?? defaultData}
          template={resume?.template ?? 'modern'}
        />
      </div>
    </div>
  );
}
