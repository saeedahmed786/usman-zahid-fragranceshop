import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ErrorAlert } from '../Messages/Messages';
import styles from "./CategoriesBar.module.css";

const CategoriesBar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/get`).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
            ErrorAlert(err?.message);
        })
    }

    useEffect(() => {
        getAllCategories();

        return () => {
        }
    }, []);

    const generateMenuItems = (children) => {
        return (
            <Menu className={styles.menu}>
                {children.map((child, index) => (
                    <Menu.Item key={index + 1}>
                        <Link href={`/products?category=${child?._id}`}>
                            {child.name}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    return (
        <div className={styles.CategoriesBar}>
            {categories?.map(category => (
                <Dropdown
                    key={category?._id}
                    overlay={generateMenuItems(category?.children)}
                >
                    <Link href="/" className={styles.title} onClick={(e) => e.preventDefault()}>
                        <Space>
                            {category?.name}
                            <DownOutlined className={styles.icon} />
                        </Space>
                    </Link>
                </Dropdown>
            ))}
        </div>
    )
}

export default CategoriesBar;
