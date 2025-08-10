import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from './context/NotificationContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import CourseBrowsingPage from './components/CourseBrowsingPage';
import HeroSection from './components/HeroSection';
import WhatWeOffer from './components/WhatWeOffer';
import FeaturedCourses from './components/FeaturedCourses';
import About from './components/About';
import Programme from './components/Programme';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CourseDetail from './components/CourseDetail';

import PricingPage from './components/PricingPage';
import Resources from './components/Resources';
import Community from './components/Community';
import StudentDashboard from './components/StudentDashboard';
import VendorDashboard from './components/VendorDashboard';
import Settings from './components/Settings';
import TrustedByCarousel from './components/TrustedByCarousel';

import AnalyticsDashboard from './components/AnalyticsDashboard';
import CourseGrid from './components/CourseGrid';
import CourseFilters from './components/CourseFilters';

import BauhausCourseCard from './components/BauhausCourseCard';
import RightAdPanel from './components/RightAdPanel';
import GlobalSearch from './components/GlobalSearch';
import StudentPortalWidgets from './components/StudentPortalWidgets';
import StudentPortal from './components/StudentPortal';
import SocialFeed from './components/SocialFeed';
import CourseWorkspace from './components/CourseWorkspace';
import CoursePurchase from './components/CoursePurchase';
import InternationalPaymentForm from './components/InternationalPaymentForm';
import PlagiarismChecker from './components/PlagiarismChecker';
import GrammarChecker from './components/GrammarChecker';
import FloatingNavigation from './components/FloatingNavigation';
import FeatureGrid from './components/FeatureGrid';
import DashboardSidebar from './components/DashboardSidebar';
import CurrencySelector from './components/CurrencySelector';
import CurrencyCalculator from './components/CurrencyCalculator';
import CourseViewToggle from './components/CourseViewToggle';
import CoursesHeader from './components/CoursesHeader';
import StripePaymentForm from './components/StripePaymentForm';
import PaystackPaymentForm from './components/PaystackPaymentForm';
import FlutterwavePaymentForm from './components/FlutterwavePaymentForm';
import PageNavigation from './components/PageNavigation';
import OpontainmentDemo from './components/OpontainmentDemo';
import MultilingualContentExample from './components/MultilingualContentExample';
import LanguageSwitcher from './components/LanguageSwitcher';
import SocialMediaLinks from './components/SocialMediaLinks';
import Sidebar from './components/Sidebar';
import ResponsiveTest from './components/ResponsiveTest';
import RecommendedForYou from './components/RecommendedForYou';
import TeamCarousel from './components/TeamCarousel';
import SuccessStoriesCarousel from './components/SuccessStoriesCarousel';
import UserProfileDropdown from './components/UserProfileDropdown';
import VendorCard from './components/VendorCard';
import WeatherForecast from './components/WeatherForecast';
import CourseLibrary from './components/CourseLibrary';
import Whiteboard from './components/Whiteboard';
import CourseAuthoringTool from './components/CourseAuthoringTool';
import AIVideoCalling from './components/AIVideoCalling';
import CompanionsLibrary from './components/CompanionsLibrary';
import CompanionPage from './components/CompanionPage';
import CreateCompanion from './components/CreateCompanion';
import CompanionsAnalytics from './components/CompanionsAnalytics';
import CompanionsSettings from './components/CompanionsSettings';
import CourseCertifications from './components/CourseCertifications';
import InstructorPortal from './components/InstructorPortal';
import ShareKnowledgeGlobally from './components/ShareKnowledgeGlobally';
import Blogs from './components/Blogs';
import DownloadApp from './components/DownloadApp';
import ThemeDemo from './components/ThemeDemo';
import TestYellowButtons from './components/TestYellowButtons';
import CreatorsPortal from './components/CreatorsPortal';
import BecomeInstructor from './components/BecomeInstructor';
import ResumeBuilder from './components/ResumeBuilder';
import CareerReadyPlan from './components/CareerReadyPlan';
import AptitudeTest from './components/AptitudeTest';
import WorkplacePersonalityAssessment from './components/WorkplacePersonalityAssessment';
import MentalHealthAssessment from './components/MentalHealthAssessment';
import LearningManagementSystem from './components/LearningManagementSystem';
import Webinars from './components/Webinars';
import GraduateProfiles from './components/GraduateProfiles';
import GrowthMindset from './components/GrowthMindset';
import AICourseCreator from './components/AICourseCreator';
import PaymentDemo from './components/PaymentDemo';
import CourseBrowsing from './components/CourseBrowsing';
import AICompanionSubscription from './components/AICompanionSubscription';
import SubscriptionManagement from './components/SubscriptionManagement';
import Contact from './components/Contact';
import Mission from './components/Mission';
import Vision from './components/Vision';
import Approach from './components/Approach';
import WelcomeBackWidget from './components/WelcomeBackWidget';
import { Toaster } from './components/ui/sonner';

