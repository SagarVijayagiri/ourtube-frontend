import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchBar } from "./Searchbar/Searchbar";
//import "./Home.css"; // Optional for your styles

export const Home = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/video/all`)
      .then(res => {
        const fetchedVideos = res.data.Videos || [];
        setVideos(fetchedVideos);
        setFilteredVideos(fetchedVideos);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load videos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Utility functions
  const getTrending = () => [...videos].sort((a, b) => b.views - a.views).slice(0, 6);
  const getRecent = () => [...videos].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 6);
  const getRecommended = () => videos.filter(v => v.category === "technology").slice(0, 6);

  return (
    <div>
      <div className="header-cont">
        <SearchBar videos={videos} onFilter={setFilteredVideos} />
        <div className="logo-cont"></div>
      </div>

      <div className="home-wrapper">
        <VideoSection title="Trending Now" videos={getTrending()} />
        <VideoSection title="Recently Uploaded" videos={getRecent()} />
        <VideoSection title="Recommended for You" videos={getRecommended()} />
      </div>
    </div>
  );
};

// Reusable component to show each video section
const VideoSection = ({ title, videos }) => (
  <div className="video-section">
    <h2 className="section-title">{title}</h2>
    <div className="videos-container">
      {videos.map((video) => (
        <Link
          to={`/video/${video._id}`}
          key={video._id}
          className="video-card"
        >
          <img
            src={video.thumbnailurl}
            alt={video.title}
            className="video-thumbnail"
          />
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <p className="video-meta">{video.category} • {video.views} views</p>
            <p className="video-meta">👍 {video.likes}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);