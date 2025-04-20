import React, { useEffect, useState } from 'react'
import styles from '../../styles/auth.module.css';
import { useRouter } from 'next/router';
import { Error, Success } from '@/components/Commons/Messages/Messages';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Commons/Loading/Loading';

const VerifyEmail = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const onFinish = async (id) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verify-email`, { token: id }).then(res => {
            setLoading(false)
            if (res.status === 200) {
                let user = JSON.parse(localStorage.getItem("user"));
                user.emailVerified = true;
                localStorage.setItem("user", JSON.stringify(user));
                setLoading(false)
                Success(res.data.successMessage);
                router.push("/");
            } else {
                Error(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err);
            setLoading(false)
            Error(err?.message);
        })
    };


    useEffect(() => {
        if (params?.id) {
            onFinish(params?.id)
        }

        return () => {

        }
    }, [params?.id])


    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <div className='flex justify-center items-center'>
                    {
                        loading ?
                            <Loading />
                            :
                            <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
