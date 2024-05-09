import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { ErrorAlert } from '../../Messages/Messages';
import styles from "./SearchBox.module.css";

const { Search } = Input;

const SearchBox = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [showSearchResultaContainer, setShowSearchResultaContainer] = useState(false);

    const searchProducts = async (title) => {
        setShowSearchResultaContainer(true);
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`, { title }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            setProducts(res.data);
            setLoading(false)
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    return (
        <div className={styles.SearchBox}>
            <Search placeholder='Search here...' className={styles.search} onSearch={searchProducts} />
            {
                showSearchResultaContainer &&
                <div className={styles.resultsContainer}>
                    <button onClick={() => setShowSearchResultaContainer(false)}><CloseOutlined /></button>
                    <h1>Search Results: {products?.length}</h1>
                    {
                        products?.length > 0 ?
                            products?.map(product => {
                                return (
                                    <Link href={`/product/${product?._id}`} className={styles.product} onClick={() => setShowSearchResultaContainer(false)}>
                                        {product?.title}
                                    </Link>
                                )
                            })
                            :
                            <div>
                                No results!
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default SearchBox
