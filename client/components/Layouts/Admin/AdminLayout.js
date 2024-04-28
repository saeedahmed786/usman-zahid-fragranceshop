import { isAuthenticated } from '@/components/Commons/Auth/Auth'
import Loading from '@/components/Commons/Loading/Loading'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'

const AdminLayout = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [mask, setMask] = useState(false);

    useEffect(() => {
        // checks if the user is authenticated
        if (isAuthenticated() && isAuthenticated().role === 1) {
            setLoading(false);
        }
        else {
            router.push("/login");
            setLoading(false);
        }
    }, []);

    return (
        loading ?
            <Loading />
            :
            <>
                <div className={`xxl:container mx-auto AdminLayout bg-[#F5F8FB] ${mask && "blackMask"}`}>
                    {
                        props.sidebar ?
                            <Row className='block md:flex mt-0'>
                                <Col xs={24} lg={4} className="hidden lg:block AdminSidebar">
                                    <AdminSidebar />
                                </Col>
                                <Col xs={24} lg={20} className="md:bg-[#F5F8FB]">
                                    <div className='md:p-5'>
                                        <div className={`mx-2`}>
                                            {props.children}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            props.children
                    }
                </div>
            </>
    )
}

export default AdminLayout
