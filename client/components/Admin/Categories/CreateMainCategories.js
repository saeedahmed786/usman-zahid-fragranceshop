import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Button, Input } from "antd";
import { ErrorAlert, SuccessAlert } from "@/components/Commons/Messages/Messages";
import DragUpload from "@/components/Commons/DragUpload/DragUpload";

export const CreateMainCategories = ({ updateFunction }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/main/create`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then((res) => {
        setLoading(false);
        if (res.statusText === "OK") {
          SuccessAlert(res.data.successMessage);
          updateFunction();
          handleCancel();
        } else {
          ErrorAlert(res.data.errorMessage)
        }
      }).catch(err => {
        setLoading(false);
        console.log(err)
        ErrorAlert(err?.message);
      })
  };

  return (
    <div>
      <button className='rounded-[12px] text-white h-[48px] px-6' onClick={showModal}>Create Category</button>
      <Modal destroyOnClose title="New Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        <form onSubmit={submitHandler} className="text-center create-posts">
          <div className="mt-4">
            <Input
              required
              type="text"
              className="form-control"
              placeholder="Enter Category Title"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mt-4 text-left">
            <DragUpload noMultiple={true} updateFiles={(val) => handleChange("picture", val[0])} />
          </div>
          <div style={{ marginTop: '15px' }}>
            <Button type='primary' htmlType="submit" loading={loading} disabled={loading} className="mt-4">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};