import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  Award,
  Globe,
  Linkedin,
  ExternalLink,
  Filter,
  Search,
  BookOpen,
  Target,
  Heart,
  Zap,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Download,
  Share2
} from 'lucide-react';

interface Graduate {
  id: string;
  name: string;
  avatar: string;
  graduationDate: string;
  program: string;
  currentRole: string;
  company: string;
  location: string;
  salary: number;
  salaryIncrease: number;
  rating: number;
  testimonial: string;
  skills: string[];
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  courses: string[];
  mentor: string;
  industry: string;
  experience: number;
  isFeatured: boolean;
}

const GRADUATES: Graduate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '',
    graduationDate: '2023-12-15',
    program: 'Full Stack Web Development',
    currentRole: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    salary: 125000,
    salaryIncrease: 45,
    rating: 5.0,
    testimonial: 'OponMeta transformed my career. The hands-on projects and industry connections helped me land my dream job within 3 months of graduation.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    achievements: ['Led team of 5 developers', 'Improved app performance by 40%', 'Mentored 3 junior developers'],
    socialLinks: {
      linkedin: 'linkedin.com/in/sarahjohnson',
      github: 'github.com/sarahjohnson',
      portfolio: 'sarahjohnson.dev'
    },
    courses: ['Advanced JavaScript', 'React Mastery', 'System Design'],
    mentor: 'Dr. Michael Chen',
    industry: 'Technology',
    experience: 2,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: '',
    graduationDate: '2023-11-20',
    program: 'Data Science & Analytics',
    currentRole: 'Data Scientist',
    company: 'DataFlow Inc.',
    location: 'New York, NY',
    salary: 110000,
    salaryIncrease: 38,
    rating: 4.9,
    testimonial: 'The practical approach to data science at OponMeta gave me the confidence to tackle real-world problems. I love my new role!',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow'],
    achievements: ['Built predictive model with 92% accuracy', 'Reduced data processing time by 60%', 'Presented at 2 industry conferences'],
    socialLinks: {
      linkedin: 'linkedin.com/in/marcusrodriguez',
      github: 'github.com/marcusrodriguez'
    },
    courses: ['Machine Learning Fundamentals', 'Advanced Analytics', 'Business Intelligence'],
    mentor: 'Prof. Emily Watson',
    industry: 'Finance',
    experience: 1,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Aisha Patel',
    avatar: '',
    graduationDate: '2023-10-10',
    program: 'Digital Marketing',
    currentRole: 'Marketing Manager',
    company: 'GrowthFirst Marketing',
    location: 'Chicago, IL',
    salary: 85000,
    salaryIncrease: 52,
    rating: 4.8,
    testimonial: 'OponMeta\'s marketing program was exactly what I needed. The industry projects and networking opportunities opened so many doors.',
    skills: ['Google Analytics', 'Facebook Ads', 'SEO', 'Content Marketing', 'Email Marketing'],
    achievements: ['Increased client ROI by 150%', 'Managed $500K ad budget', 'Grew social media following by 200%'],
    socialLinks: {
      linkedin: 'linkedin.com/in/aishapatel',
      portfolio: 'aishapatel.com'
    },
    courses: ['Digital Marketing Strategy', 'Social Media Marketing', 'Analytics & Optimization'],
    mentor: 'Lisa Thompson',
    industry: 'Marketing',
    experience: 3,
    isFeatured: false
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: '',
    graduationDate: '2023-09-05',
    program: 'UX/UI Design',
    currentRole: 'Product Designer',
    company: 'DesignStudio Pro',
    location: 'Seattle, WA',
    salary: 95000,
    salaryIncrease: 41,
    rating: 4.9,
    testimonial: 'The design program at OponMeta taught me both the technical skills and the user-centered thinking needed for modern product design.',
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    achievements: ['Designed award-winning mobile app', 'Improved user engagement by 35%', 'Led design system implementation'],
    socialLinks: {
      linkedin: 'linkedin.com/in/davidkim',
      portfolio: 'davidkim.design'
    },
    courses: ['UX Design Principles', 'UI Design Mastery', 'Design Systems'],
    mentor: 'Alex Rivera',
    industry: 'Design',
    experience: 2,
    isFeatured: false
  },
  {
    id: '5',
    name: 'Elena Petrov',
    avatar: '',
    graduationDate: '2023-08-15',
    program: 'Cybersecurity',
    currentRole: 'Security Analyst',
    company: 'SecureNet Solutions',
    location: 'Austin, TX',
    salary: 105000,
    salaryIncrease: 48,
    rating: 5.0,
    testimonial: 'OponMeta\'s cybersecurity program was comprehensive and up-to-date with the latest threats and technologies. Highly recommended!',
    skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response', 'Compliance'],
    achievements: ['Prevented major security breach', 'Implemented zero-trust architecture', 'Reduced security incidents by 70%'],
    socialLinks: {
      linkedin: 'linkedin.com/in/elenapetrov',
      github: 'github.com/elenapetrov'
    },
    courses: ['Network Security', 'Ethical Hacking', 'Security Operations'],
    mentor: 'Dr. James Wilson',
    industry: 'Cybersecurity',
    experience: 1,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Ahmed Hassan',
    avatar: '',
    graduationDate: '2023-07-20',
    program: 'Business Analytics',
    currentRole: 'Business Intelligence Analyst',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    salary: 90000,
    salaryIncrease: 35,
    rating: 4.7,
    testimonial: 'The business analytics program provided me with both technical skills and business acumen. I\'m now making data-driven decisions that impact the bottom line.',
    skills: ['SQL', 'Power BI', 'Excel', 'Statistical Analysis', 'Business Intelligence'],
    achievements: ['Created executive dashboard', 'Identified $2M in cost savings', 'Improved reporting efficiency by 80%'],
    socialLinks: {
      linkedin: 'linkedin.com/in/ahmedhassan'
    },
    courses: ['Business Intelligence', 'Statistical Analysis', 'Data Visualization'],
    mentor: 'Prof. Sarah Miller',
    industry: 'Consulting',
    experience: 2,
    isFeatured: false
  }
];

