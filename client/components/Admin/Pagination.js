import { RightOutlined } from '@ant-design/icons';
import Pagination from 'rc-pagination'
import React, { useState } from 'react'

const AdminPagination = ({ totalLength, handlePagination }) => {
    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <button className='prevBtn' style={{ transform: "rotate(180deg)" }}><RightOutlined /></button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'><RightOutlined /></button>;
        }
        return originalElement;
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize);
        // let filterData = filterData.slice((page - 1) * pageSize, page * pageSize);
        handlePagination(page)
    }

    return (
        <div className='AdminPagination'>
            <Pagination
                onChange={PaginationChange}
                total={totalLength}
                current={current}
                pageSize={size}
                itemRender={itemRender}
                showSizeChanger={false} />
        </div>
    )
}

export default AdminPagination
