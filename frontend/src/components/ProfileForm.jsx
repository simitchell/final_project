import { API_BASE_URL } from "../config";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRevalidator, useParams, useNavigate } from "react-router-dom";
import { Form, ProgressDiv } from "./GlobalStyles/StyleUtility";
// import { Button } from "./GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Toast from "./Toast";
import StateSelect from "./StateSelect";
import apiErrorMessage from "../utils/apiErrorMessage";

// Newest year first, back to 1979 (the first Fox body model year). Matches the
// limits the backend enforces on enthusiast_since.
const FOX_BODY_FIRST_YEAR = 1979;
const ENTHUSIAST_YEARS = Array.from(
  { length: new Date().getFullYear() - FOX_BODY_FIRST_YEAR + 1 },
  (_, i) => new Date().getFullYear() - i
);

export default function ProfileDetail() {
  const [profileDetail, setProfileDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const updateForm = useRef(null);
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const [alert, setAlert] = useState(false);
  const [errorToast, setErrorToast] = useState({ open: false, message: "" });
  // const [alertContent, setAlertContent] = useState('');

  const { id } = useParams();

  const getIndividualProfile = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/profile/${localStorage.getItem(
        "userId"
      )}/`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      setProfileDetail(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIndividualProfile();
  }, [profileDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);

    // Send only the fields the user changed, so editing one field never
    // overwrites the others. (Inputs are prefilled from the saved profile, so
    // "changed" means different from what's saved; emptying a field clears it.)
    const changes = new FormData();
    for (const [name, value] of formData.entries()) {
      if (name === "user") continue;
      if (value !== String(profileDetail?.[name] ?? "")) {
        changes.append(name, value);
      }
    }
    if ([...changes.keys()].length === 0) {
      setErrorToast({ open: true, message: "No changes to save." });
      return;
    }

    const response = await handlePatch(changes);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setErrorToast({
        open: true,
        message: apiErrorMessage(body, "Couldn't update your profile."),
      });
      return;
    }
    setProfileDetail(await response.json());
    setAlert(true);
  };

  const handlePatch = async (formData) => {
    const apiUrl = `${API_BASE_URL}/profile/${localStorage.getItem(
      "userId"
    )}/`;
    return fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
  };

  return (
    <>
      {isLoading ? (
        <ProgressDiv>
          <CircularProgress />
        </ProgressDiv>
      ) : (
        <>
          {profileDetail ? (
            <div>
              <h3>Current Information</h3>
              <p>
                <strong>Name:</strong> {profileDetail.first_name}{" "}
                {profileDetail.last_name}
              </p>
              <p>
                <strong>Member since:</strong> {profileDetail.member_since}
              </p>
              <p>
                <strong>Fox body enthusiast since:</strong>{" "}
                {profileDetail.enthusiast_since}
              </p>
              <p>
                <strong>Street:</strong> {profileDetail.street}
              </p>
              <p>
                <strong>City:</strong> {profileDetail.city}
              </p>
              <p>
                <strong>State:</strong> {profileDetail.state}
              </p>
              <p>
                <strong>ZIP:</strong> {profileDetail.zip_code}
              </p>
              <p>
                <strong>Birthdate:</strong> {profileDetail.birthdate}
              </p>
              <p>
                <strong>Bio:</strong> {profileDetail.bio}
              </p>
            </div>
          ) : (
            <div>
              Profile Information will display here. Please fill out the form.
            </div>
          )}
        </>
      )}

      {alert ? (
        <Alert severity="success">
          Profile information updated successfully!
        </Alert>
      ) : (
        <></>
      )}

      <Toast
        open={errorToast.open}
        message={errorToast.message}
        severity="error"
        onClose={() => setErrorToast({ ...errorToast, open: false })}
      />

      {/* Prefilled from the saved profile (remounts when it loads) so the diff in
          handleSubmit can tell what the user actually changed. */}
      <Form
        key={[
          profileDetail?.first_name,
          profileDetail?.last_name,
          profileDetail?.enthusiast_since,
          profileDetail?.street,
          profileDetail?.city,
          profileDetail?.state,
          profileDetail?.zip_code,
          profileDetail?.birthdate,
          profileDetail?.bio,
        ].join("|")}
        onSubmit={(e) => handleSubmit(e)}
        ref={updateForm}
      >
        <h4>Update your profile information</h4>
        <label>First name</label>
        <input
          type="text"
          name="first_name"
          maxLength="150"
          defaultValue={profileDetail?.first_name || ""}
        />
        <label>Last name</label>
        <input
          type="text"
          name="last_name"
          maxLength="150"
          defaultValue={profileDetail?.last_name || ""}
        />
        <label>Fox body enthusiast since</label>
        <select
          name="enthusiast_since"
          defaultValue={profileDetail?.enthusiast_since ?? ""}
        >
          <option value="">Select a year</option>
          {ENTHUSIAST_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label>Street</label>
        <input
          type="text"
          name="street"
          maxLength="100"
          defaultValue={profileDetail?.street || ""}
        />
        <label>City</label>
        <input
          type="text"
          name="city"
          maxLength="50"
          defaultValue={profileDetail?.city || ""}
        />
        <label>State</label>
        <StateSelect defaultValue={profileDetail?.state || ""} />
        <small>Your state is shown on your listings.</small>
        <label>ZIP code</label>
        <input
          type="text"
          name="zip_code"
          defaultValue={profileDetail?.zip_code || ""}
          inputMode="numeric"
          maxLength="10"
          pattern="\d{5}(-\d{4})?"
          title="12345 or 12345-6789"
        />
        <label>Birthdate</label>
        <input
          type="date"
          name="birthdate"
          defaultValue={profileDetail?.birthdate || ""}
        />
        <label>Bio</label>
        <textarea
          type="text"
          name="bio"
          defaultValue={profileDetail?.bio || ""}
        />
        <input
          type="hidden"
          name="user"
          value={localStorage.getItem("userId")}
        />
        <Button variant="contained" type="submit">
          Update Profile
        </Button>
      </Form>
    </>
  );
}
