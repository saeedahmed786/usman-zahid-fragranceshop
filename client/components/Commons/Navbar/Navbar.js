import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import { logout } from '../Auth/auth'
import { LockOutlined, LogoutOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Drawer } from 'antd'
import LogoComp from '../LogoComp/LogoComp'
import { useCart } from '@/context'
import SearchBox from './SearchBox/SearchBox'

export const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    return () => {

    }
  }, [])

  return (
    <nav className={styles.Navbar}>
      <div className={styles.upper}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/">
              <LogoComp />
            </Link>
          </div>
        </div>
        <div className={`${styles.right} ${styles.rightDesktop}`}>
          <SearchBox />
          {
            user && user?.email ?
              <div className={'flex items-center gap-3 ' + styles.loginRegBtn}>
                {
                  user?.role === 1 &&
                  <Link href="/admin/dashboard" className='text-center'> <LockOutlined /> < br /> <span>Dashboard</span></Link>
                }
                <Link href="/account/profile" className='text-center'> <UserOutlined /> < br /> <span>Account</span></Link>
                <Link href="/cart" className='text-center'>
                  <Badge count={cart?.length} className={styles.badge}>
                    <ShoppingCartOutlined className='text-[19px] text-white' />
                  </Badge>
                  < br />
                  <span>My Cart</span></Link>
                <a href="/login" className='text-center' onClick={logout}> <LogoutOutlined /> < br /> <span>Logout</span></a>
              </div>
              :
              <div className={`flex items-center gap-2 md:gap-10 text-white`}>
                <Link href="/login" className='text-center'> <UserOutlined /> < br /> <span>Account</span></Link>
              </div>
          }
        </div>
      </div>
      <div className={styles.mobileMenu}>
        <button onClick={showDrawer} className="text-white"><MenuOutlined className='text-[19px]' /></button>
      </div>
      <Drawer title={<div className='flex justify-end items-center gap-2'><UserOutlined />{user && <span>Hi !,{user?.firstName}</span>}</div>} width={300} placement="right" onClose={onClose} open={open}>
        <div className={styles.right}>
          <SearchBox />
          {
            user ?
              <div className={'flex items-center gap-3 ' + styles.loginRegBtn}>
                {
                  user?.role === 1 &&
                  <Link href="/admin/dashboard" className='text-center'> <LockOutlined /> < br /> <span>Dashboard</span></Link>
                }
                <Link href="/profile" className='text-center'> <UserOutlined /> < br /> <span>Account</span></Link>
                <Link href="/cart" className='text-center'>
                  <Badge count={5} className={styles.badge}>
                    <ShoppingCartOutlined className='text-[19px] text-white' />
                  </Badge>
                  < br />
                  <span>My Cart</span></Link>
                <a href="/login" className='text-center' onClick={logout}> <LogoutOutlined /> < br /> <span>Logout</span></a>
              </div>
              :
              <div className={`flex items-center gap-2 md:gap-10 text-white`}>
                <Link href="/login" className='text-center'> <UserOutlined /> < br /> <span>Account</span></Link>
              </div>
          }
        </div>
      </Drawer>
    </nav >
  )
}
