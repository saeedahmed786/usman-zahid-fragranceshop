import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

const SearchInputs = ({ handleUpdate }) => {
    return (
        <div className='searchBox relative'>
            <input placeholder='text' onChange={(e) => handleUpdate(e.target.value)} className='w-full' />
            <div className='absolute right-4 top-4'>
                <SearchOutlined />
            </div>
        </div>
    )
}

export default SearchInputs
