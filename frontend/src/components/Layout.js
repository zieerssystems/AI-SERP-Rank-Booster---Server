import React, { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../AuthContext'; // Adjust path if needed

const Layout = () => {
  // const [username, setUsername] = useState('');
  const { username, setUsername } = useAuth(); // use global username
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username');
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username'); // clear username on logout
    setUsername(''); // clear username from state
    navigate('/');
  };

  // Function to render links based on current path
  const renderNavLinks = () => {
    const renderLoginButton = (
      <Button 
        variant="warning" 
        className="ms-3 fw-bold" 
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    );
  
    const campaignLink = username && (
      <Nav.Link href="/createcampaign" className="nav-link-custom">Campaign</Nav.Link>
    );
  
    switch (location.pathname) {
      case '/aboutus':
        return (
          <>
            <Nav.Link href="/contactus" className="nav-link-custom">Contact Us</Nav.Link>
            {campaignLink}
            {!username && renderLoginButton}
          </>
        );
      case '/contactus':
        return (
          <>
            <Nav.Link href="/aboutus" className="nav-link-custom">About Us</Nav.Link>
            {campaignLink}
            {!username && renderLoginButton}
          </>
        );
      default:
        return (
          <>
            <Nav.Link href="/aboutus" className="nav-link-custom">About Us</Nav.Link>
            <Nav.Link href="/contactus" className="nav-link-custom">Contact Us</Nav.Link>
            {campaignLink}
            {location.pathname === '/' && !username && renderLoginButton}
          </>
        );
    }
  };
  

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        /* Navbar Style */
        .navbar-custom {
          background-color:rgb(48, 23, 67); /* Bootstrap primary color */
        }

        .navbar-brand {
          color: #fff !important; /* White text for brand */
        }

        .nav-link-custom {
          color: #f8f9fa !important; /* Light color for nav links */
        }

        #profile-dropdown .dropdown-toggle {
          color: white !important;
      }
          
        .nav-link-custom:hover {
          color: #ffeb3b !important; /* Yellow hover effect */
        }

        /* Social Media Icons Style */
        .social-icon {
          background-color: rgb(25, 25, 25); /* Dark background for better visibility */
          border-radius: 50%; /* Make it round */
          padding: 12px; /* Space around the icon */
          color: #fff; /* White icon color */
          transition: background-color 0.3s, color 0.3s; /* Smooth hover effect */
          text-decoration: none; /* Remove underline */
        }

        .social-icon:hover {
          background-color:rgb(248, 248, 246); /* Yellow background on hover */
          color: #333; /* Dark icon color on hover */
        }

        /* Medium Icon Size */
        .social-icon i {
          font-size: 40px; /* Increase icon size */
        }

        /* Footer Style */
        footer {
          background-color:rgb(9, 30, 53); /* Dark footer */
          color: #f8f9fa; /* Light text */
        }

        footer a {
          color: #f8f9fa;
        }

        footer a:hover {
          color: #ffeb3b; /* Yellow hover effect on links */
        }

        /* Make the navbar toggler (hamburger icon) white */
          .navbar-toggler {
            border-color: white !important; /* Optional: change the border to white */
          }

          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E") !important;
          }
      `}</style>

      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom py-3">
        <Container>
        <Navbar.Brand href="/" className="fw-bold fs-2 text-white">
            {/* Fixed the image path and resized the image */}
            <img src="logo_3.png" alt="Logo" className="logo-img" style={{ width: '80px', height: 'auto' }} />
            <span style={{ marginLeft: '10px' }}>AI SERP Rank Booster</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {renderNavLinks()}

              {/* Conditionally render the Login button only on the Home page */}
              {/* {location.pathname === '/' && !username && (
                <Button variant="warning" className="ms-3 fw-bold" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )} */}


              {/* Profile dropdown for logged-in user */}
              {/* {username && (
                <NavDropdown title={username} id="profile-dropdown" className="text-white">
                  <NavDropdown.Item onClick={() => navigate("/profile")}>View Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )} */}
              {username && (
                  <NavDropdown 
                    title={<span style={{ color: 'white' }}>{username}</span>} 
                    id="profile-dropdown"
                  >
                    <NavDropdown.Item onClick={() => navigate("/profile")}>View Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <main className="py-5">
        <Container>
          {/* The Outlet renders the nested routes here */}
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <footer className="text-center py-5">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="fw-bold text-warning">Contact Us</h5>
              <p className="small mb-1">📧 support@zieers.com</p>
              <p className="small">📍 Bengaluru, India</p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold text-warning">Quick Links</h5>
              <Nav className="flex-column">
                <Nav.Link href="/aboutus" className="footer-link">About Us</Nav.Link>
                <Nav.Link href="/contactus" className="footer-link">Contact</Nav.Link>
              </Nav>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold text-warning">Follow Us</h5>
              <div className="d-flex justify-content-center gap-3">
                {/* LinkedIn */}
                <a href="http://linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A99469601&keywords=Zieers%20Systems%20Pvt%20Ltd&origin=ENTITY_SEARCH_HOME_HISTORY&sid=rgu" target="_blank" rel="noopener noreferrer" className="social-icon"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/9341059619" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-whatsapp fa-2x"></i>
                </a>
              </div>
            </Col>
          </Row>
          <p className="mt-4 small">&copy; 2025 <a href="https://www.zieers.com" className="text-warning fw-bold">Zieers Systems Pvt Ltd</a> | All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
}

export default Layout;
