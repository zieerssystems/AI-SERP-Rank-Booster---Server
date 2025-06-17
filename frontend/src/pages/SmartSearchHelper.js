import React, { useEffect } from "react";

const SmartSearchHelper = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword");
    const domain = params.get("domain");

    if (!keyword || !domain) {
      console.error("❌ Keyword or Domain missing.");
      return;
    }

    // Step 1: If we are not on a Google page yet, redirect to it
    if (!window.location.href.includes("google.com/search")) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
      window.location.href = searchUrl;
      return;
    }

    // Step 2: Wait for Google results to load, then start checking links
    const interval = setInterval(() => {
      const links = Array.from(document.querySelectorAll("a"));
      const match = links.find(link => link.href.includes(domain));

      if (match) {
        clearInterval(interval);
        console.log("✅ Found domain, opening:", match.href);
        match.click(); // Simulate user click
      } else {
        const nextBtn = document.querySelector('#pnnext');
        if (nextBtn) {
          console.log("➡️ Domain not found, going to next page...");
          nextBtn.click(); // Go to next page
        } else {
          clearInterval(interval);
          console.log("❌ Domain not found in search results.");
        }
      }
    }, 3000);
  }, []);

  return <div>🔍 Searching for your domain, please wait...</div>;
};

export default SmartSearchHelper;
