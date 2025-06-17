import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" style={{ background: "linear-gradient(90deg, #1E1E2F, #3A3D98)", color: "#fff" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#00D4FF", fontWeight: "bold" }}>
          SERP Rank Booster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "#00D4FF" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" style={{ color: "#FFF" }}>Login</Nav.Link>
            <Nav.Link as={Link} to="/create-campaign" style={{ color: "#FFF" }}> Campaign</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
