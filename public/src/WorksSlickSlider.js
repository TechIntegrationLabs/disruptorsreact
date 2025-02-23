import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import jQuery
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const apiUrl = process.env.REACT_APP_BASE_URL;

const WorksSlickSlider = () => {
  const [whatwedo, setWhatWeDo] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/what-we-do-lists`)
      .then(response => response.json())
      .then(data => setWhatWeDo(data))
      .catch(error => console.error('Error fetching Who we do:', error));
  }, []);

  useEffect(() => {
    $('.slick-slider').slick(); // Initialize Slick Slider after data fetch
  }, [whatwedo]); // Add whatwedo as dependency to reinitialize the slider when the data changes

  return (
    <div className="slick-slider">
      {whatwedo.map(whatwe => (
        <div className="slide-cont" key={whatwe.id}>
          <a href={whatwe.enter_link}>
            <div
              className="slide-main"
              style={{ backgroundImage: `url(${apiUrl}/${whatwe.featured_image})` }}
            >
              <div className="text">
                <h3>{whatwe.main_heading}</h3>
                <p>{whatwe.excerpt}</p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default WorksSlickSlider;
