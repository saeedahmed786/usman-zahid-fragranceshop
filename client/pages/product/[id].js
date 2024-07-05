import { MainProductCard } from '@/components/Commons/MainProductCard/MainProductCard';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, InputNumber, Row } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './product.module.css';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { useCart } from '@/context';
import { IoCheckmarkDone } from 'react-icons/io5';
import Head from 'next/head';


const ProductPage = () => {
    const router = useRouter();
    let productId = router.query?.id;
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [qtyToShop, setQtyToShop] = useState('1');
    const { addToCart } = useCart();


    const handleAddToCart = async () => {
        product.qtyToShop = qtyToShop;
        addToCart(product);
    }

    const getProduct = async (id) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/product/${id}`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setProduct(res.data);
                getRelatedProducts(res.data?.mainCategory);
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }

    const getRelatedProducts = async (id) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/related/${id}`).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                setRelatedProducts(res.data?.filter(f => f?._id !== productId));
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
        if (productId) {
            getProduct(productId);
        }

        return () => {

        }
    }, [productId]);

    return (
        <>
            <Head>
                <title>{`Perfume Price | ${product?.title}`}</title>
                <meta name="description" content={product.description ? product.description.substring(0, 160) : 'Discover high-quality products at Perfume Price'} />
                <meta name="keywords" content={`buy ${product.title}, ${product.mainCategory}, ${product.subCategory}, ${product.brand}, best prices, online shop`} />
               <meta name="author" content="Saeed Ahmed Chachar" />
                <meta property="og:title" content={`Perfume Price | ${product?.title}`} />
                <meta property="og:description" content={product.description ? product.description.substring(0, 160) : 'Discover high-quality products at Perfume Price'} />
                <meta property="og:image" content={product.pictures && product.pictures[0] ? product.pictures[0].response.url : '/public/assets/default-image.webp'} />
                <meta property="og:url" content={`https://ecomm-shop.vercel.app/product/${product._id}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Perfume Price | ${product?.title}`} />
                <meta name="twitter:description" content={product.description ? product.description.substring(0, 160) : 'Discover high-quality products at Perfume Price'} />
                <meta name="twitter:image" content={product.pictures && product.pictures[0] ? product.pictures[0].response.url : '/public/assets/default-image.webp'} />
            </Head>
            <div className={styles.product}>
                <div>
                    <Row gutter={[23, 23]} className="mb-[100px]">
                        <Col xs={24} md={12} lg={12}>
                            <Carousel className={styles.Carousel} showArrows={true} autoPlay showIndicators={false} renderThumbs={() => {
                                return (
                                    product?.pictures?.map((picture, index) => {
                                        return (
                                            <div key={index} className={styles.thumbContainer}>
                                                <Image width={300} height={300} src={picture?.response?.url} />
                                                <p className='text-white'>wejdfjqhd</p>
                                            </div>
                                        )
                                    })
                                )
                            }}>
                                {
                                    product?.pictures?.map((picture, index) => {
                                        return (
                                            <div key={index}>
                                                <Image width={300} height={300} src={picture?.response?.url} />
                                                <p className='text-white'>wejdfjqhd</p>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </Col>
                        <Col xs={24} md={12} lg={12} className={styles.right}>
                            <div className='p-[17px] md:p-0 md:ml-3'>
                                <h1>
                                    {product.title}
                                </h1>
                                <h2>
                                    {product.subTitle}
                                </h2>
                                <h6>
                                    £{product.originalPrice}  <span>(Original Price)</span>
                                </h6>
                                <h5>
                                    £{product.price}   <IoCheckmarkDone /> <br />
                                </h5>
                                <span className={styles.save}>SAVED £{parseInt(product?.originalPrice) - parseInt(product?.price)}</span>
                                <div className='mt-4'>
                                    <h4>Add Quantity</h4>
                                    <InputNumber className='w-full py-1' min={1} max={100000} defaultValue={1} onChange={(value) => setQtyToShop(value)} />
                                    {
                                        <p className='mt-2'>{product.qty <= 1 && <span className='text-danger fw-bolder'>Product is almost out of stock!</span>}</p>
                                    }
                                </div>
                                <div className='product-btn my-4 mt-[43px]'>
                                    <ButtonComp text="Add to cart" loading={loading} disabled={loading} onClick={handleAddToCart} />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24}>
                            <div className={styles.description}>
                                <h4>Product Description:</h4>
                                <p className='mr-5' style={{ wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: product.description }}></p>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.relatedProducts}>
                        <h1>You may also like</h1>
                        <Row gutter={[23, 23]}>
                            {
                                relatedProducts?.map((product, index) => {
                                    return (
                                        <Col xs={12} md={8} lg={6} key={index}>
                                            <Link href={`/product/${product?._id}`}>
                                                <MainProductCard product={product} />
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage;
