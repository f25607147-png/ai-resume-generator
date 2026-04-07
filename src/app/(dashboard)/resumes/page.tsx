'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Resume } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // Handle error
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-1">Manage all your resumes in one place.</p>
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

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Create your first resume and let AI help you craft compelling content.
          </p>
          <Link href="/resumes/new">
            <Button size="lg">Create your first resume</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{resume.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{resume.template} template</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Updated {new Date(resume.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-10 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/resumes/${resume.id}/edit`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full">Edit</Button>
                </Link>
                <Link href={`/resumes/${resume.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">View</Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  loading={deleting === resume.id}
                  onClick={() => handleDelete(resume.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </Card>
          ))}

          {/* Add new card */}
          <Link href="/resumes/new">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer h-full min-h-[160px]">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">New Resume</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
