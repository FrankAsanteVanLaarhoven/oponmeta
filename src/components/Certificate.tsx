import React from 'react';
import { useLocation } from 'react-router-dom';

const Certificate = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const student = params.get('student') || 'Jane Doe';
  const course = params.get('course') || 'Infection Control and Cleaning Protocols in Hospitals';
  const date = params.get('date') || '2024-07-01';
  const certId = params.get('id') || 'OPON-2024-0001';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a174e] to-[#1a2a6b] p-8">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-yellow-400 max-w-2xl w-full p-10 relative">
        <div className="flex justify-between items-center mb-8">
          <img src="/logo.png" alt="OponMeta Logo" className="h-20 w-20 drop-shadow-lg border-4 border-yellow-400 rounded-full bg-white p-2" />
          <div className="text-right">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow">Certificate of Completion</h2>
            <p className="text-lg text-gray-700 mt-2">This certifies that</p>
          </div>
        </div>
        <div className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-yellow-600 mb-2">{student}</h1>
          <p className="text-xl text-gray-700">has successfully completed the course</p>
          <h2 className="text-2xl font-bold text-[#0a174e] mt-2 mb-4">{course}</h2>
        </div>
        <div className="flex justify-between items-end mt-12">
          <div>
            <p className="text-gray-600">Date: {date}</p>
            <p className="text-gray-600">Certificate ID: {certId}</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="OponMeta Seal" className="h-16 w-16 rounded-full border-2 border-yellow-400 shadow-lg" />
            <span className="text-xs text-gray-500 mt-1">OponMeta Seal</span>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-400">Powered by OponMeta</span>
          <span className="text-xs text-yellow-600 font-semibold mt-1">Empowering Global Education Excellence</span>
        </div>
      </div>
    </div>
  );
};

export default Certificate; 