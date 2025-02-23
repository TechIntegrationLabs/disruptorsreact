// custom.js
import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";



export function initializePortfolio() { 


 window.scrollTo({
   top: 0,
   behavior: 'instant' // This will make the scrolling smooth
});   


function observeFadeIn(element) {
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        var callback = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    // Remove the "is-visible" class when the element is not visible
                    entry.target.classList.remove("is-visible");
                }
            });
        };

        var observer = new IntersectionObserver(callback, options);
        observer.observe(element);
    }

    // Observe the elements you want to check for visibility
    document.querySelectorAll(".fade-in").forEach(function (element) {
        observeFadeIn(element);
    });

}
