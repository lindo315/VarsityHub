import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { newsArticles } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  User,
  MessageSquare,
  Heart,
  Share2,
  ArrowLeft,
  Send,
  Loader2,
} from "lucide-react";

// Type for comment
type Comment = {
  id: string;
  articleId: string;
  userId: string;
  userFullName: string;
  userAvatar: string | null;
  content: string;
  createdAt: string;
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = newsArticles.find((article) => article.id === id);
  const { user } = useAuth();
  const { toast } = useToast();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments();
    if (user) {
      checkIfLiked();
    }
    // Generate a random like count between 5 and 50
    setLikeCount(Math.floor(Math.random() * 45) + 5);
  }, [id, user]);

  const fetchComments = async () => {
    if (!id) return;

    setCommentsLoading(true);

    try {
      // In a real application, you would fetch from Supabase
      // For demonstration, using simulated data with a delay
      setTimeout(() => {
        // This would be where you'd fetch real comments from Supabase
        // For now, using sample data
        const sampleComments: Comment[] = [
          {
            id: "1",
            articleId: id,
            userId: "user-1",
            userFullName: "John Smith",
            userAvatar: null,
            content:
              "This is great news for the university! Looking forward to seeing the impact of this achievement.",
            createdAt: "2025-04-25T10:30:00",
          },
          {
            id: "2",
            articleId: id,
            userId: "user-2",
            userFullName: "Sarah Johnson",
            userAvatar: null,
            content:
              "Congratulations to all involved in this project. I'm proud to be part of this university!",
            createdAt: "2025-04-26T14:15:00",
          },
        ];

        setComments(sampleComments);
        setCommentsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load comments. Please try again.",
      });
      setCommentsLoading(false);
    }
  };

  const checkIfLiked = () => {
    // In a real application, you would check against Supabase
    // For demonstration, randomly decide if the user has liked the article
    setHasLiked(Math.random() > 0.5);
  };

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like articles",
      });
      return;
    }

    // Toggle like status
    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setHasLiked(!hasLiked);

    // In a real application, you would save this to Supabase
    toast({
      title: hasLiked ? "Removed like" : "Article liked",
      description: hasLiked
        ? "You've removed your like from this article"
        : "You've liked this article",
    });
  };

  const handleShare = () => {
    // In a real application, this would copy the URL to clipboard or open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Article link has been copied to clipboard",
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a comment",
      });
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setLoading(true);

    try {
      // In a real application, this would save the comment to Supabase
      // For demonstration, simulating database insertion with timeout
      setTimeout(() => {
        const newComment: Comment = {
          id: `temp-${Date.now()}`,
          articleId: id || "",
          userId: user.id,
          userFullName: user.user_metadata?.full_name || "Anonymous User",
          userAvatar: user.user_metadata?.avatar_url || null,
          content: comment,
          createdAt: new Date().toISOString(),
        };

        setComments((prev) => [newComment, ...prev]);
        setComment("");
        setLoading(false);

        toast({
          title: "Comment posted",
          description: "Your comment has been posted successfully",
        });
      }, 1000);
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post your comment. Please try again.",
      });
      setLoading(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    if (!name) return "?";

    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/news">
              <Button>Back to News</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <Link
            to="/news"
            className="inline-flex items-center text-varsity-blue hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to News
          </Link>

          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>
                {format(new Date(article.publishDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-lg font-medium mb-4">{article.summary}</p>
              <div className="whitespace-pre-line">{article.content}</div>

              {/* This would be expanded in a real application with more paragraphs */}
              <p className="mt-4">
                This development marks a significant milestone for Varsity
                University, positioning it among the global elite in higher
                education. Faculty and students alike have expressed pride in
                this achievement, which is the result of years of dedicated work
                across all departments.
              </p>

              <p className="mt-4">
                "We're thrilled to receive this recognition," said the
                Vice-Chancellor in a statement. "It reflects our commitment to
                academic excellence and innovation in research. This achievement
                belongs to every member of our university community."
              </p>

              <p className="mt-4">
                The ranking takes into account factors such as research output,
                teaching quality, international outlook, and industry
                connections. Varsity University scored particularly well in
                research impact and international collaboration categories.
              </p>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-3">
                <Button
                  variant={hasLiked ? "default" : "outline"}
                  size="sm"
                  className="flex items-center"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${hasLiked ? "fill-current" : ""}`}
                  />
                  {hasLiked ? "Liked" : "Like"} ({likeCount})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              <div className="flex items-center text-gray-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                {comments.length} comments
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Comments</h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <Textarea
                  placeholder={
                    user ? "Write a comment..." : "Sign in to comment"
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-3 min-h-24"
                  disabled={!user || loading}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!user || loading || !comment.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {commentsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-varsity-blue" />
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={comment.userAvatar || undefined}
                            />
                            <AvatarFallback className="bg-varsity-blue text-white">
                              {getUserInitials(comment.userFullName)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">
                                {comment.userFullName}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {format(
                                  new Date(comment.createdAt),
                                  "MMM d, yyyy 'at' h:mm a"
                                )}
                              </p>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-varsity-blue text-white p-4">
                    <h3 className="font-bold text-lg">
                      More in {article.category}
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {newsArticles
                      .filter(
                        (a) =>
                          a.category === article.category && a.id !== article.id
                      )
                      .slice(0, 3)
                      .map((relatedArticle) => (
                        <Link
                          key={relatedArticle.id}
                          to={`/news/${relatedArticle.id}`}
                          className="block hover:bg-gray-50 rounded-md p-2 -mx-2"
                        >
                          <h4 className="font-medium line-clamp-2 hover:text-varsity-blue transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(
                              new Date(relatedArticle.publishDate),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-100 p-4">
                    <h3 className="font-bold text-lg">Latest News</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {newsArticles
                      .sort(
                        (a, b) =>
                          new Date(b.publishDate).getTime() -
                          new Date(a.publishDate).getTime()
                      )
                      .slice(0, 5)
                      .map((latestArticle) => (
                        <Link
                          key={latestArticle.id}
                          to={`/news/${latestArticle.id}`}
                          className="block hover:bg-gray-50 rounded-md p-2 -mx-2"
                        >
                          <h4 className="font-medium line-clamp-2 hover:text-varsity-blue transition-colors">
                            {latestArticle.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Badge className="text-[10px] h-5 mr-2">
                              {latestArticle.category}
                            </Badge>
                            <span>
                              {format(
                                new Date(latestArticle.publishDate),
                                "MMM d"
                              )}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
