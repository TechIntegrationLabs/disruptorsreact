// about.js
import React, { useEffect  ,useState} from 'react';
import observer from 'intersection-observer';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URL;

const About = () => {

  const [processes, setProcesses] = useState([]);
  const [getQuote, setgetQuote] = useState([]);
  const [aboutTexts, setaboutTexts] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/api/our-process`)
        .then(response => response.json())
        .then(data => setProcesses(data))
        .catch(error => console.error('Error fetching Process:', error));

        fetch(`${apiUrl}/api/about-texts`)
        .then(response => response.json())
        .then(data => setaboutTexts(data))
        .catch(error => console.error('Error Texts', error));

      console.log(aboutTexts);

        fetch(`${apiUrl}/api/get-quote`)
        .then(response => response.json())
        .then(data => {
          setgetQuote(data[0]); // Accessing the header data from the response
         
        })
        .catch(error => console.error('Error get quote:', error));

        fetch(`${apiUrl}/api/footer-menu`)
    .then(response => response.json())
    .then(data => {
      setfooterMenu(data); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));


        const targetElement = document.getElementById('slide-abt');
        const elementToModify = document.getElementById('img-abt-fx');

    if (targetElement && elementToModify) {
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRect.top > window.innerHeight + 20) {
        // Add a class when the target element is visible or 300px below viewport
        elementToModify.classList.add('fx');
      } else {
        // Remove the class when the target element is hidden and not 300px below viewport
        elementToModify.classList.remove('fx');
      }
    });
  };

  const options = {
    root: null,
    rootMargin: '200px',
    threshold: 0.05,
  };

  const observerInstance = new IntersectionObserver(handleIntersection, options);

  observerInstance.observe(targetElement);

  // Cleanup observer when component unmounts
  return () => {
    observerInstance.disconnect();
  };
}


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
    document.title = staticText + " " + data.about_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.about_meta_description); // Set meta description
    }
  };

  
  useEffect(() => {
    // Replace with your actual API call
    fetch(`${apiUrl}/api/embed-code`)
      .then(response => response.json())
      .then(data => setVideoData(data))
      .catch(error => console.error('Error fetching video data:', error));
  }, []);

  // Rest of your component logic/rendering
  return (
    <>

  <>
   

  <section className="main-sec faq abth">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="fade-in-up">About</h1>
        </div>
      </div>
    </div>
  </section>

  <section className="main-banner abt">

      <div className="container">
         
          <div className="video-background abt">

                       <div className="video-container">
                  <video id="myVideo" poster={`${apiUrl}/${videoData.poster_picture}`} >
                      <source src='https://admin.disruptorsmedia.com/header_logos/1729545206_dm-abt.mp4' type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                  <div class="controls">
                    <span id="playBtn"><img src="./images/play-ico.png" /></span>
                    <span id="pauseBtn"><img src="./images/pause-icon.png" /></span>
                    <span id="muteBtn"><img src="./images/mute-icon.png" /></span>
                </div>
              </div>

          </div>

      </div>
  </section>
  
  <section className="main-sec abt">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">

          <figure id="img-abt-fx">
            <img src="https://disruptorsmedia.com/static/media/logo-emboss.dd95738662f68ae79dea.png" alt="*" />
          </figure>
          <div className="cont">
          {aboutTexts.map((aboutText) => (
    <h2 key={aboutText.id} className="fade-in-up">{aboutText.about_text}</h2>
))}

              {/* <h2 className="fade-in-up">We're architects of digital landscapes.</h2>
              <h2 className="fade-in-up">Turning clicks into customers.</h2>
              <h2 className="fade-in-up">A website that adapts to every visitor. </h2>
              <h2 className="fade-in-up">Email campaigns that feel like personal letters. </h2>
              <h2 className="fade-in-up">Social media pages receiving millions of engagement.</h2>
              <h2 className="fade-in-up">Launching brands into the dynamic digital world. </h2>
              <h2 className="fade-in-up">Where every interaction is an opportunity. </h2>
              <h2 className="fade-in-up">It's not just marketing. </h2>
              <h2 className="fade-in-up">It's a new chapter for your brand.</h2> */}
            </div>
        </div>
      </div>
    </div>
  </section>
  <section className="who-we-do" id="slide-abt">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <p>Our process</p>
          <ul className="slider-alter">
            {processes.map((process) => (
                <li>
                  <a href={process.enter_link ? process.enter_link : 'javascript:void(0)'}>
                  <div className="slide-main" key={process.id} style={{backgroundImage: `url(${apiUrl}/${process.featured_image})`}}>
                    <div className="text">
                      <h3>{process.main_heading}</h3>
                      <p>
                        {process.excerpt}
                      </p>
                    </div>
                  </div>
                  </a>
                </li>
            ))}
          </ul>
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

  {/*[if lt IE 9]>


    <![endif]*/}
</>

  );
}

export default About;
