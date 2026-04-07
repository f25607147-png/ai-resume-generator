import { ResumeData } from '@/types';
import { formatDate } from '@/lib/pdf';

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const { personal_info, summary, experience, education, skills } = data;

  return (
    <div className="font-serif bg-white text-gray-900 px-12 py-10" style={{ width: '100%', minHeight: '297mm' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {personal_info.full_name || 'Your Name'}
        </h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span>{personal_info.phone}</span>
            </>
          )}
          {personal_info.location && (
            <>
              <span className="text-gray-400">|</span>
              <span>{personal_info.location}</span>
            </>
          )}
          {personal_info.website && (
            <>
              <span className="text-gray-400">|</span>
              <span>{personal_info.website}</span>
            </>
          )}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-2 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-0.5">
            Work Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{exp.position || 'Position'}</h3>
                <span className="text-xs text-gray-600">
                  {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 italic">{exp.company}</p>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              )}
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  {exp.bullets.filter(Boolean).map((bullet, i) => (
                    <li key={i} className="text-sm text-gray-600">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-0.5">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <span className="text-xs text-gray-600">
                  {formatDate(edu.start_date)} – {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 italic">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-3 pb-0.5">
            Skills
          </h2>
          {skills.map((cat) => (
            <div key={cat.id} className="mb-2">
              {cat.category && (
                <span className="text-sm font-semibold text-gray-800">{cat.category}: </span>
              )}
              <span className="text-sm text-gray-700">{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
