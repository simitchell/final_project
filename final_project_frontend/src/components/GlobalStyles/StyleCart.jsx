import styled from "styled-components";

export const CartDiv = styled.div`
  width: 100vw;
  /* max-width: 1200px; */
  /* width: 1000px; */
  h3 {
    max-width: 65ch;
    justify-content: space-around;
    margin: auto auto 3rem auto;
  }
`;

export const CartOuterContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 65%;
  max-width: 1000px;
  margin: auto;
  padding: auto;
  /* background-color: blue; */
`;

export const CartContents = styled.div`
  width: 100%;
  text-align: left;
  margin: auto;
`;

export const CartButton = styled.div`
  margin: auto;
  padding: auto;
`;

export const CartImg = styled.div`
  width: 125px;
  height: 125px;
  padding: 0;
  margin: 0;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  /* border: solid 1px black; */
  height: 120px;
  /* width: 20%; */
`;

export const CartItemDesc = styled.div`
  margin: auto;
  width: 30%;
  font-weight: bold;
`;

export const CartItemPrice = styled.div`
  margin: auto;
  width: 10%;
  font-weight: bold;
`;

export const CartTotal = styled.div`
  width: 25%;
  text-align: right;
`;

export const RowItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RowTaxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RowShipping = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RowTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid black;
  font-weight: bold;
`;
