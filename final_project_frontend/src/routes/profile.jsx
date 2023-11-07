import ProfileForm from "../components/ProfileForm";
import DisplayUserListings from "../components/DisplayUserListings";
import { ProfileContainer } from "../components/GlobalStyles/ProfileStyle";

export default function Profile() {
  return (
    <ProfileContainer>
      <div className="profileWrapper">
        <div className="profileIntro">
          <p>
            <strong>Welcome, {localStorage.getItem("username")}!</strong>
          </p>
          <p>
            This is your profile page, where you can update your information and
            manage your listings.
          </p>
          <p>more ipsum</p>
        </div>
        <div className="profileUpdate">
          <h3>Update your profile</h3>
          <ProfileForm />
        </div>
      </div>
      <div>
        <h2 className="listingHeader">Your Listings</h2>
        <DisplayUserListings />
      </div>
    </ProfileContainer>
  );
}
