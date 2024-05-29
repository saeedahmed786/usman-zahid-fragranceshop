import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation'; // Import additional Swiper styles if necessary
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import styles from "./Brands.module.css";
import Link from 'next/link';
import { Navigation } from 'swiper/modules';

const Brands = ({ brands }) => {
  return (
    <div className={styles.Brands}>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {
          brands?.map((brand, index) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <Link href={`/products?brand=${brand?._id}`}>
                  <Image width={100} height={100} src={brand?.picture?.response?.url} alt={brand?.title} />
                  <div>{brand?.name}</div>
                </Link>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Brands
