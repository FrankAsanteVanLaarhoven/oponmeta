# Supabase Setup Guide for OPONM Learning Platform

## Overview
This guide will help you set up Supabase as the backend for the OPONM Learning Platform, providing a production-ready database with authentication, real-time features, and file storage.

## Prerequisites
- A Supabase account (free tier available)
- Node.js and npm installed
- Basic knowledge of SQL and database concepts

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `oponm-lms` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (starts with `eyJ`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root
2. Add the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Stripe Configuration (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key

# App Configuration
VITE_APP_NAME=OPONM Learning Platform
VITE_APP_URL=http://localhost:5173
```

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `src/supabase/schema.sql`
3. Paste it into the SQL editor
4. Click "Run" to execute the schema

This will create:
- All necessary tables (users, courses, categories, etc.)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamps
- Default data for categories and settings

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add `http://localhost:5173/auth/callback`
3. Go to **Authentication** → **Providers**
4. Enable/configure providers as needed:
   - **Email**: Enabled by default
   - **Google**: Add your Google OAuth credentials
   - **GitHub**: Add your GitHub OAuth credentials

## Step 6: Set Up Storage

1. Go to **Storage** → **Buckets**
2. Create the following buckets:
   - `course-images` (for course thumbnails)
   - `user-avatars` (for user profile pictures)
   - `course-content` (for course materials)
   - `certificates` (for generated certificates)

3. For each bucket, set up RLS policies:
   - Go to **Storage** → **Policies**
   - Add policies for read/write access based on user roles

## Step 7: Configure Row Level Security (RLS)

The schema already includes RLS policies, but you may want to review them:

1. Go to **Authentication** → **Policies**
2. Review the policies for each table
3. Adjust permissions based on your requirements

## Step 8: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test authentication:
   - Try signing up with a new account
   - Verify the user is created in the `users` table

3. Test course creation:
   - Go to the Instructor Portal
   - Try creating a new course
   - Verify it appears in the `courses` table

## Step 9: Production Deployment

When deploying to production:

1. Update environment variables with production URLs
2. Set up a production Supabase project
3. Configure production authentication settings
4. Set up proper CORS policies
5. Configure production storage buckets

## Database Schema Overview

### Core Tables
- **users**: User accounts and profiles
- **courses**: Course information and metadata
- **categories**: Course categories and organization
- **enrollments**: Student course enrollments
- **orders**: Purchase orders and transactions
- **payments**: Payment records and status
- **coupons**: Discount codes and promotions
- **reviews**: Course reviews and ratings
- **certificates**: Course completion certificates

### Supporting Tables
- **user_profiles**: Extended user information
- **course_content**: Individual course lessons/materials
- **user_progress**: Student progress tracking
- **wishlist**: User course wishlists
- **notifications**: System notifications
- **analytics**: User behavior tracking
- **settings**: Application configuration

## Security Features

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

## Performance Optimizations

### Indexes
- Primary key indexes on all tables
- Foreign key indexes for joins
- Composite indexes for common queries
- Full-text search indexes for course content

### Query Optimization
- Efficient joins with proper indexing
- Pagination support for large datasets
- Real-time subscriptions for live updates
- Caching strategies for frequently accessed data

## Monitoring and Analytics

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

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check environment variables
   - Verify redirect URLs
   - Ensure RLS policies are correct

2. **Database Connection Issues**
   - Verify Supabase URL and key
   - Check network connectivity
   - Review CORS settings

3. **Storage Upload Failures**
   - Check bucket permissions
   - Verify file size limits
   - Review storage policies

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com)

## Next Steps

After completing this setup:

1. **Customize the Schema**: Modify tables and policies to match your specific requirements
2. **Add Custom Functions**: Create database functions for complex business logic
3. **Set Up Webhooks**: Configure webhooks for external integrations
4. **Implement Caching**: Add Redis caching for better performance
5. **Monitor Performance**: Set up monitoring and alerting

## Support

For issues specific to this LMS platform:
- Check the project documentation
- Review the code comments
- Create an issue in the project repository

For Supabase-specific issues:
- Refer to the official Supabase documentation
- Join the Supabase community forums
- Contact Supabase support for paid plans
