// custom.js
import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";



  

export function initScrambleAnimations(identifier, chars) {


    
    gsap.registerPlugin(ScrambleTextPlugin);

    var elements;

    // Check if the identifier is a class or an ID
    if (identifier.startsWith('.')) {
        elements = document.querySelectorAll(identifier);
    } else {
        var element = document.getElementById(identifier);
        if (element) {
            elements = [element];
        } else {
            //console.error("Element with identifier '" + identifier + "' not found on the page.");
            return;
        }
    }

    if (elements.length === 0) {
        //console.error("No elements found with identifier '" + identifier + "'.");
        return;
    }

    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    elements.forEach(function (element) {
        var tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });

        var callback = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    tl.restart();
                } else {
                    tl.pause();
                }
            });
        };

        var observer = new IntersectionObserver(callback, options);

        observer.observe(element);

        tl.to(element, {
            duration: 1,
            scrambleText: {
                text: function () { return element.getAttribute("data-text"); },
                chars: chars,
                revealDelay: 0,
                speed: 1,
                tweenLength: false
            }
        });
    });
}
// Example usage with class
initScrambleAnimations(".info-scramb", 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', "data-text");

