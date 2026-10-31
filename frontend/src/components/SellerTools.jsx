import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ToolsPanel } from "./GlobalStyles/StyleProfile";

export default function SellerTools({ isEditing, onEdit }) {
  return (
    <ToolsPanel>
      <h2>Seller Tools</h2>
      {/* component={Link} renders the button *as* the link, rather than a
          button nested inside an <a>, which is invalid HTML. */}
      <Button
        component={Link}
        to="/createlisting"
        variant="contained"
        fullWidth
      >
        Create a Listing
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={onEdit}
        aria-pressed={isEditing}
        // Light-blue fill while editing so it reads as "active".
        sx={isEditing ? { backgroundColor: "#e3f2fd" } : undefined}
      >
        Edit Information
      </Button>
    </ToolsPanel>
  );
}
