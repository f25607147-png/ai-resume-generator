'use client';

import { TemplateType } from '@/types';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  value: TemplateType;
  onChange: (template: TemplateType) => void;
}

const TEMPLATES: { id: TemplateType; name: string; description: string; preview: React.ReactNode }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with indigo accent',
    preview: (
      <div className="w-full h-full flex">
        <div className="w-1/3 bg-indigo-700 h-full" />
        <div className="flex-1 p-1">
          <div className="h-2 bg-gray-300 rounded mb-1 w-3/4" />
          <div className="h-1.5 bg-gray-200 rounded mb-2 w-1/2" />
          <div className="h-1 bg-gray-200 rounded mb-0.5" />
          <div className="h-1 bg-gray-200 rounded mb-0.5 w-3/4" />
          <div className="h-1 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column format',
    preview: (
      <div className="w-full h-full p-1">
        <div className="text-center mb-1">
          <div className="h-2 bg-gray-700 rounded mx-auto w-2/3 mb-0.5" />
          <div className="h-1 bg-gray-400 rounded mx-auto w-1/2" />
        </div>
        <div className="border-b border-gray-700 mb-1" />
        <div className="h-1 bg-gray-200 rounded mb-0.5" />
        <div className="h-1 bg-gray-200 rounded mb-0.5 w-3/4" />
        <div className="h-1 bg-gray-200 rounded w-4/5" />
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and elegant with thin accents',
    preview: (
      <div className="w-full h-full p-1">
        <div className="h-3 bg-gray-800 rounded w-1/2 mb-0.5" />
        <div className="h-1 bg-gray-300 rounded w-1/3 mb-1" />
        <div className="border-b border-gray-200 mb-1" />
        <div className="h-1 bg-gray-100 rounded mb-0.5" />
        <div className="h-1 bg-gray-100 rounded mb-0.5 w-4/5" />
        <div className="h-1 bg-gray-100 rounded w-3/5" />
      </div>
    ),
  },
];

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onChange(template.id)}
          className={cn(
            'border-2 rounded-xl overflow-hidden transition-all text-left',
            value === template.id
              ? 'border-indigo-500 ring-2 ring-indigo-200'
              : 'border-gray-200 hover:border-gray-300'
          )}
        >
          <div className="h-20 bg-white relative overflow-hidden">
            {template.preview}
          </div>
          <div className="p-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-900">{template.name}</p>
            <p className="text-xs text-gray-500 truncate">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
