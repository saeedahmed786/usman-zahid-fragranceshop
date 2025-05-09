import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages'
import DeleteModal from '@/components/DeleteModal'
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { isAuthenticated } from '@/components/Commons/Auth/Auth'
import Image from 'next/image'

const Products = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [current, setCurrent] = useState(1);
    const [totalProducts, setTotalProducts] = useState();

    const getAllProducts = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/${curr - 1}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setProducts(res.data.products);
                setTotalProducts(res.data.count);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllProducts(current);
        return () => {
        }
    }, []);


    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessAlert(res.data.successMessage)
                getAllProducts();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    const columns = [
        {
            title: '#',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a?._id > b?._id,
            render: (_, { _id }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
                </>
            ),
        },
        {
            title: "Title",
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a?.title?.localeCompare(b?.title),
            render: (_, { title }) => (
                <p className='textElipsisTwoLines'>
                    {title}
                </p>
            ),
        },
        {
            title: "Main Category",
            dataIndex: 'mainCategory',
            key: 'category',
            sorter: (a, b) => a?.mainCategory?.name?.localeCompare(b?.mainCategory),
            render: (_, { mainCategory }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{mainCategory?.name}</div>
                </>
            ),
        },
        {
            title: "Sub Category",
            dataIndex: 'subCategory',
            key: 'category',
            sorter: (a, b) => a?.subCategory?.name?.localeCompare(b?.subCategory),
            render: (_, { subCategory }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{subCategory?.name}</div>
                </>
            ),
        },
        {
            title: "Date",
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt.length - b.createdAt.length,
            render: (_, { createdAt }) => (
                <p className='textElipsisTwoLines'>
                    {moment(createdAt).format("DD/MM/YYYY")}
                </p>
            ),
        },
        {
            title: "Pictures",
            dataIndex: 'pictures',
            key: 'pictures',
            render: (_, { pictures }) => (
                <div className='flex gap-2 flex-wrap items-center'>
                    {
                        pictures?.length > 0 &&
                        pictures?.map(pic => {
                            return (
                                <Image src={pic?.response?.url} width={32} height={32} style={{ width: "32px", height: "32px" }} />
                            )
                        })
                    }
                </div>
            ),
        },
        {
            title: "Actions",
            render: (_, product) => (
                <>
                    <div className='flex items-center gap-4'>
                        <Link href={"/product/" + product._id}><EyeOutlined /></Link>
                        <EditOutlined onClick={() => router.push(`/admin/update-product/${product._id}`)} />
                        <DeleteModal id={product?._id} deleteFun={deleteHandler} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                    </div>
                </>
            ),
        },
    ];


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='md:flex justify-between flex-wrap items-start pb-8'>
                    <div>
                        <div className='flex gap-2 justify-start items-center pb-4'>
                            <span>Home</span> <RightOutlined /> <div className='text-[#0094DA] bg-transparent'>Products</div>
                        </div>
                        <h1 className='text-[33px] font-bold'>Create a Product</h1>
                    </div>
                    <div className='mt-8 md:mt-0'>
                        <Button type='primary' onClick={() => router.push("/admin/create-product")} className='flex items-center justify-center w-full gap-2 bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6'>
                            <PlusOutlined />
                            <span className='text-[16px] font-[500]'>Create a product</span>
                        </Button>
                    </div>
                </div>
                <div className='hidden md:block bg-white'>
                    <Table showSorterTooltip columns={columns} pagination={false} dataSource={products} />
                </div>
                {/* <div className='adminPagination bg-white p-4 flex items-center justify-between flex-wrap rounded-[16px] md:rounded-none my-1 md:my-12'>
                    <p className='text-[#65737E] text-[12px]'>Affichage de {current * 10} sur {totalProducts}  entrées</p>
                    <AdminPagination totalLength={totalProducts} handlePagination={(curr) => { setCurrent(curr); getAllProducts(curr) }} />
                </div> */}
            </div>
        </AdminLayout>
    )
}

export default Products
