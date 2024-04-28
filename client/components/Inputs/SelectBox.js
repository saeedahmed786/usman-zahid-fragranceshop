import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const SelectBoxWidthSearch = ({ label, placeholder, data, handleUpdate, prevValue }) => {
    const [name, setName] = useState('');
    const [defaultValue, setDefaultValue] = useState("");
    const inputRef = useRef(null);

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setDefaultValue(prevValue);

        return () => {

        }
    }, []);

    return (
        <>
            <div className='SelectBox relative'>
                <label>{label}</label>
                <br />
                <Select
                    className='w-full'
                    placeholder={placeholder}
                    options={data?.filter(f => f?.label?.toLowerCase().includes(name?.toLowerCase())).map((item) => ({
                        label: item?.label,
                        value: item?.value
                    }))}
                    value={defaultValue}
                    onChange={(value) => { handleUpdate(value); setDefaultValue(value) }}
                    dropdownRender={(menu) => (
                        <div className='selectDropdown w-full p-4'>
                            <Input
                                suffix={<SearchOutlined />}
                                placeholder={"Write here...."}
                                className='w-full'
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                            />
                            {menu}
                        </div>
                    )}
                />
            </div>
        </>
    )
}

export default SelectBoxWidthSearch
