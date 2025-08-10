import React from 'react';

interface CertificateProps {
  recipient: string;
  course: string;
  courseId: string;
  certificateNumber: string;
  date: string;
  authority: string;
  authorityTitle: string;
  logoUrl: string;
}

export default function Certificate({
  recipient,
  course,
  courseId,
  certificateNumber,
  date,
  authority,
  authorityTitle,
  logoUrl,
}: CertificateProps) {
  return (
    <div className="max-w-2xl mx-auto border-4 border-blue-900 rounded-xl bg-white shadow-lg p-10 relative print:p-0 print:shadow-none print:border-0">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-blue-900 text-white px-4 py-2 rounded-bl-lg rounded-br-lg text-lg font-bold tracking-widest">{new Date(date).getFullYear()}</div>
        <img src={logoUrl} alt="Logo" className="h-16 w-16 object-contain" />
      </div>
      <div className="text-center">
        <div className="uppercase text-sm font-semibold tracking-widest text-gray-500 mb-2">This is to certify that</div>
        <div className="text-4xl font-cursive font-bold text-blue-900 mb-2">{recipient}</div>
        <div className="text-lg font-medium text-gray-700 mb-4">has successfully completed the course</div>
        <div className="text-2xl font-bold text-blue-700 mb-2">{course}</div>
        <div className="text-sm text-gray-500 mb-6">Course ID: <span className="font-mono text-blue-900">{courseId}</span></div>
        <div className="text-base text-gray-700 mb-8">Awarded this certificate in recognition of achievement and commitment to professional growth.</div>
      </div>
      <div className="flex justify-between items-end mt-8">
        <div>
          <div className="text-xs text-gray-500">Certificate No.</div>
          <div className="font-mono text-blue-900 text-lg">{certificateNumber}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Signed by</div>
          <div className="font-signature text-2xl text-blue-900">{authority}</div>
          <div className="text-xs text-gray-500">{authorityTitle}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Date</div>
          <div className="font-mono text-blue-900 text-lg">{date}</div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-600">
        Verify this certificate at <span className="underline text-blue-700">ourplatform.com/verify/{certificateNumber}</span>
      </div>
    </div>
  );
} 