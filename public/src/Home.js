// Home.js
import { get } from 'jquery';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WhatWeDoSlider from './WhatWeDoSlider';
import WhatWeDoSliderBtm from './WhatWeDoSliderBtm';

const apiUrl = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const [homePage, sethomePage] = useState([]);
  const [getQuote, setgetQuote] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [metaData, setMetaData] = useState({});

  
  
  useEffect(() => {
    
    fetch(`${apiUrl}/api/homepage-settings`)
    .then(response => response.json())
    .then(data => {
      sethomePage(data[0]); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));

    fetch(`${apiUrl}/api/get-quote`)
    .then(response => response.json())
    .then(data => {
      setgetQuote(data[0]); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));


    fetch(`${apiUrl}/api/footer-menu`)
    .then(response => response.json())
    .then(data => {
      setfooterMenu(data); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));


  }, []);

  const [featuredclients, setFeaturedClients] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/featured-clients`)
        .then(response => response.json())
        .then(data => setFeaturedClients(data))
        .catch(error => console.error('Error fetching Featured Clients:', error));
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


  useEffect(() => {
    const images = [
      './images/hand-robot.png',
      './images/hand-human.png',
      './images/phone.png',
      './images/after-phone-sec.png',
      // Add more image paths as needed
    ];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    
  }, []);



  const updateMetaTags = (data) => {
    var staticText = "Disruptors Media | "; 
    document.title = staticText + " " + data.home_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.home_meta_description); // Set meta description
    }
  };

  
            const processedHTML = {__html: homePage.section_one_sub_heading};


  // Rest of your component logic/rendering
  return (
    <>

    
  <section className="main-banner">

      <div className="container">
          <div className="text">
            <img src="./images/gold-logo-banner.png" alt="Phone" />
            <h3>DIGITAL MARKETING AGENCY</h3>

            <div className="btns">
              <a href="Services">Services</a>
              <a href="Contact">Contact</a>
              <a href="Podcast">Podcast</a>
            </div>
          </div>
          <div className="video-background hme">
              <iframe 
                  src={`https://www.youtube.com/embed/${homePage.embed_code}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0&playlist=${homePage.embed_code}&modestbranding=1`}
                  frameBorder="0" 
                  allow="autoplay;" 
                  allowFullScreen 
                  title="Video Background"
              />
          </div>

      </div>
  </section>

  <section className="ft-quote hme-vid">
    <div className="container">
      <div className="row">
        
        <div className="col-sm-12">
          <div className="bdr-container bdr-container-upper">
            <div className="sep-main fr"></div>
            <div className="sep-main sec"></div>
            <div className="sep-main th"></div>
            <div className="sep-main ft"></div>
            <div className="sep-main fv"></div>
            <div className="sep-main sx"></div>
            <div className="book-call-cta">
              <a href={getQuote.anchor_link}>
                {getQuote.anchor_text} <img src="./images/arrow-cta.svg" alt="*" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  


   <section className="image-unmask">
      <div className="image-container" id="img1-container">
        <video id="background-video" autoPlay loop muted playsInline>
          <source src="./video/mobile-video-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figure className="img-lft">
          <img src="./images/hand-robot.png" alt="Hand robot" />
        </figure>
        <figure className="img-rft">
          <img src="./images/hand-human.png" alt="Hand human" />
        </figure>
      </div>
      <div className="main-phone">
        <img id="img1" src="./images/phone.png" alt="Phone" />
      </div>
      <div className="image-container" id="img2-container">
        <img id="img2" src="./images/after-phone-sec.png" alt="After phone section" />
      </div>
      <div className="text-roll">
        <p>{homePage.section_two_box_text}</p>
      </div>
    </section>


  
  <section className="who-we-do hme">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <p>
            <span>II</span> {homePage.section_three_main_heading}
          </p>
        </div>
      </div>
    </div>
        
       <div className="container">

        <div className="slider">
         <WhatWeDoSlider />

         </div>

         </div>

         <div className="container">

        <div className="slider bttop-30">
         <WhatWeDoSliderBtm />

         </div>

         </div>

  </section>


  <section className="fea-clients">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <p>
            <span>III</span> {homePage.section_four_main_heading}
          </p>
          <div className="cont">
          {featuredclients.map((featuredclient) => (
              <div className="col-sm-4 col-xs-6">
                <figure>
                <a href={featuredclient.featured_link}>
                  <img src={`${apiUrl}/${featuredclient.add_feature_clients}`} alt="*" />
                  </a>
                </figure>
              </div>
               ))}
          
          </div>
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
                {getQuote.anchor_text} <img src="./images/arrow-cta.svg" alt="*" />
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
  
  {/*[if lt IE 9]>


    <![endif]*/}
</>

  );
}

export default Home;
