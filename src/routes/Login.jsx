import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { addUser, emailLogin, emailSignUpCheck } from "../service/user";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        if (!res.data.email) {
          return false;
        }
        addUser({
          id: res.data.sub,
          name: res.data.name,
          image: res.data.picture,
          email: res.data.email,
          password: null,
          username: res.data.email.split("@")[0],
        });

        let userObject = {
          id: res.data.sub,
          name: res.data.name,
          image: res.data.picture,
          email: res.data.email,
          username: res.data.email.split("@")[0],
        };
        setUser(userObject);
        localStorage.setItem("userInfo", JSON.stringify(userObject));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
  });
  const btnStyle =
    "cursor-pointer border border-gray-300 rounded-full mx-3 w-[45px] h-[45px]";
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
    } else if (name === "username") {
      setSignUpUsername(value);
    }
  };

  const signUpOnSubmit = (e) => {
    e.preventDefault();
    emailSignUpCheck({
      email: signUpEmail,
      password: String(signUpPassword),
      name: signUpName,
      username: signUpUsername,
    });
  };

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

  const [account, setAccount] = useState(false);
  const accountChange = () => {
    setAccount((prev) => !prev);
  };
  return (
    <section className="w-full h-[90vh]">
      {Object.keys(user).length === 0 && (
        <>
          <div
            className={`w-[400px] ${
              account === false ? "h-[560px]" : "h-[670px]"
            } absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col justify-center`}
          >
            <div
              className={`h-[65%] ${account === false ? "block" : "hidden"}`}
            >
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
            <div
              className={`h-[65%] ${account === false ? "hidden" : "block"}`}
            >
              <h2 className="flex justify-center font-bold text-2xl">
                회원가입
              </h2>
              <form className="flex flex-col" onSubmit={signUpOnSubmit}>
                <div className="mt-2 px-3">
                  <label htmlFor="email" className="block text-gray-700">
                    이메일
                  </label>
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
                  <label htmlFor="email" className="block text-gray-700">
                    비밀번호
                  </label>
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
                  <label htmlFor="email" className="block text-gray-700">
                    이름
                  </label>
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
                  <label htmlFor="email" className="block text-gray-700">
                    유저이름
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="유저이름"
                    required
                    className="w-full bg-gray-200 mt-2 px-4 py-1 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
                    value={signUpUsername}
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
                  onClick={accountChange}
                >
                  로그인하기
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[35%]">
              <div className="text-lg text-gray-400">
                <h2>외부 계정으로 로그인하기</h2>
              </div>
              <div className="flex justify-center mt-4">
                <button className={btnStyle} onClick={googleLogin}>
                  <img
                    className="flex justify-center m-auto w-[25px] h-[25px]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png"
                    alt="googleLogo"
                  />
                </button>
                <button className={btnStyle}>
                  <Link to={KAKAO_AUTH_URL}>
                    <img
                      className="flex justify-center m-auto w-full h-full"
                      src="http://www.mzuu.co.kr/design/mzuu/btn_kakao.png"
                      alt="KaKaoLogo"
                    />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
