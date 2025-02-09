import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/logIn', { email, password });
      localStorage.setItem('token', res?.data.user.token);
      toast.success(res.data.message);
      navigate('/tasks');
    } catch (err) {
      console.error('process error',err);
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Login</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center text-muted mt-3">
          Don't have an account? <a href="/register" className="text-primary">Sign up</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
