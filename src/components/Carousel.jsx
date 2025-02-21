import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const ImageCarousel = () => {
  const images = [
    "/carousel/4.png",
    "/carousel/5.png",
    "/carousel/6.png",
    "/carousel/7.png",
    "/carousel/8.png",
    "/carousel/9.png",
    "/carousel/10.png",
    "/carousel/11.png",
  ];

   const doubledImages = [...images, ...images];

  return (
    <div className="w-screen relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-screen bg-[#1a1a1a] min-h-[300px] z-0"></div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={-80} // Negative space to create overlap
        slidesPerView={"auto"} // Allow variable slide sizes
        centeredSlides={true}
        loop={true}
        speed={2500}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        className="w-full h-[400px] relative z-10"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="!w-[300px] flex items-center justify-center"
          >
            <div
              className="relative transform transition-transform duration-300 hover:scale-105"
              style={{
                transform: `rotate(${index % 3 === 0 ? -4 : 2}deg) translateX(${
                  index % 2 === 0 ? "-15px" : "5px"
                })`,
                zIndex: index,
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-[300px] h-[310px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
