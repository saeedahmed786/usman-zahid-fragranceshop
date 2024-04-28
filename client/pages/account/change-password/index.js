import { AccountLayout } from '@/components/Layouts/AccountLayout/AccountLayout'
import { Form, Input } from 'antd';
import axios from 'axios';
import styles from "./changePassword.module.css"
import React, { useState } from 'react'
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/change-password`, values, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    };


    return (
        <AccountLayout sidebar>
            <div className={styles.changePassword}>
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
                        name="oldPassword"
                        label="Old Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Enter Old password' />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Enter New password' />
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
                                    if (!value || getFieldValue('newPassword') === value) {
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
                        <ButtonComp type='submit' text="Submit" loading={loading} disabled={loading} />
                    </Form.Item>
                </Form>
            </div>
        </AccountLayout>
    )
}

export default ChangePassword
