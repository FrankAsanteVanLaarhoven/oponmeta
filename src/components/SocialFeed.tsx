import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Star, 
  Trophy, 
  BookOpen, 
  ThumbsUp, 
  ThumbsDown,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2,
  Reply,
  Send,
  Award,
  Calendar,
  MapPin
} from 'lucide-react';
import { 
  getFeed, 
  likeFeedItem, 
  unlikeFeedItem, 
  addComment, 
  replyToComment,
  SocialFeedItem,
  Comment,
  socialFeaturesService
} from '@/utils/socialFeatures';
import { formatDistanceToNow } from 'date-fns';

interface SocialFeedProps {
  userId?: string;
  limit?: number;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ userId, limit = 20 }) => {
  const [feedItems, setFeedItems] = useState<SocialFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SocialFeedItem | null>(null);

  useEffect(() => {
    loadFeed();
  }, [userId, limit]);

  const loadFeed = () => {
    setLoading(true);
    try {
      const feed = userId 
        ? socialFeaturesService.getUserFeed(userId, limit)
        : socialFeaturesService.getFeed(limit);
      setFeedItems(feed);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (itemId: string) => {
    const item = feedItems.find(f => f.id === itemId);
    if (item?.isLiked) {
      unlikeFeedItem(itemId);
    } else {
      likeFeedItem(itemId);
    }
    loadFeed(); // Refresh feed to update likes
  };

  const handleComment = (item: SocialFeedItem) => {
    setSelectedItem(item);
    setShowCommentDialog(true);
  };

  const submitComment = () => {
    if (!selectedItem || !commentText.trim()) return;

    addComment(selectedItem.id, {
      userId: 'current-user', // In real app, get from auth context
      userName: 'Current User',
      userAvatar: '/placeholder.svg',
      content: commentText.trim()
    });

    setCommentText('');
    setShowCommentDialog(false);
    loadFeed();
  };

  const submitReply = (commentId: string) => {
    if (!replyText.trim()) return;

    replyToComment(commentId, {
      userId: 'current-user',
      userName: 'Current User',
      userAvatar: '/placeholder.svg',
      content: replyText.trim()
    });

    setReplyText('');
    setActiveCommentId(null);
    loadFeed();
  };

  const renderFeedItem = (item: SocialFeedItem) => {
    const getIcon = () => {
      switch (item.type) {
        case 'review':
          return <Star className="h-5 w-5 text-yellow-500" />;
        case 'favorite':
          return <Heart className="h-5 w-5 text-red-500" />;
        case 'achievement':
          return <Trophy className="h-5 w-5 text-purple-500" />;
        case 'completion':
          return <Award className="h-5 w-5 text-green-500" />;
        case 'share':
          return <Share2 className="h-5 w-5 text-blue-500" />;
        default:
          return <BookOpen className="h-5 w-5 text-gray-500" />;
      }
    };

    const getActionText = () => {
      switch (item.type) {
        case 'review':
          return 'reviewed';
        case 'favorite':
          return 'added to favorites';
        case 'achievement':
          return 'earned an achievement';
        case 'completion':
          return 'completed';
        case 'share':
          return 'shared';
        default:
          return 'interacted with';
      }
    };

    const renderContent = () => {
      switch (item.type) {
        case 'review':
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < item.data.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{item.data.rating}/5</span>
              </div>
              <h4 className="font-semibold">{item.data.title}</h4>
              <p className="text-gray-700">{item.data.comment}</p>
            </div>
          );

        case 'achievement':
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-purple-500" />
                <div>
                  <h4 className="font-semibold">{item.data.achievement.title}</h4>
                  <p className="text-sm text-gray-600">{item.data.achievement.description}</p>
                </div>
              </div>
              <Badge variant="secondary" className="capitalize">
                {item.data.achievement.rarity}
              </Badge>
            </div>
          );

        case 'completion':
          return (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-semibold">Course Completed!</h4>
                  <p className="text-sm text-gray-600">{item.content.title}</p>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div>
              <h4 className="font-semibold">{item.content.title}</h4>
              {item.data.message && (
                <p className="text-gray-700 mt-1">{item.data.message}</p>
              )}
            </div>
          );
      }
    };

    return (
      <Card key={item.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.user.avatar} alt={item.user.name} />
                <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{item.user.name}</span>
                  {getIcon()}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{getActionText()}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {renderContent()}

          {/* Content Image */}
          {item.content.image && (
            <div className="mt-3">
              <img
                src={item.content.image}
                alt={item.content.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(item.id)}
                className={`flex items-center space-x-1 ${item.isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-current' : ''}`} />
                <span>{item.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleComment(item)}
                className="flex items-center space-x-1 text-gray-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{item.comments.length}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-500"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {item.comments.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h5 className="font-medium mb-3">Comments ({item.comments.length})</h5>
              <div className="space-y-3">
                {item.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{comment.userName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      
                      {/* Reply Input */}
                      {activeCommentId === comment.id && (
                        <div className="mt-2 flex space-x-2">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 text-sm"
                            rows={2}
                          />
                          <Button
                            size="sm"
                            onClick={() => submitReply(comment.id)}
                            disabled={!replyText.trim()}
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-2 ml-4 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                                <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-2">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-xs">{reply.userName}</span>
                                    <span className="text-xs text-gray-500">
                                      {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                                    </span>
                                  </div>
                                  <p className="text-xs mt-1">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
            <p className="text-gray-600">When users start sharing and reviewing content, it will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        feedItems.map(renderFeedItem)
      )}

      {/* Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a comment</DialogTitle>
            <DialogDescription>
              Share your thoughts on this {selectedItem?.type}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitComment} disabled={!commentText.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialFeed; 