import { CloseCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { ErrorAlert, SuccessAlert } from '../Commons/Messages/Messages';

const { Option } = Select;

export const OrderList = (props) => {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [orderStatus, setOrderStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    /************************************************** Modal ***********************************************/
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function handleChange(value) {
        setOrderStatus(value);
    }


    const orderStatusHandler = async (orderId) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/set/status`, { status: orderStatus, orderId, updateTime: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                props.update && props.update();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    }


    /************************************************** Cancel Orders ***********************************************/
    const cancelOrder = async (orderId) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/order/cancel/${orderId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                props.update && props.update();
            }
            else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    }


    function cancel(e) {
    }

    return (
        <div>
            <div className='text-[28px] font-bold mb-4'>Total Orders: {props.orders?.length}</div>
            {
                props.orders && props.orders.length > 0 && props.orders.map((order, index) => {
                    return (
                        <div className='table-container border p-2 mb-10'>
                            <table className="table table-borderless text-left w-full">
                                <tbody>
                                    <tr className='bg-secondary'>
                                        <td>
                                            Order #{index + 1}

                                        </td>
                                        <td>
                                            Total Price : £{order?.totalPrice}
                                        </td>
                                        <td>
                                            Status: &nbsp;
                                            <span className={`font-bold ${order?.status !== "0" ? "text-[#083652]" : "text-[red]"}`}>
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
                                            <button className='text-black' onClick={() => { showModal(); setUser(order?.address); setData(order?.paymentData) }}>Customer</button>
                                        </td>
                                        {
                                            order.status !== "5" && order.status !== "0" &&
                                            <>
                                                <td>
                                                    <div className="flex items-center">
                                                        <div>
                                                            <Select style={{ width: "130px" }} defaultValue={order?.status} onChange={handleChange}>
                                                                <Option value={"1"}>Just Placed</Option>
                                                                <Option value={"2"}>Confirmed</Option>
                                                                <Option value={"3"}>Prepared</Option>
                                                                <Option value={"4"}>Delivered</Option>
                                                                <Option value={"5"}>Complete</Option>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Button onClick={() => orderStatusHandler(order?._id)}>Set</Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Popconfirm
                                                        title="Are you sure to cancel the order?"
                                                        onConfirm={() => cancelOrder(order?._id)}
                                                        onCancel={cancel}
                                                        placement='topLeft'
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <span className='text-danger fs-4' style={{ cursor: "pointer" }}><CloseOutlined /></span>
                                                    </Popconfirm>

                                                </td>
                                            </>
                                        }
                                    </tr>
                                    <tr>
                                        <th>
                                            Order Id : {order?._id}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className='w-full'>Placed At: {order?.placed}</span>
                                            {/* <span className='w-full'>Placed At: {moment((order?.placed)).format("DD/MM/YYYY")}</span> */}
                                        </td>
                                    </tr>
                                    {
                                        order?.products?.map((product, index) => {
                                            return (
                                                <tr key={index} className="adminOrderProducts">
                                                    <th>
                                                        <img src={product?.pictures[0]?.response?.url} height='71' width='64' alt='images' />
                                                    </th>
                                                    <th>
                                                        {product?.title}

                                                    </th>
                                                    <th>Qty:{product?.qtyToShop}</th>
                                                    <th>£ {parseInt(product?.price * product?.qtyToShop)}</th>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }

            <Modal footer={false} width={800} title="User Info" visible={isModalVisible} onCancel={handleCancel}>
                <div className="row">
                    <div className="col-md-6 my-4">
                        <h6>Full Name:</h6>
                        <b>{user?.fullName}</b>
                    </div>
                    <div className="col-md-6 my-4">
                        <h6>Email:</h6>
                        <b>{user?.email}</b>
                    </div>
                    <div className="col-md-6 my-4">
                        <h6>phone:</h6>
                        <b>{user?.email}</b>
                    </div>
                    <div className="col-md-6 my-4">
                        <h6>address:</h6>
                        <b>{user?.city}, {user?.state}, {user?.country}, {user?.postalCode}</b>
                    </div>
                </div>
                {
                    data && data.id &&
                    <div className="row">
                        <h2 className='text-[28px] font-bold mt-10'>Payment Information:</h2>
                        <div className="col-md-6 my-4">
                            <h6>Paid:</h6>
                            <b><span>True</span></b>
                        </div>
                        <div className="col-md-6 my-4">
                            <h6>Payment ID:</h6>
                            <b>{data?.id} </b>
                        </div>
                        <div className="col-md-6 my-4">
                            <h6>Amount Paid:</h6>
                            <b>£ {data?.amount}</b>
                        </div>
                        <div className="col-md-6 my-4">
                            <h6>Payment Method:</h6>
                            <b>{data?.payment_method_types[0]}</b>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}