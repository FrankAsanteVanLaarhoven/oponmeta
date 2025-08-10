# OponMeta - World-Leading EdTech Platform

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)

## 🌟 Overview

OponMeta is a comprehensive EdTech platform that democratizes access to world-class education through innovative technology, personalized learning experiences, and global collaboration. Our platform connects learners, instructors, and organizations worldwide, providing cutting-edge educational solutions for the future.

## ✨ Features

### 🎓 **Learning Management**
- **Comprehensive Course Catalog** with 1000+ courses across multiple disciplines
- **AI-Powered Learning Companions** for personalized education
- **Interactive Learning Paths** with adaptive content
- **Progress Tracking** and analytics
- **Certification Programs** with blockchain verification

### 🤖 **AI & Technology**
- **AI Video Calling** with virtual tutors
- **AI Course Creator** for automated content generation
- **Smart Assessment Tools** with plagiarism detection
- **Personalized Recommendations** based on learning patterns
- **Voice-Driven Learning** interfaces

### 👥 **Community & Collaboration**
- **Student Portal** with comprehensive dashboard
- **Instructor Portal** with course management tools
- **Community Forums** for peer-to-peer learning
- **Alumni Network** for professional connections
- **Mentorship Programs** with industry experts

### 🌍 **Global Accessibility**
- **Multilingual Support** (10+ languages)
- **International Payment Processing** with multiple currencies
- **Mobile-Responsive Design** for all devices
- **Offline Learning** capabilities
- **Accessibility Features** for inclusive education

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FrankAsanteVanLaarhoven/oponmeta.git
   cd oponmeta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
oponmeta/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── dashboard/      # Dashboard components
│   │   └── companions/     # AI companion components
│   ├── context/            # React context providers
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── main.tsx           # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### UI Components
- **Shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Animation library for React
- **React Router** - Client-side routing

### State Management
- **React Context** - Built-in state management
- **Custom Hooks** - Reusable state logic

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📱 Key Components

### 🎯 **WelcomeBackWidget**
Personalized welcome interface with quick access to learning resources.

### 📚 **CourseLibrary**
Comprehensive course browsing with advanced filtering and search capabilities.

### 🤖 **AI Companions**
Interactive AI learning companions with voice capabilities and personalized tutoring.

### 📊 **StudentDashboard**
Complete learning dashboard with progress tracking, upcoming events, and quick actions.

### 👨‍🏫 **InstructorPortal**
Full-featured instructor dashboard with course management and analytics.

### 💳 **InternationalPaymentForm**
Multi-currency payment processing with regional pricing strategies.

## 🌟 Key Features

### **Widget System**
- **AnnouncementsWidget** - Real-time announcements and notifications
- **InstructorsWidget** - Instructor profiles and messaging
- **ReadyToUseCoursesWidget** - Course enrollment and management
- **LearningPathWidget** - Personalized learning journeys
- **GamificationWidget** - Achievement and reward system

### **Assessment Tools**
- **PlagiarismChecker** - Advanced content originality detection
- **GrammarChecker** - Writing improvement tools
- **AptitudeTest** - Career assessment and guidance
- **MentalHealthAssessment** - Wellness and mental health evaluation

### **Professional Development**
- **ResumeBuilder** - Professional resume creation
- **CareerReadyPlan** - Personalized career planning
- **WorkplacePersonalityAssessment** - Professional personality evaluation

## 🎨 Design System

### **Color Palette**
- **Primary Blue**: `#0a174e` - Trust and professionalism
- **Accent Gold**: `#FFD700` - Excellence and achievement
- **Success Green**: `#10B981` - Progress and completion
- **Warning Yellow**: `#F59E0B` - Attention and alerts
- **Error Red**: `#EF4444` - Errors and warnings

### **Typography**
- **Headings**: Inter font family for modern, clean appearance
- **Body Text**: System fonts for optimal readability
- **Code**: Monospace fonts for technical content

### **Responsive Design**
- **Mobile-First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-Friendly** interfaces
- **Accessibility** compliant

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=OponMeta
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom spacing and typography
- Component-specific utilities
- Dark mode support

## 📊 Performance

### Optimization Features
- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Component and image lazy loading
- **Tree Shaking** - Unused code elimination
- **Minification** - Production build optimization
- **Caching** - Efficient resource caching

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your web server
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Write comprehensive tests
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **Shadcn/ui** for the beautiful component library
- **Lucide** for the beautiful icons

## 📞 Support

- **Email**: info@oponmeta.com
- **Website**: [oponmeta.com](https://oponmeta.com)
- **Documentation**: [docs.oponmeta.com](https://docs.oponmeta.com)

## 🌟 Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ AI learning companions
- ✅ Course management system
- ✅ Payment processing

### Phase 2 (Q2 2025)
- 🔄 Advanced AI features
- 🔄 Mobile applications
- 🔄 Offline learning capabilities
- 🔄 Advanced analytics

### Phase 3 (Q3 2025)
- 📋 VR/AR learning experiences
- 📋 Blockchain credentialing
- 📋 Advanced collaboration tools
- 📋 Enterprise features

---

**Built with ❤️ by the OponMeta Team**

*Empowering Global Learning Through Innovation* 