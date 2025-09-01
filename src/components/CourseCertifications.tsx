import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  Shield, 
  Download, 
  Share2, 
  Medal, 
  CheckCircle, 
  User, 
  Calendar, 
  Star,
  FileText,
  Eye
} from 'lucide-react';

interface Certificate {
  id: string;
  courseTitle: string;
  certificateId: string;
  studentName: string;
  completionDate: string;
  grade: string;
  skills: string[];
  instructor: string;
  duration: string;
  verified: boolean;
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseTitle: 'Advanced AI and Machine Learning',
    certificateId: 'OPM-2025-001-001',
    studentName: 'John Smith',
    completionDate: 'January 15, 2025',
    grade: 'A+ (95%)',
    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Data Analysis'],
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    verified: true
  },
  {
    id: '2',
    courseTitle: 'Digital Marketing Mastery',
    certificateId: 'OPM-2025-002-001',
    studentName: 'Emily Rodriguez',
    completionDate: 'January 10, 2025',
    grade: 'A (92%)',
    skills: ['SEO', 'Social Media Marketing', 'Content Strategy', 'Analytics'],
    instructor: 'Prof. Michael Chen',
    duration: '10 weeks',
    verified: true
  },
  {
    id: '3',
    courseTitle: 'Web Development Fundamentals',
    certificateId: 'OPM-2025-003-001',
    studentName: 'Alex Thompson',
    completionDate: 'January 5, 2025',
    grade: 'A- (88%)',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    instructor: 'Prof. David Wilson',
    duration: '8 weeks',
    verified: true
  }
];

const CourseCertifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showCertificateDetail, setShowCertificateDetail] = useState(false);

  const filteredCertificates = mockCertificates.filter(cert =>
    cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateDetail(true);
  };

  const handleDownloadPDF = () => {
    // Implementation for PDF download
    console.log('Downloading PDF...');
  };

  const handleDownloadJPEG = () => {
    // Implementation for JPEG download
    console.log('Downloading JPEG...');
  };

  const handleShareCertificate = () => {
    // Implementation for sharing
    console.log('Sharing certificate...');
  };

  const handleVerifyCertificate = () => {
    // Implementation for certificate verification
    console.log('Verifying certificate...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Medal className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Certifications</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify and showcase your achievements with official OponMeta certificates. Each certificate includes course details, instructor signatures, and verification codes.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Verification Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search certificates by course name, student, or certificate number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
          <Button 
            onClick={handleVerifyCertificate}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            <Shield className="w-5 h-5 mr-2" />
            Verify Certificate
          </Button>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Header with Medal and Checkmark */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Medal className="w-5 h-5 text-white" />
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {certificate.courseTitle}
                </h3>

                {/* Certificate ID */}
                <p className="text-sm text-gray-600 mb-3 font-mono">
                  Certificate #{certificate.certificateId}
                </p>

                {/* Student Info */}
                <div className="flex items-center mb-3">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">{certificate.studentName}</span>
                </div>

                {/* Completion Date */}
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">Completed {certificate.completionDate}</span>
                </div>

                {/* Grade */}
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-gray-700 font-semibold">{certificate.grade}</span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {certificate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => handleViewCertificate(certificate)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600">Try adjusting your search terms or check back later for new certificates.</p>
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {showCertificateDetail && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">O</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Certificate of Completion</h2>
                <p className="text-gray-600">This is to certify that</p>
              </div>

              {/* Recipient Name */}
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold text-blue-900 mb-2">
                  {selectedCertificate.studentName}
                </h3>
                <p className="text-xl text-gray-600">has successfully completed the course</p>
              </div>

              {/* Course Title */}
              <div className="text-center mb-8">
                <h4 className="text-3xl font-bold text-blue-900">
                  {selectedCertificate.courseTitle}
                </h4>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grade</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.completionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Certificate #</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCertificate.certificateId}</p>
                </div>
              </div>

              {/* Skills Acquired */}
              <div className="mb-8">
                <h5 className="text-lg font-semibold text-gray-900 mb-4 text-center">Skills Acquired</h5>
                <div className="flex flex-wrap justify-center gap-3">
                  {selectedCertificate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2 text-base">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{selectedCertificate.instructor}</p>
                  <p className="text-sm text-gray-600">Course Instructor</p>
                </div>
                <div className="w-32 h-px bg-gray-300"></div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">OponMeta Team</p>
                  <p className="text-sm text-gray-600">Platform Director</p>
                </div>
              </div>

              {/* Verification */}
              <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Certificate Verification</p>
                  <p className="font-mono text-gray-900">{selectedCertificate.certificateId}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Verified</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleDownloadPDF}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  onClick={handleDownloadJPEG}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download JPEG
                </Button>
                <Button 
                  onClick={handleShareCertificate}
                  variant="outline"
                  className="flex-1 py-3"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCertifications;
