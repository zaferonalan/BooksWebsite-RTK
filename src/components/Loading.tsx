import React from "react";
import "../styles/loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <span className="loading-text">
        Loading
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
