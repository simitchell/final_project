import React from "react";
import { useEffect, useRef, useState } from "react";
import { useRevalidator, useParams, useNavigate, json } from "react-router-dom";
import { Button } from "../components/GlobalStyles/StyleUtility";
import { Form } from "../components/GlobalStyles/StyleUtility";

export default function CartDetail() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartDetail, setCartDetail] = useState(null);

  const getIndividualListing = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/listing/${id}/`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCartDetail(data);
      console.log(data);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualListing();
  }, []);


  const handleAddToCart = (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:8000/cart/";
    const data = fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${auth}`,
        },
        body: json,
    })
    setCartDetail(null);


  }

  return (
    <>
    cart under constructsh.
    </>
  )

}

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
