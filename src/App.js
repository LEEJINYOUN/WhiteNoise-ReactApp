import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Lists from "./routes/Lists";
import Login from "./routes/Login";
import ListsDetail from "./routes/ListsDetail";
import Auth from "./components/Auth";
import { useState } from "react";
import MyPage from "./routes/MyPage";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.length !== 0) {
      let getLocalData = JSON.parse(localStorage.getItem("userInfo"));
      setUser(getLocalData);
    }
  }, [setUser]);
  return (
    <section className="w-full overflow-auto mx-auto">
      <header className="sticky top-0 max-w-screen-xl m-auto bg-white z-10 ">
        <Navbar user={user} setUser={setUser} />
      </header>
      <main className="w-full flex justify-center min-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists user={user} />} />
          <Route path="/lists/:keyword" element={<Lists />} />
          <Route
            path="/lists/detail/:videoId"
            element={<ListsDetail user={user} />}
          />
          <Route path="/oauth/kakao/callback" element={<Auth />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/user/:userName"
            element={<MyPage user={user} setUser={setUser} />}
          />
        </Routes>
      </main>
    </section>
  );
}

export default App;
