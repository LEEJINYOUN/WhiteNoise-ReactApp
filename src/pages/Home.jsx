import React, { useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Banner from "../components/Banner";
import Explanation from "../components/Explanation";
import Footer from "../components/Footer";

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
      <Banner detailBtn={detailBtn} />
      <Explanation detailRef={detailRef} />
      <Footer />
    </section>
  );
}
