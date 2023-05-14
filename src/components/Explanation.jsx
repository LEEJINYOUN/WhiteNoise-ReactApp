import React from "react";

export default function Explanation({ detailRef }) {
  return (
    <div ref={detailRef} className="px-[15px] py-[25px] grid grid-cols-2">
      <div className="flex justify-center">
        <div className="m-auto w-[500px] h-auto">
          <h1
            className="my-2 font-bold text-xl md:text-2xl lg:text-3xl"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-offset="40"
          >
            화이트 노이즈
          </h1>
          <p
            className="font-medium text-sm md:text-lg lg:text-xl"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-offset="150"
          >
            <span className="text-red-500 font-bold">백색 소음</span>
            이라고도 불리며, 파도 · 모닥불 · 시냇물 등과 같이 자연속에서 흔히
            들을 수 있는 소음입니다. 심리적 안정을 불러오거나 집중력을
            향상시키기 때문에 공부나 일을 하면서 듣는 것을 추천합니다.
          </p>
        </div>
      </div>
      <div className="w-full">
        <img
          className="w-full h-full -z-10 object-cover"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-offset="150"
          src="https://images.unsplash.com/photo-1518803194621-27188ba362c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
          alt="rain"
        />
      </div>
    </div>
  );
}
