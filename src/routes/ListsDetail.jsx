import React from "react";
import { useLocation } from "react-router-dom";

export default function ListsDetail() {
  const {
    state: { list },
  } = useLocation();
  return (
    <div>
      <iframe
        id="player"
        type="text/html"
        width="100%"
        height="640"
        src={`https://www.youtube.com/embed/${list.snippet.id}`}
        frameBorder="0"
        title={list.snippet.title}
      />
      <div>
        <h2>{list.snippet.title}</h2>
        <h3>{list.snippet.channelTitle}</h3>
        <pre>{list.snippet.description}</pre>
      </div>
    </div>
  );
}
