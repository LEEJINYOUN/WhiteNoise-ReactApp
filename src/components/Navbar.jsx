import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { HiOutlineMusicNote, HiMusicNote } from "react-icons/hi";

const menu = [
  {
    href: "/",
    icon: <AiOutlineHome />,
    clickedIcon: <AiFillHome />,
  },
  {
    href: "/lists",
    icon: <HiOutlineMusicNote />,
    clickedIcon: <HiMusicNote />,
  },
];

export default function Navbar({ user, setUser }) {
  const location = useLocation();
  const btnStyle =
    "border border-gray-300 rounded-3xl px-4 py-2 text-base font-bold text-sky-400 hover:text-sky-600 transition duration-300 ease-in-out";
  const logout = () => {
    setUser("");
    window.localStorage.removeItem("userInfo");
    console.log("로그아웃 성공");
  };
  return (
    <section className="flex justify-between items-center px-6">
      <NavLink to="/">
        <h1 className="text-3xl font-bold">W • N</h1>
      </NavLink>
      <nav>
        <ul className="flex gap-6 items-center p-3 text-2xl">
          {menu.map((item, key) => (
            <li key={key}>
              <NavLink to={item.href}>
                {location.pathname === item.href ? item.clickedIcon : item.icon}
              </NavLink>
            </li>
          ))}
          {localStorage.getItem("userInfo") === null ? (
            <NavLink to="/login" className={btnStyle}>
              로그인
            </NavLink>
          ) : (
            <>
              <NavLink
                to={`/user/${user.name}`}
                className="w-[33px] h-[33px] rounded-full"
              >
                <img
                  className="w-[33px] h-[33px] rounded-full"
                  src={user.photo ?? undefined}
                  alt="user profile"
                />
              </NavLink>
              <NavLink to="/login" className={btnStyle} onClick={logout}>
                로그아웃
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
}
