import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import { useCart } from "@/context";
import { Col, Form, Input, Row } from "antd";
import { ErrorAlert, SuccessAlert } from "@/components/Commons/Messages/Messages";
import { ButtonComp } from "@/components/Commons/ButtonComp/ButtonComp";
import { useRouter } from "next/router";
import moment from "moment";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeForm } from "@/components/Payments/StripeForm";
import axios from "axios";
import Loading from "@/components/Commons/Loading/Loading";
import { isAuthenticated } from "@/components/Commons/Auth/Auth";

const { Search } = Input;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [address, setAddress] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const { cart, clearCart } = useCart();

  const totalAmount = cart?.reduce((a, b) => a + parseInt(b?.price) * parseInt(b?.qtyToShop), 0);
  const deliveryFee = totalAmount > 50 ? 0 : 3.95;

  const transactionSuccess = async (data) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/place-order`, { placed: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), totalPrice: totalAmount + deliveryFee, user: isAuthenticated(), cartProducts: cart, address, paymentData: data }
      , {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          clearCart();
          SuccessAlert(res.data.successMessage);
          setTimeout(() => {
            router.push('/account/orders');
          }, 2000);
        } else {
          ErrorAlert(res.data.errorMessage)
        }
      }).catch(err => {
        setLoading(false);
        console.log(err)
        ErrorAlert(err?.message);
      })

  }

  const createPaymentIntent = async (price) => {
    if (price > 0) {
      setStripeLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/create-payment-intent`, { totalPrice: price }, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res) => {
        setClientSecret(res.data.clientSecret);
        setStripeLoading(false)
      }).catch(err => {
        setStripeLoading(false);
        console.log(err)
        ErrorAlert(err?.message);
      })
    } else {
      // router.push("/cart");
    }
  }

  useEffect(() => {
    if (cart?.length > 0) {
      createPaymentIntent(totalAmount + deliveryFee);
    } else {
      router.push("/cart");
    }

    return () => {

    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  }

  const onFinish = (values) => {
    setAddress(values);
    setShowPayment(true);
  }

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>Checkout</h1>
      <Row gutter={[23, 23]}>
        <Col xs={24} md={17}>
          <div className="p-[17px] md:p-[40px]" style={{ maxWidth: 800 }}>
            <div>
              <h2 className="mb-8">Address Details: </h2>
              <Form
                layout="vertical"
                form={form}
                name="nest-messages"
                className={styles.form}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder='Enter email' />
                </Form.Item>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Full Name!',
                    },
                  ]}
                >
                  <Input placeholder='Enter Full Name' />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Phone!',
                    },
                  ]}
                >
                  <Input placeholder='Enter Phone' />
                </Form.Item>
                <Form.Item
                  name="postalCode"
                  label="Postal Code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Postal Code!',
                    },
                  ]}
                >
                  <Input placeholder='Enter Postal Code' />
                </Form.Item>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your City!',
                    },
                  ]}
                >
                  <Input placeholder='Enter City' />
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your State!',
                    },
                  ]}
                >
                  <Input placeholder='Enter State' />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Country!',
                    },
                  ]}
                >
                  <Input placeholder='Enter Country' />
                </Form.Item>
                <Form.Item className="mt-10">
                  <ButtonComp type='submit' text="MAKE PAYMENT" loading={loading} disabled={loading} />
                </Form.Item>
              </Form>
            </div>
            {
              showPayment &&
              (
                <>
                  <h2 className="text-[28px]">Please pay total amount of <b>£{totalAmount}</b> to process your order.</h2>
                  {
                    stripeLoading ?
                      <Loading />
                      :
                      clientSecret &&
                      (
                        <div>
                          <Elements options={options} stripe={stripePromise}>
                            <StripeForm totalPrice={parseInt(totalAmount + deliveryFee)} placeOrder={transactionSuccess} />
                          </Elements>
                        </div>
                      )
                  }
                </>
              )
            }
          </div>
        </Col>
        <Col xs={24} md={7} className={styles.right}>
          <div className="p-[17px] md:p-[40px] mb-10 md:mb-0">
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
              <h5>£{totalAmount}</h5>
            </div>
            <div className={styles.orderDetailItem}>
              <h5>Delivery Fee</h5>
              <h5>£{deliveryFee}</h5>
            </div>
            <div className={styles.orderDetailItem}>
              <h5>Order Total <br /> <span>(excluding delivery)</span> </h5>
              <h5>£{totalAmount + deliveryFee}</h5>
            </div>
            <div>
              <ButtonComp text="BACK" onClick={() => router.push("/cart")} />
            </div>
          </div>
        </Col>
      </Row>
    </div >
  );
};

export default CheckoutPage;
