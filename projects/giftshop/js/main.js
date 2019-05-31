// Connection owl-carousel
$(document).ready(function() {
  $('.featprod-carousel').owlCarousel({
    loop: true,
    items: 4,
    smartSpeed: 2000,
    autoplayTimeout: 4000,
    autoplay: true,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:2
      },
      900:{
          items:3
      },
      1000:{
          items:3
      },
      1600:{
          items:4
      },
      1900:{
          items:4
      }
    }
});
  // Go to the next item
    var owl = $('.featprod-carousel');
    owl.owlCarousel();
    $('.featProductSliderBtnRight').click(function() {
       owl.trigger('next.owl.carousel');
    })
    $('.featProductsSliderBtnLeft').click(function() {
        owl.trigger('prev.owl.carousel');
    })


    $('.newproducts-carousel').owlCarousel({
      loop: true,
      items: 3,
      smartSpeed: 2300,
      autoplayTimeout: 3000,
      autoplay: true,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        950:{
            items:3
        },
        1000:{
            items:3
        },
        1600:{
            items:3
        },
        1900:{
            items:3
        }
      }
  });
    // Go to the next item

    var newprod = $('.newproducts-carousel');
    newprod.owlCarousel();
    $('.newProductSliderBtnRight').click(function() {
       newprod.trigger('next.owl.carousel');
    })
    $('.newProductsSliderBtnLeft').click(function() {
        newprod.trigger('prev.owl.carousel');
    })
});



// Animation for btn gamburger in TOP HEADER

$(document).ready(function() {
  var link = $('.header-top_menu-btn');
  var link_active = $('.header-top_menu-btn_active');
  // переменная для выдвигающегося слева меню при нажатии на гнопку гамбургера
  var menu = $('.header-top__list');

  link.click(function() {
    // кнопке гамбургера присвается класс с анимацией смены полосок на крестик
    link.toggleClass('header-top_menu-btn_active');
    // при нажатиина кнопку меню - появляется меню
    menu.toggleClass('header-top__list_active');
  });
  link_active.click(function() {
    link.removeClass('header-top_menu-btn_active');
  });
});

// MIDDLE HEADER

$(document).ready(function() {

  $('.header-middle_menu').click(function() {
    $('.header-middle__list').toggleClass('header-middle__list--active');
  });

});


// BOTTOM HEADER

// В ДЕСКТОПНОЙ ВЕРСИИ

// Деаем меню в нижнем хедере липким при прокрутке страницы
$(document).ready(function() {

  var navPos, winPos, navHeight;

  // В блоке show-navPos показывается числовое значение границы блока навигации
  function refreshVar() {
    navPos = $('.header-bottom__nav').offset().top;
    // узнаем высоту .header-bottom__nav для того, чтобы сделать клон блока, который не будет позволять прыгать контенту, когдаменю станет фиксированным
    navHeight = $('.header-bottom__nav').outerHeight(true);
    navHeightMobile = $('.header-bottom__menu').outerHeight(true);
    $('.show-navPos').text(navPos);
  }
  // вызываем функцию
  refreshVar();
  // вызываем функцию при изменении размера окна
  $(window).resize(refreshVar);
  // создаем двойник блока навигации, который ставим до блока навигации методом .insertBefore, через css задаем ему высоту блока навигации и методом .hide() скрываем по умолчанию
  if ($(window).width() < 768) {
    $('<div class="clone__header-bottom__nav"></div>').insertBefore('.header-bottom__nav').css('height', navHeightMobile).hide();
  }
  if ($(window).width() > 768) {
    $('<div class="clone__header-bottom__nav"></div>').insertBefore('.header-bottom__nav').css('height', navHeight).hide();
  }




  // при прокрутке скролла будет вызываться функция, показывающая положение скролла
  $(window).scroll(function() {
    winPos = $(window).scrollTop();
    $('.show-winPos').text(winPos);
    // В случае, если расстояние от верха окна при прокрутке больше или равно позиции блока навигации, присваиваются определенные в css классы - фиксируется блок меню

    if (winPos >= navPos) {
      $('.header-bottom__nav').addClass('header-bottom__fixed header-bottom__nav-list_shadow container');
      // Появление блока над блоком навигации чтобы не прыгал контент
      $('.clone__header-bottom__nav').show();
    }
    // При изменении условия и значение уже не больше или равно убираются классы
    else {
      $('.header-bottom__nav').removeClass('header-bottom__fixed header-bottom__nav-list_shadow container');
      // Убираем блок над блоком навигации
      $('.clone__header-bottom__nav').hide();
    }
  });



  // BOTTOM HEADER В МОБИЛЬНАЯ ВЕРСИЯ

  // Added triangle-icon for header-bottom__menu

  $(document).ready(function() {


    $('.header-bottom__menu').click(function() {
      $('.header-bottom__menu_icon').toggleClass('triangle-top');
      $('.header-bottom__list').toggleClass('header-bottom__list--mobile');
    });

  });






});
