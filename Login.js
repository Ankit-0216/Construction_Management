import React from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = input;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const opt = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const res = await fetch("http://localhost:5000/auth/login", opt);
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">
            <strong>Login</strong>
          </h3>

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

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>

          <div className="row">
            <div className="col-md-12 text-center">
              <small className="form-text text-muted">
                Not registered yet ???? try to{" "}
                <Link to="/register">Register</Link>
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
