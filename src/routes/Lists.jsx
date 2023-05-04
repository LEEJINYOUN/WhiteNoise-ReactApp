import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const words = ["파도", "풀벌레", "모닥불", "비"];

export default function Lists() {
  const [text, setText] = useState("");
  const { keyword } = useParams();
  const youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=백색소음 ${text}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  const fakeURL = `/lists/search.json`;
  const {
    isLoading,
    error,
    data: lists,
  } = useQuery(["lists", keyword], async () => {
    return axios.get(fakeURL).then((res) => res.data.items);
  });
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (words.includes(text)) {
      navigate(`/lists/${text}`);
    } else {
      setText("");
      console.log("잘못된 검색입니다.");
    }
  };

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="입력한 후 엔터"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <>
        <div>{keyword && `${keyword}`}</div>
        {isLoading && <p>로딩중...</p>}
        {error && <p>오류입니다.</p>}
        {keyword && lists ? (
          <ul>
            {lists.map((list, key) => (
              <li
                key={key}
                onClick={() => {
                  navigate(`/lists/detail/${list.id.videoId}`, {
                    state: { list },
                  });
                }}
              >
                <img
                  src={list.snippet.thumbnails.medium.url}
                  alt={list.snippet.title}
                />
                <div>
                  <p>{list.snippet.title}</p>
                  <p>{list.snippet.channelTitle}</p>
                  <p>{list.snippet.publishedAt.slice(0, 10)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>검색어를 입력하세요.</p>
        )}
      </>
    </>
  );
}
