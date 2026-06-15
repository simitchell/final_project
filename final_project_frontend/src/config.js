// Central API base URL for the backend.
//
// Override per environment with the VITE_API_BASE_URL env var:
//   - local dev: .env.development points this at http://127.0.0.1:8000
//   - production: set VITE_API_BASE_URL in the deploy provider (e.g. Netlify)
//
// Falls back to the production URL so existing deploys keep working even if
// the env var is not set.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://finalproject-production-bb8b.up.railway.app";
