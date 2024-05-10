import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages'
import DeleteModal from '@/components/DeleteModal'
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';

const Users = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [totalUsers, setTotalUsers] = useState();

    const getAllUsers = async (curr) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                setUsers(res.data);
                setTotalUsers(res.data.count);
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
        getAllUsers(current);
        return () => {
        }
    }, []);


    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessAlert(res.data.successMessage)
                getAllUsers();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
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
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a?.firstName?.localeCompare(b?.firstName),
            render: (a, b) => (
                <p>
                    {b?.firstName} {b?.lastName}
                </p>
            ),
        },
        {
            title: "Email",
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a?.email?.name?.localeCompare(b?.email),
        },
        {
            title: "Birthday",
            dataIndex: 'birthday',
            key: 'birthday',
            sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
            render: (_, { birthday }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{moment(birthday).format("DD/MM/YYYY")}</div>
                </>
            ),
        },
        {
            title: "Signed Up Date",
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (_, { createdAt }) => (
                <p>
                    {moment(createdAt).format("DD/MM/YYYY")}
                </p>
            ),
        },
        {
            title: "Actions",
            render: (_, product) => (
                <>
                    <div className='flex items-center gap-4'>
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
                            <span>Home</span> <RightOutlined /> <div className='text-[#0094DA] bg-transparent'>Users</div>
                        </div>
                        <h1 className='text-[33px] font-bold'>Users</h1>
                    </div>
                </div>
                <div className='hidden md:block bg-white'>
                    <Table loading={loading} showSorterTooltip columns={columns} pagination={false} dataSource={users} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users
