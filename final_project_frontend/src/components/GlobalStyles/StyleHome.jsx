import styled from "styled-components";

export const HomeContainer = styled.div`
  .listingHeader {
    text-align: center;
    margin: 3rem;
  }
`;

export const HomeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 10%;
  ${(justifyContent) => justifyContent};
`;

export const HomeWelcome = styled.div`
  ul {
    list-style-type: none;
    li {
      margin-bottom: 1rem;
    }
  }
`;

export const HomeLogin = styled.div`
  flex: 0 0 280px;
  max-width: 100%;
`;
