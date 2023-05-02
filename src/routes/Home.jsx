import React, { useRef } from "react";
import "animate.css";

export default function Home() {
  const ref = useRef(null);
  const onClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="w-full flex flex-col">
      <div className="w-full h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="beach"
          className="w-full h-full object-cover"
        />
        <div className="max-w-[1140px] m-auto">
          <div className="absolute top-[35%] w-full md:-[50%] max-w-[600px] flex flex-col text-white text-center">
            <h1 className="text-lg md:text-xl lg:text-2xl py-4 italic uppercase animate__animated animate__flipInX">
              지친마음 down, 집중력 up!
            </h1>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl animate__animated animate__fadeInRight animate__delay-1s">
              착한 화이트노이즈
            </h1>
            <button
              className="m-auto my-6 py-3 w-[100px] md:w-[120px] bg-white text-black font-bold hover:bg-sky-700 hover:text-white animate__animated animate__zoomIn animate__delay-2s"
              onClick={onClick}
            >
              자세히
            </button>
          </div>
        </div>
      </div>
      <div ref={ref} className="px-[15px] py-[25px] grid grid-cols-2 border">
        <div className="flex justify-center">
          <div className="m-auto w-[500px] h-auto">
            <h1 className="my-2 font-bold text-xl md:text-2xl lg:text-3xl animate__animated animate__fadeInUp">
              화이트 노이즈란?
            </h1>
            <p className="font-medium text-sm md:text-lg lg:text-xl animate__animated animate__fadeInUp">
              음폭이 넒어 공해에 해당하지 않는 소음입니다. "흰 빛"과 같은 형태의
              주파수 형태를 띠기 때문에 '백색소음' 또는 '화이트 노이즈'라고
              불립니다. 인간 뇌파의 알파파를 동조시켜 심리적 안정을 불러오거나
              수면을 촉진하는 효과가 있습니다.
            </p>
          </div>
        </div>
        <div className="w-full">
          <img
            className="w-full h-full -z-10 object-cover animate__animated animate__fadeInUp"
            src="https://images.unsplash.com/photo-1518803194621-27188ba362c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
            alt="rain"
          />
        </div>
      </div>
    </section>
  );
}
