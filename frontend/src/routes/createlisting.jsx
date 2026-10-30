import DisplayListings from "../components/DisplayListings";
import DisplayUserListings from "../components/DisplayUserListings"
import ListingForm from "../components/ListingForm";

export default function Listing() {
  return (
    <>
      <ListingForm />
      {/* <DisplayListings /> */}
      <DisplayUserListings />
    </>
  );
}
