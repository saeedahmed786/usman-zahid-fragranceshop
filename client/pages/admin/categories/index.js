import { CreateMainCategories } from '@/components/Admin/Categories/CreateMainCategories';
import { CreateSubCategories } from '@/components/Admin/Categories/CreateSubCategories';
import { UpdateCategories } from '@/components/Admin/Categories/UpdateCategories';
import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { ErrorAlert, SuccessAlert } from '@/components/Commons/Messages/Messages';
import AdminLayout from '@/components/Layouts/Admin/AdminLayout';
import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./categories.module.css"

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [userAuth, setUserAuth] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/get`).then(res => {
      if (res.statusText === "OK") {
        setCategories(res.data);
        let formatIt = res.data.map(obj => {
          return {
            value: obj._id,
            label: obj.name
          };
        });
        setCategoriesOptions(formatIt);
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
    getAllCategories();
    return () => {
    }
  }, []);

  const updateFunction = () => {
    getAllCategories();
  }

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      if (res.statusText === "OK") {
        SuccessAlert(res.data.successMessage)
        getAllCategories();
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
      render: (_, cat) => (
        <>
          <div className='flex items-center gap-4'>
            <button className='btn p-2' style={{ textDecoration: 'none' }}><UpdateCategories updateFunction={updateFunction} cat={cat} userAuth={userAuth} categories={categoriesOptions} /></button>
            <button className='btn p-2' onClick={() => deleteHandler(cat._id)}><DeleteOutlined /></button>
          </div>
        </>
      ),
    },
  ];

  return (
    <AdminLayout sidebar>
      <div className={styles.categories}>
        {/* Create categories */}
        <h1 className='text-[33px] font-bold'>Categories</h1>
        <div className='flex justify-end gap-4 my-4'>
          <div className={styles.manageCategories}>
            <CreateMainCategories updateFunction={updateFunction} userAuth={userAuth} />
            <CreateSubCategories subCategory updateFunction={updateFunction} userAuth={userAuth} categories={categoriesOptions} />
          </div>
        </div>
        {/* Show categories */}
        <Table loading={loading} expandable={false} columns={columns} pagination={false} dataSource={categories} />
      </div>
    </AdminLayout>
  )
}


export default Categories;