// Import dashboard components
import DashboardOverview from './dashboard/Overview';
import DashboardCourses from './dashboard/CoursesManagement';
import DashboardEnrollments from './dashboard/Enrollments';
import DashboardRevenue from './dashboard/Revenue';
import DashboardAnalytics from './dashboard/Analytics';
import DashboardCollaboration from './dashboard/Collaboration';
import DashboardWhiteboard from './dashboard/Whiteboard';
import DashboardMeetings from './dashboard/Meetings';
import DashboardDocuments from './dashboard/Documents';
import DashboardForums from './dashboard/Forums';
import DashboardUsers from './dashboard/UserManagement';
import DashboardLibrary from './dashboard/Library';
import DashboardTemplates from './dashboard/Templates';
import DashboardRecommendations from './dashboard/Recommendations';
import DashboardSettings from './dashboard/DashboardSettings';
import DashboardCourseCreator from './dashboard/CourseCreatorDashboard';
import DashboardAICourseCreator from './dashboard/AICourseCreator';
import DashboardAILessonGenerator from './dashboard/AILessonGenerator';
import DashboardAIQuizGenerator from './dashboard/AIQuizGenerator';
import DashboardAIVideoGenerator from './dashboard/AIVideoGenerator';
import DashboardAIAssessmentGenerator from './dashboard/AIAssessmentGenerator';
import DashboardInteractiveContentDesigner from './dashboard/InteractiveContentDesigner';
import DashboardChatbotTrainer from './dashboard/ChatbotTrainer';
import DashboardWhiteLabelBranding from './dashboard/WhiteLabelBranding';
import DashboardSCORMExport from './dashboard/SCORMExport';
import DashboardInstructorDashboard from './dashboard/InstructorDashboard';
import DashboardInstructorManagement from './dashboard/InstructorManagement';
import DashboardInstructorOnboarding from './dashboard/InstructorOnboarding';
import DashboardCourseMarketplace from './dashboard/CourseMarketplace';
import DashboardCourseManagement from './dashboard/CourseManagement';
import DashboardCreatorsPortal from './dashboard/CreatorsPortal';
import DashboardPaymentAnalytics from './dashboard/PaymentAnalytics';
import DashboardSocial from './dashboard/Social';

