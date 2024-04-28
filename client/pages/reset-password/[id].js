import React, { useState } from 'react'
import { Form, Input, Button } from "antd";
import styles from '../../styles/auth.module.css';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';

const ResetPassword = () => {
    const params = useParams();
    const router = useRouter();
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);

    const onFinish = async (values) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/reset-password`, { token: params.id, password: values.password, confirm: values.confirm }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                router.push("/login");
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
                                        <Button className={styles.button} htmlType="submit">
                                            Reset Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>
                            :
                            <div>
                                <Button className={styles.button} onClick={() => router.push("/login")} htmlType="submit">
                                    Back to log in
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
