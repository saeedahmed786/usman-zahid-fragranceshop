import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import axios from 'axios';
import { OrderList } from '@/components/Admin/Orders';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import Loading from '@/components/Commons/Loading/Loading';

const { Option } = Select;


const OrdersManagement = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [sort, setSort] = useState("6");

    const getAllOrders = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin/all-orders`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setOrders(res.data);
            }
            else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);

    return (
        <AdminLayout sidebar>
            <h1 className='text-[33px] font-bold mb-10'>Orders Management</h1>
            {
                loading ?
                    <Loading />
                    :
                    <div className='orders admin-orders pt-"5"'>
                        <div className='w-full max-w-[400px]'>
                            <h2 className='text-[23px]'>Filter Orders:</h2>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Sort Orders"
                                allowClear
                                treeDefaultExpandAll
                                value={sort}
                                onChange={(val) => setSort(val)}
                                className='mb-3'
                            >
                                <Option value={"6"}>All</Option>
                                <Option value={"1"}>Pending</Option>
                                <Option value={"2"}>Confirmed</Option>
                                <Option value={"3"}>Prepared</Option>
                                <Option value={"4"}>Delivered</Option>
                                <Option value={"5"}>Completed</Option>
                                <Option value={"0"}>Cancelled</Option>
                            </Select>
                        </div>
                        <OrderList orders={sort === "6" ? orders : orders?.filter(order => order?.status === sort)} />
                    </div>
            }
        </AdminLayout>
    )
}

export default OrdersManagement;