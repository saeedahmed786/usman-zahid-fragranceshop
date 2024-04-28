import Image from 'next/image'
import React from 'react'
import LoadingIcon from "../../../public/assets/loading.gif"

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='w-[60px]'>
                <Image src={LoadingIcon} alt="Spinning Tom Nook Loading Icon" width={100} height={100} />
            </div>
        </div>
    )
}

export default Loading;
