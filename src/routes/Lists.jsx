import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { bookmarkCheck } from "../service/user";

const words = ["파도", "풀벌레", "모닥불", "비"];
const GET_DATA_COUNT = 10;

export default function Lists() {
  const [text, setText] = useState("");
  const { keyword } = useParams();
  const youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${GET_DATA_COUNT}&q=백색소음 ${text}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
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

  const [liked, setLiked] = useState(Array(GET_DATA_COUNT).fill(false));
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <section className="w-full flex flex-col max-w-screen-xl">
      <form
        className="grid gp-10 bg-gray-300 rounded-[10px] p-[3rem]"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg">
          <AiOutlineSearch className="text-[25px] cursor-pointer" />
          <input
            type="text"
            className="bg-transparent text-blue-500 focus:outline-none w-[100%]"
            placeholder="입력한 후 엔터"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <AiOutlineCloseCircle
            className="text-[30px] text-[#a5a6a6] hover:text-black cursor-pointer"
            onClick={() => setText("")}
          />
          <button className="bg-blue-500 w-[100px] h-ull px-4 py-2 rounded-[10px] text-white cursor-pointer hover:bg-blue-300">
            검색
          </button>
        </div>
      </form>
      <div className="my-5">
        {isLoading && <p>로딩중...</p>}
        {error && <p>오류입니다.</p>}
        {keyword && lists ? (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lists.map((list, key) => (
              <li className="rounded-lg mx-4 xl:mx-0" key={key}>
                <img
                  className="w-full cursor-pointer rounded-lg hover:rounded-none ease-out duration-300"
                  src={list.snippet.thumbnails.medium.url}
                  alt={list.snippet.title}
                  onClick={() => {
                    navigate(`/lists/detail/${list.id.videoId}`, {
                      state: { list },
                    });
                  }}
                />
                <div>
                  <p
                    className="cursor-pointer font-semibold text-base my-2 line-clamp-2"
                    onClick={() => {
                      navigate(`/lists/detail/${list.id.videoId}`, {
                        state: { list },
                      });
                    }}
                  >
                    {list.snippet.title}
                  </p>
                  <p className="text-sm opacity-80">
                    {list.snippet.channelTitle}
                  </p>
                  <div className="flex flex-row justify-between">
                    <p className="text-sm opacity-80">
                      {list.snippet.publishedAt.slice(0, 10)}
                    </p>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        if (localStorage.getItem("userInfo") === null) {
                          alert("먼저 로그인해주세요.");
                        } else {
                          let likeArray = [...liked];
                          likeArray[key] = !likeArray[key];
                          setLiked(likeArray);
                          bookmarkCheck({
                            email: user.email,
                            id: user.id,
                            videoId: list.id.videoId,
                            thumbnails: list.snippet.thumbnails.medium.url,
                            title: list.snippet.title,
                            channelTitle: list.snippet.channelTitle,
                            publishedAt: list.snippet.publishedAt,
                          });
                        }
                      }}
                    >
                      추가
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex justify-center font-bold text-xl">
            검색어를 입력하세요.
          </p>
        )}
      </div>
    </section>
  );
}
