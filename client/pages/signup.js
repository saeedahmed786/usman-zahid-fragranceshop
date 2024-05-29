import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from "antd";
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';

const Signup = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, { email: values.email, password: values.password, confirm: values.confirm }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                router.push("/login");

            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    };

    useEffect(() => {
        if (localStorage.getItem("email")) {
            form.setFieldsValue({ email: localStorage.getItem("email") })
        }
        return () => {

        }
    }, [])

    return (
        <div className={styles.auth}>
            <div>
                <div className={styles.container}>
                    <div>
                        <h4>Create an account</h4>
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
                            initialValues={{
                                email: router.query.email,
                            }}
                        >
                            <Form.Item
                                name={"email"}
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
                                <Input value="qjwdhjqs" placeholder='Enter email' />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Enter password' />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder='Confirm password' />
                            </Form.Item>
                            <Form.Item>
                                <ButtonComp type='submit' text="Signup" loading={loading} disabled={loading} />
                            </Form.Item>
                        </Form>
                        <div className='flex justify-center gap-2'>
                            <div>Already have an account?</div>
                            <Link href="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
