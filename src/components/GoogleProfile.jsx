import React from "react";

export default function GoogleProfile({ user }) {
  return (
    <div>
      <img src={user.photo ?? undefined} alt="user profile" />
      <h3>{user.name}님 환영합니다.</h3>
    </div>
  );
}
