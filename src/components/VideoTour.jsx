import React, { useState, useEffect } from "react";
import config from "../../config";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.API_URL}/video?website=${config.SLUG_URL}`);

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setVideos(data.property_videos || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // If no videos are available, render alternative content
  const renderContent = () => {
    if (loading) {
      return <div className="text-lg font-semibold animate-pulse">Loading...</div>;
    }
    
    if (error) {
      return <div className="text-red-500 text-lg font-semibold">{error}</div>;
    }
    
    if (videos.length > 0) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videos[0].youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${videos[0].youtube_video_id}`}
            title="Property Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      );
    }
    
    // Default content when no videos are available
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <img 
            src={`${config.API_URL}/images/property-default.jpg`} 
            alt="Property Overview" 
            className="w-full max-w-lg mx-auto rounded-lg shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.jpg";
            }}
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Discover Amberwood</h3>
          <p className="mt-2 text-gray-600">Explore our luxurious 2, 3 & 4 BHK residences.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full md:h-screen h-64 flex items-center justify-center bg-black text-white">
      {renderContent()}
    </div>
  );
};

export default VideoTour;