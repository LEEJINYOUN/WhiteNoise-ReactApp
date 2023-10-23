import { SEARCH_KEYWORD } from "../constants/ListsConstant";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

export default function SearchForm({ text, setText, navigate }) {
  const onSubmit = (e) => {
    e.preventDefault();
    if (SEARCH_KEYWORD.includes(text)) {
      navigate(`/lists/${text}`);
    } else {
      setText("");
    }
  };

  return (
    <form
      className="m-auto w-full md:w-10/12 lg:w-8/12 grid gp-10 bg-gray-300 rounded-[10px] p-[3rem]"
      onSubmit={onSubmit}
    >
      <div className="flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg">
        <AiOutlineSearch className="text-[25px] cursor-pointer" />
        <input
          type="text"
          className="bg-transparent font-bold text-blue-500 focus:outline-none w-[100%]"
          placeholder="입력한 후 엔터"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <AiOutlineCloseCircle
          className="text-[30px] text-[#a5a6a6] hover:text-black cursor-pointer"
          onClick={() => setText("")}
        />
        <button className="bg-blue-500 w-[100px] h-ull px-4 py-2 rounded-[10px] text-white cursor-pointer hover:bg-blue-300">
          검색
        </button>
      </div>
    </form>
  );
}
