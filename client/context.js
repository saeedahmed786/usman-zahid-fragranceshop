import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { ErrorAlert, SuccessAlert } from './components/Commons/Messages/Messages';
import { isAuthenticated } from './components/Commons/Auth/Auth';


const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = async (data) => {
        if (isAuthenticated()) {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`, data, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    SuccessAlert(res.data.successMessage);
                    getCartProducts();
                }
                else {
                    ErrorAlert(res.data.errorMessage)
                }
            }).catch(err => {
                console.log(err)
                ErrorAlert(err?.message);
            })
        } else {
            ErrorAlert("Please login to add to cart");
        }
    };

    const removeFromCart = async (cartId) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/delete/${cartId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage);
                getCartProducts();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    };

    const getCartProducts = async () => {
        if (isAuthenticated()) {
            await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/get`, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    setCart(res.data?.products);
                }
                else if (res.status === 201) {
                    setCart([]);
                } else {
                    ErrorAlert(res.data.errorMessage);
                }
            }).catch(err => {
                console.log(err)
                ErrorAlert(err?.message);
            })
        }
    }

    const clearCart = async () => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/empty`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessAlert(res.data.successMessage)
                getCartProducts();
            } else {
                ErrorAlert(res.data.errorMessage)
            }
        }).catch(err => {
            console.log(err)
            ErrorAlert(err?.message);
        })
    };


    const saveQtyToDb = async (qty, product) => {
        if (qty > product?.qty - 1) {
            ErrorAlert('Product out of stock!')
        } else {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/update/qty/${product?._id}`, { qtyToShop: qty, userId: isAuthenticated()?._id, productId: product?._id }, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    // SuccessAlert(res.data.successMessage);
                    getCartProducts();
                } else {
                    ErrorAlert(res.data.errorMessage);
                }
            })
        }
    }


    useEffect(() => {
        getCartProducts();

        return () => {

        }
    }, []);


    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                saveQtyToDb
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}