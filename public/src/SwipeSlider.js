import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const apiUrl = process.env.REACT_APP_BASE_URL;

const SwipeSlider = () => {
  const sliderRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/videos`)
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching Videos:', error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: index => {
      // Play the video when the slide changes
      const currentVideo = document.getElementById(`video${index}`);
      if (currentVideo) {
        currentVideo.play().catch(error => {
          // Autoplay was prevented, handle the error
          console.error('Autoplay was prevented:', error);
        });
      }
    },
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {videos.map((video, index) => (
        <div key={index}>
          <video
            id={`video${index}`}
            width="100%"
            height="810px"
            autoPlay
            muted
            loop
            playsInline
            poster="./images/poster.jpg"
          >
            <source src={`${apiUrl}/${video.add_gallery_video}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </Slider>
  );
};

export default SwipeSlider;
