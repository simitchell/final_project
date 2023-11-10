import ProfileForm from "../components/ProfileForm";
import DisplayUserListings from "../components/DisplayUserListings";
import { ProfileContainer } from "../components/GlobalStyles/StyleProfile";

export default function Profile() {
  return (
    <ProfileContainer>
      <div className="profileWrapper">
        <div className="profileIntro">
          <h2>Welcome, {localStorage.getItem("username")}!</h2>
          <h3>
            This is your profile page, where you can update your information and
            manage your listings.
          </h3>
          <ul>
            <li>
              <a href="../howitworks">How it Works</a> is recommended reading on
              how to become a great seller and buyer on Fox Body Swap Meet
            </li>
            <li>
              <a href="../aboutus">About Us</a> for more about who we are and
              what we do here at Fox Body Swap Meet
            </li>
            <li>
              <a href="../createlisting">Create a listing</a> and get started
              selling!
            </li>
            <li>
              <a href="../">Home</a> to browse Fox Body Mustang parts currently
              listed for sale
            </li>
          </ul>
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
