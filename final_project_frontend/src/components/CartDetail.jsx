import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function CartDetail() {
  const auth = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  const [taxes, setTaxes] = useState(0);
  const [cartTotal, setCartTotal] = useState(0); // New state for the total
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
        getCart();
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const calculateTotal = () => {
    if (cartData) {
      const totalBeforeTaxes = cartData.reduce(
        (total, item) => total + item.price,
        0
      );
      const calculatedTaxes = totalBeforeTaxes * 0.06; // 6% tax
      setTaxes(calculatedTaxes);
      return totalBeforeTaxes + calculatedTaxes;
    }
    return 0;
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    setCartTotal(calculateTotal());
  }, [cartData]);

  return (
    <CartDiv>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <CartOuterContainer>
          <CartContents>
            <h2>My Cart</h2>
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
                        handleDelete(item.id);
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
            <h2>Checkout</h2>
            <RowItems>
              <p>Items</p>
              <p>${cartTotal.toFixed(2)}</p>
            </RowItems>
            <RowTaxes>
              <p>Taxes (6%)</p>
              <p>${taxes.toFixed(2)}</p>
            </RowTaxes>
            <RowShipping>
              <p>Shipping</p>
              <p>$0.00</p> {/* Replace with your shipping calculation logic */}
            </RowShipping>
            <RowTotal>
              <p>Total</p>
              <p>${cartTotal.toFixed(2)}</p>
            </RowTotal>
          <Button variant="contained">Proceed to Checkout</Button>
          </CartTotal>
        </CartOuterContainer>
      )}
    </CartDiv>
  );
}
