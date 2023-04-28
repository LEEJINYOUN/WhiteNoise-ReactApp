import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Lists from "./routes/Lists";
import Login from "./routes/Login";
import ListsDetail from "./routes/ListsDetail";

function App() {
  return (
    <section className="w-full max-w-screen-2xl overflow-auto mx-auto">
      <header className="sticky top-0 bg-white z-10">
        <Navbar />
      </header>
      <main className="w-full flex justify-center bg-neutral-100 min-h-full">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Lists" element={<Lists />}></Route>
          <Route
            path="/Lists/detail/:videoId"
            element={<ListsDetail />}
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </main>
    </section>
  );
}

export default App;
