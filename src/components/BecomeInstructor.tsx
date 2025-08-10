import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  UserPlus, 
  BookOpen, 
  DollarSign, 
  Globe, 
  Clock, 
  Star, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  Upload,
  FileText,
  Video,
  MessageSquare,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react';

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const APPLICATION_STEPS: ApplicationStep[] = [
  { id: 1, title: 'Personal Information', description: 'Basic details and contact information', completed: false },
  { id: 2, title: 'Professional Background', description: 'Experience, education, and expertise', completed: false },
  { id: 3, title: 'Course Proposal', description: 'Course ideas and teaching approach', completed: false },
  { id: 4, title: 'Documentation', description: 'Resume, certificates, and portfolio', completed: false },
  { id: 5, title: 'Review & Submit', description: 'Final review and application submission', completed: false }
];

const INSTRUCTOR_BENEFITS = [
  {
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    title: 'Earn Revenue',
    description: 'Keep up to 70% of course revenue with flexible pricing options'
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: 'Global Reach',
    description: 'Teach students from around the world and build your brand'
  },
  {
    icon: <Clock className="w-8 h-8 text-purple-600" />,
    title: 'Flexible Schedule',
    description: 'Create and teach courses on your own time and pace'
  },
  {
    icon: <Users className="w-8 h-8 text-orange-600" />,
    title: 'Community Access',
    description: 'Join our instructor community and network with peers'
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-600" />,
    title: 'Recognition',
    description: 'Get certified and recognized as an expert in your field'
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-red-600" />,
    title: 'Growth Opportunities',
    description: 'Access to advanced tools and professional development'
  }
];

const REQUIREMENTS = [
  'Minimum 2 years of professional experience in your field',
  'Strong communication and presentation skills',
  'Ability to create engaging educational content',
  'Commitment to student success and learning outcomes',
  'Professional portfolio or work samples',
  'Willingness to engage with student community'
];

const BecomeInstructor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    experience: '',
    education: '',
    expertise: '',
    courseTitle: '',
    courseDescription: '',
    targetAudience: '',
    teachingApproach: '',
    resume: null as File | null,
    certificates: [] as File[],
    portfolio: null as File | null,
    agreeToTerms: false
  });

  const updateStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      if (field === 'certificates') {
        const fileArray = Array.from(files);
        setFormData(prev => ({ ...prev, [field]: fileArray }));
      } else {
        setFormData(prev => ({ ...prev, [field]: files[0] }));
      }
    }
  };

  const getStepProgress = () => {
    return (currentStep / APPLICATION_STEPS.length) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="bg-white text-black border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className="bg-white text-black border-gray-300"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-white text-black border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-white text-black border-gray-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/yourprofile"
                  className="bg-white text-black border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                <Input
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="github.com/yourusername"
                  className="bg-white text-black border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="yourwebsite.com"
                  className="bg-white text-black border-gray-300"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Experience *</label>
              <Textarea
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Describe your professional experience, including roles, responsibilities, and achievements..."
                rows={4}
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Background *</label>
              <Textarea
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="List your educational qualifications, degrees, certifications..."
                rows={3}
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise *</label>
              <Textarea
                value={formData.expertise}
                onChange={(e) => handleInputChange('expertise', e.target.value)}
                placeholder="List your key skills, technologies, and areas of expertise..."
                rows={3}
                className="bg-white text-black border-gray-300"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proposed Course Title *</label>
              <Input
                value={formData.courseTitle}
                onChange={(e) => handleInputChange('courseTitle', e.target.value)}
                placeholder="e.g., Complete Web Development Bootcamp 2024"
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Description *</label>
              <Textarea
                value={formData.courseDescription}
                onChange={(e) => handleInputChange('courseDescription', e.target.value)}
                placeholder="Describe what students will learn, course structure, and learning outcomes..."
                rows={4}
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
              <Textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Who is this course for? (beginners, intermediate, advanced, specific roles...)"
                rows={3}
                className="bg-white text-black border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Approach *</label>
              <Textarea
                value={formData.teachingApproach}
                onChange={(e) => handleInputChange('teachingApproach', e.target.value)}
                placeholder="Describe your teaching methodology, engagement strategies, and assessment methods..."
                rows={3}
                className="bg-white text-black border-gray-300"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload your resume or CV</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('resume', e.target.files)}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Button variant="outline" className="bg-white text-black border-gray-300">
                    Choose File
                  </Button>
                </label>
                {formData.resume && (
                  <p className="text-sm text-green-600 mt-2">{formData.resume.name}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificates & Credentials</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload relevant certificates and credentials</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  onChange={(e) => handleFileUpload('certificates', e.target.files)}
                  className="hidden"
                  id="certificates-upload"
                />
                <label htmlFor="certificates-upload" className="cursor-pointer">
                  <Button variant="outline" className="bg-white text-black border-gray-300">
                    Choose Files
                  </Button>
                </label>
                {formData.certificates.length > 0 && (
                  <div className="mt-2">
                    {formData.certificates.map((file, index) => (
                      <p key={index} className="text-sm text-green-600">{file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Work Samples</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload portfolio or work samples</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png,.mp4"
                  onChange={(e) => handleFileUpload('portfolio', e.target.files)}
                  className="hidden"
                  id="portfolio-upload"
                />
                <label htmlFor="portfolio-upload" className="cursor-pointer">
                  <Button variant="outline" className="bg-white text-black border-gray-300">
                    Choose File
                  </Button>
                </label>
                {formData.portfolio && (
                  <p className="text-sm text-green-600 mt-2">{formData.portfolio.name}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Personal Information</h4>
                    <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                    <p className="text-sm text-gray-600">{formData.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Professional Background</h4>
                    <p className="text-sm text-gray-600">{formData.experience.substring(0, 100)}...</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Proposed Course</h4>
                  <p className="text-sm text-gray-600 font-medium">{formData.courseTitle}</p>
                  <p className="text-sm text-gray-600">{formData.courseDescription.substring(0, 150)}...</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the instructor terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become an Instructor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your expertise with millions of learners worldwide. Create courses, build your brand, and earn revenue while making a difference in education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Instructor Application</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Step {currentStep} of {APPLICATION_STEPS.length}
                  </Badge>
                </div>
                <Progress value={getStepProgress()} className="h-2" />
              </CardHeader>
              <CardContent>
                {/* Step Navigation */}
                <div className="flex items-center justify-between mb-8">
                  {APPLICATION_STEPS.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${
                          currentStep >= step.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => updateStep(step.id)}
                      >
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : step.id}
                      </div>
                      {index < APPLICATION_STEPS.length - 1 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="bg-white text-black border-gray-300"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < APPLICATION_STEPS.length ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      disabled={!formData.agreeToTerms}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Instructor Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {INSTRUCTOR_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {REQUIREMENTS.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Instructors</span>
                  <span className="font-semibold text-gray-900">15,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold text-gray-900">2M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Created</span>
                  <span className="font-semibold text-gray-900">50,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Instructor Earnings</span>
                  <span className="font-semibold text-gray-900">$3,200/month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
