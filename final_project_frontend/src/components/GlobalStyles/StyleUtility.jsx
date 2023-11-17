import styled from "styled-components";

export const Form = styled.form`
  margin: auto;
  padding: auto;
  max-width: 45ch;
  display: flex;
  flex-direction: column;
  input,
  textarea {
    padding: 0.5rem;
    border-radius: 5px;
  }

  button {
    margin-top: 1rem;
    /* justify-content: space-around; */
  }
`;
