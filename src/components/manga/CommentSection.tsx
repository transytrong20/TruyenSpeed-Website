"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, MoreVertical } from "lucide-react";

interface Comment {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies: number;
}

// Mock data
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    content: "Truyện hay quá! Chapter mới nhất thật là gay cấn.",
    createdAt: "2024-01-15T10:00:00",
    likes: 15,
    replies: 3,
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
    },
    content: "Mong chờ chapter tiếp theo. Tác giả vẽ đẹp quá!",
    createdAt: "2024-01-14T15:30:00",
    likes: 8,
    replies: 1,
  },
];

export function CommentSection() {
  const [comments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Bình luận</h2>

      {/* Comment input */}
      <div className="space-y-4">
        <Textarea
          placeholder="Viết bình luận của bạn..."
          value={newComment}
          onChange={handleCommentChange}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button disabled={!newComment.trim()}>Đăng bình luận</Button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.user.avatar} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {comment.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {comment.replies}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
