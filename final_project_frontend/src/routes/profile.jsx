import ProfileForm from "../components/ProfileForm";
import DisplayUserListings from "../components/DisplayUserListings";

export default function Profile() {
  return (
    <div>
      <h3>Update your profile</h3>
      <ProfileForm />
      <h3>Your listings</h3>
      <DisplayUserListings />
    </div>
  );
}
