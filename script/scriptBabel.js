// просто возможности джс. не надо так делать магаз-он не безопасен!
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  // fetch('db/db.json')
  // .then(response => {
  //     if(response.ok){
  //         return response.json()
  //     } else {
  //         new Error(response.status)
  //     }
  // })  
  // .then((foo))
  // .catch(console.error)
  // const foo = ()=>{};
  var search = document.querySelector('.search'),
      //первый элемент у которого такой класс,querySelectorAll все элементы
  cartBtn = document.getElementById('cart'),
      wishlistBtn = document.getElementById('wishlist'),
      goodsWrapper = document.querySelector('.goods-wrapper'),
      cart = document.querySelector('.cart'),
      category = document.querySelector('.category'),
      cardCounter = cartBtn.querySelector('.counter'),
      wishlistCounter = wishlistBtn.querySelector('.counter'),
      cardWrapper = document.querySelector('.cart-wrapper');
  var wishlist = [];
  var goodsBasket = {}; //пустой обьект

  var loading = function loading(nameFunction) {
    var spinner = "<div id=\"spinner\"><div class=\"spinner-loading\"><div><div><div></div>\n          </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>\n          ";

    if (nameFunction === 'renderCard') {
      goodsWrapper.innerHTML = spinner;
    }

    if (nameFunction === 'renderBasket') {
      cardWrapper.innerHTML = spinner;
    } //   console.log(nameFunction);

  }; //Запрос на сервер


  var getGoods = function getGoods(handler, filter) {
    loading(handler.name);
    fetch('db/db.json').then(function (response) {
      return response.json();
    }) //переделывает в массив из json формата.и выполняем ретерн
    .then(filter).then(handler);
  }; //генерация карточек  


  var createCardGoods = function createCardGoods(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = "<div class=\"card\">\n                            <div class=\"card-img-wrapper\">\n                                <img class=\"card-img-top\" src=\"".concat(img, "\" alt=\"\">\n                                <button class=\"card-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\"\n                                data-goods-id=\"").concat(id, "\"></button>\n                            </div>\n                            <div class=\"card-body justify-content-between\">\n                                <a href=\"#\" class=\"card-title\">").concat(title, "</a>\n                                <div class=\"card-price\">").concat(price, " \u20BD</div>\n                                <div>\n                                    <button class=\"card-add-cart\" data-goods-id=\"").concat(id, "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                                </div>\n                            </div>\n                            </div>");
    return card;
  }; // создание in box- basket


  var createCardGoodsBasket = function createCardGoodsBasket(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'goods';
    card.innerHTML = "\t<div class=\"goods-img-wrapper\">\n        <img class=\"goods-img\" src=\"".concat(img, "\" alt=\"\">\n\n    </div>\n    <div class=\"goods-description\">\n        <h2 class=\"goods-title\">").concat(title, "</h2>\n        <p class=\"goods-price\">").concat(price, "</p>\n\n    </div>\n    <div class=\"goods-price-count\">\n        <div class=\"goods-trigger\">\n            <button class=\"goods-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\"  data-goods-id=\"").concat(id, "\"></button>\n            <button class=\"goods-delete\"  data-goods-id=\"").concat(id, "\"></button>\n        </div>\n        <div class=\"goods-count\">").concat(goodsBasket[id], "</div> \n    </div>");
    return card;
  }; //ркндеры


  var renderCard = function renderCard(goods) {
    //    items.forEach((item,index, array)=>{  });
    goodsWrapper.textContent = ''; //зачищаем все старые  товары на стр : textContent быстрее чем innerHTML

    if (goods.length) {
      goods.forEach(function (item) {
        //или так items.forEach(({ id, title, price, imgMin }) но тогда удаляем const { id, title, price, imgMin }
        var id = item.id,
            title = item.title,
            price = item.price,
            imgMin = item.imgMin; // деструктуризация с присвоением и ставим откуда хочу получить(item); получаем переменные-создаем переменные

        goodsWrapper.append(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.textContent = '❌ Извините, мы не нашли товаров по вашему запросу!';
    }
  };

  var renderBasket = function renderBasket(goods) {
    //    items.forEach((item,index, array)=>{  });
    cardWrapper.textContent = ''; //зачищаем все старые  товары на стр : textContent быстрее чем innerHTML

    if (goods.length) {
      goods.forEach(function (item) {
        //или так items.forEach(({ id, title, price, imgMin }) но тогда удаляем const { id, title, price, imgMin }
        var id = item.id,
            title = item.title,
            price = item.price,
            imgMin = item.imgMin; // деструктуризация с присвоением и ставим откуда хочу получить(item); получаем переменные-создаем переменные

        cardWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
      });
    } else {
      cardWrapper.innerHTML = "<div id=\"cart-empty\">\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u0435\u0449\u0451 \u043F\u0443\u0441\u0442\u0430</div>";
    }
  }; // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg')); //appendChild() добавляет в конец 
  // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg')); //можно использовать также append() но с babel
  // goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'img/temp/Socks.jpg')); 
  //калькуляция


  var calcTotalPrice = function calcTotalPrice(goods) {
    // let sum = 0;
    //начало с помощью reduce
    var sum = goods.reduce(function (accum, item) {
      return accum + item.price * goodsBasket[item.id];
    }, 0); //принимает четыре параметра-1-откуда начинается отсчет начинается с нуля
    //end с помощью reduce
    // for (const item of goods) {
    //     // console.log(item);
    //     sum += item.price * goodsBasket[item.id];
    // }

    cart.querySelector('.cart-total>span').textContent = sum.toFixed(2); // toFix оставляет две цифрі после запятой 
  };

  var checkCount = function checkCount() {
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBasket).length; //так как у обьекта нету length то пишем через обьект кей и он нам возвращает массив в котором только ключи но мы увидим кол-во  length
  }; //фильтры 


  var showCardBasket = function showCardBasket(goods) {
    var basketGoods = goods.filter(function (item) {
      return goodsBasket.hasOwnProperty(item.id);
    });
    calcTotalPrice(basketGoods);
    return basketGoods;
  };

  var showWishlist = function showWishlist() {
    getGoods(renderCard, function (goods) {
      return goods.filter(function (item) {
        return wishlist.includes(item.id);
      });
    });
  };

  var randomSort = function randomSort(goods) {
    return goods.sort(function () {
      return Math.random() - 0.5;
    });
  }; //метод sort мы можем передать несколько параметров по которым будет сортироваться и на сайте мдн можем почитать, чтоб отсортировать массив рандомно=>Math.random() возвращает число от нуля до единицы, нам нужно чтоб число было отриц либо пол значит Math.random()-0.5 просто рандомная сортировка
  //работа с хранилищем
  //https://learn.javascript.ru/cookie#prilozhenie-funktsii-dlya-raboty-s-kuki
  // возвращает куки с указанным name,
  // или undefined, если ничего не найдено
  //сами куки хранятся через ; работают только на сервере


  var getCookie = function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined; //0 это имя куки, 1 это сами данные которые мы туда записали
  };

  var cookieQuery = function cookieQuery(get) {
    if (get) {
      if (getCookie('goodsBasket')) {
        Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket'))); // goodsBasket = JSON.parse(getCookie('goodsBasket'));
      }

      checkCount();
    } else {
      document.cookie = "goodsBasket=".concat(JSON.stringify(goodsBasket), "; max-age=86400e3"); //max-age это сколько в милисек будут храниться наши куки
    } // console.log(goodsBasket)

  };

  var storageQuery = function storageQuery(get) {
    //localStorage это API браузера который может хранить данные и имеет свои методы свои свойства
    if (get) {
      if (localStorage.getItem('wishlist')) {
        wishlist.push.apply(wishlist, _toConsumableArray(JSON.parse(localStorage.getItem('wishlist')))); //через запяту можем перечислить ещё массивы и они тож будут собираться и добавляться
        // wishlist.splice(0, 0, ...JSON.parse(localStorage.getItem('wishlist'))); //первім поставить infinity то  будет добавлять в начало
        // const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'));
        // wishlistStorage.forEach(id => wishlist.push(id)); //так данные будут возвращаться и записываться в wishlist, а wishlist мы каждый раз когда кликаем
      }

      checkCount();
    } else {
      localStorage.setItem('wishlist', JSON.stringify(wishlist)); // добавить в локасторэдж. через JSON.stringify передаем в массиве и обратно мы будем получать строку и нам надо будет распарсить 
    }
  }; //события


  var closeCart = function closeCart(event) {
    // console.log(event);
    event.preventDefault();
    var target = event.target;

    if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) {
      //если куда я кликнул будет являться элементом с классом cart то сработает || или там где мы кликнули есть класс cart-close тоже сработает; свойство contains у classList проверяет есть ли класс 
      cart.style.display = ''; // если очистить то применятся стили те которые в цсс

      document.removeEventListener('keyup', closeCart);
    } // console.log(event.keyCode); 

  };

  var openCart = function openCart(event) {
    event.preventDefault();
    cart.style.display = 'flex'; // у  клавиатуры есть три события- keypress keyup keydown

    document.addEventListener('keyup', closeCart);
    getGoods(renderBasket, showCardBasket);
  };

  var choiceCategory = function choiceCategory(event) {
    event.preventDefault();
    var target = event.target;

    if (target.classList.contains('category-item')) {
      var cat = target.dataset.category; // console.log(target.dataset); // получим все дата атрибуты которые есть у элемента data-...
      // console.log(target.dataset.category);//в датаатрибутах нету когда возвращает нету дефисов только camelCase

      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return item.category.includes(cat);
        });
      }); //includes на массиве скажет тру или фолс-есть ли товары н или нету            .bind() передает в фенкцию аргумент переменную но не вызывает функцию
    }

    ;
  };

  var searchGoods = function searchGoods(event) {
    console.log(event);
    event.preventDefault();
    var input = event.target.elements.searchGoods;
    var inputValue = input.value.trim();

    if (inputValue !== '') {
      //trim() убирает пробелы и слева и справа если два слова или больше то уберет пробелы от самого первого символа слева и самого последнего спарава
      var searchString = new RegExp(inputValue, 'i'); //const searchString= new RegExp(inputValue,'g' ) глобальный поиск
      // let reg = /xiaomi/i; //вот такое ищет

      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return searchString.test(item.title);
        });
      });
    } else {
      search.classList.add('error');
      setTimeout(function () {
        search.classList.remove('error');
      }, 2000);
    }

    input.value = '';
  };

  var toggleWishlist = function toggleWishlist(id, elem) {
    if (wishlist.includes(id)) {
      //includes позволяет получать индексы массивов, когда хотим сохранить переменную   когда хоти с ними работать как с эдементами с условиями чтоюы не использовать лишние методы 
      wishlist.splice(wishlist.indexOf(id), 1);
      elem.classList.remove('active');
    } else {
      wishlist.push(id);
      elem.classList.add('active');
    } // console.log(wishlist);


    checkCount();
    storageQuery();
  };

  var addBasket = function addBasket(id) {
    if (goodsBasket[id]) {
      goodsBasket[id] += 1;
    } else {
      goodsBasket[id] = 1;
    }

    checkCount();
    cookieQuery();
  };

  var removeGoods = function removeGoods(id) {
    delete goodsBasket[id];
    checkCount();
    cookieQuery();
    getGoods(renderBasket, showCardBasket);
  }; //узнаем куда мы кликнули


  var handlerGoods = function handlerGoods(event) {
    var target = event.target;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('card-add-cart')) {
      addBasket(target.dataset.goodsId);
    }
  };

  var handlerBasket = function handlerBasket(event) {
    var target = event.target;

    if (target.classList.contains('goods-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('goods-delete')) {
      removeGoods(target.dataset.goodsId);
    }

    ;
  }; //есть api fetch вместо xtmlhtpr
  //у джиквери есть ajax
  //fetch() готовая функция которую мы можем вызвать везде иможно делать get запрос не php запрос! отправляется по средсвам джс а не браузера!
  // fetch('db/db.json'); возвращает промис-обещание у промиса-Promise есть три состояния ожидание-pending resolved-получили код промис это ожидание пока идет код, когда с сервера чтото вернули это и есть результат; fetch возвращает в виде потока и чтобы их увидеть необходимо использовать метол json
  // fetch('db/db.json')
  // .then(response => response.json())   //then()как только пришел код то запустится то что внутри then()
  // .then(goods => console.log(goods)); //если та то это  return;
  //былобы так ниже
  // fetch('db/db.json')
  // .then(function(response){
  //     return response.json();
  // })
  // .then(function(data){
  //     console.log(data)
  // });
  // console.log(fetch('db/db.json'));
  // ппомисы асинхронные
  // в es6 теперь вместо (()=>{})(); просто { внутри функция};
  //инициализация


  getGoods(renderCard, randomSort);
  storageQuery(true);
  cookieQuery(true); //назначение событий

  cartBtn.addEventListener('click', openCart); //cartBtn.removeEventListener('click', openCart); отменяет событие  onclick записывает только одно событие на элемент а предыдущее переписывает

  cart.addEventListener('click', closeCart); // когда мы кликаем то создается обьект event и функции могут принимать этот обьект

  category.addEventListener('click', choiceCategory);
  search.addEventListener('submit', searchGoods);
  goodsWrapper.addEventListener('click', handlerGoods);
  cardWrapper.addEventListener('click', handlerBasket);
  wishlistBtn.addEventListener('click', showWishlist);
});