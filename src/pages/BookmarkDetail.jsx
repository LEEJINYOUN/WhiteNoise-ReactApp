import React from "react";
import { useLocation } from "react-router-dom";
import { bookmarkCheck } from "../service/user";
import { AiOutlineCheck } from "react-icons/ai";

export default function BookmarkDetail({ user }) {
  const {
    state: { list },
  } = useLocation();
  const { videoId, title, publishedAt } = list;
  return (
    <section className="flex flex-col w-10/12 md:w-8/12 lg:w-6/12">
      <iframe
        className="m-auto mt-3 w-full h-[300px] md:h-[350px] lg:h-[400px]"
        id="player"
        type="text/html"
        src={`http://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        title={title}
      />
      <div className="flex flex-col mt-5">
        <h2 className="text-sm md:text-base lg:text-lg font-bold">{title}</h2>
        <div className="flex flex-row justify-between mt-2">
          <p className="text-md opacity-80">{publishedAt.slice(0, 10)}</p>
          <button
            className="cursor-pointer border-2 border-gray-400 rounded-full p-1 hover:bg-gray-400 hover:text-white"
            onClick={() => {
              if (localStorage.getItem("userInfo") === null) {
                alert("로그인 후 이용해주세요.");
              } else {
                bookmarkCheck({
                  email: user.email,
                  id: user.id,
                  videoId: list.videoId,
                  thumbnails: list.thumbnails,
                  title: list.title,
                  channelTitle: list.channelTitle,
                  publishedAt: list.publishedAt,
                });
              }
            }}
          >
            <AiOutlineCheck />
          </button>
        </div>
      </div>
    </section>
  );
}
