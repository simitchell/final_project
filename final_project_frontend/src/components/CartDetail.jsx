import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useRevalidator,
  useParams,
  useNavigate,
  json,
} from "react-router-dom";
import { Button } from "../components/GlobalStyles/StyleUtility";
import { Form } from "../components/GlobalStyles/StyleUtility";
import { CartDiv, CartOuterContainer } from "./GlobalStyles/StyleCart";

export default function CartDetail() {
  const auth = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  // const [filteredCart, setFilteredCart] = useState([]);
  const location = useLocation();

  const getCart = async () => {
    try {
      const apiUrl = "http://127.0.0.1:8000/cart/";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      // console.log({ response });
      if (response.ok) {
        const data = await response.json();
        const filteredCart = data.filter(
          (cart) => cart.user_id == localStorage.getItem("userId")
        );
        setCartData(filteredCart);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // cartData is all cart data in the table
  // console.log(cartData);

  useEffect(() => {
    getCart();
  }, []);

  // Filter cartData according to user_id matching local storage
  // useEffect(() => {
  //   if (cartData) {
  //     const filteredCart = cartData.filter(
  //       (cart) => cart.user_id == localStorage.getItem("userId")
  //     );
  //     console.log(filteredCart);
  //     setFilteredData(filteredCart);
  //   }
  // }, []);

  return (
    <CartDiv>
      <h3>My Cart</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CartOuterContainer>
          <div className="cart-contents">
            {cartData?.map((item) => {
              return (
                <div className="cart-item" key={item.id}>
                  <div className="cart-img">
                    <img src={item.image_url} />
                  </div>
                  <div className="col-2">{item.cart_item}</div>
                  <div className="col-3">Item Price</div>
                </div>
              );
            })}
          </div>

          <div className="cart-total">
            <h3>Total</h3>
            <div className="row-items">Items row</div>
            <div className="row-taxes">Taxes row</div>
            <div className="row-sh">Shipping row</div>
            <div className="row-total">Total row</div>
          </div>
        </CartOuterContainer>
      )}
    </CartDiv>
  );
}
