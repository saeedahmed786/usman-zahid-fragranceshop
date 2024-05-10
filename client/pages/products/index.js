import { MainProductCard } from '@/components/Commons/MainProductCard/MainProductCard';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Row, Select } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './products.module.css';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '@/components/Commons/Loading/Loading';


const Products = () => {
    const router = useRouter();
    const [productsArray, setProductsArray] = useState([]);
    const [sortValue, setSortValue] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState();
    const [index, setIndex] = useState(0);

    const getAllData = async (e) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/${index}`).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                setProductsArray((prevItems) => [...prevItems, ...res.data?.products]);
                setTotalCount(res.data.count)
                res.data?.products?.length > 0 ? setHasMore(true) : setHasMore(false);
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err)
        });
        setIndex((prevIndex) => prevIndex + 1);
    }

    const getAllSubCategories = async (e) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/sub-categories`).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                setCategories(res.data?.map(f => ({ value: f?._id, label: f?.name })));
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
        getAllSubCategories();

        return () => {

        }
    }, []);

    const sortProducts = (products, sortBy) => {
        switch (sortBy) {
            case "lth":
                return products.sort((a, b) => a.price - b.price);
            case "htl":
                return products.sort((a, b) => b.price - a.price);
            case "a-z":
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case "z-a":
                return products.sort((a, b) => b.title.localeCompare(a.title));
            case "createdAt":
                return products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            default:
                return products;
        }
    };


    const handleSortChange = (value) => {
        setSortValue(value);
        if (sortValue) {
            const sorted = sortProducts(productsArray, value);
            setProductsArray(sorted);
        }
    };


    return (
        <div className={styles.products}>
            <div className={styles.top}>
                <h1>All Products</h1>
                <p>has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </div>
            <div className={styles.filters}>
                <div className={styles.sortSection}>
                    <div className='flex items-center gap-2'>
                        <h4>Filter</h4>
                        <p>{productsArray?.length} of {totalCount} items</p>
                    </div>
                    <div className={styles.right}>
                        <h4>Sort By:</h4>
                        <Select className={styles.sortSelect} onChange={handleSortChange} placeholder="Sort" options={[
                            { value: "lth", label: "Price: Low to High" },
                            { value: "htl", label: "Price: High to Low" },
                            { value: "a-z", label: "Product Name: A-Z" },
                            { value: "z-a", label: "Product Name: Z-A" },
                            { value: "createdAt", label: "Released Date" },
                        ]} />
                    </div>
                </div>
                <div className={styles.filterSection}>
                    <Row gutter={[23, 23]}>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} placeholder="Brand" options={categories} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} placeholder="Price" options={[
                                { value: "0-10", label: "$0 - $10" },
                                { value: "10-20", label: "$10 - $20" },
                                { value: "20-50", label: "$20 - $50" },
                                { value: "50-100", label: "$50 - $100" },
                                { value: "100-150", label: "$100 - $150" },
                                { value: "150-200000", label: "$150>" }
                            ]} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} placeholder="Size (ml)" options={[
                                { value: "125", label: "125ml" },
                                { value: "100", label: "100ml" },
                                { value: "90", label: "90ml" },
                                { value: "80", label: "80ml" },
                                { value: "70", label: "70ml" },
                                { value: "60", label: "60ml" }
                            ]} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} placeholder="Gift Set" options={[
                                { value: "yes", label: "Yes" },
                                { value: "noe", label: "No" }
                            ]} />
                        </Col>
                    </Row>
                </div>
            </div>
            <InfiniteScroll
                dataLength={productsArray.length}
                className={styles.scroll}
                next={getAllData}
                hasMore={hasMore}
                loader={<Loading />}
            >
                <Row gutter={[23, 23]} className="p-4">
                    {
                        productsArray?.map((product, index) => {
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
            </InfiniteScroll>
        </div >
    )
}

export default Products;
