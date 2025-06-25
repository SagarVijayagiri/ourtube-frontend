import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchBar } from "./Searchbar/Searchbar";

export const Home = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/video/all`)
      .then(res => {
        setVideos(res.data.Videos);
        setFilteredVideos(res.data.Videos);
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

  return (
    <div>
      <div className="header-cont">
        <SearchBar videos={videos} onFilter={setFilteredVideos} />
        <div className="logo-cont"></div>
      </div>

      <div className="home-wrapper">
        <div className="head">Videos</div>
        <div className="videos-container">
          {filteredVideos.map((video) => (
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
    </div>
  );
};