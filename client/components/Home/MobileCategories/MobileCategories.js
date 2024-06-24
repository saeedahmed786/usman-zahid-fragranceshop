import React, { useState } from 'react';
import { Cascader, Drawer, Flex } from 'antd';
import { useRouter } from 'next/router';
import { MenuFoldOutlined } from '@ant-design/icons';

const MobileCategories = ({ data }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onChange = (value) => {
        router.push(`products?category=${value[value?.length - 1]}`);
        onClose();
    };


    return (
        <div>
            <button className='text-white' onClick={showDrawer}>
                <MenuFoldOutlined className='text-[23px]' />
            </button>
            <Drawer className='navDrawer' placement='left' title="Categories" onClose={onClose} open={open}>
                <Flex vertical gap="small" align="flex-start">
                    <Cascader.Panel options={data} onChange={onChange} />
                </Flex>
            </Drawer>
        </div>
    )
};
export default MobileCategories;