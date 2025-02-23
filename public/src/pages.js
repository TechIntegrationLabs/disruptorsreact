// custom.js
import $ from 'jquery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export function initializeAccordion() {


    setTimeout(function() { 


        
        $('document').ready(function($) {


            const video = $('#myVideo').get(0);
            const playBtn = $('#playBtn');
            const pauseBtn = $('#pauseBtn');
            const muteBtn = $('#muteBtn');

            playBtn.on('click', function() {
                video.play();
                playBtn.hide();
                pauseBtn.show();
                muteBtn.show(); // Show mute button when video plays
            });

            pauseBtn.on('click', function() {
                video.pause();
                pauseBtn.hide();
                playBtn.show();
                muteBtn.hide(); // Hide mute button when video pauses
            });

            muteBtn.on('click', function() {
                video.muted = !video.muted; // Toggle muted state
                //muteBtn.text(video.muted ? 'Unmute' : 'Mute'); // Change button text
            });

            // Optional: Hide mute button initially if video is not playing
            $(video).on('pause', function() {
                muteBtn.hide();
            });

            $(video).on('play', function() {
                muteBtn.show();
            });

           

            

            $( ".more-pd" ).on( "click", function() {
                $(this).parents('.row').next('.hide-pd').slideToggle();
            });

            $( ".previous-podcast .sm-video" ).on( "click", function() {
                const video = $('#myVideo').get(0);
                const playBtn = $('#playBtn');
                const pauseBtn = $('#pauseBtn');
                const muteBtn = $('#muteBtn');
                var postersrc = $(this).find('img').attr('src');
                video.poster = postersrc;
                var videosrc = $(this).data('src');
                $('#myVideo').attr('src', videosrc);
                playBtn.hide();
                video.play();
                pauseBtn.show();
                 muteBtn.show(); // Hide mute button when video pauses
            });


    // Set effect velocity in ms
    var velocity = 50;

    var shuffleElement = $('.shuffle');

    $.each(shuffleElement, function(index, item) {
        $(item).attr('data-text', $(item).text());
    });

    var shuffle = function(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var shuffleText = function(element, originalText) {
        var elementTextArray = [];
        var randomText = [];

        for (var i = 0; i < originalText.length; i++) {
            elementTextArray.push(originalText.charAt(i));
        }

        var repeatShuffle = function(times, index) {
            if (index == times) {
                element.text(originalText);
                return;
            }

            setTimeout(function() {
                randomText = shuffle(elementTextArray);
                for (var i = 0; i < index; i++) {
                    randomText[i] = originalText[i];
                }
                randomText = randomText.join('');
                element.text(randomText);
                index++;
                repeatShuffle(times, index);
            }, velocity);
        }
        repeatShuffle(element.text().length, 0);
    }

    shuffleElement.mouseenter(function() {
        shuffleText($(this), $(this).data('text'));
    });
});

    }, 100);



  setTimeout(function() { 
       $(document).ready(function() {

        /*setTimeout(function() { 

            $('.grid .col-img img').each(function(){
                var imgWidth = $(this).width();
                var imgHeight = $(this).height();
                $(this).parent('.col-img').css({'width': imgWidth + 'px', 'height': imgHeight + 'px'});
            });

            

        }, 100);*/

        
        $('.main-app').addClass('fade-in');
              $('.accordion-content').hide(); // Hides all accordion contents initially
        $('.accordion-title .toggle-sign').addClass('plus'); // Sets all toggle signs to '+'

        $('.accordion-title').click(function() {
          var $content = $(this).next('.accordion-content');
          var $sign = $(this).find('.toggle-sign');

          $content.slideToggle(function() {
            $sign.toggleClass('plus minus');
          });
        });

         $('.showmenu').click(function() {
            $('.mobile-menu').animate({ bottom: '0px' }, 300);
          });



        $( ".hidemenu" ).on( "click", function() {
          $('.mobile-menu').animate({ bottom: '-100%' }, 300);
        });

        var video = document.getElementById("background-video");

        if (video) {
            // Add tap event listener
            video.addEventListener("click", function(event) {
                event.preventDefault();
            });
        }

      }); 

    gsap.registerPlugin(ScrollTrigger);

      function initSliderAnimation() {
    // Check if the element with class 'slider-alter' exists on the page
    const sliderElement = document.querySelector(".slider-alter");


    const endValue1 = window.innerWidth < 767 ? 22 : 5;


    // Check if sliderElement is not null
    if (sliderElement) {
        gsap.to(sliderElement, {
            xPercent: () => {
                // Get the window height
                const windowHeight = window.innerHeight;
                // Check if window height is greater than 1010
                if (windowHeight > 1010) {
                    // Apply static value
                    return -120;
                } else {
                    // Apply other value
                    return -100; // Adjust this value as needed
                }
            },
            x: () => window.innerWidth,
            ease: "none",
            scrollTrigger: {
                trigger: ".slider-alter",
                start: "top top",
                end: () =>  endValue1 * window.innerWidth,
                scrub: true,
                pin: true,
                anticipatePin: 2
            }
        });
    }
}

// Call the function to initialize the animation
initSliderAnimation();

 function initScrambleAnimation(identifier, chars, attribute) {
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
            console.error("Element with identifier '" + identifier + "' not found on the page.");
            return;
        }
    }

    if (elements.length === 0) {
        console.error("No elements found with identifier '" + identifier + "'.");
        return;
    }

    elements.forEach(function (element) {
        var tl = gsap.timeline({ paused: true, defaults: { duration: 2, ease: "none" } });
        var isInViewport = false;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (!isInViewport) {
                        isInViewport = true;
                        tl.restart();
                    }
                } else {
                    if (isInViewport) {
                        isInViewport = false;
                        tl.pause();
                    }
                }
            });
        });

        observer.observe(element);

        tl.to(element, {
            duration: 3,
            scrambleText: {
                text: function () { return element.getAttribute(attribute); },
                chars: chars,
                revealDelay: 1,
                speed: 0.5,
                tweenLength: false
            }
        });
    });
}

