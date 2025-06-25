// components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import './Searchbar.css';

export const SearchBar = ({ videos, onFilter }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    onFilter(filtered);
  }, [query, videos, onFilter]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="homeinput"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};