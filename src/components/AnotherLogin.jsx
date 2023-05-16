import React from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { addUser } from "../service/user";
import { Link } from "react-router-dom";

export default function AnotherLogin({ setUser, navigate }) {
  const KaKao_Auth_URl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const btnStyle =
    "cursor-pointer border border-gray-300 rounded-full mx-3 w-[45px] h-[45px]";
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

  return (
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
          <Link to={KaKao_Auth_URl}>
            <img
              className="flex justify-center m-auto w-full h-full"
              src="http://www.mzuu.co.kr/design/mzuu/btn_kakao.png"
              alt="KaKaoLogo"
            />
          </Link>
        </button>
      </div>
    </div>
  );
}
