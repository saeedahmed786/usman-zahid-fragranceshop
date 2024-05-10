import React from 'react'
import { Col, Row } from 'antd';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { AccoutSidebar } from './AccountSideBar';

export const AccountLayout = (props) => {
  const user = isAuthenticated();

  return (
    <div className='p-[17px] md:p-[40px]'>
      <>
        <div>
          <h1 className='text-[47px] font-bold'>My Account</h1>
          <p className='text-[28px] font-[500]'>{user?.firstName} {user?.lastName}</p>
        </div>
        <Row style={{ borderTop: '1px solid #d4d5d9' }}>
          <Col xs={24} md={6}>
            <AccoutSidebar />
          </Col>
          <Col xs={24} md={18}>
            <div className='md:p-5'>
              {props.children}
            </div>
          </Col>
        </Row>
      </>
    </div>
  )
}
