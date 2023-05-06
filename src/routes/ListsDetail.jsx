import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

export default function ListsDetail() {
  const {
    state: { list },
  } = useLocation();
  const { title } = list.snippet;
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
          onClick={() => console.log("클릭")}
        >
          <AiOutlineHeart />
        </button>
      </div>
    </section>
  );
}