// Example usage with class
initScrambleAnimation(".scramb", 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', "data-text");
initScrambleAnimation(".scramb2", '!1€5@#][6&$(=)£AF/&(234$$2N€O=(!@[1234567890', "data-text");



    function observeFadeInUp(element) {
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
    document.querySelectorAll(".fade-in-up").forEach(function (element) {
        observeFadeInUp(element);
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


      function initRotationAnimation() {
    // Check if the rotating element is present on the page
    const rotatingElement = document.querySelector('.rotating-element');
    if (rotatingElement) {
        gsap.to(rotatingElement, {
            rotation: -52,
            ease: 'none',
            duration: 100,
            scrollTrigger: {
                trigger: rotatingElement,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            }
        });
    } else {
       // console.warn('Rotating element not found on the page.');
    }
}

// Call the function to initialize the animation
initRotationAnimation();

      

   function initbdrAnimate() {
  const upperContainer = document.querySelector('.bdr-container-upper');
  const lowerContainer = document.querySelector('.bdr-container-lower');

  if (upperContainer) {
  gsap.to(upperContainer, {
    y: 0,
    opacity: 1,
    ease: 'none',
    duration: 1,
    scrollTrigger: {
      trigger: upperContainer,
      start: 'bottom+=150 bottom',
      end: 'bottom center',
      scrub: 1,
      onEnter: () => {
        // Start the animation when the upper container enters the viewport
        gsap.to(upperContainer.children, {
          y: (index) => {
            // Adjusted values for the upper container
            if (index === 0) return -109;  // fr class
            else if (index === 1) return -91;  // sec class
            else if (index === 2) return -73;  // th class
            else if (index === 3) return -58;  // ft class
            else if (index === 4) return -38;  // fv class
            else if (index === 5) return -18;  // sx class
          },
          opacity: 1,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: upperContainer,
            start: 'bottom+=150 bottom',
            end: '+=200',
            scrub: 1,
            onComplete: () => {
              // Reset opacity to 0 when animation completes
              gsap.to(upperContainer.children, { opacity: 0, duration: 0 });
            },
          },
        });
      },
    },
  });
}

  if (lowerContainer) {
    gsap.to(lowerContainer, {
      y: 0,
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: lowerContainer,
        start: 'bottom+=150 bottom',
        end: 'bottom center',
        scrub: 1,
        onEnter: () => {
          // Start the animation when the lower container enters the viewport
          gsap.to(lowerContainer.children, {
            y: (index) => {
              // Adjusted values for the lower container
              if (index === 0) return -109;  // fr class
              else if (index === 1) return -91;  // sec class
              else if (index === 2) return -73;  // th class
              else if (index === 3) return -58;  // ft class
              else if (index === 4) return -38;  // fv class
              else if (index === 5) return -18;  // sx class
            },
            ease: 'none',
            duration: 1,
            scrollTrigger: {
              trigger: lowerContainer,
              start: 'bottom+=150 bottom',
              end: '+=200',
              scrub: 1,
            },
          });
        },
      },
    });
  }
}

initbdrAnimate();



   function setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Check if the necessary elements exist before proceeding
    if (document.querySelector("#img1-container") && 
        document.querySelector("#img2-container") &&
        document.querySelector("#img1") &&
        document.querySelector(".text-roll")
        /*document.querySelector(".slider-container")*/) {

        // Image containers animation
        const img1Container = document.querySelector("#img1-container");
        const img2Container = document.querySelector("#img2-container");
        const img1 = document.querySelector("#img1");
        
        const textScroll = document.querySelector(".text-roll");
        const pad = 4;

        gsap.set(img1Container, {
            scale: 1,
            opacity: 1,
            xPercent: -50,
            yPercent: -50
        });

        gsap.set(img1, {
            scale: 1,
            opacity: 1
        });

        gsap.set(img2Container, {
            scale: 0.2,
            opacity: 1,
            xPercent: -50,
            yPercent: -50
        });

        gsap.set(textScroll, {
            scale: 1,
            opacity: 0,
        });

        let img1Width, img1Height, img2Width, img2Height;

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.image-unmask',
                pin: true,
                start: "top top-=10",
                end: '+=2000',
                scrub: 0.2,
                markers: false,
                toggleActions: "play none reverse none",
            },
            defaults: {
                duration: 2
            }
        })
            .to(img1Container, {
                scale: 1,
                opacity: 0,
                duration: 1
            }, -2.5)
            .to("#img1", {
                rotation: 30*1,
            }, -2.4)
            .to("#img1", {
                scale: 4,
                opacity: 0,
                duration: 1.3
            }, -1.5)
            .to(img2Container, {
                opacity: 1,
                duration: 1,
            }, -1.3)
            .to(img2Container, {
                xPercent: -50,
                yPercent: -50,
                rotation: 0,
                scale: 0.6,
                duration: 1.3
            }, -1.5)
            .to(".text-roll", {
                opacity: 1,
                duration: 0.2
            }, -0.65)
            .to(".img-lft", {
                left: -100,
            }, -3.4)
            .to(".img-rft", {
                right: 0,
            }, -3.6)
            .to(".text-roll p", {
                duration: 0.2
            });


            const textRollContent = document.querySelector(".text-roll p");

            function getYValue() {
                if (window.innerWidth < 768) {
                    // For mobile devices
                    return -160; // Adjust this value as needed for your layout
                } else if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {

                    return -235; // Adjust this value for Mac
                } else {
                    return -210; // Adjust this value for Windows or other platforms
                }
            }

            gsap.to(textRollContent, {
                scrollTrigger: {
                    trigger: ".text-roll",
                    start: () => {
                        // Check the screen height and adjust the start value accordingly
                        if (window.innerHeight <= 700) {
                            return "top top-=225%";
                        } else if (window.innerHeight <= 1000){
                            return "top top-=180%";
                        } else {
                            return "top top-=120%";
                        }
                    },
                    end: () => `+=${textRollContent.offsetHeight}`,
                    scrub: 0.1,
                },
                y: getYValue(),
            });



        //const slider = document.querySelector(".slider");

