/* ============================================
   VERDANA — carousel.js
   Hero image carousel with autoplay
   ============================================ */

var currentSlide = 0;
var autoplayTimer = null;
var slides = [];
var dots   = [];

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  slides = document.querySelectorAll('.carousel-slide');
  dots   = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  // Start zoom on first slide image
  var firstImg = slides[0].querySelector('.carousel-img');
  if (firstImg) {
    setTimeout(function() { firstImg.classList.add('zoom'); }, 100);
  }

  startAutoplay();
  initSwipe();
  initKeyboard();
});

/* ── GO TO SLIDE ── */
window.goToSlide = function(index) {
  if (!slides.length) return;
  var prev = currentSlide;
  currentSlide = (index + slides.length) % slides.length;
  if (prev === currentSlide) return;

  // Remove active from old slide
  slides[prev].classList.remove('active');

  // Add active to new slide
  slides[currentSlide].classList.add('active');

  // Zoom new slide image
  var newImg = slides[currentSlide].querySelector('.carousel-img');
  if (newImg) {
    newImg.classList.remove('zoom');
    setTimeout(function() { newImg.classList.add('zoom'); }, 50);
  }

  // Update dots
  dots.forEach(function(dot, i) {
    if (i === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Update counter
  var counter = document.getElementById('carousel-counter');
  if (counter) {
    var num = String(currentSlide + 1).padStart(2, '0');
    var tot = String(slides.length).padStart(2, '0');
    counter.textContent = num + ' / ' + tot;
  }

  startAutoplay();
};

/* ── NEXT / PREV ── */
window.carouselNext = function() { goToSlide(currentSlide + 1); };
window.carouselPrev = function() { goToSlide(currentSlide - 1); };

/* ── AUTOPLAY ── */
function startAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(function() {
    carouselNext();
  }, 6000);
}

/* ── KEYBOARD ── */
function initKeyboard() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') carouselNext();
    if (e.key === 'ArrowLeft')  carouselPrev();
  });
}

/* ── TOUCH SWIPE ── */
function initSwipe() {
  var track = document.getElementById('carousel-track');
  if (!track) return;
  var startX = 0;

  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) carouselNext();
      else          carouselPrev();
    }
  });
}