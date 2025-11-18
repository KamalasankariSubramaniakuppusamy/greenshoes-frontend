import React from "react";
import "../styles/productPage.css"; // ensures proper styling & layout

const ImpactStory = ({ story, mediaUrls }) => {
  if (!story && (!mediaUrls || mediaUrls.length === 0)) return null;

  return (
    <div className="impact-story">
      <h3>Our Sustainability Story</h3>

      {story && <p className="impact-text">{story}</p>}

      <div className="impact-media">
        {mediaUrls?.map((url, index) => {
          // support images + videos automatically
          const isVideo = url.endsWith(".mp4") || url.endsWith(".webm");

          return isVideo ? (
            <video
              key={index}
              src={url}
              controls
              className="impact-media-item"
            />
          ) : (
            <img
              key={index}
              src={url}
              alt="Impact visual"
              className="impact-media-item"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImpactStory;