// Placeholder component for missing components
const Placeholder = ({ title }: { title: string }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
      <h1 className="text-4xl font-bold text-[#0a174e] mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">This page is under development.</p>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Routes>
          {/* Main Routes */}
          <Route path="/" element={
            <>
    <HeroSection />
    <WhatWeOffer />
    <FeaturedCourses />
    <Testimonials />
              <TrustedByCarousel />
    <Pricing />
            </>
          } />
          
          {/* About Page */}
          <Route path="/about" element={<About />} />
          
          {/* Courses Page */}
          <Route path="/courses" element={<Programme />} />
          <Route path="/programme" element={<Programme />} />
          
          {/* Course Routes */}
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/course-browsing" element={<CourseBrowsingPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course-grid" element={<CourseGrid />} />
          <Route path="/course-filters" element={<CourseFilters />} />
          <Route path="/course-card" element={<Placeholder title="Course Card Demo" />} />
          <Route path="/bauhaus-course-card" element={<BauhausCourseCard />} />
          <Route path="/course-workspace" element={<CourseWorkspace />} />
          <Route path="/course-purchase/:courseId" element={<CoursePurchase />} />
          <Route path="/course-library" element={<CourseLibrary />} />
          <Route path="/course-authoring" element={<CourseAuthoringTool />} />
          <Route path="/course-certifications" element={<CourseCertifications />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          
          {/* Dashboard Sub-routes */}
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route path="/dashboard/courses" element={<DashboardCourses />} />
          <Route path="/dashboard/enrollments" element={<DashboardEnrollments />} />
          <Route path="/dashboard/revenue" element={<DashboardRevenue />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
          <Route path="/dashboard/collaboration" element={<DashboardCollaboration />} />
          <Route path="/dashboard/whiteboard" element={<DashboardWhiteboard />} />
          <Route path="/dashboard/meetings" element={<DashboardMeetings />} />
          <Route path="/dashboard/documents" element={<DashboardDocuments />} />
          <Route path="/dashboard/forums" element={<DashboardForums />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
          <Route path="/dashboard/library" element={<DashboardLibrary />} />
          <Route path="/dashboard/templates" element={<DashboardTemplates />} />
          <Route path="/dashboard/recommendations" element={<DashboardRecommendations />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/dashboard/course-creator" element={<DashboardCourseCreator />} />
          <Route path="/dashboard/ai-course-creator" element={<DashboardAICourseCreator />} />
          <Route path="/dashboard/ai-lesson-generator" element={<DashboardAILessonGenerator />} />
          <Route path="/dashboard/ai-quiz-generator" element={<DashboardAIQuizGenerator />} />
          <Route path="/dashboard/ai-video-generator" element={<DashboardAIVideoGenerator />} />
          <Route path="/dashboard/ai-assessment-generator" element={<DashboardAIAssessmentGenerator />} />
          <Route path="/dashboard/interactive-content-designer" element={<DashboardInteractiveContentDesigner />} />
          <Route path="/dashboard/chatbot-trainer" element={<DashboardChatbotTrainer />} />
          <Route path="/dashboard/white-label-branding" element={<DashboardWhiteLabelBranding />} />
          <Route path="/dashboard/scorm-export" element={<DashboardSCORMExport />} />
          <Route path="/dashboard/instructor-dashboard" element={<DashboardInstructorDashboard />} />
          <Route path="/dashboard/instructor-management" element={<DashboardInstructorManagement />} />
          <Route path="/dashboard/instructor-onboarding" element={<DashboardInstructorOnboarding />} />
          <Route path="/dashboard/course-marketplace" element={<DashboardCourseMarketplace />} />
          <Route path="/dashboard/course-management" element={<DashboardCourseManagement />} />
          <Route path="/dashboard/creators-portal" element={<DashboardCreatorsPortal />} />
          <Route path="/dashboard/payment-analytics" element={<DashboardPaymentAnalytics />} />
          <Route path="/dashboard/social" element={<DashboardSocial />} />
          
          {/* Feature Routes */}
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/ai-video-calling" element={<AIVideoCalling />} />
          <Route path="/companions-library" element={<CompanionsLibrary />} />
          <Route path="/companions/:id" element={<CompanionPage />} />
                          <Route path="/companions/analytics" element={<CompanionsAnalytics />} />
                <Route path="/companions/settings" element={<CompanionsSettings />} />
          <Route path="/companions/create" element={<CreateCompanion />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          <Route path="/ai-course-creator" element={<AICourseCreator />} />
        <Route path="/payment-demo" element={<PaymentDemo />} />
        <Route path="/course-browsing" element={<CourseBrowsing />} />
        <Route path="/ai-companion-subscription" element={<AICompanionSubscription />} />
        <Route path="/subscription-management" element={<SubscriptionManagement />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/team" element={<Placeholder title="Our Team" />} />
        <Route path="/workshops" element={<Placeholder title="Workshops" />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/community-forums" element={<Placeholder title="Community Forums" />} />
        <Route path="/alumni-network" element={<Placeholder title="Alumni Network" />} />
        <Route path="/events" element={<Placeholder title="Events & Networking" />} />
        <Route path="/support" element={<Contact />} />
        <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
        <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
        <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />
        <Route path="/accessibility" element={<Placeholder title="Accessibility" />} />
        <Route path="/announcements" element={<Placeholder title="Announcements" />} />
        <Route path="/announcements/:id" element={<Placeholder title="Announcement Detail" />} />
        <Route path="/instructors" element={<Placeholder title="Instructors" />} />
        <Route path="/instructors/:id" element={<Placeholder title="Instructor Profile" />} />
        <Route path="/messages/instructor/:id" element={<Placeholder title="Instructor Messages" />} />
        <Route path="/course/:id/preview" element={<Placeholder title="Course Preview" />} />
          <Route path="/pricing-page" element={<PricingPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/download-app" element={<DownloadApp />} />
          
          {/* Tool Routes */}
          <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/share-knowledge" element={<ShareKnowledgeGlobally />} />
          
          {/* Resource Routes */}
          <Route path="/resources/creators-portal" element={<CreatorsPortal />} />
          <Route path="/resources/meet-ai-video-calling" element={<AIVideoCalling />} />
          <Route path="/resources/share-knowledge-globally" element={<ShareKnowledgeGlobally />} />
          <Route path="/resources/become-instructor" element={<BecomeInstructor />} />
          <Route path="/resources/instructor-portal" element={<InstructorPortal />} />
          <Route path="/resources/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resources/career-ready-plan" element={<CareerReadyPlan />} />
          <Route path="/resources/aptitude-test" element={<AptitudeTest />} />
          <Route path="/resources/workplace-personality-assessment" element={<WorkplacePersonalityAssessment />} />
          <Route path="/resources/mental-health-assessment" element={<MentalHealthAssessment />} />
          <Route path="/resources/learning-management-system" element={<LearningManagementSystem />} />
          <Route path="/resources/webinars" element={<Webinars />} />
          <Route path="/resources/graduate-profiles" element={<GraduateProfiles />} />
          <Route path="/resources/certification" element={<Placeholder title="Certification" />} />
          <Route path="/resources/growth-mindset" element={<GrowthMindset />} />
          <Route path="/resources/community" element={<Community />} />
          
          {/* UI Component Routes */}
          <Route path="/right-ad-panel" element={<RightAdPanel />} />
          <Route path="/global-search" element={<GlobalSearch />} />
          <Route path="/student-portal-widgets" element={<StudentPortalWidgets />} />
          <Route path="/social-feed" element={<SocialFeed />} />
          <Route path="/floating-navigation" element={<FloatingNavigation />} />
          <Route path="/feature-grid" element={<FeatureGrid />} />
          <Route path="/dashboard-sidebar" element={<DashboardSidebar />} />
          <Route path="/currency-selector" element={<CurrencySelector />} />
          <Route path="/currency-calculator" element={<CurrencyCalculator />} />
          <Route path="/course-view-toggle" element={<CourseViewToggle />} />
          <Route path="/courses-header" element={<CoursesHeader />} />
          <Route path="/stripe-payment" element={<StripePaymentForm />} />
          <Route path="/paystack-payment" element={<PaystackPaymentForm />} />
          <Route path="/flutterwave-payment" element={<FlutterwavePaymentForm />} />
          <Route path="/page-navigation" element={<PageNavigation />} />
          <Route path="/opontainment-demo" element={<OpontainmentDemo />} />
          <Route path="/multilingual-content" element={<MultilingualContentExample />} />
          <Route path="/language-switcher" element={<LanguageSwitcher />} />
          <Route path="/social-media-links" element={<SocialMediaLinks />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/responsive-test" element={<ResponsiveTest />} />
          <Route path="/recommended-for-you" element={<RecommendedForYou />} />
          <Route path="/team-carousel" element={<TeamCarousel />} />
          <Route path="/success-stories-carousel" element={<SuccessStoriesCarousel />} />
          <Route path="/user-profile-dropdown" element={<UserProfileDropdown />} />
          <Route path="/vendor-card" element={<VendorCard />} />
          <Route path="/weather-forecast" element={<WeatherForecast />} />
          <Route path="/international-payment" element={<InternationalPaymentForm />} />
          <Route path="/theme-demo" element={<ThemeDemo />} />
          <Route path="/test-yellow-buttons" element={<TestYellowButtons />} />
          
          {/* Placeholder Routes for Missing Components */}
          <Route path="/growth-mindset" element={<GrowthMindset />} />
          <Route path="/community-page" element={<Placeholder title="Community Page" />} />
          <Route path="/about-us" element={<Placeholder title="About Us" />} />
          <Route path="/career-workshops" element={<Placeholder title="Career Workshops" />} />
          <Route path="/health-science" element={<Placeholder title="Health Science" />} />
          <Route path="/finance" element={<Placeholder title="Finance" />} />
          <Route path="/information-technology" element={<Placeholder title="Information Technology" />} />
          <Route path="/education-training" element={<Placeholder title="Education & Training" />} />
          <Route path="/business-management" element={<Placeholder title="Business Management" />} />
          <Route path="/marketing-sales" element={<Placeholder title="Marketing, Sales & Service" />} />
          <Route path="/agriculture-food" element={<Placeholder title="Agriculture, Food & Natural Resources" />} />
          <Route path="/hospitality-tourism" element={<Placeholder title="Hospitality & Tourism" />} />
          <Route path="/leadership-management" element={<Placeholder title="Leadership & Management" />} />
          <Route path="/mentorship-career" element={<Placeholder title="Mentorship & Career Readiness" />} />
          <Route path="/specialised-tracks" element={<Placeholder title="Specialised Industry Tracks" />} />
          <Route path="/real-estate" element={<Placeholder title="Real Estate Management" />} />
          <Route path="/public-safety" element={<Placeholder title="Public Safety & Emergency Services" />} />
          <Route path="/social-care" element={<Placeholder title="Social Care & Community Support" />} />
          <Route path="/home-page" element={<Placeholder title="Home Page" />} />
          <Route path="/right-ad-panel-page" element={<Placeholder title="Right Ad Panel Page" />} />
          <Route path="/global-search-page" element={<Placeholder title="Global Search Page" />} />
          <Route path="/student-portal-widgets-page" element={<Placeholder title="Student Portal Widgets Page" />} />
          <Route path="/social-feed-page" element={<Placeholder title="Social Feed Page" />} />
          <Route path="/course-workspace-page" element={<Placeholder title="Course Workspace Page" />} />
          <Route path="/course-purchase-page" element={<Placeholder title="Course Purchase Page" />} />
          <Route path="/international-payment-form-page" element={<Placeholder title="International Payment Form Page" />} />
          <Route path="/plagiarism-checker-page" element={<Placeholder title="Plagiarism Checker Page" />} />
          <Route path="/grammar-checker-page" element={<Placeholder title="Grammar Checker Page" />} />
          <Route path="/floating-navigation-page" element={<Placeholder title="Floating Navigation Page" />} />
          <Route path="/feature-grid-page" element={<Placeholder title="Feature Grid Page" />} />
          <Route path="/dashboard-sidebar-page" element={<Placeholder title="Dashboard Sidebar Page" />} />
          <Route path="/currency-selector-page" element={<Placeholder title="Currency Selector Page" />} />
          <Route path="/currency-calculator-page" element={<Placeholder title="Currency Calculator Page" />} />
          <Route path="/course-view-toggle-page" element={<Placeholder title="Course View Toggle Page" />} />
          <Route path="/courses-header-page" element={<Placeholder title="Courses Header Page" />} />
          <Route path="/stripe-payment-form-page" element={<Placeholder title="Stripe Payment Form Page" />} />
          <Route path="/paystack-payment-form-page" element={<Placeholder title="Paystack Payment Form Page" />} />
          <Route path="/flutterwave-payment-form-page" element={<Placeholder title="Flutterwave Payment Form Page" />} />
          <Route path="/page-navigation-page" element={<Placeholder title="Page Navigation Page" />} />
          <Route path="/opontainment-demo-page" element={<Placeholder title="Opontainment Demo Page" />} />
          <Route path="/multilingual-content-example-page" element={<Placeholder title="Multilingual Content Example Page" />} />
          <Route path="/language-switcher-page" element={<Placeholder title="Language Switcher Page" />} />
          <Route path="/social-media-links-page" element={<Placeholder title="Social Media Links Page" />} />
          <Route path="/sidebar-page" element={<Placeholder title="Sidebar Page" />} />
          <Route path="/responsive-test-page" element={<Placeholder title="Responsive Test Page" />} />
          <Route path="/recommended-for-you-page" element={<Placeholder title="Recommended For You Page" />} />
          <Route path="/social-feed-component-page" element={<Placeholder title="Social Feed Component Page" />} />
          <Route path="/team-carousel-page" element={<Placeholder title="Team Carousel Page" />} />
          <Route path="/success-stories-carousel-page" element={<Placeholder title="Success Stories Carousel Page" />} />
          <Route path="/user-profile-dropdown-page" element={<Placeholder title="User Profile Dropdown Page" />} />
          <Route path="/vendor-card-page" element={<Placeholder title="Vendor Card Page" />} />
          <Route path="/weather-forecast-page" element={<Placeholder title="Weather Forecast Page" />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
      </BrowserRouter>
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;