const INDUSTRIES = ['All Industries', 'Technology', 'Finance', 'Marketing', 'Design', 'Cybersecurity', 'Consulting', 'Healthcare', 'Education'];
const PROGRAMS = ['All Programs', 'Full Stack Web Development', 'Data Science & Analytics', 'Digital Marketing', 'UX/UI Design', 'Cybersecurity', 'Business Analytics'];

const GraduateProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null);

  const filteredGraduates = GRADUATES.filter(graduate => {
    const matchesSearch = graduate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         graduate.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         graduate.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'All Industries' || graduate.industry === selectedIndustry;
    const matchesProgram = selectedProgram === 'All Programs' || graduate.program === selectedProgram;
    
    return matchesSearch && matchesIndustry && matchesProgram;
  });

  const featuredGraduates = GRADUATES.filter(g => g.isFeatured);
  const averageSalary = Math.round(GRADUATES.reduce((sum, g) => sum + g.salary, 0) / GRADUATES.length);
  const averageIncrease = Math.round(GRADUATES.reduce((sum, g) => sum + g.salaryIncrease, 0) / GRADUATES.length);
  const averageRating = (GRADUATES.reduce((sum, g) => sum + g.rating, 0) / GRADUATES.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Graduate Profiles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover success stories from our graduates. See how OponMeta has transformed careers and opened new opportunities.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Graduates</p>
                  <p className="text-2xl font-bold text-gray-900">{GRADUATES.length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Salary</p>
                  <p className="text-2xl font-bold text-gray-900">${averageSalary.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Salary Increase</p>
                  <p className="text-2xl font-bold text-gray-900">{averageIncrease}%</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                    <Star className="w-5 h-5 text-yellow-500 fill-current ml-1" />
                  </div>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Graduates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGraduates.map(graduate => (
              <Card key={graduate.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedGraduate(graduate)}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={graduate.avatar} />
                      <AvatarFallback className="text-lg">
                        {graduate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{graduate.name}</CardTitle>
                      <p className="text-sm text-gray-600">{graduate.currentRole}</p>
                      <p className="text-sm text-gray-500">{graduate.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Salary</span>
                      <span className="font-semibold text-green-600">${graduate.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Increase</span>
                      <span className="font-semibold text-blue-600">+{graduate.salaryIncrease}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <span className="font-semibold">{graduate.rating}</span>
                        <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{graduate.testimonial}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map(program => (
                  <SelectItem key={program} value={program}>{program}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search graduates, companies, or roles..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* All Graduates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGraduates.map(graduate => (
            <Card key={graduate.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedGraduate(graduate)}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={graduate.avatar} />
                    <AvatarFallback>
                      {graduate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{graduate.name}</CardTitle>
                    <p className="text-sm text-gray-600">{graduate.currentRole}</p>
                    <p className="text-sm text-gray-500">{graduate.company}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Program:</span>
                  <span className="font-medium">{graduate.program}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{graduate.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Graduated:</span>
                  <span>{new Date(graduate.graduationDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-green-600">
                    ${graduate.salary.toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    +{graduate.salaryIncrease}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{graduate.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {graduate.industry}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Graduate Detail Modal */}
        {selectedGraduate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={selectedGraduate.avatar} />
                      <AvatarFallback className="text-2xl">
                        {selectedGraduate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedGraduate.name}</h2>
                      <p className="text-lg text-gray-600">{selectedGraduate.currentRole}</p>
                      <p className="text-gray-500">{selectedGraduate.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedGraduate(null)}>
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Career Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Salary:</span>
                          <span className="font-semibold text-green-600">${selectedGraduate.salary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Salary Increase:</span>
                          <span className="font-semibold text-blue-600">+{selectedGraduate.salaryIncrease}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience:</span>
                          <span>{selectedGraduate.experience} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Graduation Date:</span>
                          <span>{new Date(selectedGraduate.graduationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Program:</span>
                          <span>{selectedGraduate.program}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mentor:</span>
                          <span>{selectedGraduate.mentor}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedGraduate.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Testimonial</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 italic">"{selectedGraduate.testimonial}"</p>
                        <div className="flex items-center mt-4">
                          <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                          <span className="font-semibold">{selectedGraduate.rating}/5.0</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Key Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedGraduate.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <Award className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Courses Completed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedGraduate.courses.map(course => (
                            <div key={course} className="flex items-center">
                              <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                              <span className="text-sm">{course}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Connect</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedGraduate.socialLinks.linkedin && (
                            <Button variant="outline" className="w-full justify-start">
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn Profile
                            </Button>
                          )}
                          {selectedGraduate.socialLinks.github && (
                            <Button variant="outline" className="w-full justify-start">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              GitHub Profile
                            </Button>
                          )}
                          {selectedGraduate.socialLinks.portfolio && (
                            <Button variant="outline" className="w-full justify-start">
                              <Globe className="w-4 h-4 mr-2" />
                              Portfolio
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraduateProfiles;
