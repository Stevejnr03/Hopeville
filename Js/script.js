// PRELOADER

document.addEventListener("DOMContentLoaded", function() {
  var preloader = document.querySelector(".preloader");
  var content = document.querySelector(".content")
  // Show preloader initially
  preloader.style.display = "flex"; 
  setTimeout(function() {
    preloader.style.display = "none";
    content.style.opacity = "1";
  }, 0.000); // Adjust the timeout value (in milliseconds) as needed
});

function closeModal(){
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}


var owl = $('.owl-carousel');
owl.owlCarousel({
    items:3,
    loop:true,
    margin:30,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
          items: 1,  
      },
      544: {
          items: 2,
          margin: 0  // 576px to 768px - 2 items
      },
      1008: {
          items: 3  // 768px and above - 3 items
      }
      // You can add more breakpoints as needed
  }
});




// Make mobile navigation work

function openClose(){
  var mobileNav = document.getElementById('main-nav');
  
  if( mobileNav.style.opacity === '1') {
       mobileNav.style.opacity = '0';
       mobileNav.style.pointerEvents = 'none';
       mobileNav.style.visibility = 'hidden';
       mobileNav.style.transform="translateX(100%)";
       document.getElementById('close-nav').style.display = "none";
      document.getElementById('open-nav').style.display = "block";
  
  }
  
  else {
      mobileNav.style.opacity = '1';
      mobileNav.style.pointerEvents = 'auto';
      mobileNav.style.visibility = 'visible';
      mobileNav.style.transform = 'translateX(0)';
      document.getElementById('close-nav').style.display = "block";
      document.getElementById('open-nav').style.display = "none";
  
  }
  }

  function closeNavOnClick(){
    var mobileNav = document.getElementById('main-nav');
    
    if ( window.matchMedia("(max-width: 63em)")){
  
    if( mobileNav.style.opacity === '1') {
         mobileNav.style.opacity = '0';
         mobileNav.style.pointerEvents = 'none';
         mobileNav.style.visibility = 'hidden';
         mobileNav.style.transform="translateX(100%)";
         document.getElementById('close-nav').style.display = "none";
        document.getElementById('open-nav').style.display = "block";
    
    }
  }
}

// prevents the link from refreshing the page and making it empty

document.addEventListener("DOMContentLoaded", function() {
  const emptyLinks = document.querySelectorAll(".drop-down");

  emptyLinks.forEach(link => {
      link.addEventListener("click", function(event) {
          event.preventDefault();
      });
  });
});

// For the drop down menu

document.addEventListener("DOMContentLoaded", function() {
  const mediaQuery = window.matchMedia("(max-width: 63em)");

  function handleMediaQueryChange(e) {
      const dropDowns = document.querySelectorAll(".drop-down");

      if (e.matches) {
          dropDowns.forEach(dropDown => {
              dropDown.addEventListener("click", handleDropDownClick);
          });
      } else {
          dropDowns.forEach(dropDown => {
              dropDown.removeEventListener("click", handleDropDownClick);
          });
      }
  }

  function handleDropDownClick(event) {
      event.preventDefault();
      const dropDown = event.currentTarget;
      const answer = dropDown.nextElementSibling;
      const isActive = dropDown.classList.contains("active");
      // const serviceDrop = doucument.querySelector("service-drop");

      // Close all other answers in the same level
      const parentSubLinks = dropDown.closest("ul.sub-links");
      if (parentSubLinks) {
          parentSubLinks.querySelectorAll(":scope > li > .drop-down").forEach(dd => {
              if (dd !== dropDown) {
                  dd.classList.remove("active");
                  dd.nextElementSibling.style.maxHeight = 0;
              }
          });
      } else {
          document.querySelectorAll(".main-nav-links > li > .drop-down").forEach(dd => {
              if (dd !== dropDown) {
                  dd.classList.remove("active");
                  dd.nextElementSibling.style.maxHeight = 0;
              }
          });
      }

      // Toggle active class and adjust max-height
      var serviceDrop = document.querySelector(".service-sub-links");
      dropDown.classList.toggle("active");
      if (!isActive) {
          answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
          answer.style.maxHeight = 0;
      }
  }

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  // Initial check
  handleMediaQueryChange(mediaQuery);
});




// testimonial slide

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
	isAutoPlay = true,
	startX,
	startScrollLeft,
	timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
	.slice(-cardPerView)
	.reverse()
	.forEach((card) => {
		carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
	});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
	carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
	});
});

const dragStart = (e) => {
	isDragging = true;
	carousel.classList.add("dragging");
	// Records the initial cursor and scroll position of the carousel
	startX = e.pageX;
	startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
	if (!isDragging) return; // if isDragging is false return from here
	// Updates the scroll position of the carousel based on the cursor movement
	carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
	isDragging = false;
	carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
	// If the carousel is at the beginning, scroll to the end
	if (carousel.scrollLeft === 0) {
		carousel.classList.add("no-transition");
		carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
		carousel.classList.remove("no-transition");
	}
	// If the carousel is at the end, scroll to the beginning
	else if (
		Math.ceil(carousel.scrollLeft) ===
		carousel.scrollWidth - carousel.offsetWidth
	) {
		carousel.classList.add("no-transition");
		carousel.scrollLeft = carousel.offsetWidth;
		carousel.classList.remove("no-transition");
	}

	// Clear existing timeout & start autoplay if mouse is not hovering over carousel
	clearTimeout(timeoutId);
	if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
	if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
	// Autoplay the carousel after every 2500 ms
	timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// STATS COUNTER


var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 3000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});

AOS.init();

window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  var hero = document.querySelector('.header');
  var heroHeight = hero.offsetHeight;

  if (window.scrollY > heroHeight) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// DISPLAYING AND HIDING THE ABOUT US VIDEO AND PRODUCT VIEW IMAGE

var aboutVideo = document.querySelector(".about-video-container");
var playVideo = document.querySelectorAll(".video-play-btn");

// Loop through each play button and add an event listener
playVideo.forEach(btn => {
    btn.addEventListener('click', () => {
        if (aboutVideo.style.opacity === "1") {
            aboutVideo.style.opacity = "0";
            aboutVideo.style.visibility = "hidden";
            aboutVideo.style.pointerEvents = "none";
        } else {
            aboutVideo.style.opacity = "1";
            aboutVideo.style.visibility = "visible";
            aboutVideo.style.pointerEvents = "auto";
        }
    });
});

