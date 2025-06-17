
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Card, Row, Col, Image , Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import aiserp9 from "../assets/images/aiserp9.jpg";
import aiserp5 from "../assets/images/serp5.jpg";
import aiserp3 from "../assets/images/aiserp3.jpg";
import aiserp2 from "../assets/images/serp4.jpg";
import "animate.css";

const Campaign = () => {
  const [savedCampaign, setSavedCampaign] = useState(null);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/");
      return;
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }

    const savedData = localStorage.getItem("savedCampaign");
    if (savedData) {
      setSavedCampaign(JSON.parse(savedData));
    }
  }, [navigate]);

  const handleNewCampaign = () => {
    navigate("/createcampaign");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f4f7fa;
        }

        .hero-image {
          max-height: 500px;
          object-fit: cover;
          border-radius: 1rem;
          transition: transform 0.3s ease;
        }

        .hero-image:hover {
          transform: scale(1.03);
        }

        .why-us-section,
        .features-section {
          background: linear-gradient(to bottom right, #e6f0ff,rgb(167, 200, 226));
          padding: 4rem 0;
        }

        .features-section {
          background: linear-gradient(to bottom right,#e6f0ff,rgb(167, 200, 226));
        }

        .feature-card, .step-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #ffffff;
        }

        .feature-card:hover, .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15);
        }

        .text-light {
          color:rgb(17, 16, 16) !important;
        }

        .how-it-works-section {
            background-image: url('../assets/images/aiserp1.jpg'); /* update with correct path */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            z-index: 1;
          }

          .how-it-works-section::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Optional: dark overlay for readability */
            z-index: -1;
          }


        .btn-primary, .btn-success {
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 600;
          box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .btn-primary:hover, .btn-success:hover {
          transform: scale(1.05);
        }

        .container h2, h3 {
          letter-spacing: -0.5px;
        }

        .carousel-inner img {
          height: 400px;
          object-fit: cover;
        }

        .carousel-caption {
          background: rgba(0, 0, 0, 0.5);
          padding: 1rem 2rem;
          border-radius: 10px;
        }

        .carousel-caption h3 {
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          .hero-image {
            max-height: 300px;
          }

          .feature-card, .step-card {
            margin-bottom: 1.5rem;
          }

          .carousel-inner img {
            height: 250px;
          }

          .carousel-caption h3 {
            font-size: 1.5rem;
          }

        @media (max-width: 768px) {
          .hero-image {
            max-height: 300px;
          }

          .feature-card, .step-card {
            margin-bottom: 1.5rem;
          }

          .bg-image-section {
            background-image: url('images/aiserp1.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 60px 0;
          }

        }
      `}</style>
            {/* Carousel Section */}
            <Carousel fade interval={3000}>
        <Carousel.Item>
          <img className="d-block w-100" src={aiserp2} alt="Slide 1" />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">AI SERP Rank Booster</h3>
            <p>Boost your search visibility using intelligent automation.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={aiserp9} alt="Slide 2" />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">Automate SEO Campaigns</h3>
            <p>Launch and manage campaigns with just a few clicks.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={aiserp3} alt="Slide 3" />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">Track & Optimize Results</h3>
            <p>Monitor your ranking improvements and keyword trends.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="text-center mt-5">
        <h1 className="fw-bold text-primary display-3 animate__animated animate__fadeInDown">
          Supercharge Your SEO with AI Automation
        </h1>
        <p className="lead text-muted mb-4">
          Unlock the potential of AI-driven insights, intelligent keyword optimization, and fully automated SEO strategies to dominate search rankings effortlessly.
        </p>
        <Button
          variant="success"
          size="lg"
          className="px-4 py-2 fw-bold shadow-sm animate__animated animate__pulse animate__infinite"
          onClick={handleNewCampaign}
        >
          Start Your Campaign Now
        </Button>
        {/* <Image src={aiserp9} alt="Project Overview" className="hero-image shadow-lg rounded-4 mt-4" fluid /> */}
      </Container>

      {/* Why Choose Us Section */}
      <div className="why-us-section">
        <Container>
          <h2 className="text-center mb-5 animate__animated animate__fadeInUp">Why Choose AI SERP Rank Booster?</h2>
          <p className="text-center mb-5 text-muted">Discover the key benefits of using our AI-powered SEO automation tool to supercharge your rankings and grow your digital presence.</p>
          <Row className="g-4">
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">🚀 Fast & Accurate</h5>
                  <p className="text-muted">Our AI-powered algorithms detect rank positions and adjust strategies in real-time, ensuring faster and more accurate improvements in your SEO performance.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">📈 Keyword Intelligence</h5>
                  <p className="text-muted">Leverage smart keyword suggestions, backed by AI insights, to optimize your content and track keyword performance in real-world search scenarios.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">🧠 Automation at Scale</h5>
                  <p className="text-muted">From research to execution, automate every SEO step with ease. Our system triggers intelligent actions to mimic natural user behavior, optimizing your site automatically.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="g-4 mt-5">
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">🔍 In-Depth Analytics</h5>
                  <p className="text-muted">Get detailed reports and insights on your website’s performance, with actionable data to further refine and enhance your SEO strategy.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">🌐 Multi-Search Engine Support</h5>
                  <p className="text-muted">Supports all major search engines, including Google, Bing, Yahoo, DuckDuckGo, and more. Monitor your rankings across platforms with ease.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 border-0 shadow-lg feature-card rounded-4">
                <Card.Body>
                  <h5 className="fw-bold">🔐 Secure & Private</h5>
                  <p className="text-muted">Our platform ensures top-level security for your data and campaigns, with encryption and privacy protocols in place to keep your information safe.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={6}>
              <div className="text-center">
                <Button variant="primary" size="lg" className="px-4 py-3 rounded-pill" onClick={() => navigate("/aboutus")}>
                  Learn More About Our Features
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>


      {/* How It Works */}
        <Container className="text-center py-5">
        <h2 className="mb-4 animate__animated animate__fadeInUp">How It Works</h2>
        <p className="text-muted mb-5 animate__animated animate__fadeInUp">Follow these simple steps to boost your search engine rankings with AI-powered automation. Our system is designed to make SEO simple and effective.</p>
        <Row className="g-4">
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">1. Create Campaign</h5>
                <p>Enter your domain and target keywords, then kickstart your SEO journey by creating a new campaign. It's quick and easy to set up.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">2. AI Optimization</h5>
                <p>Our AI system analyzes your data, detecting rank fluctuations and intelligently adjusts your strategy. It mimics user behavior to simulate natural ranking improvements.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">3. Monitor Growth</h5>
                <p>Access detailed, real-time reports that track the growth of your rankings. See how your domain rises through search engine results as AI fine-tunes the process.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-4 mt-5">
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">4. Optimize and Repeat</h5>
                <p>With every campaign iteration, our system continuously learns and refines its optimization strategies, ensuring you stay ahead in the competitive SEO game.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">5. Track Competitors</h5>
                <p>Gain insights into competitor strategies. Monitor their ranking progress and adjust your campaign to stay one step ahead.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 step-card border-0 shadow-lg rounded-4">
              <Card.Body>
                <h5 className="fw-bold">6. Scale Your Efforts</h5>
                <p>As your rankings grow, scale your campaigns to multiple keywords, domains, and search engines for broader impact and more significant results.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <div className="text-center">
              <Button variant="primary" size="lg" className="px-4 py-3 rounded-pill" onClick={() => navigate("/createcampaign")}>
                Start Your SEO Journey Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
              <div className="features-section text-light py-5" style={{ backgroundColor: '#1a1a1a' }}>
          <Container>
            <h2 className="text-center mb-4 animate__animated animate__fadeInUp">Key Features</h2>
            <p className="text-center mb-5 text-muted animate__animated animate__fadeInUp">Explore the powerful features of AI SERP Rank Booster designed to give you a competitive edge in SEO automation and optimization.</p>
            <Row className="g-4">
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">🔍 Multi-Engine Support</h5>
                    <p>Supports Google, Bing, Yahoo, DuckDuckGo — all major search engines. Seamlessly automate rankings on multiple platforms for broader reach.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">📊 Campaign Tracking</h5>
                    <p>Track each campaign’s performance in real-time with interactive trend reports, graphs, and actionable insights to refine your SEO strategy.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">🔐 Secure Access</h5>
                    <p>With JWT-secured login, your campaigns and data are protected with the latest encryption standards, ensuring a secure user experience.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="g-4 mt-5">
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">⚡ AI-Powered Optimization</h5>
                    <p>Leverage cutting-edge AI to optimize your rankings by simulating real user behavior, helping you stay ahead of the competition with intelligent clicks.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">📈 Real-Time Analytics</h5>
                    <p>Get instant updates and analytics on your campaigns’ progress. Measure the effectiveness of your SEO strategies with live tracking of keyword rankings.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-4 feature-card border-0 text-dark shadow-lg rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold">💡 Smart Keyword Suggestions</h5>
                    <p>Our system uses advanced algorithms to provide you with keyword suggestions based on current trends, competitor analysis, and search volume data.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              <Col md={6}>
                <div className="text-center">
                  <Button variant="primary" size="lg" className="px-4 py-3 rounded-pill">
                    Unlock Your SEO Potential Today
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>


      {/* Call to Action */}
      <Container className="text-center py-5">
        <h2 className="fw-bold">Ready to Rank Higher?</h2>
        <p className="lead text-muted mb-4">Join thousands of website owners who’ve boosted their search engine presence using AI.</p>
        <Button variant="primary" size="lg" onClick={handleNewCampaign}>
          Start Your Free Campaign
        </Button>
      </Container>
    </>
  );
};

export default Campaign;


