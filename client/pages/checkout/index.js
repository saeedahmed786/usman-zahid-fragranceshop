import React, { useState } from "react";
import styles from "./checkout.module.css";
import { useCart } from "@/context";
import Image from "next/image";
import { Col, Input, InputNumber, Modal, Row } from "antd";
import { ErrorAlert } from "@/components/Commons/Messages/Messages";
import { isAuthenticated } from "@/components/Commons/Auth/Auth";
import { DeleteFilled } from "@ant-design/icons";
import { ButtonComp } from "@/components/Commons/ButtonComp/ButtonComp";
import { useRouter } from "next/router";

const { Search } = Input;

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, saveQtyToDb } = useCart();


  return (
    <div className={styles.checkout} data-aos="fade-right" data-aos-duration="1000">
      <h1 className={styles.title}>Checkout</h1>
      {/* <h1 className={styles.title}>My Checkout</h1>
      <Row gutter={[23, 23]}>
        <Col xs={24} md={17}>
          <div className="p-[40px]">
            {
              cart?.map((prod, index) => {
                return (
                  <div className={styles.item} key={index}>
                    <div className={styles.crtimg}>
                      <Image src={prod?.pictures[0]?.response?.url} width={100} height={100} alt={prod?.title} />
                    </div>
                    <div className="px-4">
                      <h2>
                        {prod?.title}
                      </h2>
                      <h3 className={styles.subTitle}>
                        {prod?.subTitle}
                      </h3>
                      <button className="subj"> {prod?.subject}</button>
                    </div>
                    <div className={styles.qtyContainer}>
                      <h4>Qty</h4>
                      <div>
                        <InputNumber min={1} max={100000} value={prod?.qtyToShop} onChange={(value) => saveQtyToDb(value, prod)} />
                      </div>
                    </div>
                    <div className={styles.checkoutEnd}>
                      <DeleteFilled className="text-[19px]" onClick={() => removeFromCart(prod?._id)} />
                      <h6>${parseInt(prod?.price) * parseInt(prod?.qtyToShop)}</h6>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Col>
        <Col xs={24} md={7} className={styles.right}>
          <div className="p-[40px]">
            <div className={styles.promotionCode}>
              <h5>Promotion Code</h5>
              <Search
                placeholder="Enter Promotion Code"
                allowClear
                enterButton="Apply"
                size="large"
              />
            </div>
            <h3>Order Details:</h3>
            <div className={styles.orderDetailItem}>
              <h5>Product Total</h5>
              <h5>£{cart?.reduce((a, b) => a + b?.price, 0)}</h5>
            </div>
            <div className={styles.orderDetailItem}>
              <h5>Order Total <br /> <span>(excluding delivery)</span> </h5>
              <h5>£{cart?.reduce((a, b) => a + b?.price, 0)}</h5>
            </div>
            <div>
              <ButtonComp text="SECURE CHECKOUT" onClick={() => router.push("/checkout")} />
            </div>
          </div>
        </Col>
      </Row> */}
    </div >
  );
};

export default CheckoutPage;
