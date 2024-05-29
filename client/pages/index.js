import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ErrorAlert } from "@/components/Commons/Messages/Messages";
import Header from "@/components/Home/Header/Header";
import Brands from "@/components/Home/Brands/Brands";
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
import Head from "next/head";

const Home = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [featuredProductsArray, setFeaturedProductsArray] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = async (e) => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/0`, { ss: "" }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setProductsArray(res.data?.products);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })
  }

  const getAllFeaturedProducts = async (e) => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/featured`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setFeaturedProductsArray(res.data);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })
  }

  const getAllBrands = async (e) => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands/get`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setBrands(res.data);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })
  }

  useEffect(() => {
    getAllData();
    getAllFeaturedProducts();
    getAllBrands();

    return () => {

    }
  }, []);

  return (
    <>
      <Head>
        <title>My Shop | High-Quality Fragrances for Men and Women</title>
        <meta name="description" content="Discover a vast selection of high-quality perfumes, aftershaves, and colognes for men and women at My Shop. Featuring top brands like Dior, Versace, and more." />
        <meta name="keywords" content="perfumes, aftershaves, colognes, fragrances, men's fragrances, women's fragrances, Dior, Versace, Rabanne, high-quality perfumes, cheap perfume, fragrance offers, fragrance quiz, online quiz, fragrance match" />
        <meta name="author" content="My Shop" />
        <meta property="og:title" content="My Shop | High-Quality Fragrances for Men and Women" />
        <meta property="og:description" content="Shop at My Shop for a wide range of perfumes and aftershaves from top brands. Enjoy great offers and exceptional customer service." />
        <meta property="og:image" content="/public/assets/new.webp" />
        <meta property="og:url" content="https://www.myshop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Shop | High-Quality Fragrances for Men and Women" />
        <meta name="twitter:description" content="Discover a wide range of perfumes, aftershaves, and colognes at My Shop. Featuring top brands and great offers." />
        <meta name="twitter:image" content="/public/assets/new.webp" />
      </Head>
      <div className={styles.home}>
        <div className="">
          <Header />
        </div>
        <div className="m-[30px]">
          <h1 className={styles.title}>Trending Brands</h1>
          <Brands brands={brands} />
        </div>
        <div className={"m-[30px] " + styles.specialSection}>
          <h1 className={styles.title}>Trending Products</h1>
          <Products productsList={productsArray} />
        </div>
        <Row gutter={[23, 23]} className={styles.categories}>
          <Col xs={12} md={6}>
            <Link href={`/products?gender=Male`}>
              <CategoryCard category={{ picture: { response: { url: boy } }, title: "For Him" }} />
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Link href={`/products?gender=Female`}>
              <CategoryCard category={{ picture: { response: { url: girl } }, title: "For Her" }} />
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Link href={`/products?created_at=new`}>
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
                featuredProductsArray?.map((product, index) => {
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
    </>
  );
};

export default Home;
