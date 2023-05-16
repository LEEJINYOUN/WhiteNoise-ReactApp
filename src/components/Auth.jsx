import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { addUser } from "../service/user";

export default function Auth({ setUser }) {
  const navigate = useNavigate();
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: new URL(window.location.href).searchParams.get("code"),
      client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      try {
        let data = await window.Kakao.API.request({
          url: "/v2/user/me",
        });
        addUser({
          id: String(data.id),
          name: data.properties.nickname,
          image: data.properties.profile_image,
          email: data.properties.nickname,
          password: null,
          nickname: data.properties.nickname,
        });
        let userObject = {
          id: String(data.id),
          name: data.properties.nickname,
          image: data.properties.profile_image,
          email: data.properties.nickname,
          nickname: data.properties.nickname,
        };
        setUser(userObject);
        localStorage.setItem("userInfo", JSON.stringify(userObject));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return null;
}
