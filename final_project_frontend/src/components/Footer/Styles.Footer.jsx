import styled from "styled-components";

export const StyleFooter = styled.footer`
  color: #f5f5f5;
  background-color: #f2502c;
  padding-top: 1rem;
  position: relative;
  width: 100%;

  h4 {
    display: flex;
    justify-content: center;
    margin: 1rem;
    margin: 0;
    margin-top: 1rem;
  }

  ul {
    margin: 0;
  }
`;



export const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 60%;
  padding: auto;
  margin: auto;

  @media (max-width: 640px) {
    flex-direction: column;
    max-width: 100%;
    align-items: center;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 0.2rem;
`;

