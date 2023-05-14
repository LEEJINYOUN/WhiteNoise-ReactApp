import React from "react";

export default function Caution({ SEARCH_KEYWORD }) {
  return (
    <div className="m-auto mt-4 text-gray-400">
      <span>⁕ 검색가능한 단어 : </span>
      <span className="text-red-500 font-bold">
        {SEARCH_KEYWORD.join(", ")}
      </span>
    </div>
  );
}
