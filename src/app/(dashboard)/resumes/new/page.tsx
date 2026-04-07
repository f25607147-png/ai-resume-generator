'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateType } from '@/types';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function NewResumePage() {
  const router = useRouter();
  const [title, setTitle] = useState('My Resume');
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          template,
          resume_data: {
            personal_info: { full_name: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
            summary: '',
            experience: [],
            education: [],
            skills: [],
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to create resume');
      const data = await res.json();
      router.push(`/resumes/${data.id}/edit`);
    } catch {
      setError('Failed to create resume. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Resume</h1>
      <p className="text-gray-600 mb-8">Choose a name and template to get started.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
      )}

      <div className="space-y-6">
        <Input
          label="Resume Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Senior Developer Resume"
          helperText="You can change this later"
        />

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Choose Template</label>
          <TemplateSelector value={template} onChange={setTemplate} />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCreate} loading={loading} size="lg">
            Create Resume
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
