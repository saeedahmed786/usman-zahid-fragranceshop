import { Input, Modal } from 'antd';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './DiscountModal.module.css'
import sale from "../../../public/assets/off.jpeg"
import { ButtonComp } from '../ButtonComp/ButtonComp';
import { useRouter } from 'next/router';

export const DiscountModal = ({ }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("firstVisit")) {
      setTimeout(() => {
        showModal();
        localStorage.setItem("firstVisit", "false")
      }, 2000);
    }

    return () => {

    }
  }, [])


  return (
    <Modal title={false} className={styles.DiscountModal} footer={false} open={isModalOpen} onCancel={handleCancel}>
      <div className={styles.inner}>
        <Image width={100} height={100} src={sale} />
        <div>
          <h2>Exclusive Discount 10% OFF for first signing up</h2>
          <p>You can discover the perfect perfume or aftershave is an effortless journey with Fragrance Match, our innovative online quiz designed to help you pinpoint your ideal scent. </p>
          <div className='mt-4'>
            <label className='text-black'>Enter your email to get started</label>
            <Input placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mt-3'>
            <ButtonComp text="Submit" onClick={() => router.push(`/signup?email=${email}`)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
