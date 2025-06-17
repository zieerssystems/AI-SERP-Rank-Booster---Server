

import React, { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope } from "react-icons/fa"; // Icons for user and email

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/");
      return;
    }
    fetchUserDetails(userId);
  }, [navigate]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get_user.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to fetch user details");
      } else {
        setUserDetails(data.user);
      }
    } catch (error) {
      setError("Error fetching user details");
      console.error("Error:", error);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "50px 20px",
      }}
    >
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown" style={{ color: "#212529", fontSize: "2rem", fontWeight: "600" }}>
        Welcome, {userDetails ? userDetails.username : "User"}!
      </h2>

      {/* Interesting welcome message */}
      <p className="text-center mb-4 animate__animated animate__fadeIn" style={{ color: "#495057", fontSize: "1rem", fontStyle: "italic" }}>
        We're glad to have you here. Let’s take your experience to the next level.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {userDetails ? (
        <Card
          className="shadow-lg animate__animated animate__fadeInUp"
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "#ffffff",
            color: "#212529",
            borderRadius: "12px",
            border: "1px solid #dee2e6",
            padding: "30px",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body>
            {/* Profile Avatar */}
            <Row className="mb-4">
              <Col className="text-center">
                 {/* 🔽 Avatar Image at the top */}
                  {/* 🔽 Avatar Image at the top */}
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Avatar"
                    className="avatar"
                  />
              </Col>
            </Row>

            {/* User Details */}
            <div className="mb-3 d-flex align-items-center">
              <FaUserCircle style={{ fontSize: "1.5rem", marginRight: "10px", color: "#6c757d" }} />
              <strong style={{ fontSize: "1.1rem", color: "#495057" }}>Name:</strong> {userDetails.username}
            </div>
            <div className="mb-3 d-flex align-items-center">
              <FaEnvelope style={{ fontSize: "1.5rem", marginRight: "10px", color: "#6c757d" }} />
              <strong style={{ fontSize: "1.1rem", color: "#495057" }}>Email:</strong> {userDetails.email}
            </div>

            {/* Button to navigate */}
            <Button
              variant="primary"
              className="w-100"
              style={{
                borderRadius: "6px",
                padding: "12px",
                fontSize: "1.1rem",
                fontWeight: "500",
              }}
              onClick={() => navigate("/campaign")}
            >
              Back to Dashboard
            </Button>
          </Card.Body>
        </Card>
      ) : !error ? (
        <p className="mt-4 animate__animated animate__fadeIn" style={{ color: "#6c757d" }}>
          Loading user details...
        </p>
      ) : null}
    </Container>
  );
};

export default Profile;
