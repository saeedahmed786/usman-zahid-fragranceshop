import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./Products.module.css";
import { Product } from '@/components/Commons/Product/Product';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';

const Products = ({ productsList }) => {
  return (
    <div className={styles.Products}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {
          productsList?.map((product, index) => {
            return (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <Link href={`/product/${product?._id}`}>
                  <Product product={product} />
                </Link>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default Products
