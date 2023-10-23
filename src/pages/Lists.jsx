import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import Caution from "../components/Caution";
import GetLists from "../components/GetLists";

export default function Lists({ user }) {
  const [text, setText] = useState("");
  const { keyword } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <section className="w-full flex flex-col max-w-screen-xl">
      <SearchForm text={text} setText={setText} navigate={navigate} />
      <Caution />
      <GetLists keyword={keyword} navigate={navigate} user={user} />
    </section>
  );
}
