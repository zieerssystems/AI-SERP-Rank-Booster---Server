import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSave, FaPlay, FaStop, FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

let isRunning = false;
let timeouts = [];
let openedTabs = [];

const stopCampaign = () => {
  isRunning = false;
  console.log("🛑 Stopping campaign...");
  timeouts.forEach(clearTimeout);
  timeouts = [];
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    stopCampaign();
  }
});



const CreateCampaign = () => {
  const [campaign_id, setCampaignId] = useState("");
  const [campaign_name, setCampaignName] = useState("");
  const [domain_name, setDomainName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [search_engine, setSearchEngine] = useState("Google");
  const [user_id, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [runningCampaigns, setRunningCampaigns] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  

  // Add a helper function to check if all fields are filled  
  const isFormValid = () => {
    return campaign_name.trim() !== "" &&
    search_engine.trim() !== "" &&
           keywords.trim() !== "" &&
           domain_name.trim() !== "";
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (storedUser) {
      setUserId(storedUser);
      fetchSavedCampaigns(storedUser);
    } else {
      setError("You need to log in to create a campaign.");
    }
  }, []);

  const fetchSavedCampaigns = async (userId) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/getsavedcampaigns.php?user_id=${userId}`;
      console.log("📡 Fetching saved campaigns from:", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      const data = await response.json();
      console.log("📥 Saved campaigns response:", data);
      setSavedCampaigns(data.campaigns || []);
    } catch (err) {
      setError(`Failed to load campaigns: ${err.message}`);
    }
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user_id) return setError("User ID is missing. Please log in.");

    const isDuplicate = savedCampaigns.some(
      (camp) =>
        camp.campaign_name.toLowerCase() === campaign_name.toLowerCase() &&
        camp.campaign_id !== campaign_id
    );
    if (isDuplicate) return setError("Duplicate campaign name.");

    const payload = {
      user_id,
      campaign_id,
      campaign_name,
      domain_name,
      keywords,
      search_engine,
    };

    console.log("📤 Submitting campaign:", payload);

    try {
      const apiEndpoint = "/createcampaign.php";
      const response = await fetch(`${process.env.REACT_APP_API_URL}${apiEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 API response:", data);

      if (data.status === "success") {
        setSuccess(`${action.charAt(0).toUpperCase() + action.slice(1)}d successfully!`);
        await fetchSavedCampaigns(user_id);
        navigate("/createcampaign");
      } else {
        setError(data.message || "Unknown error occurred.");
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!campaignId || !user_id) return setError("Missing campaign ID or user ID.");
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const payload = { campaign_id: campaignId, user_id };
      console.log("🗑️ Delete campaign payload:", payload);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/deletecampaign.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("🗑️ Delete campaign response:", data);

      if (data.status === "success") {
        setSuccess("Campaign deleted successfully!");
        // setSavedCampaigns(savedCampaigns.filter((camp) => camp.id !== campaignId));
        setSavedCampaigns(savedCampaigns.filter((camp) => camp.campaign_id !== campaignId));
      } else {
        setError(data.message || "Failed to delete campaign.");
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  };





      let isRunning = false;

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // 🔄 Random Delay Function
      const randomDelay = (min, max) => {
        return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));
      };

      // 📜 Simulate Scroll
      const simulateScroll = () => {
        let scrollY = 0;
        const interval = setInterval(() => {
          window.scrollBy(0, 100 + Math.floor(Math.random() * 50));
          scrollY += 150;
          if (scrollY > window.innerHeight * 2) clearInterval(interval);
        }, 500);
      };

      // 🖱️ Simulate Mouse Movement (basic)
      const simulateMouseMovement = () => {
        const evt = new MouseEvent("mousemove", {
          clientX: Math.floor(Math.random() * window.innerWidth),
          clientY: Math.floor(Math.random() * window.innerHeight),
          bubbles: true,
        });
        document.dispatchEvent(evt);
      };

      const getSearchEngineUrl = (engine, keyword) => {
        const encodedKeyword = encodeURIComponent(keyword.trim());
        switch (engine.toLowerCase()) {
          case "google":
            return `https://www.google.com/search?q=${encodedKeyword}`;
          case "bing":
            return `https://www.bing.com/search?q=${encodedKeyword}`;
          case "yahoo":
            return `https://search.yahoo.com/search?p=${encodedKeyword}`;
          case "duckduckgo":
            return `https://duckduckgo.com/?q=${encodedKeyword}`;
          default:
            return `https://www.google.com/search?q=${encodedKeyword}`;
        }
      };

      const formatUrl = (url) => {
        if (!url.startsWith("http")) {
          return `https://${url.replace(/^\/+/, "")}`;
        }
        return url;
      };

      const handleStartCampaign = async () => {
        if (isRunning) return;
        isRunning = true;

        const keywordArray = keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k);

        for (let keyword of keywordArray) {
          if (!isRunning) break;

          const searchUrl = getSearchEngineUrl(search_engine, keyword);
          console.log("🔍 Opening search engine:", searchUrl);
          window.open(searchUrl, "_blank");
          await randomDelay(3000, 6000);
          simulateScroll();
          simulateMouseMovement();

          try {
            // const res = await fetch("http://localhost/serp/api/searchengine.php", {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/searchEngine.php`,{
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                search_engine: search_engine,
                keywords: keyword,
                domain_name: domain_name.trim().toLowerCase(),
              }),
            });

            const data = await res.json();
            console.log("✅ API Response:", data);

            if (!data.success || !data.target_url) {
              console.warn("❌ Domain not found.");
              continue;
            }

            if (data.target_position) {
              console.log(`🎯 Target domain found at position: ${data.target_position}`);
            }
            if (data.previous_position) {
              console.log(`⏪ Previous domain was at position: ${data.previous_position}`);
            }

            const previousUrl = data.previous_url ? formatUrl(data.previous_url) : null;
            if (previousUrl) {
              console.log("⏪ Opening previous domain:", previousUrl);
              window.open(previousUrl, "_blank");
              await randomDelay(4000, 7000);
              simulateScroll();
              simulateMouseMovement();
            }

            const targetUrl = formatUrl(data.target_url);
            console.log("🎯 Opening target domain:", targetUrl);
            window.open(targetUrl, "_blank");
            await randomDelay(6000, 9000);
            simulateScroll();
            simulateMouseMovement();
          } catch (err) {
            console.error("❌ Error fetching from backend:", err);
          }
        }

        isRunning = false;
        console.log("🎉 Campaign completed.");
      };



  const handleSelectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setCampaignId(campaign.id);
    setCampaignName(campaign.name);
    setDomainName(campaign.domain);
    setKeywords(campaign.keywords);
    setSearchEngine(campaign.search_engine);
  };

  const handleNewCampaign = () => {
    setCampaignId("");
    setCampaignName("");
    setDomainName("");
    setKeywords("");
    setSearchEngine("Google");
    setSelectedCampaign(null);
  };

  const toggleCampaignStatus = (campaignId) => {
    setRunningCampaigns((prev) => ({
      ...prev,
      [campaignId]: !prev[campaignId],
    }));
  };

