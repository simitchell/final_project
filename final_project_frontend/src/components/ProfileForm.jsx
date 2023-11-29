import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRevalidator, useParams, useNavigate } from "react-router-dom";
import { Form, ProgressDiv } from "./GlobalStyles/StyleUtility";
// import { Button } from "./GlobalStyles/StyleUtility";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export default function ProfileDetail() {
  const [profileDetail, setProfileDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const updateForm = useRef(null);
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const [alert, setAlert] = useState(false);
  // const [alertContent, setAlertContent] = useState('');

  const { id } = useParams();

  const getIndividualProfile = async () => {
    try {
      const apiUrl = `https://fox-body-swap-meet-db.onrender.com/profile/${localStorage.getItem(
        "userId"
      )}/`;
      const response = await fetch(apiUrl);
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
    console.log(profileDetail);
    const data =
      profileDetail.detail != "Not "
        ? await handlePut(formData)
        : await handlePost(formData);
    setProfileDetail(data);
    updateForm.current.reset();
    revalidator.revalidate();
    // alert("Profile updated successfully");
    setAlert(true);
    // location.reload();
  };

  const handlePost = async (formData) => {
    // const formData = new FormData(updateForm.current);
    const apiUrl = `https://fox-body-swap-meet-db.onrender.com/profile/`;
    const data = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    return data;
  };

  const handlePut = async (formData) => {
    const apiUrl = `https://fox-body-swap-meet-db.onrender.com/profile/${localStorage.getItem(
      "userId"
    )}/`;
    const data = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    return data;
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
                <strong>Address:</strong> {profileDetail.address}
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

      <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
        <h4>Update your profile information</h4>
        <label>Address</label>
        <input type="text" name="address" />
        <label>Birthdate</label>
        <input type="date" name="birthdate" />
        <label>Bio</label>
        <textarea type="text" name="bio" />
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
