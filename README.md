# OPONM Learning Platform

A comprehensive Learning Management System (LMS) built with React, TypeScript, and Supabase, designed for modern education and professional development.

## 🚀 Features

### Core LMS Features
- **Course Management**: Create, edit, and manage courses with rich content
- **User Management**: Student and instructor portals with role-based access
- **Payment Processing**: Integrated Stripe payments with multiple payment methods
- **Coupon System**: Advanced discount and promotion management
- **Real-time Analytics**: Track user engagement and course performance
- **File Management**: Secure file upload and storage with Supabase
- **Multi-language Support**: Internationalization ready
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Advanced Features
- **AI-Powered Tools**: Course creation assistance and content generation
- **Live Sessions**: Webinar and workshop management
- **Certificate Generation**: Automated certificate creation and verification
- **Progress Tracking**: Detailed student progress monitoring
- **Social Learning**: Community features and peer interaction
- **Assessment Tools**: Quizzes, tests, and evaluation systems

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend & Database
- **Supabase** for backend-as-a-service
- **PostgreSQL** database with Row Level Security
- **Real-time subscriptions** for live updates
- **File storage** with automatic CDN
- **Authentication** with multiple providers

### Payment & Integrations
- **Stripe** for payment processing
- **Apple Pay** and **Google Pay** support
- **PayPal** integration
- **Multi-currency** support
- **Tax calculation** by country

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oponm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_STRIPE_SECRET_KEY=your_stripe_secret_key

   # App Configuration
   VITE_APP_NAME=OPONM Learning Platform
   VITE_APP_URL=http://localhost:5173
   ```

4. **Set up Supabase**
   - Follow the detailed setup guide in `SUPABASE_SETUP.md`
   - Run the database schema from `src/supabase/schema.sql`
   - Configure authentication and storage buckets

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🗄 Database Schema

The platform uses a comprehensive PostgreSQL schema with the following main tables:

### Core Tables
- `users` - User accounts and profiles
- `courses` - Course information and metadata
- `categories` - Course categories and organization
- `enrollments` - Student course enrollments
- `orders` - Purchase orders and transactions
- `payments` - Payment records and status
- `coupons` - Discount codes and promotions
- `reviews` - Course reviews and ratings
- `certificates` - Course completion certificates

### Supporting Tables
- `user_profiles` - Extended user information
- `course_content` - Individual course lessons/materials
- `user_progress` - Student progress tracking
- `wishlist` - User course wishlists
- `notifications` - System notifications
- `analytics` - User behavior tracking
- `settings` - Application configuration

## 🔐 Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Instructors can only manage their own courses
- Admins have full access to all data
- Public read access for published courses

### Authentication
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- Password reset functionality
- Email verification

### Data Validation
- Foreign key constraints
- Check constraints for data integrity
- Automatic timestamp management
- UUID primary keys for security

## 📱 Key Components

### Student Portal (`/student-portal`)
- Course enrollment and progress tracking
- Payment management and billing
- Certificate downloads
- Learning analytics
- Account settings

### Instructor Portal (`/instructor-portal`)
- Course creation and management
- Student analytics and insights
- Revenue tracking
- Content management
- Performance metrics

### Course Marketplace (`/course-marketplace`)
- Browse and search courses
- Filter by category, level, and price
- Course previews and reviews
- Shopping cart functionality

### World-Class Checkout (`/checkout`)
- Multi-step checkout process
- Multiple payment methods
- Coupon application
- Tax calculation
- Order confirmation

### Coupon Management (`/coupon-management`)
- Create and manage discount codes
- Usage analytics and tracking
- Advanced targeting options
- Performance metrics

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── supabase.ts     # Supabase client configuration
│   └── database.types.ts # TypeScript database types
├── supabase/           # Database schema and migrations
└── App.tsx             # Main application component
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Other Platforms
The application can be deployed to any static hosting platform that supports:
- Static file serving
- Environment variable configuration
- HTTPS support

## 📊 Analytics & Monitoring

### Built-in Analytics
- User behavior tracking
- Course engagement metrics
- Revenue analytics
- Performance monitoring

### Supabase Dashboard
- Real-time database monitoring
- Query performance analysis
- Error tracking and logging
- Usage statistics

## 🔄 API Integration

### Supabase Client
The platform uses a comprehensive Supabase client with:
- Authentication helpers
- Database CRUD operations
- File upload and storage
- Real-time subscriptions
- Analytics tracking

### Custom Hooks
Pre-built React hooks for common operations:
- `useAuth` - Authentication management
- `useCourses` - Course CRUD operations
- `useCategories` - Category management
- `useCoupons` - Coupon management
- `useFileUpload` - File upload handling
- `useRealtime` - Real-time subscriptions
- `useAnalytics` - Event tracking

## 🧪 Testing

### Manual Testing
- Visit `/supabase-integration` for a comprehensive integration example
- Test all CRUD operations
- Verify authentication flow
- Check payment processing
- Validate file uploads

### Automated Testing
- Unit tests for utility functions
- Integration tests for API calls
- E2E tests for critical user flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [React Community](https://react.dev/community)

### Issues
For bugs and feature requests, please create an issue in the repository.

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced AI course recommendations
- [ ] Live video streaming integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant support
- [ ] Advanced assessment tools
- [ ] Gamification features
- [ ] Social learning enhancements

### Performance Improvements
- [ ] Code splitting optimization
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Database query optimization
- [ ] CDN integration

---

**Built with ❤️ for modern education** 