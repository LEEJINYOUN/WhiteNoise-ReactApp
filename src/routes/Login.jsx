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
        <div className="w-[200px] h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button
            className={`${btnStyle} bg-blue-400 text-white hover:bg-blue-500`}
            onClick={googleLogin}
          >
            구글 로그인
          </button>
          <button className={`${btnStyle} bg-yellow-400 hover:bg-yellow-500`}>
            <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
          </button>
        </div>
      )}
    </section>
  );
}
