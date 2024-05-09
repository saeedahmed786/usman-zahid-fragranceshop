import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import Loading from '@/components/Commons/Loading/Loading';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { AccountLayout } from '@/components/Layouts/AccountLayout/AccountLayout';
import { CloseCircleFilled } from '@ant-design/icons';
import styles from "./orders.module.css"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllOrders = async () => {
        if (isAuthenticated() && isAuthenticated()?._id) {
            setLoading(true);
            await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/customer/orders/${isAuthenticated()?._id}`, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    setOrders(res.data);
                }
                else {
                    ErrorAlert(res.data.errorMessage);
                }
            }).catch(err => {
                setLoading(false);
                console.log(err)
                ErrorAlert(err?.message);
            })
        }
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);


    return (
        <AccountLayout sidebar>
            {
                loading ?
                    <Loading />
                    :
                    <div className={styles.orders}>
                        <div className='table-container border p-2 mb-10'>
                            {
                                orders && orders.length > 0 ?
                                    <table className="table table-borderless text-left w-full">
                                        <tbody>
                                            {
                                                orders?.map((order, index) => {
                                                    return (
                                                        <>
                                                            <tr className={'border ' + styles.headRow}>
                                                                <td className='font-bold'>
                                                                    Order #{index + 1}
                                                                </td>
                                                                <td>
                                                                    Total Price : £{order?.products?.reduce((a, b) => a + parseInt(b?.price) * parseInt(b?.qtyToShop), 0)}
                                                                </td>
                                                                <td>
                                                                    Status: &nbsp;
                                                                    <span className={`font-bold ${order?.state !== 0 ? "text-[#fff]" : "text-[red]"}`}>
                                                                        {

                                                                            order?.status === '0' ?
                                                                                <CloseCircleFilled className='text-[red]' />
                                                                                :
                                                                                order?.status === '1' ?
                                                                                    `Just Placed`
                                                                                    :
                                                                                    order?.status === '2' ?
                                                                                        `Confirmed`
                                                                                        :
                                                                                        order?.status === '3' ?
                                                                                            `Prepared`
                                                                                            :
                                                                                            order?.status === '4' ?
                                                                                                `Out for delivery`
                                                                                                :
                                                                                                order?.status === '5' ?
                                                                                                    `Complete`
                                                                                                    :
                                                                                                    null
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>Updated At: {order?.statusUpdateTime}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>
                                                                    Order Id : {order?._id}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className='w-full'>Placed At: {order?.placed}</span>
                                                                </td>
                                                            </tr>
                                                            {
                                                                order?.products?.map((product, index) => {
                                                                    return (
                                                                        <tr key={index} className="adminOrderProducts">
                                                                            <th>
                                                                                <Image src={product?.pictures[0]?.response?.url} height='71' width='64' alt='images' />
                                                                            </th>
                                                                            <th>
                                                                                {product?.title}
                                                                            </th>
                                                                            <th>Qty:{product?.qtyToShop}</th>
                                                                            <th>£ {parseInt(product?.price * product?.qty)}</th>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </>

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='flex justify-center items-center' style={{ minHeight: '40vh' }}>
                                        <p className='text-[32px] font-bold'>No Orders!</p>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </AccountLayout>
    )
}

export default Orders;