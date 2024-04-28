import { logout } from '@/components/Commons/Auth/Auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './AccountSidebar..module.css'


export const AccoutSidebar = () => {
    const router = useRouter();

    return (
        <div className={styles.AccoutSidebar} style={{ paddingRight: '23px' }}>
            <div>
                <div className={`${styles.item} ${router?.pathname === "/account/profile" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/account/profile'>Profile</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/account/change-password" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/account/change-password'>Change Password</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/account/orders" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <Link href='/account/orders'>Orders</Link>
                    </div>
                </div>
                <div className={`${styles.item} ${router?.pathname === "/account/logout" ? styles.active : ""}`}>
                    <div className={styles.circle}></div>
                    <div>
                        <a href='/login' onClick={() => { logout(() => { }) }}>Logout</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
