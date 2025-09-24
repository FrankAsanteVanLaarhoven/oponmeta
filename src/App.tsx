import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { NotificationProvider } from './context/NotificationContext';
import { MobileProvider } from './context/MobileContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { PWAInitializer } from './components/PWAInitializer';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));
const CourseCatalog = lazy(() => import('./components/CourseCatalog'));
const CourseBrowsingPage = lazy(() => import('./components/CourseBrowsingPage'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const WhatWeOffer = lazy(() => import('./components/WhatWeOffer'));
const FeaturedCourses = lazy(() => import('./components/FeaturedCourses'));
const About = lazy(() => import('./components/About'));
const Programme = lazy(() => import('./components/Programme'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const UnifiedPricing = lazy(() => import('./components/UnifiedPricing'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const Resources = lazy(() => import('./components/Resources'));
const Community = lazy(() => import('./components/Community'));
const StudentDashboard = lazy(() => import('./components/StudentDashboard'));
const VendorDashboard = lazy(() => import('./components/VendorDashboard'));
const Settings = lazy(() => import('./components/Settings'));
const TrustedByCarousel = lazy(() => import('./components/TrustedByCarousel'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const CourseGrid = lazy(() => import('./components/CourseGrid'));
const CourseFilters = lazy(() => import('./components/CourseFilters'));
const BauhausCourseCard = lazy(() => import('./components/BauhausCourseCard'));
const RightAdPanel = lazy(() => import('./components/RightAdPanel'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
const StudentPortalWidgets = lazy(() => import('./components/StudentPortalWidgets'));
const StudentPortal = lazy(() => import('./components/StudentPortal'));
const SocialFeed = lazy(() => import('./components/SocialFeed'));
const CourseWorkspace = lazy(() => import('./components/CourseWorkspace'));
const UnifiedCoursePurchase = lazy(() => import('./components/UnifiedCoursePurchase'));
const InternationalPaymentForm = lazy(() => import('./components/InternationalPaymentForm'));
const PlagiarismChecker = lazy(() => import('./components/PlagiarismChecker'));
const GrammarChecker = lazy(() => import('./components/GrammarChecker'));
const FloatingNavigation = lazy(() => import('./components/FloatingNavigation'));
const FeatureGrid = lazy(() => import('./components/FeatureGrid'));
const DashboardSidebar = lazy(() => import('./components/DashboardSidebar'));
const CurrencySelector = lazy(() => import('./components/CurrencySelector'));
const CurrencyCalculator = lazy(() => import('./components/CurrencyCalculator'));
const CourseViewToggle = lazy(() => import('./components/CourseViewToggle'));
const CoursesHeader = lazy(() => import('./components/CoursesHeader'));
const StripePaymentForm = lazy(() => import('./components/StripePaymentForm'));
const PaystackPaymentForm = lazy(() => import('./components/PaystackPaymentForm'));
const FlutterwavePaymentForm = lazy(() => import('./components/FlutterwavePaymentForm'));
const PageNavigation = lazy(() => import('./components/PageNavigation'));
const OpontainmentDemo = lazy(() => import('./components/OpontainmentDemo'));
const MultilingualContentExample = lazy(() => import('./components/MultilingualContentExample'));
const LanguageSwitcher = lazy(() => import('./components/LanguageSwitcher'));
const SocialMediaLinks = lazy(() => import('./components/SocialMediaLinks'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const ResponsiveTest = lazy(() => import('./components/ResponsiveTest'));
const RecommendedForYou = lazy(() => import('./components/RecommendedForYou'));
const TeamCarousel = lazy(() => import('./components/TeamCarousel'));
const SuccessStoriesCarousel = lazy(() => import('./components/SuccessStoriesCarousel'));
const UserProfileDropdown = lazy(() => import('./components/UserProfileDropdown'));
const VendorCard = lazy(() => import('./components/VendorCard'));
const WeatherForecast = lazy(() => import('./components/WeatherForecast'));
const CourseLibrary = lazy(() => import('./components/CourseLibrary'));
const Whiteboard = lazy(() => import('./components/Whiteboard'));
const CourseAuthoringTool = lazy(() => import('./components/CourseAuthoringTool'));
const PurchaseFlowDemo = lazy(() => import('./components/PurchaseFlowDemo'));
const AIVideoCalling = lazy(() => import('./components/AIVideoCalling'));
const CompanionsLibrary = lazy(() => import('./components/CompanionsLibrary'));
const CompanionPage = lazy(() => import('./components/CompanionPage'));
const CreateCompanion = lazy(() => import('./components/CreateCompanion'));
const CompanionsAnalytics = lazy(() => import('./components/CompanionsAnalytics'));
const CompanionsSettings = lazy(() => import('./components/CompanionsSettings'));
const CourseCertifications = lazy(() => import('./components/CourseCertifications'));
const InstructorPortal = lazy(() => import('./components/InstructorPortal'));
const CourseCreationWizard = lazy(() => import('./components/CourseCreationWizard'));
const ShareKnowledgeGlobally = lazy(() => import('./components/ShareKnowledgeGlobally'));
const Blogs = lazy(() => import('./components/Blogs'));
const DownloadApp = lazy(() => import('./components/DownloadApp'));
const ThemeDemo = lazy(() => import('./components/ThemeDemo'));
const TestYellowButtons = lazy(() => import('./components/TestYellowButtons'));
const UnifiedCreatorsPortal = lazy(() => import('./components/UnifiedCreatorsPortal'));
const BecomeInstructor = lazy(() => import('./components/BecomeInstructor'));
const ResumeBuilder = lazy(() => import('./components/ResumeBuilder'));
const LeadershipManagement = lazy(() => import('./components/LeadershipManagement'));
const MentorshipCareerReadiness = lazy(() => import('./components/MentorshipCareerReadiness'));
const Mentorship = lazy(() => import('./components/Mentorship'));
const SpecialisedIndustryTracks = lazy(() => import('./components/SpecialisedIndustryTracks'));
const RealEstateManagement = lazy(() => import('./components/RealEstateManagement'));
const PublicSafetyEmergencyServices = lazy(() => import('./components/PublicSafetyEmergencyServices'));
const SocialCareCommunitySupport = lazy(() => import('./components/SocialCareCommunitySupport'));
const HealthScience = lazy(() => import('./components/HealthScience'));
const Finance = lazy(() => import('./components/Finance'));
const InformationTechnology = lazy(() => import('./components/InformationTechnology'));
const EducationTraining = lazy(() => import('./components/EducationTraining'));
const BusinessManagement = lazy(() => import('./components/BusinessManagement'));
const MarketingSales = lazy(() => import('./components/MarketingSales'));
const WorldClassLMSFeatures = lazy(() => import('./components/WorldClassLMSFeatures'));
const AgricultureFood = lazy(() => import('./components/AgricultureFood'));
const HospitalityTourism = lazy(() => import('./components/HospitalityTourism'));
const CareerReadyPlan = lazy(() => import('./components/CareerReadyPlan'));
const AptitudeTest = lazy(() => import('./components/AptitudeTest'));
const CourseMarketplace = lazy(() => import('./components/CourseMarketplace'));
const WorldClassCheckout = lazy(() => import('./components/WorldClassCheckout'));
const CouponManagement = lazy(() => import('./components/CouponManagement'));
const SupabaseIntegrationExample = lazy(() => import('./components/SupabaseIntegrationExample'));
const DataProtectionModule = lazy(() => import('./components/DataProtectionModule'));
const SLAManagement = lazy(() => import('./components/SLAManagement'));
const StripeConnectIntegration = lazy(() => import('./components/StripeConnectIntegration'));
const MobileFirstDemo = lazy(() => import('./components/MobileFirstDemo'));
const MobileCourseMarketplace = lazy(() => import('./components/MobileCourseMarketplace'));
const WorkplacePersonalityAssessment = lazy(() => import('./components/WorkplacePersonalityAssessment'));
const MentalHealthAssessment = lazy(() => import('./components/MentalHealthAssessment'));
const LearningManagementSystem = lazy(() => import('./components/LearningManagementSystem'));
const Webinars = lazy(() => import('./components/Webinars'));
const GraduateProfiles = lazy(() => import('./components/GraduateProfiles'));
const GrowthMindset = lazy(() => import('./components/GrowthMindset'));
const AICourseCreator = lazy(() => import('./components/AICourseCreator'));
const PaymentDemo = lazy(() => import('./components/PaymentDemo'));
const CourseBrowsing = lazy(() => import('./components/CourseBrowsing'));
const AICompanionSubscription = lazy(() => import('./components/AICompanionSubscription'));
const SubscriptionManagement = lazy(() => import('./components/SubscriptionManagement'));
const Contact = lazy(() => import('./components/Contact'));
const Mission = lazy(() => import('./components/Mission'));
const Vision = lazy(() => import('./components/Vision'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const UserSettings = lazy(() => import('./components/UserSettings'));
const HelpSupport = lazy(() => import('./components/HelpSupport'));
const Subscription = lazy(() => import('./components/SubscriptionPage'));
const Approach = lazy(() => import('./components/Approach'));
const Certification = lazy(() => import('./components/Certification'));
const GetPremium = lazy(() => import('./components/GetPremium'));
const GrammarCheckerPage = lazy(() => import('./components/GrammarCheckerPage'));
const PlagiarismCheckerPage = lazy(() => import('./components/PlagiarismCheckerPage'));
const BlogsPage = lazy(() => import('./components/BlogsPage'));
const DownloadAppPage = lazy(() => import('./components/DownloadAppPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignUpPage = lazy(() => import('./components/SignUpPage'));
const SuperAdminDashboard = lazy(() => import('./components/SuperAdminDashboard'));
const Workshop = lazy(() => import('./components/Workshop'));
const Partners = lazy(() => import('./components/Partners'));
const TechnologyDigitalSkills = lazy(() => import('./components/TechnologyDigitalSkills'));
const DataAnalytics = lazy(() => import('./components/DataAnalytics'));
const HealthHealthcareInnovation = lazy(() => import('./components/HealthHealthcareInnovation'));
const CleaningSanitationServices = lazy(() => import('./components/CleaningSanitationServices'));
const EnvironmentSustainability = lazy(() => import('./components/EnvironmentSustainability'));
const EngineeringConstruction = lazy(() => import('./components/EngineeringConstruction'));
const BusinessStrategyInnovation = lazy(() => import('./components/BusinessStrategyInnovation'));
const AgricultureFoodSystem = lazy(() => import('./components/AgricultureFoodSystem'));
const ProfessionalDevelopmentLeadership = lazy(() => import('./components/ProfessionalDevelopmentLeadership'));
const MusicSoundProduction = lazy(() => import('./components/MusicSoundProduction'));
const ArtDesignCreativeMedia = lazy(() => import('./components/ArtDesignCreativeMedia'));
const DramaTheatrePerformance = lazy(() => import('./components/DramaTheatrePerformance'));
const SportsFitnessWellness = lazy(() => import('./components/SportsFitnessWellness'));
const VocationalTechnicalTraining = lazy(() => import('./components/VocationalTechnicalTraining'));
const ChildhoodStudiesEarlyYearEducation = lazy(() => import('./components/ChildhoodStudiesEarlyYearEducation'));
const LocalizationDemo = lazy(() => import('./components/LocalizationDemo'));

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
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <AppProvider>
          <NotificationProvider>
            <MobileProvider>
              <LanguageProvider>
                <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
                  <PWAInitializer>
                    <div className="App min-h-screen transition-colors duration-300">
                      <Navigation />
                      <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
          {/* Main Routes */}
          <Route path="/" element={
            <>
    <HeroSection />
    <WhatWeOffer />
    <FeaturedCourses />
    <Testimonials />
              <TrustedByCarousel />
    <UnifiedPricing />
            </>
          } />
          
          {/* About Page */}
          <Route path="/about" element={<About />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Courses Page */}
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/programme" element={<Programme />} />
          
          {/* Course Routes */}
          <Route path="/course-browsing" element={<CourseBrowsingPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course-grid" element={<CourseGrid />} />
          <Route path="/course-filters" element={<CourseFilters />} />
          <Route path="/course-card" element={<Placeholder title="Course Card Demo" />} />
          <Route path="/bauhaus-course-card" element={<BauhausCourseCard />} />
          <Route path="/course-workspace" element={<CourseWorkspace />} />
          <Route path="/course-purchase/:courseId" element={<UnifiedCoursePurchase />} />
          <Route path="/course-library" element={<CourseLibrary />} />
          <Route path="/course-authoring" element={<CourseAuthoringTool />} />
          <Route path="/purchase-flow-demo" element={<PurchaseFlowDemo />} />
          <Route path="/course-certifications" element={<CourseCertifications />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          
          {/* Dashboard Sub-routes */}
          <Route path="/dashboard/overview" element={<Placeholder title="Dashboard Overview" />} />
          <Route path="/dashboard/courses" element={<Placeholder title="Dashboard Courses" />} />
          <Route path="/dashboard/enrollments" element={<Placeholder title="Dashboard Enrollments" />} />
          <Route path="/dashboard/revenue" element={<Placeholder title="Dashboard Revenue" />} />
          <Route path="/dashboard/analytics" element={<Placeholder title="Dashboard Analytics" />} />
          <Route path="/dashboard/collaboration" element={<Placeholder title="Dashboard Collaboration" />} />
          <Route path="/dashboard/whiteboard" element={<Placeholder title="Dashboard Whiteboard" />} />
          <Route path="/dashboard/meetings" element={<Placeholder title="Dashboard Meetings" />} />
          <Route path="/dashboard/documents" element={<Placeholder title="Dashboard Documents" />} />
          <Route path="/dashboard/forums" element={<Placeholder title="Dashboard Forums" />} />
          <Route path="/dashboard/users" element={<Placeholder title="Dashboard Users" />} />
          <Route path="/dashboard/library" element={<Placeholder title="Dashboard Library" />} />
          <Route path="/dashboard/templates" element={<Placeholder title="Dashboard Templates" />} />
          <Route path="/dashboard/recommendations" element={<Placeholder title="Dashboard Recommendations" />} />
          <Route path="/dashboard/settings" element={<Placeholder title="Dashboard Settings" />} />
          <Route path="/dashboard/course-creator" element={<Placeholder title="Dashboard Course Creator" />} />
          <Route path="/dashboard/ai-course-creator" element={<Placeholder title="Dashboard AI Course Creator" />} />
          <Route path="/dashboard/ai-lesson-generator" element={<Placeholder title="Dashboard AI Lesson Generator" />} />
          <Route path="/dashboard/ai-quiz-generator" element={<Placeholder title="Dashboard AI Quiz Generator" />} />
          <Route path="/dashboard/ai-video-generator" element={<Placeholder title="Dashboard AI Video Generator" />} />
          <Route path="/dashboard/ai-assessment-generator" element={<Placeholder title="Dashboard AI Assessment Generator" />} />
          <Route path="/dashboard/interactive-content-designer" element={<Placeholder title="Dashboard Interactive Content Designer" />} />
          <Route path="/dashboard/chatbot-trainer" element={<Placeholder title="Dashboard Chatbot Trainer" />} />
          <Route path="/dashboard/white-label-branding" element={<Placeholder title="Dashboard White Label Branding" />} />
          <Route path="/dashboard/scorm-export" element={<Placeholder title="Dashboard SCORM Export" />} />
          <Route path="/dashboard/instructor-dashboard" element={<Placeholder title="Dashboard Instructor Dashboard" />} />
          <Route path="/dashboard/instructor-management" element={<Placeholder title="Dashboard Instructor Management" />} />
          <Route path="/dashboard/instructor-onboarding" element={<Placeholder title="Dashboard Instructor Onboarding" />} />
          <Route path="/dashboard/course-marketplace" element={<Placeholder title="Dashboard Course Marketplace" />} />
          <Route path="/dashboard/course-management" element={<Placeholder title="Dashboard Course Management" />} />
          <Route path="/dashboard/creators-portal" element={<Placeholder title="Dashboard Creators Portal" />} />
          <Route path="/dashboard/payment-analytics" element={<Placeholder title="Dashboard Payment Analytics" />} />
          <Route path="/dashboard/social" element={<Placeholder title="Dashboard Social" />} />
          
          {/* Feature Routes */}
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/ai-video-calling" element={<AIVideoCalling />} />
          <Route path="/companions-library" element={<CompanionsLibrary />} />
          <Route path="/companions/:id" element={<CompanionPage />} />
                          <Route path="/companions/analytics" element={<CompanionsAnalytics />} />
                <Route path="/companions/settings" element={<CompanionsSettings />} />
          <Route path="/companions/create" element={<CreateCompanion />} />
          <Route path="/course-marketplace" element={<CourseMarketplace />} />
          <Route path="/checkout" element={<WorldClassCheckout />} />
          <Route path="/coupon-management" element={<CouponManagement />} />
          <Route path="/supabase-integration" element={<SupabaseIntegrationExample />} />
                      <Route path="/data-protection" element={<DataProtectionModule />} />
            <Route path="/sla-management" element={<SLAManagement />} />
            <Route path="/stripe-connect" element={<StripeConnectIntegration />} />
            <Route path="/mobile-demo" element={<MobileFirstDemo />} />
            <Route path="/mobile-courses" element={<MobileCourseMarketplace />} />
          <Route path="/localization-demo" element={<LocalizationDemo />} />
          <Route path="/ai-course-creator" element={<AICourseCreator />} />
        <Route path="/payment-demo" element={<PaymentDemo />} />
        <Route path="/course-browsing" element={<CourseBrowsing />} />
        <Route path="/ai-companion-subscription" element={<AICompanionSubscription />} />
<Route path="/subscription" element={<Subscription />} />
<Route path="/subscription-management" element={<SubscriptionManagement />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/team" element={<Placeholder title="Our Team" />} />
        <Route path="/resources/certification" element={<Certification />} />
        <Route path="/resources/get-premium" element={<GetPremium />} />
        <Route path="/resources/subscription" element={<Subscription />} />
        <Route path="/resources/grammar-checker" element={<GrammarCheckerPage />} />
        <Route path="/resources/plagiarism-checker" element={<PlagiarismCheckerPage />} />
        <Route path="/resources/blogs" element={<BlogsPage />} />
        <Route path="/resources/download-app" element={<DownloadAppPage />} />
                  <Route path="/workshops" element={<Workshop />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/technology-and-digital-skills" element={<TechnologyDigitalSkills />} />
          <Route path="/data-and-analytics" element={<DataAnalytics />} />
          <Route path="/health-and-healthcare-innovation" element={<HealthHealthcareInnovation />} />
          <Route path="/cleaning-and-sanitation-services" element={<CleaningSanitationServices />} />
          <Route path="/environment-and-sustainability" element={<EnvironmentSustainability />} />
          <Route path="/engineering-and-construction" element={<EngineeringConstruction />} />
          <Route path="/business-strategy-and-innovation" element={<BusinessStrategyInnovation />} />
          <Route path="/agriculture-and-food-system" element={<AgricultureFoodSystem />} />
          <Route path="/professional-development-and-leadership" element={<ProfessionalDevelopmentLeadership />} />
          <Route path="/music-and-sound-production" element={<MusicSoundProduction />} />
          <Route path="/art-design-and-creative-media" element={<ArtDesignCreativeMedia />} />
          <Route path="/drama-theatre-and-performance" element={<DramaTheatrePerformance />} />
          <Route path="/sports-fitness-and-wellness" element={<SportsFitnessWellness />} />
          <Route path="/vocational-and-technical-training" element={<VocationalTechnicalTraining />} />
          <Route path="/childhood-studies-and-early-year-education" element={<ChildhoodStudiesEarlyYearEducation />} />
        <Route path="/pricing" element={<UnifiedPricing />} />
        <Route path="/community-forums" element={<Placeholder title="Community Forums" />} />
        <Route path="/alumni-network" element={<Placeholder title="Alumni Network" />} />
        <Route path="/events" element={<Placeholder title="Events and Networking" />} />
        <Route path="/press" element={<Placeholder title="Press and Media" />} />
        <Route path="/features" element={<FeatureGrid />} />
        <Route path="/programmes" element={<Programme />} />
        <Route path="/programmes/technology" element={<Placeholder title="Technology and Digital Skills" />} />
        <Route path="/programmes/business" element={<Placeholder title="Business and Management" />} />
        <Route path="/programmes/creative" element={<Placeholder title="Creative Arts and Media" />} />
        <Route path="/programmes/health" element={<Placeholder title="Health and Healthcare" />} />
        <Route path="/programmes/agriculture" element={<Placeholder title="Agriculture and Food Systems" />} />
        <Route path="/world-class-lms-features" element={<WorldClassLMSFeatures />} />
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
          <Route path="/pricing-page" element={<UnifiedPricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/download-app" element={<DownloadApp />} />
          
          {/* Tool Routes */}
          <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/share-knowledge" element={<ShareKnowledgeGlobally />} />
          
          {/* Resource Routes */}
          <Route path="/resources/creators-portal" element={<UnifiedCreatorsPortal />} />
          <Route path="/resources/meet-ai-video-calling" element={<AIVideoCalling />} />
          <Route path="/resources/share-knowledge-globally" element={<ShareKnowledgeGlobally />} />
          <Route path="/resources/become-instructor" element={<BecomeInstructor />} />
          <Route path="/resources/instructor-portal" element={<InstructorPortal />} />
          <Route path="/resources/create-course" element={<CourseCreationWizard />} />
          <Route path="/resources/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
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
          <Route path="/health-science" element={<HealthScience />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/information-technology" element={<InformationTechnology />} />
          <Route path="/education-training" element={<EducationTraining />} />
          <Route path="/business-management" element={<BusinessManagement />} />
          <Route path="/marketing-sales" element={<MarketingSales />} />
          <Route path="/agriculture-food" element={<AgricultureFood />} />
          <Route path="/hospitality-tourism" element={<HospitalityTourism />} />
          <Route path="/leadership-management" element={<LeadershipManagement />} />
          <Route path="/mentorship-career" element={<MentorshipCareerReadiness />} />
          <Route path="/specialised-tracks" element={<SpecialisedIndustryTracks />} />
          <Route path="/real-estate" element={<RealEstateManagement />} />
          <Route path="/public-safety" element={<PublicSafetyEmergencyServices />} />
          <Route path="/social-care" element={<SocialCareCommunitySupport />} />
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
                      </Suspense>
                      <Footer />
                    {/* <Toaster /> */} {/* Removed Toaster as per new_code */}
                    </div>
                  </PWAInitializer>
                </BrowserRouter>
              </LanguageProvider>
            </MobileProvider>
          </NotificationProvider>
        </AppProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;