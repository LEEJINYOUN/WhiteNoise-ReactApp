import React from "react";
import { getBookmarks, removeBookmark } from "../service/user";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function BookmarkLists({ user }) {
  getBookmarks({ email: user.email });
  const { data } = useQuery(["lists", user.email], async () => {
    return getBookmarks({ email: user.email }).then((res) => res);
  });
  const navigate = useNavigate();

  return (
    <div className="mx-5 xl:m-0">
      <h2 className="m-auto pb-5 text-xl font-bold">즐겨찾기</h2>
      {data && data.bookmarks !== null && (
        <div>
          <ul className="max-w-screen-lg m-auto h-auto">
            {data.bookmarks.map((list, key) => (
              <li
                className="flex flex-rol my-4 py-2 cursor-pointer hover:bg-slate-200 rounded-xl"
                key={key}
              >
                <h2
                  className="flex justify-center items-center lists-center w-[5%]"
                  onClick={() => {
                    navigate(`/lists/bookmarkDetail/${list.videoId}`, {
                      state: { list },
                    });
                  }}
                >
                  {key + 1}
                </h2>
                <img
                  className="w-[20%] rounded-xl"
                  src={list.thumbnails}
                  alt={list.title}
                  onClick={() => {
                    navigate(`/lists/bookmarkDetail/${list.videoId}`, {
                      state: { list },
                    });
                  }}
                />
                <div
                  className="flex flex-col w-[60%] pl-3"
                  onClick={() => {
                    navigate(`/lists/bookmarkDetail/${list.videoId}`, {
                      state: { list },
                    });
                  }}
                >
                  <p className="my-2">{list.title}</p>
                  <div className="flex flex-rol">
                    <p>{list.channelTitle}</p>&nbsp;·&nbsp;
                    <p>{list.publishedAt.slice(0, 10)}</p>
                  </div>
                </div>
                <div className="w-[5%] m-auto text-center">
                  <button
                    className="cursor-pointer border-2 border-gray-400 z-10 rounded-full p-1 hover:bg-gray-400 hover:text-white"
                    onClick={() => {
                      removeBookmark({
                        id: user.id,
                        videoId: list.videoId,
                      });
                    }}
                  >
                    <AiOutlineCheck />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
