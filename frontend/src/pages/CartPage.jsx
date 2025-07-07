
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState ("");
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();
  const [razorpayKeyId, setRazorpayKeyId] = useState(null); // Razorpay key ID state
 

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");

      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePaymentBraintree = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // // Fetch Razorpay Key ID
  // const getRazorpayKeyId = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/razorpay/keyid");
  //     setRazorpayKeyId(data?.key_id); // Set the key ID
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (auth?.token) {
  //     getRazorpayKeyId(); // Fetch the Razorpay Key ID when the user is authenticated
  //   }
  // }, [auth?.token]);

//   // Total price of items in the cart
//   const totalPrice = () => {
//     let total = 0;
//     cart?.forEach((item) => {
//       total += item.price;
//     });
//     return total.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//     });
//   };
// // //////////
 
//   const handlePaymentRazorpay = async () => {
//   try {
//     setLoading(true);

//     // Calculate total price
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.price;
//     });

//     // Request order creation from backend
//     const { data } = await axios.post("/api/v1/product/razorpay/payment", { cart });

//     const options = {
//       key: razorpayKeyId, // Use Razorpay key ID
//       amount: data.amount, // Amount in paise
//       currency: data.currency, // Currency
//       order_id: data.id, // Order ID from backend
//       handler: async function (response) {
//         console.log("Razorpay Response:", response); // Log the entire response

//         const { razorpay_payment_id, order_id } = response; // Change from payment_id to razorpay_payment_id
//          if (!razorpay_payment_id || !order_id) {
//            console.error("Payment ID or Order ID is missing");
//            toast.error("Payment failed: Missing payment details");
//            return;
//           }

//   console.log("Payment ID:", razorpay_payment_id);
//   console.log("Order ID:", order_id);

//         console.log("Payment ID:", payment_id);
//         console.log("Order ID:", order_id);

//         // Send payment details to backend for verification and saving
//          try {
//           const paymentResponse = await axios.post("/api/v1/product/razorpay/payment", {
//            payment_id: razorpay_payment_id, // Send the razorpay_payment_id
//            order_id: data.id,
//            cart,
//          });
//           if (paymentResponse.data.ok) {
//             setLoading(false);
//             localStorage.removeItem("cart");
//             setCart([]);
//             navigate("/dashboard/user/orders");
//             toast.success("Payment Completed Successfully");
//           } else {
//             toast.error("Payment Verification Failed");
//           }
//         } catch (error) {
//           console.error("Payment API Error:", error);
//           toast.error("Payment Verification Failed");
//         }
//       },
//       theme: {
//         color: "#F37254", // Optional theme color
//       },
//     };
//     // Open Razorpay payment modal
//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   } catch (error) {
//     console.error("Error in Payment Process:", error);
//     setLoading(false);
//     toast.error("Payment Failed");
//   }
// };


  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.user?.name}`}
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-7">
              {cart?.map((item) => (
                <div key={item._id} className="row card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                      width="100%"
                      // height="130px"
                      // width="10%"
                      height="70%"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{item.name}</p>
                    <p>{item.description ? item.description.substring(0, 30) : "No description available"}</p>
                    {/* <p>{item.description.substring(0, 30)}</p> */}
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <div className="col-md-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}

              

              {/* For RAZORPAY */}
              {/* <div className="mt-2">
                {!razorpayKeyId || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handlePaymentRazorpay}
                    disabled={loading || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                )}
              </div> */}

               {/* FOR BRAINTREE PAYMENT GATEWAY */}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                        
                          // googlePay: {
                          //    merchantInfo: {
                          //      merchantName: 'Sonali',
                          //      merchantId: 'cyfssx42szp3v4jx', // Double-check this ID
                          //    },
                          //    allowedPaymentMethods:['CARD'], 
                          //     transactionInfo: {
                          //      totalPriceStatus: 'FINAL',
                          //       totalPrice: totalPrice().replace('₹', '').trim(), // Pass the price dynamically
                          //      currencyCode: 'INR', // Check if INR is supported
                          //    },
                            
                          //  },                        
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
      
                    <button
                      className="btn btn-primary"
                      onClick={ handlePaymentBraintree}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"} 
                    </button>
                  </>
                )}
              </div>

            

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;











