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

export default function Navbar() {
  const location = useLocation();
  return (
    <section className="flex justify-between items-center px-6 ">
      <NavLink to="/">
        <h1 className="text-3xl font-bold">W • N</h1>
      </NavLink>
      <nav>
        <ul className="flex gap-5 items-center p-3 text-xl">
          {menu.map((item, key) => (
            <li key={key}>
              <NavLink to={item.href}>
                {location.pathname === item.href ? item.clickedIcon : item.icon}
              </NavLink>
            </li>
          ))}
          <NavLink to="/login">로그인</NavLink>
        </ul>
      </nav>
    </section>
  );
}
