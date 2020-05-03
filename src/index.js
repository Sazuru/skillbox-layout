/* eslint-disable func-names */
import * as $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import slick from './js/slick.min';
import './js/jquery.mask.min.js';
import './assets/styles/styles.scss';

$(document).ready(function () {
  // slick слайдер
  $('.main-works__examples').slick({
    infinite: true,
    draggable: true,
    autoplay: false,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 300,
    cssEase: 'ease-in-out',
    nextArrow: '<button class="next"></button>',
    prevArrow: '<button class="prev"></button>',
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  // Плавный скроллинг к разделам
  $(function () {
    $("a[href^='#']").click(function () {
      // eslint-disable-next-line no-underscore-dangle
      const _href = $(this).attr('href');
      $('html, body').animate({
        scrollTop: `${$(_href).offset().top}px`,
      });
      return false;
    });

    // Появление мобильного меню
    $('.mobile-menu-button').click(function (e) {
      e.preventDefault();
      $('.menu').slideToggle();
    });

    // $(window).resize(function() {
    //   $('.menu').slideUp(0);
    // });
  });

  // popups
  $('.callback-button, .mobile-callback-button').click(function (e) {
    e.preventDefault();
    $('.popup_callback').css('display', 'flex');
    $('body').toggleClass('hidden');
  });

  $('.button-contact').click(function (e) {
    e.preventDefault();
    $('.popup_find-out-more').css('display', 'flex');
    $('body').toggleClass('hidden');
  });

  $('.popup').click(function (event) {
    if (event.target === this) {
      $(this).hide();
      $('body').toggleClass('hidden');
    }
  });

  // Маска для телефона
  $(function () {
    $('#callback__tel').mask('+7(000)000-00-00', {
      placeholder: 'Телефон +7(___)___-__-__',
      clearIfNotMatch: true,
    });
  });

  // Отправка данных
  $('.popup__form_callback, .popup__form_find-out-more').submit(function () {
    const th = $(this);
    $.ajax({
      type: 'POST',
      url: 'mail.php', // Change
      data: th.serialize(),
    }).done(function () {
      alert('Спасибо!');
      setTimeout(function () {
        // Done Functions
        th.trigger('reset');
        $('.popup').css('display', 'none');
        $('body').toggleClass('hidden');
      }, 1000);
    });
    return false;
  });
});
