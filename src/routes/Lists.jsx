import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import { bookmarkCheck } from "../service/user";

const SEARCH_KEYWORD = ["파도", "풀벌레", "모닥불", "비"];
const GET_DATA_COUNT = 20;

export default function Lists() {
  const [text, setText] = useState("");
  const { keyword } = useParams();
  const youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${GET_DATA_COUNT}&q=백색소음 ${text}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  const fakeURL = `/lists/search.json`;
  const { data: lists } = useQuery(["lists", keyword], async () => {
    return axios.get(fakeURL).then((res) => res.data.items);
  });
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (SEARCH_KEYWORD.includes(text)) {
      navigate(`/lists/${text}`);
    } else {
      setText("");
    }
  };

  const [bookmark, setBookmark] = useState(Array(GET_DATA_COUNT).fill(false));
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <section className="w-full flex flex-col max-w-screen-xl">
      <form
        className="m-auto w-full md:w-10/12 lg:w-8/12 grid gp-10 bg-gray-300 rounded-[10px] p-[3rem]"
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg">
          <AiOutlineSearch className="text-[25px] cursor-pointer" />
          <input
            type="text"
            className="bg-transparent font-bold text-blue-500 focus:outline-none w-[100%]"
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
      <div className="m-auto mt-4 text-gray-400">
        <span>⁕ 검색가능한 단어 : </span>
        <span className="text-red-500 font-bold">
          {SEARCH_KEYWORD.join(", ")}
        </span>
      </div>
      <div className="my-5">
        {lists && (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lists.map((list, key) => (
              <li className="rounded-lg mx-4 xl:mx-0 my-2" key={key}>
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
                      className="cursor-pointer border-2 border-gray-400 rounded-full p-1 hover:bg-gray-400 hover:text-white"
                      onClick={() => {
                        if (localStorage.getItem("userInfo") === null) {
                          alert("로그인 후 이용해주세요.");
                        } else {
                          let bookmarkArray = [...bookmark];
                          bookmarkArray[key] = !bookmarkArray[key];
                          setBookmark(bookmarkArray);
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
                      <AiOutlineCheck />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
