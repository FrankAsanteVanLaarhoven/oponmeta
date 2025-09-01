import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Edit, Trash2, Plus, CheckCircle, 
  AlertCircle, Star, Eye, Copy, Share2, User, Mail, 
  Phone, MapPin, Briefcase, GraduationCap, Award, 
  Calendar, Globe, Linkedin, Github, ExternalLink,
  ChevronDown, ChevronUp, Save, RefreshCw, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Added Link import

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedCareer, setSelectedCareer] = useState('technology');
  const [showPreview, setShowPreview] = useState(false);
  const [showResumeChecker, setShowResumeChecker] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  
  // Resume data state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  });

  // Career templates for 12+ careers
  const careerTemplates = {
    technology: {
      name: 'Technology & IT',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'Agile'],
      keywords: ['Software Development', 'Full Stack', 'DevOps', 'Cloud Computing', 'API Development'],
      summary: 'Experienced software developer with expertise in modern web technologies and cloud platforms.'
    },
    healthcare: {
      name: 'Healthcare & Medical',
      skills: ['Patient Care', 'Medical Terminology', 'HIPAA Compliance', 'Electronic Health Records', 'Clinical Procedures'],
      keywords: ['Patient Care', 'Medical Assistant', 'Nursing', 'Healthcare Administration', 'Clinical Research'],
      summary: 'Dedicated healthcare professional committed to providing exceptional patient care and support.'
    },
    finance: {
      name: 'Finance & Accounting',
      skills: ['Financial Analysis', 'Excel', 'QuickBooks', 'Tax Preparation', 'Risk Management', 'Budgeting'],
      keywords: ['Financial Analysis', 'Accounting', 'Investment Banking', 'Auditing', 'Financial Planning'],
      summary: 'Detail-oriented finance professional with strong analytical skills and regulatory knowledge.'
    },
    marketing: {
      name: 'Marketing & Sales',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Google Analytics', 'CRM', 'Content Creation'],
      keywords: ['Digital Marketing', 'Brand Management', 'Lead Generation', 'Market Research', 'Campaign Management'],
      summary: 'Creative marketing professional with proven track record in digital campaigns and brand development.'
    },
    education: {
      name: 'Education & Training',
      skills: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Educational Technology', 'Lesson Planning'],
      keywords: ['Teaching', 'Curriculum Development', 'Student Engagement', 'Educational Leadership', 'Professional Development'],
      summary: 'Passionate educator dedicated to fostering student growth and academic excellence.'
    },
    business: {
      name: 'Business & Management',
      skills: ['Project Management', 'Strategic Planning', 'Team Leadership', 'Business Development', 'Operations Management'],
      keywords: ['Business Strategy', 'Leadership', 'Operations', 'Strategic Planning', 'Team Management'],
      summary: 'Results-driven business leader with expertise in strategic planning and team development.'
    },
    engineering: {
      name: 'Engineering',
      skills: ['AutoCAD', 'SolidWorks', 'Project Management', 'Technical Design', 'Quality Control', 'Manufacturing'],
      keywords: ['Mechanical Engineering', 'Product Design', 'Manufacturing', 'Quality Assurance', 'Technical Analysis'],
      summary: 'Innovative engineer with strong technical skills and project management experience.'
    },
    hospitality: {
      name: 'Hospitality & Tourism',
      skills: ['Customer Service', 'Event Planning', 'Hotel Management', 'Tourism Operations', 'Food Safety'],
      keywords: ['Customer Service', 'Event Management', 'Hotel Operations', 'Tourism', 'Guest Relations'],
      summary: 'Hospitality professional committed to delivering exceptional guest experiences.'
    },
    legal: {
      name: 'Legal & Compliance',
      skills: ['Legal Research', 'Document Review', 'Contract Management', 'Regulatory Compliance', 'Case Management'],
      keywords: ['Legal Research', 'Contract Law', 'Compliance', 'Litigation Support', 'Regulatory Affairs'],
      summary: 'Detail-oriented legal professional with strong research and compliance expertise.'
    },
    creative: {
      name: 'Creative & Design',
      skills: ['Adobe Creative Suite', 'UI/UX Design', 'Graphic Design', 'Brand Identity', 'Typography', 'Illustration'],
      keywords: ['Graphic Design', 'UI/UX', 'Brand Design', 'Creative Direction', 'Visual Communication'],
      summary: 'Creative designer with passion for visual storytelling and brand development.'
    },
    science: {
      name: 'Science & Research',
      skills: ['Laboratory Techniques', 'Data Analysis', 'Research Methods', 'Scientific Writing', 'Statistical Analysis'],
      keywords: ['Research', 'Laboratory', 'Data Analysis', 'Scientific Method', 'Publications'],
      summary: 'Dedicated researcher with expertise in laboratory techniques and data analysis.'
    },
    social: {
      name: 'Social Services',
      skills: ['Case Management', 'Crisis Intervention', 'Community Outreach', 'Program Development', 'Client Advocacy'],
      keywords: ['Social Work', 'Case Management', 'Community Services', 'Client Support', 'Program Coordination'],
      summary: 'Compassionate social services professional committed to supporting community needs.'
    }
  };

  // Resume templates
  const resumeTemplates = {
    modern: {
      name: 'Modern Professional',
      description: 'Clean and contemporary design',
      color: 'bg-blue-600'
    },
    classic: {
      name: 'Classic Traditional',
      description: 'Timeless and professional',
      color: 'bg-gray-800'
    },
    creative: {
      name: 'Creative Portfolio',
      description: 'Stand out with style',
      color: 'bg-purple-600'
    },
    minimal: {
      name: 'Minimal Clean',
      description: 'Simple and elegant',
      color: 'bg-green-600'
    }
  };

  // CRUD Functions
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const deleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'intermediate' }]
    }));
  };

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const deleteSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const loadCareerTemplate = () => {
    const template = careerTemplates[selectedCareer];
    setResumeData(prev => ({
      ...prev,
      skills: template.skills.map(skill => ({ id: Date.now() + Math.random(), name: skill, level: 'intermediate' })),
      summary: template.summary
    }));
  };

  const generateResume = () => {
    // Generate PDF or download functionality
    console.log('Generating resume...');
  };

  const checkResume = () => {
    setShowResumeChecker(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#0a174e] mb-4">
            Professional Resume Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create expert-led resumes with AI-powered suggestions, career-specific templates, 
            and professional guidance for 12+ career paths.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            {[
              { key: 'builder', label: 'Resume Builder', icon: FileText },
              { key: 'templates', label: 'Templates', icon: Download },
              { key: 'checker', label: 'Resume Checker', icon: CheckCircle },
              { key: 'cover-letter', label: 'Cover Letters', icon: Mail }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-[#0a174e] text-white'
                    : 'text-gray-600 hover:text-[#0a174e]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            {activeTab === 'builder' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                {/* Career Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Career Path
                  </label>
                  <select
                    value={selectedCareer}
                    onChange={(e) => setSelectedCareer(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {Object.entries(careerTemplates).map(([key, career]) => (
                      <option key={key} value={key}>{career.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={loadCareerTemplate}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Load Career Template
                  </button>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={resumeData.personalInfo.firstName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={resumeData.personalInfo.lastName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Professional Summary</h3>
                  <textarea
                    placeholder="Write a compelling professional summary..."
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#0a174e]">Work Experience</h3>
                    <button
                      onClick={addExperience}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-[#0a174e]">Experience {index + 1}</h4>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2"
                        />
                        <div className="flex gap-2">
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                          />
                          <input
                            type="date"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder="Job description and achievements..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-3"
                      />
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#0a174e]">Skills</h3>
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {resumeData.skills.map((skill) => (
                      <div key={skill.id} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Skill name"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                        />
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-6 py-3 bg-[#0a174e] text-white rounded-md hover:bg-[#11235a] flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview Resume
                  </button>
                  <button
                    onClick={checkResume}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Check Resume
                  </button>
                  <button
                    onClick={generateResume}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Generate PDF
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Resume Templates</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(resumeTemplates).map(([key, template]) => (
                    <div
                      key={key}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTemplate === key
                          ? 'border-[#0a174e] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(key)}
                    >
                      <div className={`w-full h-32 ${template.color} rounded mb-3 flex items-center justify-center`}>
                        <FileText className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#0a174e]">{template.name}</h4>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'checker' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Resume Checker</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Strong Points</span>
                    </div>
                    <ul className="text-green-700 space-y-1">
                      <li>• Professional summary is well-written</li>
                      <li>• Skills are relevant to your career path</li>
                      <li>• Experience descriptions are detailed</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Suggestions</span>
                    </div>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• Add more quantifiable achievements</li>
                      <li>• Include keywords from job descriptions</li>
                      <li>• Consider adding a projects section</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cover-letter' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-bold text-[#0a174e] mb-6">Cover Letter Builder</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Position Title"
                      className="border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <textarea
                    placeholder="Write your cover letter..."
                    rows={10}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  <button className="px-6 py-3 bg-[#0a174e] text-white rounded-md hover:bg-[#11235a]">
                    Generate Cover Letter
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Preview & Tools */}
          <div className="space-y-6">
            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Resume Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
                <div className="text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2" />
                  <p>Resume preview will appear here</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Resume
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Resume
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  AI Enhancement
                </button>
              </div>
            </div>

            {/* Student Portal Integration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#0a174e] mb-4">Student Portal</h3>
              <p className="text-gray-600 mb-4">
                Access your learning dashboard and track your progress.
              </p>
              <Link
                to="/student-portal"
                className="w-full px-4 py-2 bg-[#0a174e] text-white rounded-md hover:bg-[#11235a] flex items-center gap-2 justify-center"
              >
                <User className="w-4 h-4" />
                Go to Student Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
