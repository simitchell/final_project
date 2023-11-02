import { useRef } from "react";
import React from "react";
import { Form } from "./GlobalStyles/Styles";
import { Button } from "./StyleButtons";
import { useRevalidator } from "react-router-dom";

export default function RegisterForm() {
  const auth = localStorage.getItem("access_token");
  const revalidator = useRevalidator();
  const updateForm = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm.current);

    const url = "http://127.0.0.1:8000/register/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    updateForm.current.reset();
    revalidator.revalidate;
    alert("New user created successfully");
    window.location.href = "/";
  };

  return (
    <>
      <h2>Register a new user</h2>
      <Form onSubmit={(e) => handleSubmit(e)} ref={updateForm}>
        <label>Username</label>
        <input type="text" name="username" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Password</label>
        <input type="password" name="password" />
        <Button type="submit">Register User</Button>
      </Form>
      <p>
        <a href="./Login">Login</a> for existing users
      </p>
    </>
  );
}

// class RegisterForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//     };
//   }

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const user = {
//       username: this.state.username,
//       email: this.state.email,
//       password: this.state.password,
//     };
//     fetch("http://127.0.0.1:8000/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       });
//   };

// //   render() {
//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={this.state.username}
//             onChange={this.handleInputChange}
//             className="form-control"
//           />

//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleInputChange}
//             className="form-control"
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={this.state.password}
//             onChange={this.handleInputChange}
//             className="form-control"
//           />

//           <Button className="btn btn-primary" type="submit">
//             Register
//           </Button>
//         </Form>
//         <p>
//           <a href="./Login">Login</a> for existing users
//         </p>
//       </div>
//     );
// //   }
// // }

// // export default RegisterForm;
