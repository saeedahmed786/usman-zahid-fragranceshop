import { MainProductCard } from '@/components/Commons/MainProductCard/MainProductCard';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Pagination, Row, Select } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './products.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';


const Products = () => {
    const router = useRouter();
    const [productsArray, setProductsArray] = useState([]);
    const [sortValue, setSortValue] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState(router.query.category);
    const [brand, setBrand] = useState(router.query.brand);
    const [priceRange, setPriceRange] = useState();
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState();
    const [current, setCurrent] = useState(1);
    const [gender, setGender] = useState("");

    const getAllData = async () => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/${current - 1}`, { category, priceRange, gender, brand }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setProductsArray(res.data?.products);
                setTotalCount(res.data.count)
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(true);
            console.log(err)
        });
    }

    const getAllSubCategories = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/sub-categories`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setCategories(res.data?.map(f => ({ value: f?._id, label: `${f?.parentId?.name} ${f?.name}` })));
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(true);
            console.log(err)
        })
    }

    const getAllBrands = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands/get`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setBrands(res.data?.map(f => ({ value: f?._id, label: f?.name })));
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(true);
            console.log(err)
        })
    }

    useEffect(() => {
        getAllSubCategories();
        getAllBrands();
        if (router.query?.category) {
            setCategory(router.query?.category)
        }
        if (router.query?.gender) {
            setGender(router.query?.gender)
        }
        if (router.query?.brand) {
            setBrand(router.query?.brand)
        }
        return () => {

        }
    }, [router.query]);

    useEffect(() => {
        getAllData();

        return () => {

        }
    }, [current, category, priceRange, gender, brand]);



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

    const handleResetFilters = () => {
        setCategory("");
        setPriceRange("");
        setGender("");
        router.push("/products");
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
                            <Select className={styles.select} value={category} onChange={(val) => setCategory(val)} placeholder="Categories" options={categories} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} value={brand} onChange={(val) => setBrand(val)} placeholder="Brands" options={brands} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} value={priceRange} onChange={(val) => setPriceRange(val)} placeholder="Price" options={[
                                { value: "0-10", label: "$0 - $10" },
                                { value: "10-20", label: "$10 - $20" },
                                { value: "20-50", label: "$20 - $50" },
                                { value: "50-100", label: "$50 - $100" },
                                { value: "100-150", label: "$100 - $150" },
                                { value: "150-200000", label: "$150>" }
                            ]} />
                        </Col>
                        <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} value={gender} placeholder="Gender" onChange={(val) => setGender(val)} options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "others", label: "Others" }
                            ]} />
                        </Col>
                        {/* <Col xs={12} md={8} lg={6}>
                            <Select className={styles.select} placeholder="Gift Set" options={[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" }
                            ]} />
                        </Col> */}
                        <Col xs={24} md={8} lg={6}>
                            <div className='md:max-w-[200px]'>
                                <ButtonComp text="Reset All Filters" onClick={handleResetFilters} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            {
                loading ?
                    <Loading />
                    :
                    <Row gutter={[23, 23]} className="p-4">

                        {
                            productsArray?.length > 0 ?
                                productsArray?.map((product, index) => {
                                    return (
                                        <Col xs={12} md={8} lg={6} key={index}>
                                            <Link href={`/product/${product?._id}`}>
                                                <MainProductCard product={product} />
                                            </Link>
                                        </Col>
                                    )
                                })
                                :
                                <Col xs={24} className="text-center">
                                    <h3 className='text-[36px] font-bold'>No Products Found!</h3>
                                </Col>
                        }
                    </Row>
            }
            <div className='flex justify-center my-10'>
                <Pagination current={current} onChange={(page) => setCurrent(page)} total={totalCount} />
            </div>
        </div >
    )
}

export default Products;
