import styled from "styled-components";

export const Nav = styled.nav`
  /* color-scheme: light dark; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  background-color: #d3d3d3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

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

  .aboutus {
    margin: 8px;
  }
  .howitworks {
    margin: 8px;
  }

  .navLink {
    ul {
      display: flex;
      list-style: none;
      margin: auto;
      font-size: 1rem;
      padding: 3px 10px;
      vertical-align: baseline;
      width: 100%;
    }

    ul li {
      padding: 8px;
    }
  }
`;
