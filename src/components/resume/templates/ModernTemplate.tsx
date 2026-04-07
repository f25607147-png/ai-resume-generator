import { ResumeData } from '@/types';
import { formatDate } from '@/lib/pdf';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personal_info, summary, experience, education, skills } = data;

  return (
    <div className="font-sans bg-white text-gray-900" style={{ width: '100%', minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-indigo-700 text-white px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {personal_info.full_name || 'Your Name'}
        </h1>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-indigo-100 text-sm">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.location && <span>{personal_info.location}</span>}
          {personal_info.website && <span>{personal_info.website}</span>}
          {personal_info.linkedin && <span>{personal_info.linkedin}</span>}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 px-6 py-6 flex-shrink-0 border-r border-gray-200">
          {summary && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-2">About</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-2">Skills</h2>
              {skills.map((cat) => (
                <div key={cat.id} className="mb-3">
                  {cat.category && (
                    <p className="text-xs font-semibold text-gray-700 mb-1">{cat.category}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="text-xs font-semibold text-gray-900">{edu.institution}</p>
                  <p className="text-xs text-gray-600">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.start_date)} – {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                  </p>
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 px-8 py-6">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-4 border-b border-indigo-200 pb-1">
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-sm text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                  )}
                  {exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.filter(Boolean).map((bullet, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
