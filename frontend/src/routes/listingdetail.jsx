import { useState } from "react";
import EditListing from "../components/EditListing";
import ListingDetail from "../components/ListingDetail";

export default function DisplayListingDetail() {
  // Bumped after an inline edit so ListingDetail refetches the updated listing.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <EditListing onUpdated={() => setRefreshKey((key) => key + 1)} />
      <ListingDetail refreshKey={refreshKey} />
    </>
  );
}
