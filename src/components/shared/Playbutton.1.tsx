/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const Playbutton: React.FC = ({ img }: any) => {
  return (
    <div>
      <a
        className="video-launch video-play-button"
        rel="shadowbox;height=450;width=800"
      >
        <img src={img} alt="Play Video" />
      </a>
    </div>
  );
};
