
// import React, { useState, useEffect } from "react";
// import { Container, Card, Button, Alert } from "react-bootstrap";
// import "animate.css"; // Adding animations

// const Dashboard = () => {
//   const [savedCampaigns, setSavedCampaigns] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchSavedCampaigns(userId);
//     } else {
//       setError("You need to log in to view saved campaigns.");
//     }
//   }, []);

//   const fetchSavedCampaigns = async (userId) => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/getsavedcampaigns.php?user_id=${userId}`);
//       const data = await response.json();
//       setSavedCampaigns(data.campaigns || []);
//     } catch (err) {
//       setError("Failed to fetch campaigns.");
//     }
//   };

//   return (
//     <Container>
//       <h2 className="text-center mt-4">Dashboard</h2>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <h4 className="mt-4">Saved Campaigns</h4>
//       {savedCampaigns.length > 0 ? (
//         <div>
//           {savedCampaigns.map((camp) => (
//             <Card key={camp.id} className="mb-3 p-3 shadow">
//               <Card.Body>
//                 <Card.Title>{camp.campaign_name}</Card.Title>
//                 <Card.Text>
//                   <strong>Domain:</strong> {camp.domain_name} <br />
//                   <strong>Search Engine:</strong> {camp.search_engine} <br />
//                   <strong>Keywords:</strong> {camp.keywords}
//                 </Card.Text>
//                 <Button variant="primary" onClick={() => alert("Start Campaign feature coming soon!")}>
//                   Start Campaign
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p>No saved campaigns found.</p>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;






import React, { useState, useEffect } from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "animate.css"; // Adding animations

const Dashboard = () => {
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate function


  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchSavedCampaigns(userId);
    } else {
      setError("You need to log in to view saved campaigns.");
    }
  }, []);

  const fetchSavedCampaigns = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getsavedcampaigns.php?user_id=${userId}`);
      const data = await response.json();
      setSavedCampaigns(data.campaigns || []);
    } catch (err) {
      setError("Failed to fetch campaigns.");
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,rgb(166, 217, 220), #6610f2)",
        color: "white",
        padding: "30px",
      }}
    >
      <h2 className="text-center mt-4 animate__animated animate__fadeInDown">Dashboard</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      
      <h4 className="mt-4">Saved Campaigns</h4>
      {savedCampaigns.length > 0 ? (
        <div
          className="w-100 d-flex flex-wrap justify-content-center"
          style={{ gap: "20px", paddingTop: "10px" }} // Added space between cards
        >
          {savedCampaigns.map((camp) => (
            <Card
              key={camp.id}
              className="p-3 shadow-lg animate__animated animate__fadeInUp"
              style={{
                width: "22rem",
                background: "white",
                color: "#333",
                borderRadius: "10px",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{camp.campaign_name}</Card.Title>
                <Card.Text>
                  <strong>Domain:</strong> {camp.domain_name} <br />
                  <strong>Search Engine:</strong> {camp.search_engine} <br />
                  <strong>Keywords:</strong> {camp.keywords}
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  style={{
                    background: "#007BFF",
                    border: "none",
                    borderRadius: "5px",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#0056b3")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#007BFF")}
                  onClick={() => alert("Start Campaign feature coming soon!")}
                >
                  Start Campaign
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No saved campaigns found.</p>
      )}

      {/* 🔹 Back Button */}
    <Button
    variant="primary" // Changed color to dark
    className="mb-3"
    style={{ 
        width: "150px", 
        marginTop: "30px", // Moves it down 
        background: "#123ABC", // Dark background
        border: "none",
        borderRadius: "5px",
        transition: "background 0.3s"
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#23272b")}
    onMouseOut={(e) => (e.currentTarget.style.background = "#343a40")}
    onClick={() => navigate("/campaign")} // ✅ Redirects to Campaign page
    >
    ⬅ Back
    </Button>


    </Container>
    
    
  );
};

export default Dashboard;
