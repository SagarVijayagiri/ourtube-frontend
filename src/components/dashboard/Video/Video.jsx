import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Video.css";

export const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch current video
    axios
      .get(`${API_BASE}/video/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setVideo(res.data.Video);
        setUser(res.data.User);
      })
      .catch((err) => {
        console.error(err);
        setError("Video not found");
      });

    // Fetch recommended videos
    axios
      .get(`${API_BASE}/video/all`)
      .then((res) => {
        const filtered = res.data.Videos.filter((v) => v._id !== id);
        setRecommended(filtered.slice(0, 6));
      })
      .catch(console.error);

    // Fetch comments
    axios
      .get(`${API_BASE}/video/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch(console.error);
  }, [id]);

  const handleLike = () => {
    axios.post(`${API_BASE}/video/like/${id}`);
    setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleDislike = () => {
    axios.post(`${API_BASE}/video/dislike/${id}`);
    setVideo((prev) => ({ ...prev, dislike: prev.dislike + 1 }));
  };

  const handleView = () => {
    axios.post(`${API_BASE}/video/view/${id}`);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    axios
      .post(
        `${API_BASE}/video/comment/${id}`,
        { text: commentText },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setComments((prev) => [...prev, { user: "You", text: commentText }]);
        setCommentText("");
      })
      .catch(console.error);
  };

  if (error) return <p className="error-msg">{error}</p>;
  if (!video) return <p>Loading video...</p>;

  return (
    <div className="video-page">
      <div className="video-container">
        <h2 className="video-title">{video.title}</h2>

        <video
          className="video-player"
          controls
          src={video.videourl}
          poster={video.thumbnailurl}
          onPlay={handleView}
        />

        <div className="video-info">
          <p>{video.description}</p>
          <p>Views: {video.views}</p>
          <div className="video-reactions">
            <button onClick={handleLike}>👍 {video.likes}</button>
            <button onClick={handleDislike}>👎 {video.dislike}</button>
          </div>
          <p>Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="uploader-info">
          <p>Uploaded by: {user?.channelname}</p>
          {user?.logourl && (
            <img
              src={user.logourl}
              alt="Uploader"
              className="uploader-logo"
            />
          )}
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map((c, i) => (
            <div key={i} className="comment">
              <strong>{c.user || "Anonymous"}:</strong> {c.text}
            </div>
          ))}

          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleComment}>Post Comment</button>
        </div>
      </div>

      <div className="recommended-section">
        <h3>Recommended</h3>
        <div className="recommended-list">
          {recommended.map((vid) => (
            <Link
              to={`/video/${vid._id}`}
              key={vid._id}
              className="recommended-card"
            >
              <img src={vid.thumbnailurl} alt={vid.title} />
              <div>
                <p>{vid.title}</p>
                <p>{vid.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};