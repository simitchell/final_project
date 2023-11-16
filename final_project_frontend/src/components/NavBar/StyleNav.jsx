import styled from "styled-components";

export const Nav = styled.nav`
  /* color-scheme: light dark; */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  background-color: #f2502c;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  a {
    color: #f5f5f5;
  }

  a:hover {
      color: #4e56f6;
    }

  .navCompanyName {
    p {
      font-size: 1.6rem;
      font-weight: bold;
      margin: auto;
      padding: 3px 10px;
      vertical-align: baseline;
    }
  }

  .searchBar {
    input {
      margin: 8px;
    }
    button {
      margin: 8px;
    }
  }

  .aboutUs {
    margin: 8px;
  }
  .howitworks {
    margin: 8px;
  }

  .navLink {
  }
`;

export const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
  /* margin-left: 7.5%; */
`;

export const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  /* margin-right: 7.5%; */
  /* text-align: right; */

  ul {
    display: flex;
    list-style: none;
    margin: auto;
    font-size: 1rem;
    padding: 3px 10px;
    vertical-align: baseline;
    justify-content: flex-start;
    width: 100%;
  }

  ul li {
    padding: 8px;
  }
`;
