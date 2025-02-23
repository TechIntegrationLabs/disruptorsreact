// Home.js
import React, { useEffect ,useState} from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';
import SwipeSlider from './SwipeSlider';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URL;
const Gallery = () => {

  const [getQuote, setgetQuote] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {

    fetch(`${apiUrl}/api/get-quote`)
    .then(response => response.json())
    .then(data => {
      setgetQuote(data[0]); // Accessing the header data from the response
      // Logging the specific property
    })
    .catch(error => console.error('Error fetching header data:', error));


    fetch(`${apiUrl}/api/footer-menu`)
    .then(response => response.json())
    .then(data => {
      setfooterMenu(data); // Accessing the header data from the response

    })
    .catch(error => console.error('Error fetching header data:', error));


  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/api/website-meta`)
      .then(response => {
        const data = response.data[0]; // Assuming your API always returns an array with a single object
        setMetaData(data);
        updateMetaTags(data);
      })
      .catch(error => {
        console.error('Error fetching meta data:', error);
      });
  }, []);

  const updateMetaTags = (data) => {
    var staticText = "Disruptors Media | "; 
    document.title = staticText + " " + data.gallery_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.gallery_meta_description); // Set meta description
    }
  };

  // Rest of your component logic/rendering
  return (

    <>

 
  <section className="main-gallery">

    <div className="container vid-cont">
      <div className="video-cont">
        <video className="video-background" autoPlay loop muted>
          <source src="./video/gallery-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div className="container cont-text">
      <div className="row va-ctr min-ht-g">
        <div className="main-slider-gallery">
          <div className="cont">
            <SwipeSlider />
          </div>
        </div>
        <div className="col-sm-3">
          <p>Swipe, Scroll, or <br/> click through Gallery <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <path d="M1 15L1 4.26946L12 4.26946M12 4.26946L8.64844 0.999999M12 4.26946L8.64844 7.53892" stroke="#F1EDE9" stroke-width="2"/>
</svg></p>
        </div>
        <div className="col-sm-6">
          <figure className="text-center gld-logo">
            <img src="./images/gold-logo.png" alt="*" />
          </figure>
        </div>
        <div className="col-sm-3">

        </div>
      </div>
    </div>
  </section>
 
  <section className="ft-quote">
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h3>{getQuote.main_heading}</h3>
        </div>
        <div className="col-sm-6 ft-r">
          <p>
            {getQuote.right_side_content}
          </p>
        </div>
        <div className="col-sm-12">
          <div className="bdr-container bdr-container-lower">
            <div className="sep-main fr"></div>
            <div className="sep-main sec"></div>
            <div className="sep-main th"></div>
            <div className="sep-main ft"></div>
            <div className="sep-main fv"></div>
            <div className="sep-main sx"></div>
            <div className="book-call-cta">
              <a href={getQuote.anchor_link}>
                {getQuote.anchor_text}<img src="./images/arrow-cta.svg" alt="*" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<div className="pre-footer">
    <div className="container">
      <div className="row">
        <ul className="links">
        {footerMenu.map((footerMenu) => (
                    <li>
                      <a className="shuffle" href={footerMenu.menu_name}>{footerMenu.menu_name}</a>
                    </li>
                ))}

                 
                <li>
                  <a className="shuffle" href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a className="shuffle" href="/terms-conditions">Terms And Conditions</a>
                </li>
        </ul>
      </div>
    </div>
  </div>
  
</>




  );
}

export default Gallery;
