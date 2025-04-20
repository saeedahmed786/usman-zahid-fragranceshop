import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Button, Input, Select } from 'antd';
import { ErrorAlert, SuccessAlert } from "@/components/Commons/Messages/Messages";
import DragUpload from "@/components/Commons/DragUpload/DragUpload";


export const UpdateCategories = ({ updateFunction, cat, categories, subCategory }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    picture: ''
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  }

  console.log(formData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/update/${cat._id}`, formData, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    )
      .then((res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          SuccessAlert(res.data.successMessage);
          updateFunction();
          handleCancel();
        } else {
          ErrorAlert(res.data.errorMessage);
        }
      }).catch(err => {
        setLoading(false);
        console.log(err)
        ErrorAlert(err?.message);
      })
  };

  useEffect(() => {
    setFormData(cat);


    return () => {

    }
  }, [cat]);


  return (
    <div>
      <button className="btn" onClick={showModal}><EditOutlined /></button>
      <Modal destroyOnClose title="Update Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        <form className="create-posts" onSubmit={submitHandler}>
          {
            formData?.parentId &&
            <div className="mt-4">
              <Select value={formData?.parentId} className="w-full" placeholder="Choose parent category" onChange={(val) => handleChange("parentId", val)} options={categories} />
            </div>
          }
          <div className="mt-4">
            <Input
              required
              type="text"
              className="form-control"
              value={formData?.name}
              placeholder="Enter Title"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mt-4 text-left">
            <DragUpload value={formData?.picture && [formData?.picture]} noMultiple={true} updateFiles={(val) => handleChange("picture", val[0])} />
          </div>
          <div style={{ marginTop: '15px' }}>
            <Button type='primary' htmlType="submit" loading={loading} disabled={loading} className="mt-4">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};