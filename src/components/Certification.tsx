import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Download, 
  Share2, 
  CheckCircle, 
  Star, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Trophy,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Printer,
  Eye,
  EyeOff,
  Search,
  Filter,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  instructorName: string;
  completionDate: string;
  grade: string;
  certificateNumber: string;
  courseDuration: string;
  skills: string[];
  status: 'completed' | 'in-progress' | 'pending';
  isVerified: boolean;
}

const Certification: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const certificateRef = useRef<HTMLDivElement>(null);

  // Mock certificates data
  const certificates: Certificate[] = [
    {
      id: 'cert-001',
      courseName: 'Advanced Digital Marketing Strategy',
      studentName: 'John Doe',
      instructorName: 'Dr. Sarah Johnson',
      completionDate: '2024-02-15',
      grade: 'A+ (95%)',
      certificateNumber: 'OPM-2024-DM-001',
      courseDuration: '12 weeks',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
      status: 'completed',
      isVerified: true
    },
    {
      id: 'cert-002',
      courseName: 'Web Development Fundamentals',
      studentName: 'John Doe',
      instructorName: 'Prof. Michael Chen',
      completionDate: '2024-01-28',
      grade: 'A (92%)',
      certificateNumber: 'OPM-2024-WD-002',
      courseDuration: '8 weeks',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      status: 'completed',
      isVerified: true
    },
    {
      id: 'cert-003',
      courseName: 'Data Science Essentials',
      studentName: 'John Doe',
      instructorName: 'Dr. Emily Rodriguez',
      completionDate: '2024-03-10',
      grade: 'A- (88%)',
      certificateNumber: 'OPM-2024-DS-003',
      courseDuration: '16 weeks',
      skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
      status: 'completed',
      isVerified: true
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const handlePrintCertificate = () => {
    if (certificateRef.current) {
      window.print();
    }
  };

  const handleShareCertificate = (platform: string) => {
    if (!selectedCertificate) return;
    
    const shareText = `I just earned my ${selectedCertificate.courseName} certificate from OponMeta! 🎓 #OponMeta #Learning #Achievement`;
    const shareUrl = window.location.origin + '/certification';
    
    let shareLink = '';
    switch (platform) {
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(selectedCertificate.courseName)}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(`My ${selectedCertificate.courseName} Certificate`)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Certifications
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
              Showcase your achievements with professionally designed certificates from OponMeta. 
              Each certificate is verified and can be shared globally.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{certificates.length}</p>
            <p className="text-yellow-400">Certificates Earned</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{certificates.filter(c => c.isVerified).length}</p>
            <p className="text-yellow-400">Verified</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">A+</p>
            <p className="text-yellow-400">Average Grade</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <Share2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">Global</p>
            <p className="text-yellow-400">Recognition</p>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search certificates by course or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">All Certificates</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">
                    {certificate.status === 'completed' ? 'Completed' : certificate.status}
                  </span>
                </div>
                {certificate.isVerified && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{certificate.courseName}</h3>
              <p className="text-yellow-400 text-sm mb-3">Instructor: {certificate.instructorName}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-yellow-400">Completed: {formatDate(certificate.completionDate)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-yellow-400">Duration: {certificate.courseDuration}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-yellow-400">Grade: {certificate.grade}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-yellow-400 mb-2">Skills Acquired:</p>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadCertificate(certificate)}
                  className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-300 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1 inline" />
                  Download
                </button>
                <button
                  onClick={() => handleShareCertificate('linkedin')}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No certificates found</h3>
            <p className="text-yellow-400">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Certificate Content */}
            <div ref={certificateRef} className="p-8">
              <div className="text-center border-8 border-yellow-400 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src="/oponmeta-logo .png" 
                      alt="OponMeta Logo" 
                      className="h-16 w-auto"
                      style={{ height: '4rem' }}
                    />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-gray-900" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
                  <p className="text-gray-600">This is to certify that</p>
                </div>

                {/* Student Name */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedCertificate.studentName}</h3>
                  <p className="text-gray-600">has successfully completed the course</p>
                </div>

                {/* Course Details */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{selectedCertificate.courseName}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Grade:</strong> {selectedCertificate.grade}</p>
                      <p><strong>Duration:</strong> {selectedCertificate.courseDuration}</p>
                    </div>
                    <div>
                      <p><strong>Certificate #:</strong> {selectedCertificate.certificateNumber}</p>
                      <p><strong>Date:</strong> {formatDate(selectedCertificate.completionDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h5 className="font-semibold text-gray-900 mb-2">Skills Acquired:</h5>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-400 text-gray-900 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 mb-2">
                      <p className="font-semibold text-gray-900">{selectedCertificate.instructorName}</p>
                      <p className="text-sm text-gray-600">Course Instructor</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 pt-2 mb-2">
                      <p className="font-semibold text-gray-900">OponMeta Team</p>
                      <p className="text-sm text-gray-600">Platform Director</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    This certificate is verified and can be validated at oponmeta.com/certificates
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handlePrintCertificate}
                  className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Certificate
                </button>
                <button
                  onClick={() => handleShareCertificate('linkedin')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => handleShareCertificate('twitter')}
                  className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Certification;
