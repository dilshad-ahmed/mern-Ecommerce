import React from "react";
import banner1 from "../../Images/banner/banner1.jpg";
import banner2 from "../../Images/banner/banner2.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import "./banner.css";

const Banner = () => {
    return (
        <>
            <div className=" ">
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    navigation={true}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="mySwiper">
                    <SwiperSlide>
                        <img src={banner2} alt={banner2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner1} alt={banner1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    {/* <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide> */}
                </Swiper>
            </div>
        </>
    );
};

export default Banner;
