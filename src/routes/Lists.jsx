import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchForm from "../components/SearchForm";
import Caution from "../components/Caution";
import GetLists from "../components/GetLists";

const SEARCH_KEYWORD = ["파도", "풀벌레", "모닥불", "비"];
const GET_DATA_COUNT = 20;

export default function Lists() {
  const [text, setText] = useState("");
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(Array(GET_DATA_COUNT).fill(false));
  const getUser = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <section className="w-full flex flex-col max-w-screen-xl">
      <SearchForm
        text={text}
        setText={setText}
        SEARCH_KEYWORD={SEARCH_KEYWORD}
        navigate={navigate}
      />
      <Caution SEARCH_KEYWORD={SEARCH_KEYWORD} />
      <GetLists
        GET_DATA_COUNT={GET_DATA_COUNT}
        text={text}
        keyword={keyword}
        navigate={navigate}
        bookmark={bookmark}
        setBookmark={setBookmark}
        getUser={getUser}
      />
    </section>
  );
}
