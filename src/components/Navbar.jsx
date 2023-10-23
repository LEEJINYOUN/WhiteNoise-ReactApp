import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAVBAR_MENU } from "../constants/NavbarMenu";

export default function Navbar({ user, setUser }) {
  const nowLocation = useLocation();
  const buttonStyle =
    "border border-gray-300 rounded-3xl px-4 py-2 text-base font-bold text-sky-400 hover:text-sky-600 transition duration-300 ease-in-out";
  const logout = () => {
    setUser("");
    window.localStorage.clear();
  };

  return (
    <section className="flex justify-between items-center px-6">
      <NavLink to="/">
        <h1 className="text-3xl font-bold">W • N</h1>
      </NavLink>
      <nav>
        <ul className="flex gap-6 items-center p-3 text-2xl">
          {NAVBAR_MENU.map((item, key) => (
            <li key={key}>
              <NavLink to={item.href}>
                {nowLocation.pathname === item.href
                  ? item.clickedIcon
                  : item.icon}
              </NavLink>
            </li>
          ))}
          {Object.keys(user).length === 0 ? (
            <NavLink to="/login" className={buttonStyle}>
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
                  src={user.image ?? undefined}
                  alt="user profile"
                />
              </NavLink>
              <NavLink to="/login" className={buttonStyle} onClick={logout}>
                로그아웃
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
}
