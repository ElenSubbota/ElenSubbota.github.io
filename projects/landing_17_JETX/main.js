// Бургер

const iconMenu = document.querySelector ('.menu_icon');
const menuBody = document.querySelector ('.menu_body');
if (iconMenu) {
  iconMenu.addEventListener ("click", function (a) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}


// СКРЫТЬ МЕНЮ ПРИ ПЕРЕХОДЕ ПО ССЫЛКЕ МЕНЮ

const menuLinkArr = document.querySelectorAll('.menu_link');
const menuBodys = document.querySelector ('.menu_body');
  menuLinkArr.forEach(ml => {
    ml.addEventListener("click", function (e) {
    document.body.classList.remove('_lock');
    ml.classList.remove('_active');
    menuBodys.classList.remove('_active');
    iconMenu.classList.remove('_active');
  });
});


// Языковая кнопка

const landMenu = document.querySelector ('.land_btn_menu__btn');
if (landMenu) {
  const dropdownMenu = document.querySelector ('.dropdown-menu');
  landMenu.addEventListener ("click", function (a) {
    landMenu.classList.toggle('dropdownMenu_active');
    dropdownMenu.classList.toggle('dropdownMenu_active');
  });
}

// Языковая мобильная кнопка

const landMenuMob = document.querySelector ('.land_btn_mob_btn');
if (landMenuMob) {
  const dropdownMenuMob = document.querySelector ('.dropdown-menu_mob');
  landMenuMob.addEventListener ("click", function (a) {
    landMenuMob.classList.toggle('dropdownMenuMob_active');
    dropdownMenuMob.classList.toggle('dropdownMenuMob_active');
  });
}

// СКРЫТЬ кнопки при нклике в сторону

const btnHiden = document.querySelectorAll( '.dropdown-menu');
 
document.addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(btnHiden);
 
	if (withinBoundaries.classList.contains("dropdownMenu_active")) {
    btnHiden.classList.remove("dropdownMenu_active")
  }
})


// ПЛАШКА появление при скроле



function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}


// Вариант - убираем классы

// const box = document.querySelector('.dropdown-menu_item');
// document.addEventListener('click', (e) => {
//   const click = e.composedPath().includes(box);
//   const dropdownMenuClose = document.querySelector('.dropdown-menu');
//   const dropdownMenuCloseBtn = document.querySelector('.land_btn_menu__btn');
//   if ( ! click ) {
//     dropdownMenuClose.classList.remove('dropdownMenuMob_active'); 
//     dropdownMenuCloseBtn.classList.remove('dropdownMenuMob_active');
//   }
// });




// СКРЫТЬ ЯЗЫКОВОЕ МЕНЮ ПРИ КЛИКЕ В СТОРОНУ


// const box = document.querySelectorAll('.dropdown-menu_item');
// const boxBtn = document.querySelector('.land_btn_menu__btn');
// const boxMenu = document.querySelector('.dropdown-menu');
// document.addEventListener('click', (e) => {
//   const click = e.composedPath().includes(box);
//   if ( ! click ) {
//     if(boxBtn.classList.contains("dropdownMenu_active")) {
//       boxBtn.classList.remove('dropdownMenu_active');
//       boxMenu.classList.remove('dropdownMenu_active');
//     } 
//   }
// })

// Скрыть land menu


// function myFunction() {
//   window.onclick = function(event) {

//     const box = document.querySelectorAll('.dropdown-menu_item');
//     const boxBtn = document.querySelector('.land_btn_menu__btn');
//     const boxMenu = document.querySelector('.dropdown-menu');

//     if(!event.target.matches(".land_btn_menu__btn")) {
//     var dd = document.getElementsByClassName("dropdown-menu");
//     for(var i = 0; i<dd.length;i++) {
//       var x = dd[i];
//       if(boxBtn.classList.contains("dropdownMenu_active")) {boxBtn.classList.remove("dropdownMenu_active")}
//     }
//     }
//   }
// }

// Скрыть land menu

function landBtnHiden () {
  window.onclick = function(event) {
    if(!event.target.matches(".land_btn_menu__btn")) {
      var dd = document.getElementsByClassName("dropdown-menu");
      for(var i = 0; i<dd.length;i++) {
        var x = dd[i];
        if(x.classList.contains("dropdownMenu_active")) {boxBtn.classList.remove("dropdownMenu_active")}
      }
    }
  }
}




// Плавная прокрутка

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener("click", function(event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  });
}


// ACCORDION


  document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
        item.addEventListener('click', () => {
            const parent = item.parentNode;

            if (parent.classList.contains('accordion-item--active')) {
                parent.classList.remove('accordion-item--active');
            } else {
                document
                .querySelectorAll('.accordion-item')
                .forEach((child) => child.classList.remove('accordion-item--active'))

                parent.classList.add('accordion-item--active');
            }
            
        })
        )



//  Вариант скрыть меню при клике

// Еще вариант не работает
// const menuLink = Array.from(document.querySelectorAll('.menu_link'));
// const menuBodys = document.querySelector ('.menu_body');
// menuLink.forEach((menuLink) => {
//   menuLink.addEventListener("click", hide); // при нажатии на бокс вызываем ф-ию boxHanlder
//   });
//   function hide(e) {
//     e.preventDefault(); 
//     if (menuBodys.classList.contains('_active')); {
  
//         document.body.classList.removeClass('_lock');
//         menuLink.classList.removeClass('_active');
//         menuBodys.classList.removeClass('_active');
//       } 
//   }


// Попытка скрыть меню при клике на пункт меню

// if (iconMenu.classList.contains('_active')) {
//   document.body.classList.removeClass('_lock');
//     iconMenu.classList.removeClass('_active');
//     menuBody.classList.removeClass('_active');
// }



// const boxes = Array.from(document.querySelectorAll(".box")); // считываем все элементы аккордеона в массив 
 
// boxes.forEach((box) => {
//   box.addEventListener("click", boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
// });
 
// function boxHandler(e) {
//   e.preventDefault(); // сбрасываем стандартное поведение
//   let currentBox = e.target.closest(".box"); // определяем текущий бокс
//   let currentContent = e.target.nextElementSibling; // находим скрытый контент
//   currentBox.classList.toggle("active"); // присваиваем ему активный класс
//   if (currentBox.classList.contains("active")) { // если класс активный ..
//     currentContent.style.maxHeight = currentContent.scrollHeight + "px"; // открываем контент
//   } else { // в противном случае
//     currentContent.style.maxHeight = 0; // скрываем контент
//   }
// }