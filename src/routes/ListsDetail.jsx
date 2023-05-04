import React from "react";
import { useLocation } from "react-router-dom";

export default function ListsDetail() {
  const {
    state: { list },
  } = useLocation();
  const { title, channelTitle, description } = list.snippet;
  return (
    <div>
      <iframe
        id="player"
        type="text/html"
        width="100%"
        height="640"
        src={`http://www.youtube.com/embed/${list.id.videoId}`}
        frameBorder="0"
        title={title}
      />
      <div>
        <h2>{title}</h2>
        <h3>{channelTitle}</h3>
        <pre>{description}</pre>
      </div>
    </div>
  );
}
