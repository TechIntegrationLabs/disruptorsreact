import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_BASE_URL;

const Analytics = () => {
  const [googleSearchConsoleScript, setGoogleSearchConsoleScript] = useState(null);
  const [googleAnalyticsScript, setGoogleAnalyticsScript] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/seo-analytics`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGoogleSearchConsoleScript(data[0].google_search_console);
          setGoogleAnalyticsScript(data[0].google_analytics);
        }
      })
      .catch(error => console.error('Error fetching analyticsData data:', error));
  }, []);

  useEffect(() => {
    if (googleSearchConsoleScript && googleAnalyticsScript) {
      const head = document.head || document.getElementsByTagName('head')[0];
      const headContent = `
          ${googleSearchConsoleScript}
          ${googleAnalyticsScript}
      `;
      head.innerHTML += headContent;
    }
  }, [googleSearchConsoleScript, googleAnalyticsScript]);

  return null; // Since this component doesn't render anything visible
};

export default Analytics;
