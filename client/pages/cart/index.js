import React from "react";
import styles from "./cart.module.css";
import { useCart } from "@/context";
import Image from "next/image";
import { Col, InputNumber, Row } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { ButtonComp } from "@/components/Commons/ButtonComp/ButtonComp";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, saveQtyToDb } = useCart();


  return (
    <div className={styles.cart} data-aos="fade-right" data-aos-duration="1000">
      <h1 className={styles.title}>My Cart</h1>
      <Row gutter={[23, 23]}>
        <Col xs={24} md={17}>
          <div className="p-[0px] pt-[17px] md:p-[40px]">
            {
              cart?.length > 0 ?
                cart?.map((prod, index) => {
                  return (
                    <div className={styles.item} key={index}>
                      <div className={styles.crtimg}>
                        <Image src={prod?.pictures[0]?.response?.url} width={100} height={100} alt={prod?.title} />
                      </div>
                      <div className="md:px-4">
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
                      <div>
                        <h6>${parseInt(prod?.price) * parseInt(prod?.qtyToShop)}</h6>
                      </div>
                      <div className={styles.cartEnd}>
                        <DeleteFilled className="text-[19px]" onClick={() => removeFromCart(prod?._id)} />
                      </div>
                    </div>
                  )
                })
                :
                <div className={styles.emptyCart}>
                  <div>
                    <h2 className={styles.subTitle}>
                      Your Cart is Empty!
                    </h2>
                    <ButtonComp text="Start Shopping Now" onClick={() => router.push("/products")} />
                  </div>
                </div>
            }
          </div>
        </Col>
        <Col xs={24} md={7} className={styles.right}>
          <div className="md:p-[40px] mb-10 md:mb-0">
            {/* <div className={styles.promotionCode}>
              <h5>Promotion Code</h5>
              <Search
                placeholder="Enter Promotion Code"
                allowClear
                enterButton="Apply"
                size="large"
              />
            </div> */}
            <h3>Order Details:</h3>
            <div className={styles.orderDetailItem}>
              <h5>Product Total</h5>
              <h5>£{cart?.reduce((a, b) => a + parseInt(b?.price) * parseInt(b?.qtyToShop), 0)}</h5>
            </div>
            <div className={styles.orderDetailItem}>
              <h5>Order Total <br /> <span>(excluding delivery)</span> </h5>
              <h5>£{cart?.reduce((a, b) => a + parseInt(b?.price) * parseInt(b?.qtyToShop), 0)}</h5>
            </div>
            <div>
              <ButtonComp disabled={cart?.length === 0} text="SECURE CHECKOUT" onClick={() => router.push("/checkout")} />
            </div>
          </div>
        </Col>
      </Row>
    </div >
  );
};

export default CartPage;
