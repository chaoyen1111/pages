function getOffSet() {
  var _offset = 450;
  var windowHeight = window.innerHeight;

  if (windowHeight > 500) {
    _offset = 400;
  }
  if (windowHeight > 680) {
    _offset = 300;
  }
  if (windowHeight > 830) {
    _offset = 210;
  }

  return _offset;
}

function setParallaxPosition($doc, multiplier, $object) {
  var offset = getOffSet();
  var from_top = $doc.scrollTop(),
    bg_css = 'center ' + (multiplier * from_top - offset) + 'px';
  $object.css({ 'background-position': bg_css });
}

// 滾動視差 function
// Adapted based on https://codepen.io/roborich/pen/wpAsm
var background_image_parallax = function ($object, multiplier, forceSet) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  // $object.css({"background-attatchment" : "fixed"});

  if (forceSet) {
    setParallaxPosition($doc, multiplier, $object);
  } else {
    $(window).scroll(function () {
      setParallaxPosition($doc, multiplier, $object);
    });
  }
};

var background_image_parallax_2 = function ($object, multiplier) {
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  $object.css({ 'background-attachment': 'fixed' });
  $(window).scroll(function () {
    var firstTop = $object.offset().top,
      pos = $(window).scrollTop(),
      yPos = Math.round(multiplier * (firstTop - pos) - 186);

    var bg_css = 'center ' + yPos + 'px';

    $object.css({ 'background-position': bg_css });
  });
  // console.log($object);
};

$(function () {
  // Hero Section - Background Parallax
  background_image_parallax($('.tm-parallax'), 0.3, false);
  background_image_parallax_2($('#contact'), 0.8);

  // Handle window resize
  window.addEventListener(
    'resize',
    function () {
      background_image_parallax($('.tm-parallax'), 0.3, true);
    },
    true
  );

  // Detect window scroll and update navbar
  $(window).scroll(function (e) {
    if ($(document).scrollTop() > 100) {
      $('.tm-navbar').addClass('scroll');
    } else {
      $('.tm-navbar').removeClass('scroll');
    }
  });

  // Close mobile menu after click
  $('#tmNav a').on('click', function () {
    $('.navbar-collapse').removeClass('show');
  });

  // Scroll to corresponding section with animation
  $('#tmNav').singlePageNav();

  // Add smooth scrolling to all links
  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  $('a').on('click', function (event) {
    // console.log(this.hash);
    // console.log(this.href);
    // console.log(this.className);
    if (this.className.indexOf('hash-link') !== -1) {
      if (this.hash !== '') {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top,
          },
          400,
          function () {
            window.location.hash = hash;
          }
        );
      } // End if
    } else {
      window.open(this.href);
    }
  });

  // Pop up
  $('.tm-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: { enabled: true },
  });

  // Gallery
  $('.tm-gallery').slick({
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//work閱覽更多場域現場照
var modal = document.getElementById('myModal');

function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName('mySlides');

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex - 1].style.display = 'block';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  // console.log(modal);
};
