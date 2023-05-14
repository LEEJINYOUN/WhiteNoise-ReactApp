import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { addUser } from "../service/user";

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
    "my-2 px-4 py-2 w-[200px] rounded-lg font-bold cursor-pointer";
  return (
    <section className="w-full h-[90vh]">
      {Object.keys(user).length === 0 && (
        <div className="w-[350px] h-[300px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col justify-center">
          <h2 className="flex justify-center items-center my-7 font-bold text-2xl">
            로그인
          </h2>
          <div className="flex justify-center items-center my-7">
            <button
              className="cursor-pointer border border-gray-300 rounded-full mx-3 w-[45px] h-[45px]"
              onClick={googleLogin}
            >
              <img
                className="flex justify-center m-auto w-[25px] h-[25px]"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png"
                alt="googleLogo"
              />
            </button>
            <button className="cursor-pointer border border-gray-300 rounded-full mx-3 w-[45px] h-[45px]">
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
      )}
    </section>
  );
}
