import { ResumeData } from '@/types';
import { formatDate } from '@/lib/pdf';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personal_info, summary, experience, education, skills } = data;

  return (
    <div className="font-sans bg-white text-gray-800 px-10 py-8" style={{ width: '100%', minHeight: '297mm' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">
          {personal_info.full_name || 'Your Name'}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && <span>· {personal_info.phone}</span>}
          {personal_info.location && <span>· {personal_info.location}</span>}
          {personal_info.website && <span>· {personal_info.website}</span>}
          {personal_info.linkedin && <span>· {personal_info.linkedin}</span>}
        </div>
        <div className="mt-3 h-px bg-gray-200" />
      </div>

      {summary && (
        <div className="mb-7">
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5 grid grid-cols-4 gap-4">
              <div className="col-span-1 text-xs text-gray-400 pt-0.5 text-right">
                <span>{formatDate(exp.start_date)}</span>
                <span className="block">– {exp.current ? 'Now' : formatDate(exp.end_date)}</span>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                <p className="text-sm text-gray-500">{exp.company}</p>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-gray-300 flex-shrink-0">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-7">
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 grid grid-cols-4 gap-4">
              <div className="col-span-1 text-xs text-gray-400 pt-0.5 text-right">
                <span>{formatDate(edu.start_date)}</span>
                <span className="block">– {edu.end_date ? formatDate(edu.end_date) : 'Now'}</span>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-semibold text-gray-900">{edu.institution}</h3>
                <p className="text-sm text-gray-500">{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</p>
                {edu.gpa && <p className="text-xs text-gray-400 mt-1">GPA {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-4">Skills</h2>
          {skills.map((cat) => (
            <div key={cat.id} className="mb-2 grid grid-cols-4 gap-4">
              {cat.category && (
                <div className="col-span-1 text-xs text-gray-400 text-right">{cat.category}</div>
              )}
              <div className={cat.category ? 'col-span-3' : 'col-span-4'}>
                <p className="text-sm text-gray-600">{cat.skills.join(' · ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
