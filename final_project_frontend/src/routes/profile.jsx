import ProfileForm from "../components/ProfileForm";
import DisplayUserListings from "../components/DisplayUserListings";
import { ProfileContainer } from "../components/GlobalStyles/ProfileStyle";

export default function Profile() {
  return (
    <ProfileContainer>
      <div className="profileWrapper">
        <div className="profileIntro">
          <h2>Welcome, {localStorage.getItem("username")}!</h2>
          <p>
            This is your profile page, where you can update your information and
            manage your listings.
          </p>
          <p>
            <a href="../createlisting">Create a listing</a> and get started
            selling.
          </p>
        </div>
        <div className="profileUpdate">
          <h3>Update your profile information</h3>
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
