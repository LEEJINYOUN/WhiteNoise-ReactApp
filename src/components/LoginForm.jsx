import React, { useState } from "react";
import { emailLogin } from "../service/user";

export default function LoginForm({
  account,
  navigate,
  setUser,
  accountChange,
}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginOnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setLoginEmail(value);
    } else if (name === "password") {
      setLoginPassword(value);
    }
  };
  const logInOnSubmit = (e) => {
    e.preventDefault();
    emailLogin({
      email: loginEmail,
      password: String(loginPassword),
      setUser,
      navigate,
    });
  };

  return (
    <div className={`h-[65%] ${account === false ? "block" : "hidden"}`}>
      <h2 className="flex justify-center font-bold text-2xl">로그인</h2>
      <form className="flex flex-col" onSubmit={logInOnSubmit}>
        <div className="mt-2 px-3">
          <label htmlFor="email" className="block text-gray-700">
            이메일
          </label>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-3 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            autoComplete="true"
            value={loginEmail}
            onChange={loginOnChange}
          />
        </div>
        <div className="my-3 px-3">
          <label htmlFor="email" className="block text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            minLength="6"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-3 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            value={loginPassword}
            onChange={loginOnChange}
          />
        </div>
        <div className=" px-3">
          <input
            className="cursor-pointer w-full block bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-lg text-white focus:bg-blue-400 focus:outline-none"
            type="submit"
            value="로그인"
          />
        </div>
      </form>
      <div className="flex justify-center mt-3">
        <button
          className="cursor-pointer text-blue-400 hover:text-blue-700 font-semibold"
          onClick={accountChange}
        >
          계정 만들기
        </button>
      </div>
    </div>
  );
}
