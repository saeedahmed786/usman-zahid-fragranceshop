import React, { useState } from 'react'
import { Form, Input, Button } from "antd";
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);

    const onFinish = async (values) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/send/forgot-email`, { email: values.email }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                setSubmitted(true);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    };


    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <div>
                    <Link href="/login" className={styles.backBtn}>Back</Link>
                    <div>
                        {
                            !submitted ?
                                <>
                                    <Form
                                        layout="vertical"
                                        form={form}
                                        name="nest-messages"
                                        className={styles.form}
                                        requiredMark={false}
                                        onFinish={onFinish}
                                        style={{
                                            maxWidth: 600,
                                        }}
                                    >
                                        <Form.Item
                                            name='email'
                                            label="Email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Enter email' />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type='primary' className={styles.button} htmlType="submit">
                                                Continue
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </>
                                :
                                <div>
                                    <p className='mt-0 text-center mb-[24px]'>
                                        Reset password link has been sent to {form.getFieldValue('email')}. Check your spam and promotions folder if it doesn’t appear in your inbox.
                                    </p>
                                    <div className='flex justify-center gap-2'>
                                        <div>Didn’t received the reset instructions?</div>
                                        <Link href="#" onClick={() => setSubmitted(false)}>Resend Email</Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
