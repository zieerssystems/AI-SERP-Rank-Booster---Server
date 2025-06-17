
import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';  // << Import useAuth here
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { setUsername } = useAuth();  // << Get setUsername from context
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", data.username);

        // Update context state to keep user logged in across components
        setUsername(data.username);  // << This is the key update!

        setTimeout(() => {
          navigate("/campaign");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image"></div>

        <Card className="login-card animate-fade-in">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Avatar"
            className="avatar"
          />
          <h2 className="text-center mb-3 login-title">Welcome Back</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="login-label">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="login-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Button type="submit" className="w-100 login-button">
              Login
            </Button>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="login-link">Forgot Password?</a>
            </div>
            <div className="text-center mt-2">
              <a href="/register" className="login-link">Create an Account</a>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
