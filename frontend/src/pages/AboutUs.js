import React from "react";
import { Container, Card, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import aboutus_3 from "../assets/images/aboutus_3.jpg";
import aboutus_4 from "../assets/images/aboutus_4.jpg";
import "animate.css"; // Adding animations
import user_1 from "../assets/images/user_1.jpg";
import user_2 from "../assets/images/user_2.jpg";
import user_10 from "../assets/images/user_10.jpg";
import aboutus_1 from "../assets/images/aboutus_1.jpg"; // Importing additional images for the team section
import aboutus_2 from "../assets/images/aboutus_2.jpg"; // Importing additional images for the team section
import "../styles/AboutUs.css"; // Custom CSS file for styling

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* About Us Content */}
      <Container className="mt-5 text-center animate__animated animate__fadeIn">
        <h2 className="fw-bold text-primary">About Us</h2>
        <p className="lead text-muted">
          We are <strong>AI SERP Rank Booster</strong>, dedicated to revolutionizing search engine rankings through AI-driven solutions. 
          Our platform leverages cutting-edge technology to help businesses, startups, and enterprises optimize their SEO strategy and achieve higher rankings effortlessly.
        </p>

        {/* Our Mission */}
        <Card className="mt-4 p-4 shadow-lg border-0 bg-light mission-card">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h4 className="fw-bold text-success">Our Mission</h4>
              <p className="text-muted">
                Our mission is to empower businesses and individuals by providing cutting-edge SEO automation, analytics, and ranking strategies. 
                We are focused on enhancing visibility and accelerating online growth through AI-driven insights, tailored to your specific SEO needs. 
                Whether you're a local business or a global enterprise, we ensure that you stay ahead in the digital landscape.
              </p>
              <Button variant="primary" onClick={() => navigate("/contactus")} className="mt-3">
                Contact Us
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <Image src={aboutus_4} alt="Our Mission" fluid rounded className="shadow-lg zoom-effect" />
            </Col>
          </Row>
        </Card>

        {/* Our Team */}
        <Card className="mt-4 p-4 shadow-lg border-0 bg-light team-card">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={aboutus_3} alt="Our Team" fluid rounded className="shadow-lg zoom-effect" />
            </Col>
            <Col md={6} className="text-center text-md-start">
              <h4 className="fw-bold text-primary">Meet Our Team</h4>
              <p className="text-muted">
                Our team consists of passionate SEO specialists, skilled developers, and experienced data scientists, all dedicated to transforming search rankings for our clients. 
                We work tirelessly to build innovative solutions that align with the ever-changing demands of search engine algorithms. 
                With a strong focus on continuous learning, our team adapts to the latest SEO trends and developments to ensure the success of our clients.
              </p>
            </Col>
          </Row>
        </Card>

        {/* Our Vision */}
        <Card className="mt-4 p-4 shadow-lg border-0 bg-light vision-card">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h4 className="fw-bold text-danger">Our Vision</h4>
              <p className="text-muted">
                We envision a future where AI-driven SEO solutions are the norm, helping businesses achieve sustainable online success without the complexity of traditional SEO strategies. 
                We aim to be the go-to platform for automating and optimizing SEO, helping businesses of all sizes gain a competitive edge in search rankings.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <Image 
                src={aboutus_1} 
                alt="Our Values" 
                fluid 
                rounded 
                className="shadow-lg zoom-effect" 
                style={{ width: "80%", height: "auto" }} // Adjust width and height here
              />
            </Col>

          </Row>
        </Card>

        {/* Our Values */}
        <Card className="mt-4 p-4 shadow-lg border-0 bg-light values-card">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <h4 className="fw-bold text-info">Our Core Values</h4>
              <ul className="list-unstyled text-muted">
                <li><strong>Innovation:</strong> We prioritize continuous innovation and improvement in all that we do, ensuring our clients benefit from the latest SEO advancements.</li>
                <li><strong>Integrity:</strong> We operate with the highest level of integrity, ensuring transparency and trust with our clients.</li>
                <li><strong>Excellence:</strong> We strive for excellence in every project, ensuring our clients achieve the best possible results.</li>
                <li><strong>Customer Success:</strong> Our primary goal is to ensure the success and satisfaction of our clients, helping them achieve long-term growth and SEO success.</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <Image 
                src={aboutus_2} 
                alt="Our Values" 
                fluid 
                rounded 
                className="shadow-lg zoom-effect" 
                style={{ width: "80%", height: "auto" }} // Adjust width and height here
              />
            </Col>

          </Row>
        </Card>

        {/* Our Achievements */}
        <Card className="mt-4 p-4 shadow-lg border-0 bg-light achievements-card">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h4 className="fw-bold text-primary">Our Achievements</h4>
              <p className="text-muted">
                Over the years, we’ve helped hundreds of businesses achieve top-tier search engine rankings. 
                Our AI-driven platform has contributed to a significant increase in organic traffic, leads, and conversions for our clients. 
                Here are some of our proud achievements:
              </p>
              <ul className="list-unstyled text-muted">
                <li><strong>500+</strong> Successful Campaigns</li>
                <li><strong>2 Million+</strong> Keywords Optimized</li>
                <li><strong>95%</strong> Client Retention Rate</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <Image src={aboutus_3} alt="Our Achievements" fluid rounded className="shadow-lg zoom-effect" />
            </Col>
          </Row>
        </Card>

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
      </Container>
    </>
  );
};

export default AboutUs;
