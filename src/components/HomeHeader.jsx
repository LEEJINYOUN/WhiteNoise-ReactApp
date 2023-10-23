export default function HomeHeader({ detailBtn }) {
  return (
    <div className="w-full h-[90vh]">
      <img
        src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
        alt="beach"
        className="w-full h-full object-cover"
      />
      <div className="max-w-[1140px] m-auto">
        <div className="absolute top-[35%] w-full md:-[50%] max-w-[600px] flex flex-col text-white text-center">
          <h1
            className="text-lg md:text-xl lg:text-2xl py-4 italic uppercase"
            data-aos="flip-up"
            data-aos-delay="100"
          >
            지친마음 down, 집중력 up!
          </h1>
          <h1
            className="font-bold text-3xl md:text-4xl lg:text-5xl"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            건강한 화이트노이즈
          </h1>
          <button
            className="m-auto my-6 py-3 w-[100px] md:w-[120px] bg-white text-black font-bold hover:bg-sky-700 hover:text-white"
            data-aos="zoom-in"
            data-aos-delay="700"
            onClick={detailBtn}
          >
            자세히
          </button>
        </div>
      </div>
    </div>
  );
}
