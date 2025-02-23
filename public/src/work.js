// Home.js
import React, { useEffect ,useState } from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BASE_URL;

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [getQuote, setgetQuote] = useState([]);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/api/projects`)
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => console.error('Error fetching FAQs:', error));

        fetch(`${apiUrl}/api/footer-menu`)
        .then(response => response.json())
        .then(data => {
          setfooterMenu(data); // Accessing the header data from the response
 // Logging the specific property
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
    document.title = staticText + " " + data.work_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.work_meta_description); // Set meta description
    }
  };

  // Rest of your component logic/rendering
  return (
  <>
  
  <section className="main-sec faq">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="fade-in-up">Work</h1>
        </div>
      </div>
    </div>
  </section>
  <section className="work-lst">
    <div className="container">
      <div className="row">
        {projects.map((project, index) => (
          <div className="col-sm-6">
            <div className="work-bx">
              <a href={`work/${project.portfolio_slug}`}>
                <figure>
                  <img src={`${apiUrl}/${project.portfolio_image}`} alt="*"/>
                </figure>
                <div className="dt">
                  <h3>{project.portfolio_name}</h3>
                  <p>{project.categories.join(', ')}</p>
                </div>
              </a>
            </div>
          </div>
        ))}

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

export default Work;
