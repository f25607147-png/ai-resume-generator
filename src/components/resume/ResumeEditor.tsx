'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeData, TemplateType, WorkExperience, Education, SkillCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { TemplateSelector } from './TemplateSelector';
import { ResumePreview } from './ResumePreview';
import { exportToPDF, getResumeFileName } from '@/lib/pdf';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

interface ResumeEditorProps {
  resumeId?: string;
  initialTitle?: string;
  initialTemplate?: TemplateType;
  initialData?: ResumeData;
}

const EMPTY_DATA: ResumeData = {
  personal_info: { full_name: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

export function ResumeEditor({ resumeId, initialTitle = 'My Resume', initialTemplate = 'modern', initialData }: ResumeEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [template, setTemplate] = useState<TemplateType>(initialTemplate);
  const [data, setData] = useState<ResumeData>(initialData ?? EMPTY_DATA);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [activeSection, setActiveSection] = useState('personal');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [error, setError] = useState('');

  const updatePersonal = (field: string, value: string) => {
    setData((prev) => ({ ...prev, personal_info: { ...prev.personal_info, [field]: value } }));
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: generateId(), company: '', position: '', start_date: '', end_date: '', current: false, description: '', bullets: [''],
    };
    setData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(), institution: '', degree: '', field: '', start_date: '', end_date: '', gpa: '', description: '',
    };
    setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = { id: generateId(), category: '', skills: [''] };
    setData((prev) => ({ ...prev, skills: [...prev.skills, newCat] }));
  };

  const updateSkillCategory = (id: string, field: string, value: string | string[]) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const url = resumeId ? `/api/resumes/${resumeId}` : '/api/resumes';
      const method = resumeId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, template, resume_data: data }),
      });
      if (!res.ok) throw new Error('Failed to save');
      const saved = await res.json();
      if (!resumeId) {
        router.push(`/resumes/${saved.id}/edit`);
      }
    } catch (err) {
      setError('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title for AI generation.');
      return;
    }
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_title: jobTitle,
          job_description: jobDescription,
          current_data: { experience: data.experience, skills: data.skills },
        }),
      });
      if (!res.ok) throw new Error('Generation failed');
      const generated = await res.json();
      setData((prev) => ({
        ...prev,
        summary: generated.summary || prev.summary,
        experience: prev.experience.map((exp, i) => ({
          ...exp,
          bullets: generated.experience_bullets?.[`position_index_${i}`] || exp.bullets,
        })),
        skills: prev.skills.length > 0 ? prev.skills : [{
          id: generateId(),
          category: 'Technical Skills',
          skills: generated.skills || [],
        }],
      }));
      setShowAIPanel(false);
    } catch (err) {
      setError('AI generation failed. Check your API key configuration.');
    } finally {
      setGenerating(false);
    }
  };

  const handleExportPDF = () => {
    exportToPDF('resume-preview', getResumeFileName(data));
  };

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'template', label: 'Template' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold text-gray-900 border-none outline-none bg-transparent focus:ring-0 w-64"
          placeholder="Resume title..."
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Generate
          </button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            Export PDF
          </Button>
          <Button size="sm" loading={saving} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* AI Panel */}
      {showAIPanel && (
        <div className="mx-6 mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <h3 className="text-sm font-semibold text-indigo-900 mb-3">✨ Generate with AI</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label="Target Job Title"
              placeholder="e.g. Senior Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <div />
          </div>
          <Textarea
            label="Job Description (optional)"
            placeholder="Paste the job description to get more targeted content..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-2"
            rows={3}
          />
          <div className="flex gap-2 mt-3">
            <Button size="sm" loading={generating} onClick={handleGenerate}>
              Generate Content
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAIPanel(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Mobile tabs */}
      <div className="md:hidden flex border-b border-gray-200 bg-white">
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeTab === 'editor' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeTab === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className={`w-full md:w-1/2 flex flex-col overflow-hidden ${activeTab === 'preview' ? 'hidden md:flex' : ''}`}>
          {/* Section nav */}
          <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === s.id ? 'bg-white shadow-sm text-indigo-600 border border-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-700">Personal Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Full Name" value={data.personal_info.full_name} onChange={(e) => updatePersonal('full_name', e.target.value)} placeholder="John Doe" />
                  <Input label="Email" type="email" value={data.personal_info.email} onChange={(e) => updatePersonal('email', e.target.value)} placeholder="john@example.com" />
                  <Input label="Phone" value={data.personal_info.phone} onChange={(e) => updatePersonal('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                  <Input label="Location" value={data.personal_info.location} onChange={(e) => updatePersonal('location', e.target.value)} placeholder="New York, NY" />
                  <Input label="Website" value={data.personal_info.website} onChange={(e) => updatePersonal('website', e.target.value)} placeholder="yourwebsite.com" />
                  <Input label="LinkedIn" value={data.personal_info.linkedin} onChange={(e) => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
                  <Input label="GitHub" value={data.personal_info.github} onChange={(e) => updatePersonal('github', e.target.value)} placeholder="github.com/username" />
                </div>
              </div>
            )}

            {activeSection === 'summary' && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-700">Professional Summary</h2>
                <Textarea
                  label="Summary"
                  value={data.summary}
                  onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="A brief 2-3 sentence overview of your professional background and career goals..."
                  rows={6}
                />
                <p className="text-xs text-gray-500">Tip: Use AI Generate to create a tailored summary for your target job.</p>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-700">Work Experience</h2>
                  <Button size="sm" variant="outline" onClick={addExperience}>+ Add</Button>
                </div>
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Position {idx + 1}</span>
                      <button onClick={() => removeExperience(exp.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Software Engineer" />
                      <Input label="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Acme Corp" />
                      <Input label="Start Date" type="month" value={exp.start_date} onChange={(e) => updateExperience(exp.id, 'start_date', e.target.value)} />
                      <div>
                        <Input label="End Date" type="month" value={exp.end_date} onChange={(e) => updateExperience(exp.id, 'end_date', e.target.value)} disabled={exp.current} />
                        <label className="flex items-center gap-2 mt-1">
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="rounded" />
                          <span className="text-xs text-gray-600">Current position</span>
                        </label>
                      </div>
                    </div>
                    <Textarea label="Description" value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={2} placeholder="Brief description of your role..." />
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Bullet Points</label>
                      {exp.bullets.map((bullet, bi) => (
                        <div key={bi} className="flex gap-2 mb-1.5">
                          <input
                            value={bullet}
                            onChange={(e) => {
                              const newBullets = [...exp.bullets];
                              newBullets[bi] = e.target.value;
                              updateExperience(exp.id, 'bullets', newBullets);
                            }}
                            placeholder="Achieved X by doing Y, resulting in Z..."
                            className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={() => {
                              const newBullets = exp.bullets.filter((_, i) => i !== bi);
                              updateExperience(exp.id, 'bullets', newBullets);
                            }}
                            className="text-gray-400 hover:text-red-500 px-1"
                          >×</button>
                        </div>
                      ))}
                      <button
                        onClick={() => updateExperience(exp.id, 'bullets', [...exp.bullets, ''])}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        + Add bullet
                      </button>
                    </div>
                  </div>
                ))}
                {data.experience.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No experience added yet. Click &quot;+ Add&quot; to get started.</p>
                )}
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-700">Education</h2>
                  <Button size="sm" variant="outline" onClick={addEducation}>+ Add</Button>
                </div>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Entry {idx + 1}</span>
                      <button onClick={() => removeEducation(edu.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="MIT" />
                      <Input label="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                      <Input label="Field of Study" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
                      <Input label="GPA (optional)" value={edu.gpa} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} placeholder="3.8" />
                      <Input label="Start Date" type="month" value={edu.start_date} onChange={(e) => updateEducation(edu.id, 'start_date', e.target.value)} />
                      <Input label="End Date" type="month" value={edu.end_date} onChange={(e) => updateEducation(edu.id, 'end_date', e.target.value)} />
                    </div>
                  </div>
                ))}
                {data.education.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No education added yet. Click &quot;+ Add&quot; to get started.</p>
                )}
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-700">Skills</h2>
                  <Button size="sm" variant="outline" onClick={addSkillCategory}>+ Add Category</Button>
                </div>
                {data.skills.map((cat) => (
                  <div key={cat.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Input
                        value={cat.category}
                        onChange={(e) => updateSkillCategory(cat.id, 'category', e.target.value)}
                        placeholder="e.g. Programming Languages"
                        className="text-sm font-medium"
                      />
                      <button onClick={() => removeSkillCategory(cat.id)} className="text-xs text-red-500 hover:text-red-700 ml-2">Remove</button>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Skills (one per line)</label>
                      <textarea
                        value={cat.skills.join('\n')}
                        onChange={(e) => updateSkillCategory(cat.id, 'skills', e.target.value.split('\n').filter(Boolean))}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Python&#10;TypeScript&#10;React"
                      />
                    </div>
                  </div>
                ))}
                {data.skills.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No skills added yet.</p>
                )}
              </div>
            )}

            {activeSection === 'template' && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-700">Choose Template</h2>
                <TemplateSelector value={template} onChange={setTemplate} />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className={`flex-1 bg-gray-100 overflow-auto p-6 flex justify-center ${activeTab === 'editor' ? 'hidden md:flex' : ''}`}>
          <div style={{ width: '210mm' }}>
            <ResumePreview data={data} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
