import React, { useState } from "react";
import searchJson from "../video/search.json";
import { useNavigate, useParams } from "react-router-dom";

const words = ["파도", "풀벌레", "모닥불", "비"];

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Lists() {
  const { search } = useParams();
  const navigate = useNavigate();
  const [youtubeData, setYoutubeData] = useState([]);
  const getYoutubeData = async () => {
    const fakeData = searchJson.items;
    setYoutubeData(fakeData);
    // const json = await (
    //   await fetch(
    //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${text}&key=${YOUTUBE_API_KEY}`
    //   )
    // ).json();
    // setYoutubeData(json.items);
  };

  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (words.includes(text)) {
        getYoutubeData();
      } else {
        console.log("잘못된 검색");
      }
      setText("");
    }
  };
  console.log(youtubeData);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="입력한 후 엔터"
          value={text}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </div>
      <>
        <ul>
          {youtubeData !== ""
            ? youtubeData.map((list, key) => (
                <li
                  key={key}
                  onClick={() => {
                    navigate(`/Lists/detail/${list.id.videoId}`, {
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
              ))
            : null}
        </ul>
      </>
    </>
  );
}
