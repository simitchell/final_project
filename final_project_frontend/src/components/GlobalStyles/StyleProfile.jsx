import styled from "styled-components";

export const ProfileContainer = styled.div`
  ul {
    list-style-type: none;
    li {
      margin-bottom: 1rem;
    }
  }

  .listingHeader {
    text-align: center;
    margin: 3rem;
  }
  
  .profileWrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10%;
    justify-content: space-between;
  }

  .profileIntro {
    flex: 1 1 300px;
  }

  .profileUpdate {
    flex: 1 1 240px;
  }
`;

export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 300px;
  margin: auto;
`;
