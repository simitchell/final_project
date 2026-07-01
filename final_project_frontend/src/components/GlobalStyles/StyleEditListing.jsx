import styled from "styled-components";

export const EditListingHeader = styled.h2`
  font-size: 22px;
  font-weight: 500;
  margin: 0 0 1.25rem 0;
  text-align: center;
`;

export const EditListingCard = styled.div`
  max-width: 1100px;
  margin: 0 auto 2rem auto;
  background: #ffffff;
  border: 0.5px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const UpdateButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: #1976d2;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #1558a8;
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: #c62828;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #9b1e1e;
  }
`;