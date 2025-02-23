// Home.js
import React, { useEffect ,useState} from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';
import { pad } from './pad';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URL;
const Faq = () => {

  const [faqs, setFaqs] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
const [metaData, setMetaData] = useState({});

  const [getQuote, setgetQuote] = useState([]);
  useEffect(() => {
      fetch(`${apiUrl}/api/all-faqs`)
          .then(response => response.json())
          .then(data => setFaqs(data))
          .catch(error => console.error('Error fetching FAQs:', error));

          fetch(`${apiUrl}/api/get-quote`)
          .then(response => response.json())
          .then(data => {
            setgetQuote(data[0]); // Accessing the header data from the response
            //console.log(data[0]); // Logging the specific property
          })
          .catch(error => console.error('Error fetching header data:', error));

          fetch(`${apiUrl}/api/footer-menu`)
          .then(response => response.json())
          .then(data => {
            setfooterMenu(data); // Accessing the header data from the response
            //console.log(data.data); // Logging the specific property
          })
          .catch(error => console.error('Error fetching header data:', error));
  }, []);

  console.log(faqs);

  
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
    document.title = staticText + " " + data.faq_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.faq_meta_description); // Set meta description
    }
  };

  // Rest of your component logic/rendering
  return (

    <>
  
  <section className="main-sec faq">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="fade-in-up">FAQ</h1>
        </div>
      </div>
    </div>
  </section>
  <section className="faq-sec">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="cont">
            <div className="row">
              <div className="col-sm-12">
              {faqs.map((faq ,index) => (
                  <div className="accordion-section" key={faq.id}>
                      <div className="accordion-title">
                          <small>{pad(index + 1, 2)}</small>
                          <span className="toggle-sign" />
                          {faq.question}
                      </div>
                      <div className="accordion-content">
                          <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                  </div>
              ))}
              </div>
            </div>
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
  
</>




  );
}

export default Faq;
