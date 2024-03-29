import { useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import HomeHeader from "../components/HomeHeader";
import HomeDescription from "../components/HomeDescription";
import HomeFooter from "../components/HomeFooter";

export default function Home() {
  const detailRef = useRef(null);
  const detailBtn = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  Aos.init({
    duration: 1800,
    offset: 0,
  });

  return (
    <section className="w-full flex flex-col">
      <HomeHeader detailBtn={detailBtn} />
      <HomeDescription detailRef={detailRef} />
      <HomeFooter />
    </section>
  );
}
