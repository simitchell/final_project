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
    max-width: 600px;
    border: none;
    background-color: #e2e2e2;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
    margin: 1rem;
    padding: 1rem;

    h2 {
      margin-top: 0;
    }

    .cardInfo {
      display: flex;
      flex-direction: row;
    }

    .cardImage {
      width: 400px;
      height: 400px;

      img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
    }
      
    

    .returnInfo {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 1rem;

      span {
        margin-bottom: 1rem;
      }
    }
  }
`;

// // this is potentially the code for the wrapper the cards will display into
// .cardDisplay {

// }
