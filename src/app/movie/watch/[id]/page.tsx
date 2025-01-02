'use client';
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player/youtube";
import { commentForMovie } from "@/api/auth";
import { useState, useEffect } from "react";
import { getMoveComment } from "@/api/movie";

export default function WatchMovie() {
  const { id: movieID } = useParams();
  const searchParams = useSearchParams();
  const video_url = searchParams.get("video_url");
  const title = searchParams.get("name");
  const router = useRouter();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getMoveComment(movieID);
        setComments(comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Save the comment to the backend
      await commentForMovie(movieID, newComment);

      // Add the new comment to the state
      setComments([
        ...comments,
        {
          content: newComment,
          created_at: new Date().toISOString(), 
          updated_at: new Date().toISOString(),
          users: {
            username: "You",
          }
        },
      ]);

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4 self-start ml-4"
      >
        Back
      </button>

      {/* Movie Title */}
      <h1 className="text-3xl font-bold mt-4 mb-6 text-center">{title}</h1>

      {/* Video Player */}
      <div className="w-full max-w-4xl aspect-video">
        {video_url ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video_url}`}
            controls={true}
            width="100%"
            height="100%"
            playing={true}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Comment Section */}
      <div className="w-full max-w-4xl mt-8 bg-gray-800 rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded">
              <p>
                <strong>{comment.users.username}:</strong> {comment.content}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="mt-4 flex flex-col space-y-2"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-gray-700 p-3 rounded text-white"
          />
          <button
            type="submit"
            className="self-end bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
}
