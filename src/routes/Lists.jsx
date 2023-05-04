import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

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
    <section className="w-full flex flex-col max-w-screen-lg">
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
    </section>
  );
}
