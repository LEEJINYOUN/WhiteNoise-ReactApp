import { useContext, useState } from "react";
import { FETCH_DATA_COUNT } from "../constants/ListsConstant";
import { useQuery } from "@tanstack/react-query";
import Youtube from "../api/youtube";
import { bookmarkCheck } from "../services/bookmark";
import { AiOutlineCheck } from "react-icons/ai";
import { AuthContext } from "../utils/AuthContext";

export default function GetLists({ keyword, navigate }) {
  const userContext = useContext(AuthContext);
  const [bookmark, setBookmark] = useState(Array(FETCH_DATA_COUNT).fill(false));
  const { data: lists } = useQuery(["lists", keyword], () => {
    const youtube = new Youtube();
    return youtube.search(keyword, FETCH_DATA_COUNT);
  });

  const goToDetail = (list) => {
    navigate(`/lists/detail/${list.id}`, {
      state: { list },
    });
  };

  const bookmarkChange = (key) => {
    let bookmarkArray = [...bookmark];
    bookmarkArray[key] = !bookmarkArray[key];
    setBookmark(bookmarkArray);
  };

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
                onClick={() => goToDetail(list)}
              />
              <div>
                <p
                  className="cursor-pointer font-semibold text-base my-2 line-clamp-2"
                  onClick={() => goToDetail(list)}
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
                        bookmarkChange(key);
                        bookmarkCheck({
                          email: userContext.user?.email,
                          id: userContext.user?.id,
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
