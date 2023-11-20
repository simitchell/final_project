import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: auto;
  padding: auto;
  justify-content: center;

  a {
    color: black;
  }

  a:hover {
    color: #f2502c;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    /* max-height: 325px; */
    border: none;
    background-color: white;
    border-radius: 25px;
    margin: 1rem;
    padding: 1rem;

    h2 {
      margin: 0;
    }

    .cardInfo {
      display: flex;
      flex-direction: column;
      height: 400px;
      width: 400px;
      width: inherit;
      margin-bottom: 0;
    }

    .cardImage {
      width: 400px;
      height: 325px;
      padding: auto;
      margin: auto;
      /* object-fit: contain; */

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .returnInfo {
      display: flex;
      /* flex-direction: column; */
      justify-content: space-between;
      /* text-align: left;
      padding: 1rem; */
      width: 100%;

      span {
        margin-bottom: 0.7rem;
      }
    }
  }
  .card:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export const NoDataDiv = styled.div`
  margin: auto;
  padding: auto;
  text-align: center;
  font-weight: bold;
`;
