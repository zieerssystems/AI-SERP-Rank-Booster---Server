import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const SearchCampaign = () => {
  const location = useLocation();
  const { campaign_id, campaign_name, domain_name, keywords, search_engine } = location.state || {};

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card className="p-4 shadow-lg" style={{ width: "40rem" }}>
        <h2 className="text-center">Search Campaign</h2>
        <p><strong>Campaign Name:</strong> {campaign_name}</p>
        <p><strong>Domain:</strong> {domain_name}</p>
        <p><strong>Keywords:</strong> {keywords}</p>
        <p><strong>Search Engine:</strong> {search_engine}</p>
        
        <Button variant="primary" onClick={() => window.history.back()}>Go Back</Button>
      </Card>
    </Container>
  );
};

export default SearchCampaign;
