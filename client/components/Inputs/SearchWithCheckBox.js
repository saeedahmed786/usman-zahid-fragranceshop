import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Select } from 'antd';
import React, { useRef, useState } from 'react'


const Option = Select;


const SearchWithCheckBox = ({ data, label, placeholder, handleUpdate }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const inputRef = useRef(null);
    const [name, setName] = useState('');

    const handleChange = (value) => {
        if (selectedValue !== null && selectedValue !== undefined && selectedValue === value) {
            setSelectedValue("");
            handleUpdate("");
        } else {
            setSelectedValue(value);
            handleUpdate(value);
        }
    }

    console.log(selectedValue)

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div className='SelectBox relative bg-transparent'>
            <label>{label}</label>
            <br />
            <Select
                className='w-full'
                placeholder={placeholder}
                clearIcon={true}
                mode="single"
                value={selectedValue}
                dropdownRender={(menu) => (
                    <div className='selectDropdown w-full p-4' style={{ zIndex: "1000" }}>
                        <Input
                            suffix={<SearchOutlined />}
                            placeholder="Write here...."
                            className='w-full'
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                        />
                        {menu}
                    </div>
                )}
            >
                {data?.filter(f => f?.toLowerCase().includes(name?.toLowerCase())).map((option) => (
                    <Option key={option} value={option}>
                        <Checkbox onChange={(e) => e.target.checked ? handleChange(option) : setSelectedValue("")} checked={selectedValue === option}></Checkbox><span className='px-2'>{option}</span>
                    </Option>
                ))}
            </Select>
        </div >
    );
}

export default SearchWithCheckBox
