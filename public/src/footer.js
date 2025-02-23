// Footer.js
// Footer.js
import React, {useEffect, useState} from 'react';

const apiUrl = process.env.REACT_APP_BASE_URL;

const Footer = () => {
  const [footerMenu, setfooterMenu] = useState([]);
  const [getQuote, setgetQuote] = useState([]);
  const [footerData, setfooterData] = useState([]);
  const [socialmediaData, setsocialmediaData] = useState([]);

  useEffect(() => {

    fetch(`${apiUrl}/api/footer-menu`)
        .then(response => response.json())
        .then(data => {
          setfooterMenu(data); // Accessing the header data from the response
          //console.log(data.data); // Logging the specific property
        })
        .catch(error => console.error('Error fetching header data:', error));

    fetch(`${apiUrl}/api/get-quote`)
        .then(response => response.json())
        .then(data => {
          setgetQuote(data[0]); // Accessing the header data from the response
          //console.log(data[0]); // Logging the specific property
        })
        .catch(error => console.error('Error fetching header data:', error));

    fetch(`${apiUrl}/api/footer-data`)
        .then(response => response.json())
        .then(data => {
          setfooterData(data); // Accessing the header data from the response
          //console.log(data); // Logging the specific property
        })
        .catch(error => console.error('Error fetching header data:', error));


    fetch(`${apiUrl}/api/social-media-links`)
        .then(response => response.json())
        .then(data => {
          setsocialmediaData(data); // Accessing the header data from the response
          //console.log(data); // Logging the specific property
        })
        .catch(error => console.error('Error fetching header data:', error));

  }, []);
  return (

    
    
    <footer className="footer">
    <div className="container-fluid">
      <div className="row va-ctr">
        <div className="col-sm-4">
          <p>
            ©2024 Disruptors Media inc. <br /> 650 N Main St, North Salt Lake,
            UT 84054
          </p>
        </div>
        <div className="col-sm-4 text-center">
        <ul className="social">
                  {socialmediaData.map((socialmedia,index) => (

                  <li key={index}>
                    <a href={socialmedia.social_media_link_url}>
                      <img src={`${apiUrl}/${socialmedia.social_media_icon}`} alt="*"/>
                    </a>
                  </li>
                  ))}

                </ul>
        </div>
        <div className="col-sm-4 text-right">
          <div class="text-ft">
            <p className="scramb2" data-text="40.853400, -111.911790">40.853400, -111.911790</p>
          </div>
          <div class="text-ft">
            <p className="scramb" data-text="Load Address: 034526-01, IScxx compressed">&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;