return (
    // <Container fluid className="d-flex flex-column align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg,rgb(244, 244, 247),rgb(235, 232, 238))" }}>
    //   <Card className="shadow-lg p-4 mb-4" style={{ width: "40rem", borderRadius: "15px", background: "rgba(250, 239, 239, 0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.3)", color: "#fff" }}>
    <Container
        fluid
        className="d-flex flex-column align-items-center py-4 px-2"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #E3F2FD, #BBDEFB)", // Light, soft gradient with blue tones
          color: "#343a40" // Dark grey text for better readability
        }}
      >
        <Card
          className="shadow-lg p-3 p-md-5 mb-4 w-100 w-md-75 w-lg-50"
          style={{
            width: "60rem", // Increased width here
            borderRadius: "30px", // Slightly more rounded corners for a modern look
            backgroundColor: "#ffffff", // Standard white background for a clean look
            border: "1px solid #e0e0e0", // Light grey border for subtle contrast
            color: "#212529", // Dark standard text inside card
            boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)" // Soft, subtle shadow for a polished look
          }}
        >
          
        {/* Card content goes here */}

        <h2 className="text-center mb-4" style={{ color: "#000" }}> Manage Campaign</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={(e) => handleSubmit(e, "start")}> 
          {/* <Form.Group className="mb-3">
            <Form.Label>Campaign ID</Form.Label>
            <Form.Control type="text" value={campaign_id}  />
          </Form.Group> */}

            <Form.Group className="mb-3 d-none">
              <Form.Label>Campaign ID</Form.Label>
              <Form.Control type="text" value={campaign_id} />
            </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control type="text" value={campaign_name} onChange={(e) => setCampaignName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Search Engine</Form.Label>
            <Form.Select value={search_engine} onChange={(e) => setSearchEngine(e.target.value)}>
              <option value="Google">Google</option>
              <option value="Bing">Bing</option>
              <option value="Yahoo">Yahoo</option>
              <option value="DuckDuckGo">DuckDuckGo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Domain Name</Form.Label>
            <Form.Control type="text" value={domain_name} onChange={(e) => setDomainName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keywords</Form.Label>
            <Form.Control type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
          </Form.Group>

          <div className="d-flex justify-content-between">  
          <Button
              variant={isEditMode ? "success" : "warning"}
              onClick={(e) => handleSubmit(e, isEditMode ? "update" : "save")}
              disabled={!isFormValid()}
            >
              {isEditMode ? <><FaEdit /> Update</> : <><FaSave /> Save</>}
            </Button>

          {/* <Button variant="warning" onClick={(e) => handleSubmit(e, "save")} disabled={!isFormValid()}><FaSave /> Save</Button>  */}
          <Button variant="secondary" onClick={handleNewCampaign}> New</Button>
          </div> 
        </Form>
      </Card>

      {/* Saved Campaigns Card */}
      <Card className="shadow-lg p-3 p-md-4 w-100 w-md-75 w-lg-50" style={{ width: "60rem" }}>
        {/* Saved Campaigns Section */}
      <h4 className="mt-4 text-dark">📌 Saved Campaigns</h4>
      {savedCampaigns.length > 0 ? (
        <ListGroup>
          {savedCampaigns.map((camp) => (
            <ListGroup.Item
              key={camp.id}
              className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center bg-light mb-2"
            >
              {/* Left side - Campaign details */}
              <div className="flex-grow-1">
                <strong>{camp.campaign_name}</strong>{" "}
                <Badge bg="info">{camp.search_engine}</Badge> <br />
                <small>{camp.domain_name}</small>
              </div>

              {/* Right side - Action buttons */}
              <div className="d-flex gap-2">
                {/* Edit button */}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setCampaignId(camp.campaign_id);
                    setCampaignName(camp.campaign_name);
                    setDomainName(camp.domain_name);
                    setKeywords(camp.keywords);
                    setSearchEngine(camp.search_engine);
                    setSelectedCampaign(camp);
                    setIsEditMode(true); // Set edit mode
                  }}
                  style={{ minWidth: '80px' }}  // Ensures buttons are of equal width
                >
                  <FaEdit /> Edit
                </Button>

                {/* Delete button */}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteCampaign(camp.campaign_id)}
                  style={{ minWidth: '80px' }}  // Ensures buttons are of equal width
                >
                  <FaTrash /> Delete
                </Button>

                {/* Start/Stop button */}
                <Button
                  size="sm"
                  variant={runningCampaigns[camp.campaign_id] ? "danger" : "success"}
                  onClick={() => {
                    toggleCampaignStatus(camp.campaign_id);

                    if (runningCampaigns[camp.campaign_id]) {
                      console.log("stopping");
                      stopCampaign(camp.campaign_id);
                    } else {
                      handleStartCampaign(
                        camp.campaign_id,
                        camp.domain_name,
                        camp.keywords,
                        camp.search_engine
                      );
                    }
                  }}
                  style={{ minWidth: '80px' }}  // Ensures buttons are of equal width
                >
                  {runningCampaigns[camp.campaign_id] ? <FaStop /> : <FaPlay />}{" "}
                  {runningCampaigns[camp.campaign_id] ? "Stop" : "Start"}
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-light">No saved campaigns found.</p>
      )}

      </Card>

    </Container>
  );
};

export default CreateCampaign;





































