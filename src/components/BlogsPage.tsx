import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark,
  Tag,
  ArrowRight,
  TrendingUp,
  Star,
  MessageCircle,
  Download,
  Globe,
  Zap,
  Target,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  image: string;
}

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Education: Transforming Learning Experiences',
                      excerpt: 'Discover how artificial intelligence is revolutionising education and creating personalised learning experiences for students worldwide.',
      content: 'Artificial intelligence is transforming the way we learn and teach...',
      author: {
        name: 'Dr. Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        bio: 'AI Research Specialist at OponMeta'
      },
      category: 'Technology',
      tags: ['AI', 'Education', 'Innovation', 'Learning'],
      publishDate: '2024-03-15',
      readTime: 8,
      views: 1247,
      likes: 89,
      comments: 23,
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: '2',
      title: 'Mastering Digital Marketing: A Complete Guide for 2024',
      excerpt: 'Learn the latest digital marketing strategies and techniques that will help you succeed in the competitive online landscape.',
      content: 'Digital marketing has evolved significantly over the past decade...',
      author: {
        name: 'Michael Chen',
        avatar: '/api/placeholder/40/40',
        bio: 'Digital Marketing Expert'
      },
      category: 'Marketing',
      tags: ['Digital Marketing', 'SEO', 'Social Media', 'Strategy'],
      publishDate: '2024-03-12',
      readTime: 12,
      views: 892,
      likes: 67,
      comments: 18,
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: '3',
      title: 'Building Successful Online Courses: Tips from Top Instructors',
      excerpt: 'Expert insights on creating engaging and profitable online courses that students love and recommend.',
      content: 'Creating an online course that truly engages students requires careful planning...',
      author: {
        name: 'Emily Rodriguez',
        avatar: '/api/placeholder/40/40',
        bio: 'Course Creation Specialist'
      },
      category: 'Education',
      tags: ['Course Creation', 'Teaching', 'Online Learning', 'Tips'],
      publishDate: '2024-03-10',
      readTime: 10,
      views: 756,
      likes: 54,
      comments: 15,
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: '4',
                      title: 'The Psychology of Learning: How to Optimise Your Study Habits',
      excerpt: 'Explore the science behind effective learning and discover proven techniques to improve your study efficiency.',
      content: 'Understanding how our brains process and retain information is crucial...',
      author: {
        name: 'Dr. James Wilson',
        avatar: '/api/placeholder/40/40',
        bio: 'Educational Psychologist'
      },
      category: 'Psychology',
      tags: ['Learning', 'Psychology', 'Study Tips', 'Memory'],
      publishDate: '2024-03-08',
      readTime: 15,
      views: 634,
      likes: 42,
      comments: 12,
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: '5',
      title: 'Web Development Trends: What\'s Hot in 2024',
      excerpt: 'Stay ahead of the curve with the latest web development trends and technologies that are shaping the industry.',
      content: 'The web development landscape is constantly evolving with new technologies...',
      author: {
        name: 'Alex Thompson',
        avatar: '/api/placeholder/40/40',
        bio: 'Full-Stack Developer'
      },
      category: 'Technology',
      tags: ['Web Development', 'Programming', 'Trends', 'Technology'],
      publishDate: '2024-03-05',
      readTime: 11,
      views: 523,
      likes: 38,
      comments: 9,
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: '6',
      title: 'Data Science Career Path: From Beginner to Expert',
      excerpt: 'A comprehensive guide to building a successful career in data science, from foundational skills to advanced techniques.',
      content: 'Data science has become one of the most sought-after career paths...',
      author: {
        name: 'Dr. Lisa Park',
        avatar: '/api/placeholder/40/40',
        bio: 'Data Science Lead'
      },
      category: 'Career',
      tags: ['Data Science', 'Career', 'Skills', 'Learning Path'],
      publishDate: '2024-03-03',
      readTime: 14,
      views: 445,
      likes: 31,
      comments: 7,
      featured: false,
      image: '/api/placeholder/400/250'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(post => post.category.toLowerCase() === 'technology').length },
    { id: 'marketing', name: 'Marketing', count: blogPosts.filter(post => post.category.toLowerCase() === 'marketing').length },
    { id: 'education', name: 'Education', count: blogPosts.filter(post => post.category.toLowerCase() === 'education').length },
    { id: 'psychology', name: 'Psychology', count: blogPosts.filter(post => post.category.toLowerCase() === 'psychology').length },
    { id: 'career', name: 'Career', count: blogPosts.filter(post => post.category.toLowerCase() === 'career').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'popular':
        return b.views - a.views;
      case 'trending':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = sortedPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLikePost = (postId: string) => {
    // Here you would typically update the like count via API
    alert('Like functionality would be implemented here');
  };

  const handleSharePost = (post: BlogPost) => {
    const shareText = `Check out this great article: ${post.title}`;
    const shareUrl = window.location.origin + `/blogs/${post.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1834] via-[#11204a] to-[#16203a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <BookOpen className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              OponMeta Blog
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
              Discover insights, tips, and trends in education, technology, and career development. 
              Stay updated with the latest in learning and professional growth.
            </p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-400 mr-2" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-yellow-400 text-gray-900 text-xs rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-yellow-400 text-sm">Featured</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                    <p className="text-yellow-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.publishDate)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white text-sm">{post.author.name}</span>
                      </div>
                      <button className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-yellow-400 text-gray-900 text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-yellow-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-yellow-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.publishDate)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime} min
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white text-xs">{post.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSharePost(post)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-gray-800 mb-6">
              Get notified when we publish new articles about education, technology, and career development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogsPage;
