import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { name, email, password, role } = input;

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: role === "user" ? 1 : 0,
      }),
    };

    try {
      const res = await fetch("http://localhost:5000/auth/register", opt);
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        // setAuth(true);
        setInput({ name: "", email: "", password: "", role: "user" });
        setIsRedirect(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(input);

  return (
    <>
      {isRedirect ? (
        <Redirect to="/login" />
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              <strong>Register</strong>
            </h3>

            {/* Name */}
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    className="form-control"
                    autoComplete="off"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    className="form-control"
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="radio-inline">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="admin"
                  className="form-check-input"
                  name="role"
                  value="admin"
                  checked={input.role === "admin"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  checked={input.role === "user"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="user">
                  User
                </label>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>

            {/* Msg below */}
            <div className="row">
              <div className="col-md-12 text-center">
                <small className="form-text text-muted">
                  Already a user ???? try to <Link to="/login">Login</Link>
                </small>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
