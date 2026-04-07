import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Resume } from '@/types';

function isThisCalendarMonth(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  let resumes: Resume[] = [];
  let user = null;

  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    user = userData.user;

    if (user) {
      const { data } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5);
      resumes = data ?? [];
    }
  } catch {
    // Database not configured
  }

  const stats = [
    { label: 'Total Resumes', value: resumes.length, icon: '📄' },
    { label: 'This Month', value: resumes.filter((r) => isThisCalendarMonth(r.created_at)).length, icon: '📅' },
    { label: 'Templates Used', value: new Set(resumes.map((r) => r.template)).size, icon: '🎨' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}! 👋
          </h1>
          <p className="text-gray-600 mt-1">Here&apos;s an overview of your resume activity.</p>
        </div>
        <Link href="/resumes/new">
          <Button>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Resume
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent resumes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Resumes</h2>
          <Link href="/resumes" className="text-sm text-indigo-600 hover:underline">View all</Link>
        </div>

        {resumes.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started.</p>
            <Link href="/resumes/new">
              <Button>Create your first resume</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{resume.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{resume.template} template</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-8 h-10 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/resumes/${resume.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Link href={`/resumes/${resume.id}`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">View</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
