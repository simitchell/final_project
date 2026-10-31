import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Toast({ open, message, severity = "success", onClose }) {
  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // Clear the ~57px nav (MUI's default top differs at xs vs sm, so set
      // both) and sit above its z-index of 9999.
      sx={{ top: { xs: 70, sm: 70 }, zIndex: 10000 }}
    >
      <Alert severity={severity} variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
