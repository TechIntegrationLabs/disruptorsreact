import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';

function MasonryComponent({ children }) {
  const masonryRef = useRef(null);

  useEffect(() => {


    
    let timeoutId = setTimeout(() => {
      // Initialize Masonry once component is mounted
      const masonry = new Masonry(masonryRef.current, {
        // Add Masonry options here if needed
        itemSelector: '.col-img',
        // Other options...
      });

      // Optionally, you may want to trigger layout after images have loaded
      masonry.on('layoutComplete', () => {
        console.log('Masonry layout completed');
      });

      // Clean up Masonry instance when component unmounts
      return () => {
        masonry.destroy();
      };
    }, 4000); // Delay for 1000 milliseconds (1 second)

    return () => clearTimeout(timeoutId); // Cleanup timeout if component unmounts before the timeout triggers
  }, []);

  return (
    <div ref={masonryRef} className="grid">
      {children}
    </div>
  );
}

export default MasonryComponent;