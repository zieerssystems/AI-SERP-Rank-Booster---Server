

import React, { useEffect, useState } from "react";
import { Container, Card, Navbar, Nav, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaChartLine, FaMagic, FaSearchPlus, FaCogs, FaSmile, FaCheckCircle } from "react-icons/fa";
import "animate.css";
import aiserp7 from "../assets/images/aiserp7.jpg";
import aiserp2 from "../assets/images/serp2.png";
import user_1 from "../assets/images/user_1.jpg";
import user_2 from "../assets/images/user_2.jpg";
import user_10 from "../assets/images/user_10.jpg";
import Layout from "../components/Layout";
import {
  FaBrain,
  FaMobileAlt,
  FaLock,
  FaGlobe,
  FaSyncAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { useAuth } from '../AuthContext'; // path depends on your folder structure


const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [campaigns, setCampaigns] = useState([]);
  const { username } = useAuth(); // ✅ use context here

  useEffect(() => {
    if (userId) {
      const savedCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
      setCampaigns(savedCampaigns);
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setUserId(null);
    navigate("/");
  };

  return (
    <>

      {/* Hero Section */}
      <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center">
        <Container>
          <h1 className="hero-heading animate__animated animate__zoomInDown mb-4">Boost Your Website Rankings </h1>
          <p className="text-light fs-4 animate__animated animate__fadeInUp">AI-driven automation to make your site reach the top!</p>
          <Button variant="light" size="lg" className="mt-4 px-5 py-3 fw-bold hero-btn animate__animated animate__pulse animate__infinite"
            onClick={() => navigate(username ? "/campaign" : "/login")}
          >
          Get Started
        </Button>

        </Container>
      </section>

      {/* About Section */}
        <section className="section-bg py-5">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <Image src={aiserp7} fluid rounded className="shadow-lg hover-scale" />
              </Col>
              <Col md={6} className="mt-4 mt-md-0">
                <h2 className="fw-bold text-gradient mb-3">What is AI SERP Rank Booster?</h2>
                <p className="text-muted lead">
                  AI SERP Rank Booster is a revolutionary AI-powered automation tool that simulates organic user behavior on search engines. It improves your website’s visibility by intelligently interacting with search results, mimicking real users, and influencing ranking algorithms — all without manual SEO efforts.
                </p>
                <p className="text-muted">
                  Whether you're a business, blogger, or digital marketer, this platform automates time-consuming SEO tasks, allowing you to focus on growth while our smart engine works in the background 24/7.
                </p>
                <ul className="list-unstyled mt-4">
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Real Behavior Simulation</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Multiple Search Engine Support (Google, Bing, Yahoo, DuckDuckGo)</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Smart Keyword & Domain Targeting</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Auto Navigation: Opens & Interacts with Links</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Seamless Integration with Campaign Management</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> 24/7 Scheduled Automation</li>
                  <li className="mb-3"><FaCheckCircle className="text-success me-2" /> Easy Setup, Zero Coding Required</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>


              {/* Features Section */}
        <section className="features-section py-5">
          <Container>
            <h2 className="text-center fw-bold mb-5 text-gradient">✨ Why Choose AI SERP Rank Booster?</h2>
            <p className="text-center mb-5 lead text-muted px-5">
              AI SERP Rank Booster is your ultimate tool to dominate search engines.
              Using AI-powered automation, real-time tracking, and smart keyword research,
              we help businesses and creators boost their website rankings effortlessly.
              Say goodbye to manual SEO work — let our intelligent system handle everything for you!
            </p>

            {/* Intro Feature Row */}
            <Row className="mb-5">
              <Col md={4}>
                <Card className="bg-light p-3 border-0 shadow-sm text-center">
                  <Card.Body>
                    <FaBrain size={36} className="text-primary mb-3" />
                    <Card.Title className="fw-bold">AI-Powered Intelligence</Card.Title>
                    <Card.Text className="text-muted">Leverage cutting-edge AI to identify ranking opportunities and execute SEO strategies automatically.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="bg-light p-3 border-0 shadow-sm text-center">
                  <Card.Body>
                    <FaMobileAlt size={36} className="text-success mb-3" />
                    <Card.Title className="fw-bold">Mobile-Optimized Ranking</Card.Title>
                    <Card.Text className="text-muted">Optimize for mobile-first indexing and improve performance across all device types.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="bg-light p-3 border-0 shadow-sm text-center">
                  <Card.Body>
                    <FaLock size={36} className="text-danger mb-3" />
                    <Card.Title className="fw-bold">Secure & Reliable</Card.Title>
                    <Card.Text className="text-muted">Your data is encrypted and protected with top-grade security protocols.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Main Features */}
            <Row className="g-4">
              {[
                { icon: <FaRocket size={40} />, title: "Smart Campaigns", desc: "Easily create intelligent SEO campaigns tailored to your goals using AI assistance." },
                { icon: <FaChartLine size={40} />, title: "Real-Time Analytics", desc: "Track your ranking improvements live and get actionable insights instantly." },
                { icon: <FaMagic size={40} />, title: "Self-Learning AI", desc: "Our AI continuously learns from patterns to make your future campaigns even stronger." },
                { icon: <FaSearchPlus size={40} />, title: "Deep Keyword Research", desc: "Identify the best keywords to target your ideal audience and outrank competitors." },
                { icon: <FaCogs size={40} />, title: "Fully Automated System", desc: "Schedule, launch, and monitor — the platform automates every step for you." },
                { icon: <FaSmile size={40} />, title: "User-Friendly Dashboard", desc: "Simple, intuitive, and powerful — designed for everyone, from beginners to pros." },
                { icon: <FaGlobe size={40} />, title: "Multi-Search Engine Support", desc: "Boost rankings across Google, Bing, Yahoo, DuckDuckGo, and more." },
                { icon: <FaSyncAlt size={40} />, title: "Rank Recovery Engine", desc: "Dropped in rankings? Our system detects it and launches corrective actions instantly." },
                { icon: <FaCalendarCheck size={40} />, title: "Scheduled Campaigns", desc: "Set and forget with timed campaigns for weekly or monthly boosts." },
              ].map((f, idx) => (
                <Col md={4} key={idx}>
                  <Card className="feature-card glass-effect p-4 text-center h-100 hover-tilt">
                    <div className="text-primary mb-3">{f.icon}</div>
                    <h5 className="fw-bold">{f.title}</h5>
                    <p className="text-muted">{f.desc}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>


      {/* Testimonials Section */}
      <section className="section-bg py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5 text-gradient">💬 What Our Users Say</h2>
          <p className="text-center mb-5 lead text-muted px-5">
            Thousands of businesses, marketers, and creators trust AI SERP Rank Booster 
            to skyrocket their website rankings. Here's what some of our happy users have to say!
          </p>
          <Row className="g-4">
            {[
              {
                img: user_1,
                feedback: "AI SERP Rank Booster completely transformed our online presence. We jumped from page 5 to page 1 in less than two months!",
                name: "Emily R.",
                position: "Digital Marketing Manager"
              },
              {
                img: user_2,
                feedback: "An absolute game-changer! The AI campaigns are smarter than anything I've ever used. Highly recommend for serious growth.",
                name: "Michael T.",
                position: "Startup Founder"
              },
              {
                img: user_10,
                feedback: "Super easy to use, amazing results, and fantastic support! I love how it keeps improving itself over time. 10/10.",
                name: "Sophia L.",
                position: "SEO Consultant"
              }
            ].map((user, idx) => (
              <Col md={4} key={idx}>
                <Card className="testimonial-card glass-effect text-center p-4 h-100 hover-scale">
                  <Image src={user.img} roundedCircle className="testimonial-img mb-3" width={100} height={100} />
                  <Card.Body>
                    <p className="text-muted mb-4">"{user.feedback}"</p>
                    <h6 className="fw-bold text-primary">{user.name}</h6>
                    <small className="text-muted">{user.position}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      {/* CTA Section */}
      <section className="cta-section text-center py-5 text-white bg-gradient-cta">
        <Container>
          <h2 className="fw-bold mb-3 display-5">🚀 Ready to Skyrocket Your Website Rankings?</h2>
          <p className="lead mb-4">Join 10,000+ businesses already experiencing next-level growth with AI SERP Rank Booster!</p>
          <Button variant="warning" size="lg" className="mt-3 px-5 py-3 fw-bold btn-glow shadow" onClick={() => navigate("/login")}>
            🚀 Get Started Now
          </Button>
          <p className="mt-4 small text-muted">
            No credit card required.
          </p>
        </Container>
      </section>


      {/* Custom CSS */}
      <style>{`
       
        .nav-link-custom:hover {
          color: #ffd700 !important;
        }
        /* Hero Section */
        .hero-section {
          background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80') no-repeat center center/cover;
          height: 100vh;
          padding: 5rem 2rem;
          position: relative;
        }
        .hero-heading {
          font-size: 4rem;
          font-weight: bold;
          color: #fff;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.7);
        }
        .hero-btn {
          background: #ffd700;
          color: #000;
          border: none;
          border-radius: 30px;
          transition: transform 0.3s;
        }
        .hero-btn:hover {
          transform: scale(1.05);
          background: #ffcc00;
        }
        /* Sections */
        .section-bg {
          background: #f8f9fa;
        }
        .features-section {
          background: linear-gradient(135deg, #74ebd5, #acb6e5);
        }
        /* Cards */
        .glass-effect {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          transition: all 0.3s;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          transition: 0.4s;
        }
        .hover-tilt:hover {
          transform: rotate(1deg) scale(1.05);
          transition: 0.4s;
        }
        /* Testimonials */
        .testimonial-img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border: 4px solid #2575fc;
        }
        /* CTA Section */
        .cta-section {
          background: linear-gradient(90deg, #ff4e50, #f9d423);
        }
        /* Glow Text */
        .glow-text {
          color: white;
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
        }
        /* Gradient Text */
        .text-gradient {
          background: linear-gradient(45deg, #ff6b6b, #f06595);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};

export default Home;
