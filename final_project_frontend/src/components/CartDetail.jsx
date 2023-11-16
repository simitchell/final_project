import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useRevalidator,
  useParams,
  useNavigate,
  json,
} from "react-router-dom";
// import { Button } from "../components/GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import {
  CartButton,
  CartContents,
  CartDiv,
  CartItem,
  CartItemDesc,
  CartItemPrice,
  CartImg,
  CartOuterContainer,
  CartTotal,
  RowItems,
  RowTaxes,
  RowShipping,
  RowTotal,
} from "./GlobalStyles/StyleCart";
import CircularProgress from "@mui/material/CircularProgress";


export default function CartDetail() {
  const auth = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
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

  const handleDelete = async (id) => {
    const apiUrl = `http://127.0.0.1:8000/cart/item/${id}/`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        // setListingDetail(null);
        getCart();
        // navigate("/profile");
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  // cartData is all cart data in the table
  // console.log(cartData);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartDiv>
      <h3>My Cart</h3>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <CartOuterContainer>
          <CartContents>
            {cartData?.map((item) => (
              <div key={item.id}>
                <CartItem>
                  <CartButton>
                    <Button
                      variant="contained"
                      color="error"
                      type="button"
                      id="deleteButton"
                      onClick={() => {
                        handleDelete(item.id); // Pass the item id to handleDelete
                      }}
                    >
                      Remove
                    </Button>
                  </CartButton>
                  <CartImg>
                    <img src={item.image_url} alt={item.cart_item} />
                  </CartImg>
                  <CartItemDesc>{item.cart_item}</CartItemDesc>
                  <CartItemPrice>${item.price}</CartItemPrice>
                </CartItem>
              </div>
            ))}
          </CartContents>
          <CartTotal>
            <h3>Checkout</h3>
            <RowItems>
              <p>Items</p>
              <p>$ number</p>
            </RowItems>
            <RowTaxes>
              <p>Taxes</p>
              <p>$ number</p>
            </RowTaxes>
            <RowShipping>
              <p>Shipping</p>
              <p>$ number</p>
            </RowShipping>
            <RowTotal>
              <p>Total</p>
              <p>$ number</p>
            </RowTotal>
          </CartTotal>
        </CartOuterContainer>
      )}
    </CartDiv>
  );
}
