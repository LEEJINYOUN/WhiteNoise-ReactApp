import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Lists from "../pages/Lists";
import ListsDetail from "../pages/ListsDetail";
import BookmarkDetail from "../pages/BookmarkDetail";
import Login from "../pages/Login";
import MyPage from "../pages/Mypage";

export default function RoutesInit({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists" element={<Lists user={user} />} />
      <Route path="/lists/:keyword" element={<Lists user={user} />} />
      <Route
        path="/lists/detail/:videoId"
        element={<ListsDetail user={user} />}
      />
      <Route
        path="/lists/bookmarkDetail/:videoId"
        element={<BookmarkDetail user={user} />}
      />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route
        path="/user/:userName"
        element={<MyPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}
