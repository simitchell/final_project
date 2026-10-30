import styled from "styled-components";

// Centers a form page's content and keeps it off the screen edges on phones.
export const FormContainer = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 0 16px;
`;

// White card that holds a form. Inputs and the submit button fill the card at a
// touch-friendly height; 16px input text stops iOS Safari zooming on focus.
export const FormCard = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px 20px;

  input {
    width: 100%;
    height: 46px;
    font-size: 16px;
  }

  button {
    width: 100%;
    height: 46px;
  }

  p {
    text-align: center;
  }
`;

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

export const ProgressDiv = styled.div`
  margin: auto;
  padding: auto;
  text-align: center;
  font-weight: bold;
`