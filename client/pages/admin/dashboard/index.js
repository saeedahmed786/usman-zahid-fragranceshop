import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import styles from "./dashboard.module.css";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [chartData, setChartData] = useState({});
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [totalUsers, setTotalUsers] = useState();

    useEffect(() => {
        getAllOrders();
        getAllUsers();
    }, []);


    const getAllUsers = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setTotalUsers(res.data);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
            ErrorAlert(err?.message);
        })
    }

    const handlePreviousMonth = () => {
        setCurrentMonth(prevMonth => moment(prevMonth).subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentMonth(nextMonth => moment(nextMonth).add(1, 'month'));
    };


    const getAllOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin/all-orders`, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (res.status === 200) {
                setOrders(res.data);
            } else {
                ErrorAlert(res.data.errorMessage);
            }
        } catch (err) {
            console.error(err);
            ErrorAlert(err?.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const ordersByDay = {};
        orders.forEach(order => {
            const date = moment(order.placed, 'dddd, MMMM Do YYYY, h:mm:ss a').format('YYYY-MM-DD');
            if (!ordersByDay[date]) {
                ordersByDay[date] = 1;
            } else {
                ordersByDay[date]++;
            }
        });

        const datesArray = [];
        const currentDay = moment(currentMonth).startOf('month');
        const lastDayOfMonth = moment(currentMonth).endOf('month');
        while (currentDay.isSameOrBefore(lastDayOfMonth)) {
            datesArray.push(currentDay.format('YYYY-MM-DD'));
            currentDay.add(1, 'day');
        }

        const data = datesArray.map(date => ordersByDay[date] || 0);

        setChartData({
            options: {
                chart: {
                    id: 'orders-chart',
                    type: 'bar',
                },
                xaxis: {
                    categories: datesArray,
                    title: {
                        text: 'Date',
                    },
                },
                yaxis: {
                    title: {
                        text: 'Number of Orders',
                    },
                    forceNiceScale: true,
                    decimalsInFloat: 0,
                },
            },
            series: [{
                name: 'Orders',
                data: data,
            }],
        });
    }, [orders, currentMonth]);

    const isNextMonthFuture = moment().isBefore(moment(currentMonth).add(1, 'month'));

    return (
        <AdminLayout sidebar>
            <div className={styles.dashboard}>
                <div className={styles.dashboxes}>
                    <div className={styles.box}>
                        <h2>Total Buyers</h2>
                        <h3>{totalUsers?.length}</h3>
                    </div>
                    <div className={styles.box}>
                        <h2>Total Orders</h2>
                        <h3>{orders?.length}</h3>
                    </div>
                    <div className={styles.box}>
                        <h2>Total Revenue</h2>
                        <h3>￡{orders?.reduce((a, b) => a + parseInt(b?.totalPrice), 0)}</h3>
                    </div>
                </div>
                <h1 className='text-[43px] font-bold'>Orders</h1>
                <div className='flex justify-end gap-4 my-4'>
                    <ButtonComp text="Previous Month" onClick={handlePreviousMonth} />
                    <ButtonComp text="Next Month" disabled={isNextMonthFuture} onClick={handleNextMonth} />
                    {/* <button disabled={isNextMonthFuture} onClick={handleNextMonth}>Next Month</button> */}
                </div>
                <div id="chart">
                    <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Admin;
