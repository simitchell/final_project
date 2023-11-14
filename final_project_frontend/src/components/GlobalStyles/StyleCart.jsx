import styled from "styled-components";

export const CartOuterContainer = styled.div`
    display: flex;
    width: 100%;
    
    .cart-contents {
        width: 70%;
        text-align: left;
    }
    
    .cart-total {
        width: 30%;
        text-align: right;
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        border: solid 1px black;
        height: 100px;
    }
`

