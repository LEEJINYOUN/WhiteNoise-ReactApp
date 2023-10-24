import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAVBAR_MENU } from "../constants/NavbarMenu";
import { AuthContext } from "../utils/AuthContext";

export default function Navbar() {
  const userContext = useContext(AuthContext);
  const nowLocation = useLocation();
  const buttonStyle =
    "border border-gray-300 rounded-3xl px-4 py-2 text-base font-bold text-sky-400 hover:text-sky-600 transition duration-300 ease-in-out";
  const logout = () => {
    userContext.setUser(null);
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
          {userContext.user === null ? (
            <NavLink to="/login" className={buttonStyle}>
              로그인
            </NavLink>
          ) : (
            <>
              <NavLink
                to={`/user/${userContext.user.name}`}
                className="w-[33px] h-[33px] rounded-full"
              >
                <img
                  className="w-[33px] h-[33px] rounded-full"
                  src={userContext.user.image ?? undefined}
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
