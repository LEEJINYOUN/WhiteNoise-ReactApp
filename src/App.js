import Navbar from "./components/Navbar";
import RoutesInit from "./components/RoutesInit";

function App() {
  return (
    <section className="w-full overflow-auto mx-auto">
      <header className="sticky top-0 max-w-screen-xl m-auto bg-white z-10 ">
        <Navbar />
      </header>
      <main className="w-full flex justify-center min-h-full">
        <RoutesInit />
      </main>
    </section>
  );
}

export default App;
