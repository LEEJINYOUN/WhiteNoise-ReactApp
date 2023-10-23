import { FOOTER_DATA } from "../constants/HomeFooterData";

export default function HomeFooter() {
  return (
    <div className="max-w-screen-3xl m-auto w-full px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FOOTER_DATA.map((item, key) => (
          <div
            key={key}
            data-aos="zoom-in-up"
            data-aos-delay="30"
            data-aos-offset="20"
          >
            <img
              className="w-full h-full object-cover"
              src={item.imgSrc}
              alt={item.imgAlt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
