import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const apiUrl = process.env.REACT_APP_BASE_URL;


const WhatWeDoSliderBtm = () => {
  const sliderRef = useRef(null);
  const [whatwedobtm, setwhatwedobtm] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/what-we-do-lists-btm`)
        .then(response => response.json())
        .then(data => setwhatwedobtm(data))

        .catch(error => console.error('Error fetching Who we do:', error));
  }, []); 


  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 4000,
    rtl: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1380,
          settings: {
            slidesToShow: 2
          }
        }
        // Add more breakpoints if needed
      ]


  };

  return (
    <Slider ref={sliderRef} {...settings}>

    {whatwedobtm.map((whatwe) => (
          <div className="slide-cont">
            <a href={whatwe.enter_link}>
            <div className="slide-main" key={whatwe.id} style={{backgroundImage: `url(${apiUrl}/${whatwe.featured_image})`}}>
              <div className="text">
                <h3>{whatwe.main_heading}</h3>
                <p>
                  {whatwe.excerpt}
                </p>
              </div>
            </div>
            </a>
          </div>
      ))}

    </Slider>
  );
};

export default WhatWeDoSliderBtm;