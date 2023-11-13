import styled from "styled-components";

export const DetailCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1400px;
  max-height: 1400px;
  margin: auto;
  padding: auto;
  justify-content: space-evenly;

  .detailCard {
    display: flex;
    flex-direction: row;
    max-width: 750px;
    max-height: 750px;
    border: none;
    background-color: #e2e2e2;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 25px;
    margin: 1rem;
    padding: 1rem;
  }

  h2 {
    margin-top: 0;
  }

  .detailBody {
    display: flex;
    flex-direction: row;
    height: 325px;
    width: 600px;
  }

  .detailImage {
    object-fit: contain;
    width: 100%;
    height: 100%;

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
  }

  .detailWrapper {
    display: flex;
  }
  .detailInfo {
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: space-between;
    padding: 1rem;
    width: 50%;
  }

  .listingOptions {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly
  }
`;