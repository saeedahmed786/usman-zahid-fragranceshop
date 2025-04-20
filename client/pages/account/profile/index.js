import { isAuthenticated, setAuthentication } from '@/components/Commons/Auth/Auth';
import { AccountLayout } from '@/components/Layouts/AccountLayout/AccountLayout'
import { DatePicker, Form, Input, Select } from 'antd';
import axios from 'axios';
import styles from "./profile.module.css"
import React, { useEffect, useState } from 'react'
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [user, setUser] = useState({});
    const [birthday, setBirthday] = useState(user?.birthday);
    const [loading, setLoading] = useState(false);


    const updateBirthday = (b) => {
        setBirthday(b);
    }

    useEffect(() => {
        setUser(isAuthenticated());
        if (isAuthenticated()) {
            updateBirthday(isAuthenticated()?.birthday);
        }
        return () => {
        }
    }, []);

    const onFinish = async (values) => {
        values.birthday = birthday;
        setLoading(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/update/${isAuthenticated()?._id}`, values, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data?.user));
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
        user && user?.email &&
        <div className={styles.profile}>
            <AccountLayout sidebar>
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
                    initialValues={user}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        required
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
                    <Form.Item
                        name="username"
                        required
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Username' />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        required
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter First Name' />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        required
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Last Name' />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        required
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a gender!',
                            },
                        ]}
                    >
                        <Select className={styles.Select} placeholder="Select a gender" options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                        ]} />
                    </Form.Item>
                    <Form.Item
                        label="Birthday"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your birthday!',
                            },
                        ]}
                    >
                        <DatePicker
                            className={'w-full ' + styles.DatePicker}
                            placeholder="Select your birthday"
                            format="DD/MM/YYYY"
                            value={moment(birthday, "DD/MM/YYYY")}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                            onChange={(date, dateString) => setBirthday(dateString)}
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone Number!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Phone Number' />
                    </Form.Item>
                    <Form.Item className='mt-10'>
                        <ButtonComp type='submit' text="Submit" loading={loading} disabled={loading} />
                    </Form.Item>
                </Form>
            </AccountLayout>
        </div>
    )
}

export default ProfilePage;
