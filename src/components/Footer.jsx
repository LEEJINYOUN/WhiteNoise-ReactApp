import React from "react";

export default function Footer() {
  const FooterData = [
    {
      imgSrc:
        "https://images.unsplash.com/photo-1561010533-8600b9995372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      imgAlt: "wave",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1615318657783-22f2588a50df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imgAlt: "bonfire",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imgAlt: "library",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1559117762-db98c1e47a88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imgAlt: "smallRiver",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1483450388369-9ed95738483c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imgAlt: "airplane",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imgAlt: "snow",
    },
  ];
  return (
    <div className="max-w-screen-3xl m-auto w-full px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FooterData.map((item, key) => (
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
