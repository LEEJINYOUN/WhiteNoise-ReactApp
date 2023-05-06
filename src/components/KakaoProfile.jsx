import React, { useEffect } from "react";

export default function KakaoProfile({ user, setUser }) {
  const getKaKaoProfile = async () => {
    try {
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      let userObject = {
        id: data.id,
        name: data.properties.nickname,
        photo: data.properties.profile_image,
      };
      setUser(userObject);
      localStorage.setItem("userInfo", JSON.stringify(userObject));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getKaKaoProfile();
  }, []);
  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <div>
          <img src={user.photo ?? undefined} alt="user profile" />
          <h3>{user.name}님 환영합니다.</h3>
        </div>
      ) : null}
    </div>
  );
}
