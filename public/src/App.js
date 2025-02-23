import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Header from './header';
import Footer from './footer';
import Notfound from './Notfound';
import Home from './Home';
import About from './about';
import CaseStudy from './case-study'; 
import Contact from './contact';
import Faq from './faq'; 
import Services from './services'; 
import Work from './work'; 
import Podcast from './podcast'; 
import Gallery from './gallery';
import Privacy from './privacy';
import Terms from './terms';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import './App.css';

import Analytics from './Analytics';

import { initializeAccordion } from './pages';

import { initializePortfolio } from './port';
const apiUrl = process.env.REACT_APP_BASE_URL;

function App() {

  const [hasLoadedCookie, setHasLoadedCookie] = useState(false);
  const [counter, setCounter] = useState(0);
  const [fadeIn, setFadeIn] = useState(false); // State to control fade-in effect

  // Use useRef to track whether useEffect has run
  const hasEffectRun = useRef(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/header-data`)
      .then(response => {
        if (response.ok) {
          // Status code is 200
          return response.json(); // Parse response body as JSON
        } else {
          // Non-200 status code
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then(headerData => {
        // Run initialization after header data is fetched
        if (!hasEffectRun.current) {
          initializeAfterHeaderData();
          hasEffectRun.current = true;
        }
      })
      .catch(error => {
        console.error('Error fetching header data:', error);
        // Handle errors
      });

    const initializeAfterHeaderData = async () => {
      try {
        // Initialize accordion
        initializeAccordion();
        //initializePortfolio();
        setFadeIn(true);

        
      } catch (error) {
        console.error('Error initializing after fetching header data:', error);
        // Handle errors
      }
    };

    // Set has loaded cookie
    if (!Cookies.get('hasloaded')) {
      setHasLoadedCookie(true);
    } else {
      setHasLoadedCookie(false);
    }

    // Set the "hasloaded" cookie after 2 seconds
    const timeoutId = setTimeout(() => {
      Cookies.set('hasloaded', 'true');
    }, 1000);

    // Set interval for counter
    const intervalId = setInterval(() => {
      setCounter(prevCounter => (prevCounter < 100 ? prevCounter + 1 : prevCounter));
    }, 35);

    // Clear interval and set counter to 100 after 3.5 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      setCounter(100);
    }, 3500);

    // Clean-up function for intervals and timeouts
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []); // Dependency array ensures this effect runs only once on component mount

  // Function to handle navigation to next page
  const handleNextPageClick = () => {
    setFadeIn(false); // Trigger fade-out effect when navigating to next page
    // Navigate to next page logic here
  };

  return (
    <ReactLenis root>
    <Analytics />
      <div className={`main-app ${fadeIn ? 'fade-in' : 'fade-out'}`}>
        <>
          {hasLoadedCookie && (
            <div className={`counter-content ${counter === 100 ? 'hides' : ''}`}>
              <div className="loader-container">
                <div className="top-text"><p>Your experience is loading</p></div>
                <div className="counter">{counter}%</div>
                <div className="ft-text">
                  <div className="text">
                    <p className="customScramble2" data-text="40.853400, -111.911790">&nbsp;</p>
                    <p className="customScramble" data-text="Load Address: 034526-01, IScxx compressed">&nbsp;</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CSSTransition
            classNames="fade-in"
            timeout={500} // Adjust as needed
          >
            <Header />
          </CSSTransition>

          <CSSTransition
            classNames="fade-in"
            timeout={1500} // Adjust as needed
          >
            <Router>
              <Routes>
                <Route path="/index.html" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work" element={<Work />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/terms-conditions" element={<Terms />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </Router>
          </CSSTransition>

          {/* Conditionally render the Footer based on the route */}
          {window.location.pathname !== '/case-study' && (
            <Footer />
          )}
        </>
      </div>
    </ReactLenis>
  );
}

export default App;