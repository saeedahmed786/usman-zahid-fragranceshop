import React, { useState } from 'react'
import { Modal } from 'antd'
import Image from 'next/image'
import { CloseOutlined } from '@ant-design/icons';
import { BsTrash } from 'react-icons/bs';

const DeleteModal = ({ deleteBtn, deleteFun, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='p-0' onClick={showModal}>
                {deleteBtn}
            </button>
            <Modal centered className='deleteModal' title={false} footer={false} visible={isModalOpen} onCancel={handleCancel}>
                <div>
                    <div className='text-end closeIcon'>
                        <button onClick={handleCancel}>
                            <CloseOutlined />
                        </button>
                    </div>
                    <div className='text-center'>
                        <BsTrash />
                        <h2 className='mt-4'>
                            Are you sure you want to delete?
                        </h2>
                        <div className='mt-8 flex justify-between gap-4'>
                            <button onClick={() => { deleteFun(id); handleCancel }}>Yes</button>
                            <button onClick={handleCancel}>No</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal
