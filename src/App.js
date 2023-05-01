import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Lists from "./routes/Lists";
import Login from "./routes/Login";
import ListsDetail from "./routes/ListsDetail";
import Auth from "./routes/Auth";
import { useState } from "react";
import GoogleProfile from "./components/GoogleProfile";
import KakaoProfile from "./components/KakaoProfile";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.length !== 0) {
      let getLocalData = JSON.parse(localStorage.getItem("userInfo"));
      setUser(getLocalData);
    }
  }, [setUser]);
  return (
    <section className="w-full max-w-screen-xl overflow-auto mx-auto">
      <header className="sticky top-0 bg-white z-10">
        <Navbar user={user} setUser={setUser} />
      </header>
      <main className="w-full flex justify-center bg-neutral-100 min-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Lists" element={<Lists />} />
          <Route path="/Lists/detail/:videoId" element={<ListsDetail />} />
          <Route path="/Oauth/kakao/callback" element={<Auth />} />
          <Route
            path="/GoogleProfile"
            element={<GoogleProfile user={user} />}
          />
          <Route
            path="/KakaoProfile"
            element={<KakaoProfile user={user} setUser={setUser} />}
          />

          <Route
            path="/Login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Routes>
      </main>
    </section>
  );
}

export default App;
