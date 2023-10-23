import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RoutesInit from "./components/RoutesInit";

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
        <RoutesInit user={user} setUser={setUser} />
      </main>
    </section>
  );
}

export default App;
