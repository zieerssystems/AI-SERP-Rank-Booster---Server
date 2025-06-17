

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/signup.php`, {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setSuccess("Registration successful! Redirecting to login...");
          setFormData({ name: "", email: "", password: "" });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setError(data.message);
        }
      } else {
        setError("Server error, please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        <div className="login-image"></div>

        <div className="login-card">
          <h3 className="login-title">Create an Account</h3>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="login-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="login-label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="login-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 login-button">
              Register
            </Button>

            <div className="text-center mt-3">
              <a href="/login" className="login-link">Already have an account? Login</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
