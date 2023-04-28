import React, { useState } from "react";
import searchJson from "../video/search.json";

const words = ["파도", "풀벌레", "모닥불", "비"];

// const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function Lists() {
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
            ? youtubeData.map((item, key) => (
                <li key={key}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                  />
                  <div>
                    <p>{item.snippet.title}</p>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{item.snippet.publishedAt.slice(0, 10)}</p>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </>
    </>
  );
}
