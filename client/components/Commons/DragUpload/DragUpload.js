import React, { useEffect, useState } from 'react';
import styles from "./Dragger.module.css";
import { message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const DragUpload = ({ updateFiles, value, noMultiple }) => {
    const [fileList, setFileList] = useState(value);
    const [uploading, setUploading] = useState(false);

    const props = {
        name: 'file',
        multiple: true,
        action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload`,
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            setUploading(true);
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
                setUploading(false)
            }
            if (status === 'done') {
                // let getOnlyResponse = info?.fileList.map(i => i.response);
                updateFiles(info?.fileList);
                setFileList(info?.fileList)
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        if (value?.length > 0) {
            setFileList(value)
        }

        return () => {

        }
    }, [])


    return (
        <div>
            <Dragger maxCount={noMultiple ? 1 : 10} {...props} className={styles.dragger} defaultFileList={fileList} showUploadList previewFile={true}>
                <div className='flex justify-center gap-3'>
                    <UploadOutlined />
                    <div className="text-[14px] font-[600] flex items-center justify-center w-auto gap-1">
                        <div className='text-[#1796E3]'>Click to upload pictures</div>
                        <div>or drag and drop</div>
                    </div>
                </div>
            </Dragger>
        </div>
    );
}
export default DragUpload;
