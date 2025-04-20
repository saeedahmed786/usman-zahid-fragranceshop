import React, { useEffect, useState } from 'react'
import Mail from "../public/mail.svg"
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import AuthHeader from '@/components/Auth/AuthHeader';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import axios from 'axios';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';

const VerifyEmail = () => {
    const [user, setUser] = useState({});

    const sendEmail = async (user) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/send-email`, { email: user?.email }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    };

    useEffect(() => {
        setUser(isAuthenticated());
        if (isAuthenticated()?.email) {
            sendEmail(isAuthenticated());
        }

        return () => {

        }
    }, []);

    console.log(user);

    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <Link href="/login" className={styles.backBtn}>Back</Link>
                <div>
                    <div>
                        <p className='mt-0 text-center mb-[24px]'>
                            Verification link has been sent to {user?.email}. Check your spam and promotions folder if it doesn’t appear in your inbox.
                        </p>
                        <div className='flex justify-center gap-2'>
                            <div>Didn’t receive the link?</div>
                            <Link href="#" onClick={() => sendEmail(user)}>Resend</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
