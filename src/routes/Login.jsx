import React, { useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login({ user, setUser }) {
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
        let userObject = {
          email: res.data.email,
          name: res.data.name,
          photo: res.data.picture,
        };
        setUser(userObject);
        localStorage.setItem("userInfo", JSON.stringify(userObject));
      } catch (err) {
        console.log(err);
      }
    },
  });
  useEffect(() => {
    if (localStorage.length !== 0) {
      let getLocalData = JSON.parse(localStorage.getItem("userInfo"));
      setUser(getLocalData);
    }
  }, [setUser]);
  return (
    <section>
      {Object.keys(user).length === 0 ? (
        <button
          className="px-4 py-2 rounded-lg  bg-blue-400 text-white cursor-pointer hover:bg-blue-500 "
          onClick={googleLogin}
        >
          구글 로그인
        </button>
      ) : (
        <div>
          <img src={user.photo ?? undefined} alt="user profile" />
          <h3>{user.name}님 환영합니다.</h3>
        </div>
      )}
    </section>
  );
}
