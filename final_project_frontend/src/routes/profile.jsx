import ProfileForm from "../components/ProfileForm";
import ProfilePage from "../components/DisplayListings";
import DisplayListings from "../components/DisplayListings";

export default function Profile() {
  return (
    <div>
      <ProfileForm />
      <DisplayListings />
    </div>
  );
}