//const endValue = window.innerWidth < 767 ? 22 : 5;

/*gsap.to(slider, {
    xPercent: -100,
    x: () => window.innerWidth,
    ease: "none",
    scrollTrigger: {
        trigger: ".slider-container",
        start: "top top",
        end: () => endValue * window.innerWidth,
        scrub: true,
        pin: true,
        anticipatePin: 2
    }
});*/

    } else {
        //console.error('One or more required elements not found. Animation setup aborted.');
    }
}

// Call the function to set up the animations
setupScrollAnimations();



    


  }, 0);


setTimeout(function() { 

    function initCustomScrambleAnimation(identifier, chars) {
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
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    tl.restart();
                } else {
                    tl.pause();
                }
            });
        };

        var observer = new IntersectionObserver(callback, options);

        observer.observe(element);

        // Check if the element is initially visible
        if (element.offsetParent !== null) {
            // If the element is visible, start the animation immediately
            tl.to(element, {
                duration: 3,
                scrambleText: {
                    text: function () { return element.getAttribute("data-text"); },
                    chars: chars,
                    revealDelay: 1,
                    speed: 0.5,
                    tweenLength: false
                }
            });
        }
    });
}

// Example usage with class
initCustomScrambleAnimation(".customScramble", 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', "data-text");
initCustomScrambleAnimation(".customScramble2", '!1€5@#][6&$(=)£AF/&(234$$2N€O=(!@[1234567890', "data-text");

}, 200);






}
