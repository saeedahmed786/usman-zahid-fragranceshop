import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { EditOutlined, GroupOutlined, HomeOutlined, LogoutOutlined, PlusOutlined, ShoppingFilled, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { IoDocument } from 'react-icons/io5'
import { logout } from '@/components/Commons/Auth/Auth'

const AdminSidebar = () => {
    const router = useRouter();

    return (
        <div className='AdminSidebar px-2 py-4'>
            <div>
                <div className='mt-8 relative'>
                    <div className='mb-6'>
                        <Link href="/admin/dashboard">
                            <button className={`${router.pathname === "/admin/dashboard" ? "activeLink text-[#fff] flex gap-3 items-center" : "flex gap-3 items-center text-[#000]"}`}>
                                <HomeOutlined />
                                <span>Dashboard</span>
                            </button>
                        </Link>
                    </div>
                    <div className='mb-6'>
                        <Link href="/admin/categories">
                            <button className={`${router.pathname === "/admin/categories" ? "activeLink text-[#fff] flex gap-3 items-center" : "flex gap-3 items-center text-[#000]"}`}>
                                <GroupOutlined />
                                <span>Categories</span>
                            </button>
                        </Link>
                    </div>
                    <div className='mb-6'>
                        <Link href="/admin/products">
                            <button className={`${router.pathname === "/admin/products" ? "activeLink text-[#fff] flex gap-3 items-center" : "flex gap-3 items-center text-[#000]"}`}>
                                <IoDocument />
                                <span>Products</span>
                            </button>
                        </Link>
                    </div>
                    <div className='mb-6'>
                        <Link href="/admin/users">
                            <button className={`${router.pathname === "/admin/users" ? "activeLink text-[#fff] flex gap-3 items-center" : "flex gap-3 items-center text-[#000]"}`}>
                                <UsergroupAddOutlined />
                                <span>Users</span>
                            </button>
                        </Link>
                    </div>
                    <div className='mb-6'>
                        <Link href="/admin/orders">
                            <button className={`${router.pathname === "/admin/orders" ? "activeLink text-[#fff] flex gap-3 items-center" : "flex gap-3 items-center text-[#000]"}`}>
                                <ShoppingFilled />
                                <span>Orders</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className=''>
                    <a href="/login" onClick={logout} className='gap-4 rounded-[12px] border border-[#FF6551] h-[48px] w-full flex justify-center items-center text-[#FF6551] text-[16px] font-[500]'>
                        <span className='text-[#FF6551] '>Logout</span>
                        <LogoutOutlined />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar
