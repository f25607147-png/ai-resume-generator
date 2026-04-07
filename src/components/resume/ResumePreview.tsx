import { ResumeData, TemplateType } from '@/types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  id?: string;
  scale?: number;
}

export function ResumePreview({ data, template, id = 'resume-preview', scale }: ResumePreviewProps) {
  const templates: Record<TemplateType, React.ComponentType<{ data: ResumeData }>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  };

  const TemplateComponent = templates[template];

  return (
    <div
      id={id}
      className="bg-white shadow-lg overflow-hidden"
      style={{
        width: '210mm',
        minHeight: '297mm',
        transform: scale ? `scale(${scale})` : undefined,
        transformOrigin: scale ? 'top left' : undefined,
      }}
    >
      <TemplateComponent data={data} />
    </div>
  );
}
