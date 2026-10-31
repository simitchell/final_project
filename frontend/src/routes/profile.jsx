import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import ProfileComponent from "../components/Profile";
import DisplayUserListings from "../components/DisplayUserListings";
import {
  ProfileContainer,
  WelcomePanel,
  PanelRow,
  InfoPanel,
  ToolsPanel,
} from "../components/GlobalStyles/StyleProfile";

export default function Profile() {
  return (
    <ProfileContainer>
      <WelcomePanel>
        <h1>Welcome back, {localStorage.getItem("username")}!</h1>
        <p>
          This is your profile page, where you can update your information and
          manage your listings. New here?{" "}
          <Link to="/howitworks">How it Works</Link> covers how to be a great
          buyer and seller on Fox Body Swap Meet.
        </p>
      </WelcomePanel>

      <PanelRow>
        <InfoPanel>
          <ProfileForm />
        </InfoPanel>
        <ToolsPanel>
          <h2>Seller Tools</h2>
          <ProfileComponent />
        </ToolsPanel>
      </PanelRow>

      <DisplayUserListings />
    </ProfileContainer>
  );
}
