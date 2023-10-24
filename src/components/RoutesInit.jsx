import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Lists from "../pages/Lists";
import ListsDetail from "../pages/ListsDetail";
import BookmarkDetail from "../pages/BookmarkDetail";
import Login from "../pages/Login";
import MyPage from "../pages/Mypage";

export default function RoutesInit() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/lists/:keyword" element={<Lists />} />
      <Route path="/lists/detail/:videoId" element={<ListsDetail />} />
      <Route
        path="/lists/bookmarkDetail/:videoId"
        element={<BookmarkDetail />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:userName" element={<MyPage />} />
    </Routes>
  );
}
