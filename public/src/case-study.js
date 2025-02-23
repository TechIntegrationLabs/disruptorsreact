import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrap-theme.min.css';
import './custom.css';

import { initializePortfolio } from './port';
import { initScrambleAnimations } from './initScrambleAnimations';

const apiUrl = process.env.REACT_APP_BASE_URL;
const CaseStudy = () => {
    const navigate = useNavigate();
    const { slug } = useParams();


    const [previousPortfolio, setPreviousPortfolio] = useState(null);
    const [projectDetails, setProjectDetails] = useState([]);
    const [nextPortfolio, setNextPortfolio] = useState(null);
    const [firstImage, setFirstImage] = useState(null); // State to hold the first image URL
    const [metaData, setMetaData] = useState({});

    const [footerMenu, setfooterMenu] = useState([]);


    useEffect(() => {


     fetch(`${apiUrl}/api/footer-menu`)
    .then(response => response.json())
    .then(data => {
      setfooterMenu(data); // Accessing the header data from the response
     
    })
    .catch(error => console.error('Error fetching header data:', error));

      const timestamp = Date.now(); // Get current timestamp
        fetch(`${apiUrl}/api/project-detail/${slug}?timestamp=${timestamp}`)
            .then(response => response.json())
            .then(
                data => {
                    // Extract current_portfolio and next_portfolio from the data object
                    const { current_portfolio, next_portfolio, previous_portfolio } = data;
                    // Set the states using extracted data
                    setProjectDetails(current_portfolio);
                    // Assuming you have corresponding states for next portfolio as well
                    setNextPortfolio(next_portfolio);
                    setPreviousPortfolio(previous_portfolio);
                    console.log(next_portfolio);
                    setTimeout(() => {
                    const identifier = ".info-scramb";
                    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    initScrambleAnimations(identifier, chars);
                    initializePortfolio();
                     
                    },1000); // Delay of 1 second (1000 milliseconds)


                    setTimeout(() => {
                      const nextProjectUrlcheck = document.querySelector('.next-project a');

                      if (!nextProjectUrlcheck) {
                          document.querySelector('.next-project').classList.add('empty-url');
                      }

                    },500); // Delay of 1 second (1000 milliseconds)


                },
                error => {
                    console.error('Error fetching project details:', error);
                }
            );
    }, [slug]);


    useEffect(() => {


      
      initializePortfolio();

     

const redirect = (url) => {
    window.location.href = url;
};

      const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    nextProjectDiv.classList.add('reached-next');
                    test.classList.remove('fade-in');
                    test.classList.add('fade-out');
                }, 1200); 

                setTimeout(() => {
                   test.classList.add('fade-in');
                }, 3600); 

                setTimeout(() => {
                    
                    const nextProjectUrl = document.querySelector('.next-project a').getAttribute('href');
                    redirect(nextProjectUrl);
                    const gridElement = document.querySelector('.grid');

                    setTimeout(() => {
                    const identifier = ".info-scramb";
                    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    initScrambleAnimations(identifier, chars);
                    initializePortfolio();
                     
                    },1000); // Delay of 1 second (1000 milliseconds)
                }, 3200);
            }
        },
        { threshold: 0.5 }
    );

    const nextProjectDiv = document.querySelector('.next-project');
    const test = document.querySelector('.prj-dt');
    
    if (nextProjectDiv) {
        observer.observe(nextProjectDiv);
    }

    return () => {
        if (nextProjectDiv) {
            observer.unobserve(nextProjectDiv);
            nextProjectDiv.classList.remove('reached-next'); 
        }
    };
}, [navigate]);

    // Set the first image URL when projectDetails changes
    useEffect(() => {
        if (projectDetails && projectDetails.images && projectDetails.images.length > 0) {
            setFirstImage(`${apiUrl}/${projectDetails.images[0]}`);
        }
    }, [projectDetails]);


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
    var staticText = "Disruptors Media | Work"; 
    document.title = staticText; 
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', data.work_meta_description); // Set meta description
    }
  };


    return (
        <>

            <>

              <div className="prj-dt">
              <section className="lst-prj">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            
                                {previousPortfolio && (
                                    <a href={'/work/' + previousPortfolio.portfolio_slug}>
                                        <h3>
                                            Previous Project <img src="/images/prev-arrow.png" width="" />
                                        </h3>
                                    </a>
                               
                                    )}
                        </div>
                    </div>
                </div>
              </section>
                

               <section className="main-sec faq case-study">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">

                                {projectDetails && (
                                    <h1 className="fade-in">{projectDetails?.portfolio_name}</h1>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
                <section className="case-study-dt">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="col-info frst">
                                    <h4 className="info-scramb" data-text="Overview"></h4>
                                    {projectDetails && (
                                        <p className="info-scramb" data-text={projectDetails?.overview_description}>
                                            
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="show-res img-case-frst">
                              <div className="col-img col-full">
                                {firstImage && (
                                    <div className="col-img col-full">
                                        <img src={firstImage} alt={`Project Image`} />
                                    </div>
                                )}
                              </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="col-info">
                                    <h4 className="info-scramb" data-text="Team"></h4>
                                    {projectDetails && (
                                        <div>
                                            {projectDetails?.team_description && (
                                                projectDetails.team_description.split(',').map((line, index) => (
                                                    <p className="info-scramb" data-text={line} key={index}></p>
                                                ))
                                            )}
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="col-info">
                                    <h4 className="info-scramb" data-text="Tags"></h4>
                                    {projectDetails && (
                                        <div>
                                            {projectDetails?.portfolio_tags && (
                                                projectDetails.portfolio_tags.split(',').map((tag, index) => (
                                                    <p className="info-scramb" data-text={tag.trim()} key={index}>
                                                        
                                                    </p>
                                                ))
                                            )}
                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="case-study-lst-img">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <div className="grid">
                                {projectDetails?.images && (
                                    projectDetails.images.map((image, index) => (
                                        <div key={index}
                                             className={`col-img ${index === 0 ? 'col-full' : 'col-half'}`}>
                                            <img src={`${apiUrl}/${image}`} alt={`Project Image ${index + 1}`}/>
                                        </div>
                                    ))
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                </div>
                <section className="next-project">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                
                                    {nextPortfolio && (
                                    <a href={'/work/' + nextPortfolio.portfolio_slug}>
                                        <h3>
                                            Next Project{" "}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={15}
                                                height={14}
                                                viewBox="0 0 15 14"
                                                fill="none"
                                            >
                                                <path
                                                    d="M0 1.5H10.7305V12.5M10.7305 12.5L14 9.14844M10.7305 12.5L7.46108 9.14844"
                                                    stroke="#2B2B2B"
                                                    strokeWidth={2}
                                                />
                                            </svg>
                                        </h3>
                                    </a>
                               
                                    )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                {nextPortfolio && (
                                    <h2>{nextPortfolio.portfolio_name}</h2>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
                 
            </>

            {/*[if lt IE 9]>


    <![endif]*/}
        </>

    );
}

export default CaseStudy;