import React from "react";
import { bookmarkCheck } from "../service/user";
import { AiOutlineCheck } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";

export default function GetLists({
  GET_DATA_COUNT,
  keyword,
  navigate,
  bookmark,
  setBookmark,
  user,
}) {
  const { data: lists } = useQuery(["lists", keyword], () => {
    const fakeYoutube = new FakeYoutube();
    const youtube = new Youtube();
    return fakeYoutube.search(keyword, GET_DATA_COUNT);
  });
  return (
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
                  navigate(`/lists/detail/${list.id}`, {
                    state: { list },
                  });
                }}
              />
              <div>
                <p
                  className="cursor-pointer font-semibold text-base my-2 line-clamp-2"
                  onClick={() => {
                    navigate(`/lists/detail/${list.id}`, {
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
                          videoId: list.id,
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
  );
}
