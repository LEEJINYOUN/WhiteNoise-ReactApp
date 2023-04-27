import React, { useState } from "react";
import lists from "../data/lists.json";

export default function Lists() {
  const [listsData, setListsData] = useState(lists);
  const [filteredTitle, setFilteredTitle] = useState(lists);
  const onClick = (category) => {
    if (category === "전체") {
      setFilteredTitle(lists);
    } else {
      setFilteredTitle(lists.filter((item) => item.category === category));
    }
  };
  return (
    <>
      <div>
        <ul>
          {filteredTitle.map((item, key) => (
            <li key={key}>{<h1>{item.title}</h1>}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {listsData.map((item, key) => (
            <li key={key} onClick={() => onClick(item.category)}>
              <button>{item.category}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
