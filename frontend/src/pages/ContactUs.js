import React from "react";
import { Container, Card, Row, Col, Form, Button, Image, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import contact_us from "../assets/images/contact_us.jpg";
import "../styles/AboutUs.css"; // Custom CSS file for styling

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Contact Us Content */}
      <Container className="mt-5 text-center">
        <h2 className="fw-bold text-primary mb-4">Contact Us</h2>
        <p className="lead text-muted mb-5">
          Have questions? We're here to assist you! Fill out the form or use our contact details to reach us.
        </p>

        {/* Contact Details */}
        <Card className="mt-4 p-5 shadow-lg border-0 bg-light rounded-3">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <Image src={contact_us} alt="Contact Us" fluid rounded className="shadow-lg rounded-3" />
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-success">Get in Touch</h4>
              <p className="text-muted">
                📧 <strong>Email:</strong> support@zieers.com <br />
                📞 <strong>Phone:</strong> +123 456 7890 <br />
                📍 <strong>Address:</strong> KLP Arcade, 5BC-938, 2nd Cross Rd, Babusabpalya, Hennur Gardens, Bengaluru, Karnataka 560043
              </p>
            </Col>
          </Row>
        </Card>

        {/* Contact Form */}
        <Card className="mt-4 p-5 shadow-lg border-0 bg-light rounded-3">
          <h4 className="fw-bold text-primary mb-4">Send Us a Message</h4>
          <p className="text-muted mb-4">
            Fill out the form below and we’ll get back to you as soon as possible. We value your feedback!
          </p>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label className="fw-semibold">Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required className="shadow-sm" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label className="fw-semibold">Your Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required className="shadow-sm" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mt-3" controlId="message">
              <Form.Label className="fw-semibold">Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your message" required className="shadow-sm" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 px-4 py-2 fw-bold shadow-lg">
              Submit
            </Button>
          </Form>
        </Card>

        {/* Google Maps Section */}
        <div className="mt-5">
          <h4 className="fw-bold text-primary mb-4">Find Us on the Map</h4>
          <div className="w-100" style={{ height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.307617073576!2d77.59528201383494!3d12.981542718313017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1b62d9f3e9c1%3A0x6d0321c3d8b9d8ed!2sKLP%20Arcade!5e0!3m2!1sen!2sin!4v1674218480297!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>

      </Container>
    </>
  );
};

export default ContactUs;
