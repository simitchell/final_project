import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: auto;
  padding: auto;
  justify-content: space-evenly;

  .card {
    display: flex;
    flex-direction: column;
    width: 325px;
    height: 375px;
    /* max-height: 325px; */
    border: none;
    background-color: #e2e2e2;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
    margin: 1rem;
    padding: 1rem;

    h2 {
      margin: 0;
    }

    .cardInfo {
      display: flex;
      flex-direction: column;
      height: 225px;
      width: inherit;
    }

    .cardImage {
      width: 250px;
      height: 250px;
      padding: auto;
      margin: auto;
      /* object-fit: contain; */

      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
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
`;

