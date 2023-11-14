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
import { CartOuterContainer } from "./GlobalStyles/StyleCart";

export default function CartDetail() {
  const auth = localStorage.getItem("access_token");
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
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
      const data = await response.json();
      setCartData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // cartData is all cart data in the table
  console.log(cartData);

  useEffect(() => {
    getCart();
  }, [location.pathname, location.state]);

  // Filter cartData according to user_id matching local storage
  useEffect(() => {
    if (cartData) {
      const filteredCart = cartData.filter(
        (cart) => cart.user_id == localStorage.getItem("userId")
      );
      console.log(filteredCart);
    }
    
  });

  //     // Now, 'filteredData' contains only items matching the logged-in user's ID
  //     setFilteredData(filteredData);
  //     // console.log(filteredData);
  //     // console.log(data);
  //     console.log(filteredData);
  //   }
  // }, [cartData]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CartOuterContainer>
          <h3>My Cart</h3>
          <div key={filteredData.id} className="cart-contents">
            {filteredData.map((data, index) => (
              <div className="cart-item" key={index}>
                <div className="col-1">Column 1</div>
                <div className="col-2">Column 2</div>
                <div className="col-3">Column 3</div>
              </div>
            ))}
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
    </div>
  );
}
// const getIndividualListing = async () => {
//   try {
//     const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     setCartDetail(data);
//     console.log(data);
//   } catch (error) {
//     // console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// useEffect(() => {
//   getIndividualListing();
// }, []);

// const handleAddToCart = (e) => {
//   e.preventDefault();

//   const url = "http://127.0.0.1:8000/cart/";
//   const data = fetch(url, {
//       method: "POST",
//       headers: {
//           Authorization: `Bearer ${auth}`,
//       },
//       body: json,
//   })
//   setCartDetail(null);

// }
// export default function CartDetail() {
//   const auth = localStorage.getItem("access_token");
//   const [listingDetail, setListingDetail] = useState(null);
//   const navigate = useNavigate();
//   const revalidator = useRevalidator();
//   const updateForm = useRef(null);
// //   const products = [];

//   const MyCart = ({ products }) => {
//     const [cart, setCart] = useState([]);

//     const addToCart = (listingDetail.id) => {
//         const product = products.find((p) = p.id === listingDetail.id);
//         if (product) {
//             setCart([...cart, product]);
//         }
//     }
//   }

//   const getIndividualListing = async () => {
//     try {
//       const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       setListingDetail(data);
//       console.log(data);
//       // console.log(listingDetail);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       // setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getIndividualListing();
//   }, []);

//   return <>Cart under construction</>;
// }
