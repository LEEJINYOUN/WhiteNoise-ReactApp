import { getBookmarks, removeBookmark } from "../services/bookmark";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";

export default function BookmarkLists() {
  const userContext = useContext(AuthContext);
  getBookmarks({ email: userContext.user?.email });
  const { data } = useQuery(["lists", userContext.user?.email], async () => {
    return getBookmarks({ email: userContext.user?.email }).then((res) => res);
  });
  const navigate = useNavigate();
  const goToDetail = (list) => {
    navigate(`/lists/bookmarkDetail/${list.videoId}`, {
      state: { list },
    });
  };

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
                    goToDetail(list);
                  }}
                >
                  {key + 1}
                </h2>
                <img
                  className="w-[20%] rounded-xl"
                  src={list.thumbnails}
                  alt={list.title}
                  onClick={() => {
                    goToDetail(list);
                  }}
                />
                <div
                  className="flex flex-col w-[60%] pl-3"
                  onClick={() => {
                    goToDetail(list);
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
                        id: userContext.user?.id,
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
