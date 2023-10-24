import { useState } from "react";
import { emailSignUpCheck } from "../services/auth";

export default function SignUpForm({ account, setAccount, authChange }) {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpNickname, setSignUpNickname] = useState("");
  const signUpOnChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setSignUpEmail(value);
    } else if (name === "password") {
      setSignUpPassword(value);
    } else if (name === "name") {
      setSignUpName(value);
    } else if (name === "nickname") {
      setSignUpNickname(value);
    }
  };

  const creationComplete = () => {
    setTimeout(() => {
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpName("");
      setSignUpNickname("");
      alert("계정이 생성되었습니다.");
      setAccount(false);
    }, 1000);
  };

  const signUpOnSubmit = (e) => {
    e.preventDefault();
    emailSignUpCheck({
      email: signUpEmail,
      password: String(signUpPassword),
      name: signUpName,
      nickname: signUpNickname,
    });
    creationComplete();
  };

  return (
    <div className={`h-[65%] ${account === false ? "hidden" : "block"}`}>
      <h2 className="flex justify-center font-bold text-2xl">회원가입</h2>
      <form className="flex flex-col" onSubmit={signUpOnSubmit}>
        <div className="mt-2 px-3">
          <label className="block text-gray-700">이메일</label>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-1 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            autoComplete="true"
            value={signUpEmail}
            onChange={signUpOnChange}
          />
        </div>
        <div className="mt-1 px-3">
          <label className="block text-gray-700">비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            minLength="6"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-1 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            value={signUpPassword}
            onChange={signUpOnChange}
          />
        </div>
        <div className="my-1 px-3">
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-1 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            value={signUpName}
            onChange={signUpOnChange}
          />
        </div>
        <div className="my-1 px-3">
          <label className="block text-gray-700">닉네임</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            required
            className="w-full bg-gray-200 mt-2 px-4 py-1 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
            value={signUpNickname}
            onChange={signUpOnChange}
          />
        </div>
        <div className=" px-3">
          <input
            className="cursor-pointer w-full block bg-blue-500 hover:bg-blue-400 px-4 py-1 mt-4 rounded-lg font-semibold text-lg text-white focus:bg-blue-400 focus:outline-none"
            type="submit"
            value="회원가입"
          />
        </div>
      </form>
      <div className="flex justify-center mt-3">
        <button
          className="cursor-pointer text-blue-400 hover:text-blue-700 font-semibold"
          onClick={authChange}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
