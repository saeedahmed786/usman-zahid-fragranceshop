import { CreateBrands } from '@/components/Admin/Brands/CreateBrands';
import { UpdateBrands } from '@/components/Admin/Brands/UpdateBrands';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./brands.module.css"

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [userAuth, setUserAuth] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllBrands = async () => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands/get`).then(res => {
      setLoading(false);
      if (res.statusText === "OK") {
        setBrands(res.data);
      } else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
      ErrorAlert(err?.message);
    })
  }

  useEffect(() => {
    setUserAuth(isAuthenticated());
    getAllBrands();
    return () => {
    }
  }, []);

  const updateFunction = () => {
    getAllBrands();
  }

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      if (res.statusText === "OK") {
        SuccessAlert(res.data.successMessage)
        getAllBrands();
      } else {
        ErrorAlert(res.data.errorMessage)
      }
    }).catch(err => {
      console.log(err)
      ErrorAlert(err?.message);
    })
  }


  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      sorter: (a, b) => a._id.length - b._id.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Picture',
      sorter: false,
      render: (_, { picture }) => (
        <>
          <div className='nameAndPic w-full flex justify-between'>
            <div className='flex items-center gap-2'>
              <div className='profileImg'>
                {
                  picture?.response ?
                    <img src={picture?.response?.url} alt="Category" className="w-[60px] h-[60px] rounded-[50%]" />
                    :
                    <div>No picture</div>
                }
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Actions',
      render: (_, brand) => (
        <>
          <div className='flex items-center gap-4'>
            <UpdateBrands updateFunction={updateFunction} brand={brand} userAuth={userAuth} />
            <DeleteOutlined onClick={() => deleteHandler(brand._id)} />
          </div>
        </>
      ),
    },
  ];

  return (
    <AdminLayout sidebar>
      <div className={styles.brands}>
        {/* Create brands */}
        <h1 className='text-[33px] font-bold'>Brands</h1>
        <div className='flex justify-end gap-4 my-4'>
          <div className={styles.manageBrands}>
            <CreateBrands updateFunction={updateFunction} userAuth={userAuth} />
          </div>
        </div>
        {/* Show brands */}
        <Table loading={loading} expandable={false} columns={columns} pagination={false} dataSource={brands} />
      </div>
    </AdminLayout>
  )
}


export default Brands;