// custom.js
import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";





export function initializeLoaderText() {
gsap.registerPlugin(ScrambleTextPlugin);


      var _CHARS_1 = '!1€5@#][6&$(=)£AF/&(234$$2N€O=(!@[1234567890';
      var _CHARS_2 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
      var tl = gsap.timeline({defaults: {duration: 2, ease: "none"}});
      
      tl.to("#loading-main-text", {
          duration: 2,
          scrambleText: {
              text: function() { return document.getElementById("loading-main-text").getAttribute("data-text"); },
              chars: _CHARS_1,
              revealDelay: 1,
              speed: 0.5,
              tweenLength: false
          }
      })
      .to("#loading-main-text-alter", {
          duration: 2,
          scrambleText: {
              text: function() { return document.getElementById("loading-main-text-alter").getAttribute("data-text"); },
              chars: _CHARS_2,
              revealDelay: 1,
              speed: 0.5,
              tweenLength: false
          }
      });
}

export function initializeAccordion() {
  setTimeout(function() { 
       $(document).ready(function() {
        alert('asdasd');
        $('.accordion-content').hide(); // Hides all accordion contents initially
        $('.accordion-title .toggle-sign').addClass('plus'); // Sets all toggle signs to '+'

        $('.accordion-title').click(function() {
          var $content = $(this).next('.accordion-content');
          var $sign = $(this).find('.toggle-sign');

          $content.slideToggle(function() {
            $sign.toggleClass('plus minus');
          });
        });


       


      }); 



      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".slider", {
        xPercent: -100,
        x: () => window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".slider",
          start: "top top",
          end: () => window.innerWidth * 3,
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      });  

      
       
  }, 1100);
}
