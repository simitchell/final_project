import styled from "styled-components";

export const ProfileContainer = styled.div`
  ul {
    list-style-type: none;
    li {
      margin-bottom: 1rem;
    }
  }

  .profileWrapper {
    display: flex;
    margin: 0 10%;
    justify-content: space-between;
  }

  .profileIntro {
    width: 65%;
  }

  .profileUpdate {
    width: 25%;
  }
`;

export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 300px;
  margin: auto;
`;
