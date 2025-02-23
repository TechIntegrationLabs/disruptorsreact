
import React, {useEffect, useState} from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';

const Notfound = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [footerMenu, setfooterMenu] = useState([]);

  useEffect(() => {

    fetch(`${apiUrl}/api/footer-menu`)
    .then(response => response.json())
    .then(data => {
      setfooterMenu(data); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));


    // Set the title when the component mounts
    document.title = 'Disruptors Media | Page Not Found';

    // Optionally, you can reset the title when the component unmounts
    return () => {
      document.title = 'Disruptors Media';
    };
  }, []);

  // Rest of your component logic/rendering
  return (

    <>
  
  <section className="main-sec not-found">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>404</h1>

          <h2>Nothing to see here</h2>


          <a href="/" className="primary-btn">
            Return Home <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M1 1H11M11 1V11M11 1L1 11" stroke="#F1EDE9" stroke-width="2"/>
</svg>
          </a>
        </div>
      </div>
    </div>
  </section>
  
  <section className="ft-quote">
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h3>Get a free Quote</h3>
        </div>
        <div className="col-sm-6 ft-r">
          <p>
            Think you need something but not sure what? That's what we're here
            for. Get in touch!
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
              <a href="javascript;;">
                Book a call <img src="./images/arrow-cta.svg" alt="*" />
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

export default Notfound;
