// Mock SCORM export utility
export async function handleDownloadSCORM(format: '1.2' | '2004', course: any) {
  // TODO: Use a real SCORM packaging library
  const zipContent = `SCORM ${format} package for course: ${course.title}`;
  const blob = new Blob([zipContent], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `course-scorm-${format}.zip`;
  a.click();
  URL.revokeObjectURL(url);
} 