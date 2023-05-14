import React from "react";
import { useLocation } from "react-router-dom";
import { bookmarkCheck } from "../service/user";

export default function ListsDetail() {
  const {
    state: { list },
  } = useLocation();
  const { title } = list.snippet;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <section className="flex flex-col w-10/12 md:w-8/12 lg:w-6/12">
      <iframe
        className="m-auto mt-3 w-full h-[300px] md:h-[350px] lg:h-[400px]"
        id="player"
        type="text/html"
        src={`http://www.youtube.com/embed/${list.id.videoId}`}
        frameBorder="0"
        title={title}
      />
      <div className="flex justify-between mt-5">
        <h2 className="text-sm md:text-base lg:text-lg font-bold">{title}</h2>
        <button
          className="text-2xl cursor-pointer"
          onClick={() => {
            if (localStorage.getItem("userInfo") === null) {
              alert("먼저 로그인해주세요.");
            } else {
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
    </section>
  );
}
