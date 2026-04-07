import { ResumeData, TemplateType } from '@/types';

export function generatePrintStyles(template: TemplateType): string {
  const baseStyles = `
    @media print {
      body { margin: 0; padding: 0; }
      .no-print { display: none !important; }
      .resume-container { width: 100%; max-width: none; box-shadow: none; }
      @page { margin: 0.5in; size: letter; }
    }
  `;
  return baseStyles;
}

export function exportToPDF(elementId: string, filename: string = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');
      } catch {
        return '';
      }
    })
    .join('\n');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>${styles}</style>
        <style>
          @media print {
            body { margin: 0; }
            @page { margin: 0.5in; }
          }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Expected input format: 'YYYY-MM' (e.g., "2023-06")
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getResumeFileName(data: ResumeData): string {
  const name = data.personal_info.full_name.replace(/\s+/g, '_') || 'resume';
  return `${name}_resume.pdf`;
}
