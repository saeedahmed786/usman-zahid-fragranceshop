import React, { useEffect, useState } from "react";
import "./ArtDetails.css";
import { Link, useParams } from "react-router-dom";
import Cart from "../../Components/Assets/Cart.JPG";
import { HeartFilled, HeartOutlined, StarOutlined } from "@ant-design/icons";
import ArtComp from "../../Components/Artwork/ArtComp/ArtComp";
import axios from "axios";
import { Error, Success } from "../../Components/Messages/messages";
import { isAuthenticated } from "../../Components/Auth/auth";
import LayoutImg from "../../Components/Artwork/ArtComp/LayoutImg/LayoutImg";
import { Affix, Button } from "antd";

const ArtDetails = () => {
  const params = useParams();
  const [listingDetails, setListingDetails] = useState({});
  const [listingsArray, setListingsArray] = useState([]);
  const [addedToWishList, setAddedToWishList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [container, setContainer] = React.useState(null);

  const getListing = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/product/${params?.id}`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setListingDetails(res.data);
        getRelatedListings(res.data?.seller?._id)
      }
      else {
        Error(res.data.errorMessage);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getRelatedListings = async (id) => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/get/related/${id}`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setListingsArray(res.data?.filter(f => f?._id !== params.id));
      }
      else {
        Error(res.data.errorMessage);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const addToCart = async () => {
    if (isAuthenticated()) {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add`, listingDetails, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then((res) => {
        setLoading(false);
        if (res.status === 200) {
          Success(res.data?.successMessage);
        }
        else {
          Error(res.data.errorMessage);
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      Error("Please login to add to cart");
    }
  }

  const addToWishlist = async () => {
    if (isAuthenticated()) {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/wishlist/add`, listingDetails, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then((res) => {
        setLoading(false);
        if (res.status === 200) {
          Success(res.data?.successMessage);
          setAddedToWishList(true);
        }
        else {
          Error(res.data.errorMessage);
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      Error("Please login to add to wishlist");
    }
  }

  useEffect(() => {
    getListing();

    return () => {

    }
  }, [params]);

  return (
    <div className="ship" data-aos="fade-right" data-aos-duration="1000">
      <div className="d-flex links">
        {" "}
        <Link to="/">Home</Link>
        <span className="sp px-4">/</span>
        <Link to="#">Shipping</Link>
      </div>
      <div className="d-flex headlist my-3 mb-5">
        <h1>Shipping</h1>
      </div>
      {
        listingDetails &&
        <div>
          <div className="row">
            {/* {listingDetails?.pictures?.length > 0 && */}
            <div className="col-md-6 pl1" data-aos="zoom-out" data-aos-duration="1000">
              {
                listingDetails?.pictures?.map(picture => {
                  return (
                    <div className="mb-5">
                      <LayoutImg img1={picture?.url} />
                    </div>
                  )
                })
              }
              {/* <img src={listingDetails?.pictures[0]?.url} alt="Listing" className="ship-img" /> */}
            </div>
            {/* } */}
            <div className="col-md-6 pl2 rightCont" data-aos="fade-left" data-aos-duration="3000">
              <div className="sticky-right-container">
                <div className="d-flex flex-wrap mb-4">
                  <img src={Cart} alt="Listing" className="prof-img" />
                  <p className="jula">
                    Julie Anne <StarOutlined className="ml1" />
                    <StarOutlined />
                    <StarOutlined />
                    <StarOutlined />
                    <StarOutlined />
                    <StarOutlined />
                  </p>
                </div>
                <div className="chicken">
                  <h4 className="">{listingDetails?.title}</h4>
                  <button className="subj"> {listingDetails?.subject}</button>
                </div>{" "}
                <div className="mt-3">
                  <Link to="#" className="more">
                    {" "}
                    + More details
                  </Link>
                </div>
                <div className="d-flex £1">
                  <h3 className=" £9  fw-bold"> £{listingDetails?.price}</h3>
                  <h3 className=" £9 mx-5"> £{listingDetails?.originalPrice}</h3>
                </div>
                <div className="btns">
                  <button className="btn-primary" onClick={addToCart}>Buy Now</button>
                  <button className="btn-contact">
                    <Link to={`/inbox?receiverId=${listingDetails?.seller?._id}`}>Contact {listingDetails?.seller?.firstName} {listingDetails?.seller?.lastName}</Link>
                  </button>
                  <button className="btn-wish">
                    <button className="btn text-white" onClick={addToWishlist}>
                      {" "}
                      <span className="heart mx-2">
                        {
                          addedToWishList ?
                            <HeartFilled />
                            :
                            <HeartOutlined />
                        }
                      </span>
                      Add to Wishlist
                    </button>
                  </button>
                </div>
                <h6 className="h-ship">Shipping : {listingDetails?.shippingDetails ? "Included" : "Not Included"}</h6>
                <hr />
                <button className="btn-report">
                  <Link to="#"> Report a problem</Link>
                </button>
              </div>
            </div>
          </div>
          <div data-aos="zoom-out" data-aos-duration="1000">
            <h4 className="desc">Description</h4>
            <p className="mb-5">
              {listingDetails?.description}
            </p>
            {/* <p className="my-3">I love color and mixing patterns together.</p>
        <p className="mb-5">Sign and sent with a certificate of authenticity.</p> */}
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Material</th>
                  <th scope="col">Dimensions</th>
                  <th scope="col">Style</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paper</td>
                  <td>10cm x 10cm</td>
                  <td>{listingDetails?.tags}</td>
                </tr>
              </tbody>
            </table>
            <table className="table my-3">
              <thead>
                <tr>
                  <th scope="col">Subject</th>
                  <th scope="col">{listingDetails?.subject}</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Animals and Birds</td>
                  <td>No</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="other">
            <div className="d-flex justify-content-center m">
              <img src={Cart} className="d-img" alt="img" />
            </div>
            <h5 className="text-center o-list py-3">
              Other Listing from {listingDetails?.seller?.firstName} {listingDetails?.seller?.lastName}
            </h5>

            <div className="row row-cols-1 row-cols-md-4 g-2 my-3 mb-5">
              {
                listingsArray?.map((product) => (
                  <div data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="2000">
                    <ArtComp product={product} />
                  </div>
                ))
              }
            </div>
            <div className="d-flex justify-content-center">
              <button className="see-btn btn-primary">See more</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ArtDetails;
