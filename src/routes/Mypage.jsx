import React from "react";
import Profile from "../components/Profile";
import BookmarkLists from "../components/BookmarkLists";

export default function MyPage({ user }) {
  return (
    <section className="w-full flex flex-col max-w-screen-lg">
      <Profile user={user} />
      <BookmarkLists user={user} />
    </section>
  );
}
