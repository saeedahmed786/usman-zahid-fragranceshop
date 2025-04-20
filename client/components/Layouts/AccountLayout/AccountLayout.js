import React from 'react'
import { Col, Row } from 'antd';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { AccoutSidebar } from './AccountSideBar';

export const AccountLayout = (props) => {
  const user = isAuthenticated();

  return (
    <div>
      <>
        <div className='ml-[40px] mt-[40px]'>
          <h1 className='text-[47px] font-bold'>My Account</h1>
          <p className='text-[28px] font-[500]'>{user?.firstName} {user?.lastName}</p>
        </div>
        <Row className='ml-[40px] mt-[40px]' style={{ borderTop: '1px solid #d4d5d9' }}>
          <Col xs={6}>
            <AccoutSidebar />
          </Col>
          <Col xs={18}>
            <div className='p-5'>
              {props.children}
            </div>
          </Col>
        </Row>
      </>
    </div>
  )
}
