import styled from "styled-components";

export const CartDiv = styled.div`
    width: 65vw;
    max-width: 1200px;
`

export const CartOuterContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  /* background-color: blue; */

.cart-div {
    width: 1000px;
}

.cart-contents {
    width: 70%;
    text-align: left;

    .cart-item {
      display: flex;
      justify-content: space-between;
      border: solid 1px black;
      height: 150px;
    }
    .cart-img {
      width: 125px;
      height: 125px;
      padding: 0;
      margin: 0;

      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
  }

  .cart-total {
    width: 30%;
    text-align: right;
  }
`;
