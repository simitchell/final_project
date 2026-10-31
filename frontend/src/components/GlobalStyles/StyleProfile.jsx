import styled from "styled-components";

// Page column: everything on the profile page stacks inside this, 24px apart.
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;

  @media (max-width: 640px) {
    padding: 24px 16px;
  }
`;

// Shared card look, matching the cart and listing-detail panels.
export const Panel = styled.section`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 28px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px;
  }

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

export const WelcomePanel = styled(Panel)`
  h1 {
    font-size: 26px;
    font-weight: 600;
    margin: 0 0 8px;
  }

  p {
    color: #4b5563;
    margin: 0;
    line-height: 1.5;
  }
`;

// Side-by-side panels. align-items: stretch keeps both the height of the
// taller one; flex-wrap stacks them once there isn't room for both.
export const PanelRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: stretch;
`;

// flex-grow 999 means this panel takes nearly all the spare width, so Seller
// Tools stays near its 260px basis. min-width: 0 lets long content shrink
// instead of pushing the row wider than the screen.
export const InfoPanel = styled(Panel)`
  flex: 999 1 420px;
  min-width: 0;
`;

export const ToolsPanel = styled(Panel)`
  flex: 1 1 260px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Old Cart / Create buttons; removed with Profile.jsx in the next step.
export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 300px;
  margin: auto;
`;
