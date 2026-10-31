import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import SellerTools from "../components/SellerTools";
import DisplayUserListings from "../components/DisplayUserListings";
import {
  ProfileContainer,
  WelcomePanel,
  PanelRow,
  InfoPanel,
} from "../components/GlobalStyles/StyleProfile";

export default function Profile() {
  // Lives here because two siblings need it: SellerTools turns editing on,
  // ProfileForm shows the form while it's on.
  const [isEditing, setIsEditing] = useState(false);
  // Reported by DisplayUserListings once its fetch finishes.
  const [listingCount, setListingCount] = useState(null);

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
          <ProfileForm
            isEditing={isEditing}
            onDone={() => setIsEditing(false)}
          />
        </InfoPanel>
        <SellerTools
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          listingCount={listingCount}
        />
      </PanelRow>

      <DisplayUserListings onCountChange={setListingCount} />
    </ProfileContainer>
  );
}
