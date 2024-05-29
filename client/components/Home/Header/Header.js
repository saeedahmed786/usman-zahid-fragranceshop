import React from 'react'
import defaImg from "../../../public/assets/sale.webp";
import offImage from "../../../public/assets/headeroff.svg";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import styles from "./Header.module.css";
import { Col, Row } from 'antd';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          clickable: true,
        }}
        className={styles.swiper}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <Row gutter={[23, 23]} align="middle">
            <Col xs={24} md={12} className={styles.left}>
              <div>
                <Image src={offImage} />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <h2>10% OFF FIRST ORDER</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <div className="max-w-[160px] mt-4">
                <ButtonComp text="Shop Now" onClick={() => router.push("/products")} />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Row gutter={[23, 23]} align="middle">
            <Col xs={24} md={12} className={styles.left}>
              <Image src={defaImg} />
            </Col>
            <Col xs={24} md={12}>
              <h2>Hermes</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <div className="max-w-[160px] mt-4">
                <ButtonComp text="Shop Now" onClick={() => router.push("/products")} />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Row gutter={[23, 23]} align="middle">
            <Col xs={24} md={12} className={styles.left}>
              <Image src={defaImg} />
            </Col>
            <Col xs={24} md={12}>
              <h2>Hermes</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <div className="max-w-[160px] mt-4">
                <ButtonComp text="Shop Now" onClick={() => router.push("/products")} />
              </div>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </header>
  )
}

export default Header
