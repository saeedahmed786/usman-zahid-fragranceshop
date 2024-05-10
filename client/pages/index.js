import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ErrorAlert } from "@/components/Commons/Messages/Messages";
import Header from "@/components/Home/Header/Header";
import Categories from "@/components/Home/Categories/Categories";
import Products from "@/components/Home/Products/Products";
import { MainProductCard } from "@/components/Commons/MainProductCard/MainProductCard";
import { CategoryCard } from "@/components/Commons/CategoryCard/CategoryCard";
import newArrivalImg from "../public/assets/new.webp"
import boy from "../public/assets/boy.webp"
import girl from "../public/assets/girl.webp"
import sale from "../public/assets/sale.webp"
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Col, Row } from "antd";

const Home = () => {
  const history = useRouter();
  const [productsArray, setProductsArray] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = async (e) => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/0`, { ss: "" }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setProductsArray(res.data?.products);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getAllCategories = async (e) => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/sub-categories`).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setCategories(res.data);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getAllData();
    getAllCategories();

    return () => {

    }
  }, []);

  return (
    <div className={styles.home}>
      <div className="pt-0 md:pt-14">
        <Header />
      </div>
      <div className="m-[30px]">
        <Categories categories={categories} />
      </div>
      <div className={"m-[30px] " + styles.specialSection}>
        <h1 className={styles.title}>Trending Products</h1>
        <Products productsList={productsArray} />
      </div>
      <Row gutter={[23, 23]} className={styles.categories}>
        <Col xs={12} md={6}>
          <Link href={`/products?filter=men`}>
            <CategoryCard category={{ picture: { response: { url: boy } }, title: "For Him" }} />
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link href={`/products?filter=women`}>
            <CategoryCard category={{ picture: { response: { url: girl } }, title: "For Her" }} />
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link href={`/products?filter=new`}>
            <CategoryCard category={{ picture: { response: { url: newArrivalImg } }, title: "New In" }} />
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link href={`/products?filter=sale`}>
            <CategoryCard category={{ picture: { response: { url: sale } }, title: "Sale" }} />
          </Link>
        </Col>
      </Row>
      <div className={"m-[30px] sm:m-[30px]"}>
        <h1 className={styles.title}>Best Sellers</h1>
        <div className={styles.Products}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
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
              productsArray?.map((product, index) => {
                return (
                  <SwiperSlide className={styles.swiperSlide} key={index}>
                    <Link href={`/product/${product?._id}`}>
                      <MainProductCard product={product} />
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
      <div className={"m-[30px] " + styles.specialSection}>
        <h1 className={styles.title}>Discover More</h1>
        <Products productsList={productsArray} />
      </div>
      <div className={styles.homeFooter}>
        <h1 className={styles.title}>About the My Shop</h1>
        <p>Welcome to The My Shop, your ultimate destination for high-quality perfumes, aftershaves and colognes. We offer a vast selection of fragrances for men and women, featuring top brands such as Dior, Versace, Rabanne, and more. Our commitment to quality extends beyond our fragrances to our exceptional customer service. Our friendly and knowledgeable team is always on hand to answer your questions and provide advice on choosing the right product. We also have amazing fragrance offers so you can enjoy high-quality cheap perfume or aftershave from your favourite brands. We also offer My TFS Membership which gives you 20% off and free express delivery*.</p>
        <p>You can discover the perfect perfume or aftershave is an effortless journey with Fragrance Match, our innovative online quiz designed to help you pinpoint your ideal scent. Whether you lean towards the crisp notes of fresh florals or the allure of something more exotic and sensual, you will be able to find something you love in our large selection of perfumes, aftershaves and more from top designer brands. You can even spread the cost with our aftershaves and perfumes on finance, splitting the cost over intrest-free monthly payments*.</p>
        <p>Shop perfume, aftershave and more with confidence at The My Shop.</p>
      </div>
    </div>
  );
};

export default Home;
