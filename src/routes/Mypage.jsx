import React from "react";
import { getBookmarks } from "../service/user";
import { useQuery } from "@tanstack/react-query";

export default function MyPage() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  getBookmarks({ email: user.email });
  const { isLoading, error, data } = useQuery(
    ["lists", user.email],
    async () => {
      return getBookmarks({ email: user.email }).then((res) => res);
    }
  );

  return (
    <>
      {isLoading && <p>로딩중...</p>}
      {error && <p>오류입니다.</p>}
      {data && data.bookmarks !== null ? (
        <ul>
          {data.bookmarks.map((item, key) => (
            <li key={key}>
              <img src={item.thumbnails} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>{item.channelTitle}</p>
                <p>{item.publishedAt.slice(0, 10)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>즐겨찾기가 비어있습니다.</div>
      )}
    </>
  );
}
