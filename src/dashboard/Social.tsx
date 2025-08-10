import React, { useState } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Send,
  Image as ImageIcon,
  Video,
  Users,
  TrendingUp,
  MapPin,
  Globe,
  Lock,
  UserPlus,
  MessageSquare,
  Star,
  Filter,
  Search
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    isOnline: boolean;
  };
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timestamp: string;
  tags: string[];
  type: 'text' | 'image' | 'video' | 'achievement' | 'course';
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isOnline: boolean;
  mutualConnections: number;
  courses: string[];
}

const Social: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'connections'>('feed');
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      author: {
        id: 'user1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'Student',
        isOnline: true
      },
      content: 'Just completed the Advanced JavaScript course! 🎉 The final project was challenging but so rewarding. Anyone else working on the React module?',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: true,
      isBookmarked: false,
      timestamp: '2 hours ago',
      tags: ['javascript', 'react', 'learning'],
      type: 'text'
    },
    {
      id: '2',
      author: {
        id: 'user2',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'Student',
        isOnline: false
      },
      content: 'Check out my latest project! Built a full-stack e-commerce platform using MERN stack.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      likes: 42,
      comments: 12,
      shares: 7,
      isLiked: false,
      isBookmarked: true,
      timestamp: '5 hours ago',
      tags: ['mern', 'project', 'fullstack'],
      type: 'image'
    },
    {
      id: '3',
      author: {
        id: 'user3',
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'Student',
        isOnline: true
      },
      content: 'Achievement unlocked! 🏆 Completed 50 courses and earned the "Learning Champion" badge.',
      likes: 67,
      comments: 15,
      shares: 12,
      isLiked: true,
      isBookmarked: false,
      timestamp: '1 day ago',
      tags: ['achievement', 'milestone'],
      type: 'achievement'
    }
  ];

  const comments: Comment[] = [
    {
      id: '1',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      content: 'Congratulations! The React module is next on my list too.',
      timestamp: '1 hour ago',
      likes: 3
    },
    {
      id: '2',
      author: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      },
      content: 'Great job! Any tips for the final project?',
      timestamp: '30 minutes ago',
      likes: 1
    }
  ];

  const suggestedUsers: User[] = [
    {
      id: 'user4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      role: 'Student',
      isOnline: true,
      mutualConnections: 3,
      courses: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: 'user5',
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      role: 'Student',
      isOnline: false,
      mutualConnections: 2,
      courses: ['Python', 'Data Science', 'Machine Learning']
    }
  ];

  const handleLike = (postId: string) => {
    // Toggle like functionality
  };

  const handleComment = (postId: string) => {
    setShowComments(showComments === postId ? null : postId);
  };

  const handleShare = (postId: string) => {
    // Share functionality
  };

  const handleBookmark = (postId: string) => {
    // Bookmark functionality
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // Submit comment
      setCommentText('');
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Create new post
      setNewPost('');
      setShowPostForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Learning</h1>
          <p className="text-gray-600">Connect with peers, share your progress, and discover new learning opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Create Post & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Post Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                  alt="Your avatar" 
                  className="w-10 h-10 rounded-full"
                />
                <button 
                  onClick={() => setShowPostForm(true)}
                  className="flex-1 text-left text-gray-500 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                  What's on your mind?
                </button>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <ImageIcon size={16} />
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <Video size={16} />
                  <span>Video</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <Star size={16} />
                  <span>Achievement</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posts this week</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Connections</span>
                  <span className="font-semibold text-green-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Achievements</span>
                  <span className="font-semibold text-purple-600">8</span>
                </div>
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Suggested Connections</h3>
              <div className="space-y-3">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.mutualConnections} mutual connections</p>
                    </div>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'feed'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'discover'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveTab('connections')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'connections'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Connections
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                          {post.author.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{post.author.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.author.role}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                            {post.type === 'achievement' && (
                              <>
                                <span>•</span>
                                <Star size={14} className="text-yellow-500" />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-900 mb-4">{post.content}</p>
                    
                    {post.image && (
                      <img src={post.image} alt="Post content" className="w-full rounded-lg mb-4" />
                    )}

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                          }`}
                        >
                          <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => handleComment(post.id)}
                          className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle size={16} />
                          <span>{post.comments}</span>
                        </button>
                        <button
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-1 hover:text-green-500 transition-colors"
                        >
                          <Share2 size={16} />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className={`transition-colors ${
                          post.isBookmarked ? 'text-blue-500' : 'hover:text-blue-500'
                        }`}
                      >
                        <Bookmark size={16} fill={post.isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments === post.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3 mb-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                  <p className="text-sm font-medium text-gray-900">{comment.author.name}</p>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                  <span>{comment.timestamp}</span>
                                  <button className="hover:text-gray-700">Like</button>
                                  <button className="hover:text-gray-700">Reply</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                            alt="Your avatar" 
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 flex space-x-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={handleSubmitComment}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Trending & Events */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp size={16} className="mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {['#JavaScript', '#React', '#Python', '#DataScience', '#WebDev'].map((topic) => (
                  <div key={topic} className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">{topic}</span>
                    <span className="text-xs text-gray-500">2.5k posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin size={16} className="mr-2" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">Web Development Workshop</p>
                  <p className="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin size={12} className="mr-1" />
                    Virtual Event
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">Study Group: React Hooks</p>
                  <p className="text-xs text-gray-500">Friday, 6:00 PM</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Globe size={12} className="mr-1" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Active Now */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users size={16} className="mr-2" />
                Active Now
              </h3>
              <div className="space-y-3">
                {posts.filter(post => post.author.isOnline).map((post) => (
                  <div key={post.author.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{post.author.name}</p>
                      <p className="text-xs text-gray-500">Studying {post.tags[0]}</p>
                    </div>
                    <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
              <button
                onClick={() => setShowPostForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <ImageIcon size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <Star size={20} />
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social; 