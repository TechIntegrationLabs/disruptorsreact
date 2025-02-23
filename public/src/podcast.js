// Podcast.js
import React, { useEffect ,useState} from 'react';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';
import { pad } from './pad';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URL;
const Podcast = () => {

  const [faqs, setFaqs] = useState([]);
  const [footerMenu, setfooterMenu] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [description, setDescription] = useState({});
  const [podcasts, setPodcasts] = useState([]);


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


          fetch(`${apiUrl}/api/podcast-content`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the entire response
    setDescription(data.description); // Ensure this is a string
  })
  .catch(error => console.error('Error fetching podcast content:', error));

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

useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/podcasts`);
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  const updateMetaTags = (data) => {
    var staticText = "Disruptors Media | "; 
    document.title = staticText + " " + data.podcast_meta_title; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.podcast_meta_description); // Set meta description
    }
  };


  
const firstPodcast = podcasts[0];
  

  // Rest of your component logic/rendering
  return (

    <>
  
  
  <section className="main-sec faq">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="fade-in-up">Podcast</h1>
        </div>
      </div>
    </div>
  </section>


  <section className="previous-podcast">

    
        <section className="main-banner abt pod">

      <div className="container">
         
          <div className="video-background abt">

                       <div className="video-container">
                       {firstPodcast ? (
                  <video id="myVideo" poster={`${apiUrl}/${firstPodcast.video_poster}`}>
                      <source src={`${apiUrl}/${firstPodcast.video_url}`} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                   ) : (
                    <p>Loading...</p>
                  )}
                  <div class="controls">
                    <span id="playBtn"><img src="./images/play-ico.png" /></span>
                    <span id="pauseBtn"><img src="./images/pause-icon.png" /></span>
                    <span id="muteBtn"><img src="./images/mute-icon.png" /></span>
                </div>
              </div>

          </div>

      </div>
  </section>

    <div className="container grid-pd">
        <div className="row">
          {podcasts.map((podcast) => (
            <div className="col-sm-3" key={podcast.id}>
              <div className="sm-video" data-src={`${apiUrl}/${podcast.video_url}`}>
                <img
                  src={`${apiUrl}/${podcast.video_poster}`}
                  alt={`Podcast ${podcast.id}`}
                />
              </div>
            </div>
          ))}
        </div>
        
    </div>

  </section>

  <section className="ft-quote nopt-0 pd-top">
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
              <a href="javascript:;">
                Past Podcasts <img src="./images/arrow-cta.svg" alt="*" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="main-text-pd">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <p>{typeof description === 'string' ? description : 'Description not available.'}</p>
        </div>
      </div>
    </div>
  </section>

  <section className="podcast-new">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h3>Professional Podcast/Content Studio with Amazing Lighting and Scenery</h3>
          <h5>North Salt Lake, Utah</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <figure className="main-image">
             <img src="./images/podcast-new-lg.jpg" alt="Podcast" />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm.png" alt="Podcast" />
          </figure>
        </div>
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm-1.png" alt="Podcast" />
             <span className="more-pd"><img src="./images/more-pd.svg" alt="Podcast" /></span>
          </figure>
        </div>
      </div>
      <div className="row hide-pd">
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm-2.png" alt="Podcast" />
          </figure>
        </div>
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm-3.png" alt="Podcast" />
          </figure>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-7">
          <h4>About the Space</h4>
          <p>Leave the distractions behind and unleash your vision in our pristine, professional studio. Boasting state-of-the-art equipment, crisp lighting, and multiple cameras, we provide the platform for you to capture your audio and visuals in stunning detail. This isn't just a space, it's a canvas for your creativity, where versatile camera angles and high-tech tools empower you to craft your audio masterpiece. Come, capture your voice, share your story, and let your podcast shine. Our studio boasts 3 HD TVs for dynamic visuals, 3 top-of-the-line Black Magic Podcast cameras for stunning quality and 4 professional Shure SM7B microphones capturing crystal-clear audio. In-house lighting ensures your visuals shine, and our experienced videographer and editing team can elevate your podcast to the next level.</p>
        </div>
        <div className="col-sm-5 text-center">
          <h4 className="mpbx-32 sm">$99/HR (2 Hour Minimum)</h4>
          <a href="https://link.disruptorsmedia.com/widget/bookings/podcasts-booking" target="_blank" className="btn">BOOK now</a>
          <a href="https://link.disruptorsmedia.com/widget/bookings/disruptorsmedia/introcall-8ec0e112-e896-49c4-a71b-6f8d1958736a" target="_blank" className="btn">MEssage US</a>
        </div>
      </div>
    </div>
  </section>


  <section className="podcast-new">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h3>Professional Podcast/Content Studio with Amazing Lighting and Scenery</h3>
          <h5>North Salt Lake, Utah</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <figure className="main-image">
             <img src="./images/podcast-new-lg-1.jpg" alt="Podcast" />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm1.jpg" alt="Podcast" />
          </figure>
        </div>
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm1-1.jpg" alt="Podcast" />
             <span className="more-pd"><img src="./images/more-pd.svg" alt="Podcast" /></span>
          </figure>
        </div>
      </div>
      <div className="row hide-pd">
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm1-2.jpg" alt="Podcast" />
          </figure>
        </div>
        <div className="col-sm-6">
          <figure className="sm-image">
             <img src="./images/pd-new-sm1-3.jpg" alt="Podcast" />
          </figure>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-7">
          <h4>About the Space</h4>
          <p>Leave the distractions behind and unleash your vision in our pristine,  professional studio. Boasting state-of-the-art equipment, crisp  lighting, and multiple cameras, we provide the platform for you to  capture your audio and visuals in stunning detail. This isn't just a  space, it's a canvas for your creativity, where versatile camera angles  and high-tech tools empower you to craft your audio masterpiece. Come,  capture your voice, share your story, and let your podcast shine. Our  studio boasts 3 top-of-the-line BlackMagic Podcast cameras for stunning  quality and 4 professional Shure SM7B microphones capturing  crystal-clear audio. In-house lighting ensures your visuals shine, and  our experienced videographer and editing team can elevate your podcast  to the next level.</p>
        </div>
        <div className="col-sm-5 text-center">
          <h4 className="mpbx-32 sm">$99/HR (2 Hour Minimum)</h4>
          <a href="https://link.disruptorsmedia.com/widget/bookings/podcasts-booking" target="_blank" className="btn">BOOK now</a>
          <a href="https://link.disruptorsmedia.com/widget/bookings/disruptorsmedia/introcall-8ec0e112-e896-49c4-a71b-6f8d1958736a" target="_blank" className="btn">MEssage US</a>
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

export default Podcast;
