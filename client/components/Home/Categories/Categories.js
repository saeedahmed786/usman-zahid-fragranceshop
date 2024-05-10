import React from 'react'
import defaImg from "../../../public/man3.png";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import styles from "./Categories.module.css";
import { Col, Row } from 'antd';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';

const Categories = ({ categories }) => {
  return (
    <div className={styles.Categories}>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={true}
        navigation={true}
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 3,
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
          categories?.map((category, index) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <Link href={`/products?category=${category?._id}`}>
                  <Image width={100} height={100} src={category?.picture?.response?.url} alt={category?.title} />
                  <div>{category?.name}</div>
                </Link>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Categories
