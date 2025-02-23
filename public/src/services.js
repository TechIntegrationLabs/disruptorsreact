// Home.js
import React, { useEffect ,useState } from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';
import { pad } from './pad';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URL;

const Services = () => {

  const [faqs, setFaqs] = useState([]);
  const [servicesPage, setServicesPage] = useState([]);
  const [servicesecondSection, setservicesecondSection] = useState([]);
  const [getQuote, setgetQuote] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    fetch(`${apiUrl}/api/what-we-do-faqs`)
        .then(response => response.json())
        .then(data => setFaqs(data))
        .catch(error => console.error('Error fetching FAQs:', error));



        fetch(`${apiUrl}/api/footer-menu`)
        .then(response => response.json())
        .then(data => {
          setfooterMenu(data); // Accessing the header data from the response
         
        })
        .catch(error => console.error('Error fetching header data:', error));
    
        fetch(`${apiUrl}/api/get-quote`)
        .then(response => response.json())
        .then(data => {
          setgetQuote(data[0]); // Accessing the header data from the response
         
        })
        .catch(error => console.error('Error fetching header data:', error));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/get-services-page`)
        .then(response => response.json())
        .then(data => setServicesPage(data))
        .catch(error => console.error('Error fetching Services Page:', error));
  }, []);


  useEffect(() => {
    fetch(`${apiUrl}/api/get-services-page`)
        .then(response => response.json())
        .then(data => setservicesecondSection(data))
        .catch(error => console.error('Error fetching Services Page:', error));
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
    document.title = staticText + " " + data.services_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.services_meta_description); // Set meta description
    }
  };


  // Rest of your component logic/rendering
  return (
   <>
  {servicesPage.map((service, index) => (
  <section className="main-sec srv">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
        <h1 className="fade-in-up">{service.services_page_main_heading}</h1>

          {/* <p className="show-res">
              Our approach is simple yet impactful. We combine strategic thinking
              with creative flair to enhance your digital presence and drive real
              results. Whether expanding your audience or boosting your online
              profile, our process is designed to take your brand from ordinary to
              extraordinary, efficiently and effectively.
            </p> */}
        </div>
      </div>
      <div className="row">
        <div className="srv-cont-bg">
          <div className="row">
            <div className="col-lg-7">
              <figure>
                <img src={`${apiUrl}/${service.services_page_box_inner_image}`} alt="*" />
              </figure>
            </div>
            <div className="col-lg-5 hide-res">
              <p>
              {service.services_page_box_inner_content}
              </p> 
              <figure className="text-right rotating-element">
                <img src="./images/hand-srv.png" alt="*" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  ))}
       <section className="srv-what-we-do">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="cont">
                  <div className="row">
                    {servicesecondSection.map((secondservice, index) => (
                    <div className="col-sm-4">
                      <h2>{secondservice.services_page_second_section_main_heading}</h2>
                      <p>
                        {secondservice.services_page_second_section_main_content}
                      </p>
                    </div>
                    ))}
                    <div className="col-sm-2 hide-res" />
                    <div className="col-sm-8 col-lg-6">
                      {faqs.map((faq ,index) => (
                          <div key={index} className="accordion-section">
                            <div className="accordion-title">
                              <small>{pad(index + 1, 2)}</small> {faq.question}{" "}
                              <span className="toggle-sign" />
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
              <a href="javascript;;">
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

export default Services;
