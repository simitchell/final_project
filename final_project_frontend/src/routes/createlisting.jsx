import ListingForm from "../components/ListingForm";
import { StyleRoute } from "../components/StyleRoute";

export default function Listing() {
  return (
    <StyleRoute>
      <h2>Create a Listing</h2>
      <ListingForm />
    </StyleRoute>
  );
}
