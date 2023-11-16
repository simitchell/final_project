import styled from "styled-components";

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`;

export const DetailLeft = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h2 {
    justify-content: center;
  }
`;

export const DetailImage = styled.div`
  display: flex;
  object-fit: contain;
  width: 100%;
  height: 100%;

  img {
    object-fit: contain;
    width: 600px;
    height: 600px;
    padding: auto;
    margin: auto;
  }
`;

export const DetailRight = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: justify;
`;

export const DetailDescription = styled.div``;

export const DetailPrice = styled.div``;

export const DetailSeller = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
