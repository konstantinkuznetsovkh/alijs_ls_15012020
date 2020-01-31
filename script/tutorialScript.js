// просто возможности джс. не надо так делать магаз-он не безопасен!

'use strict';
document.addEventListener('DOMContentLoaded', () => {

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



    const search = document.querySelector('.search'), //первый элемент у которого такой класс,querySelectorAll все элементы
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        category = document.querySelector('.category'),
        cardCounter = cartBtn.querySelector('.counter'),
        wishlistCounter = wishlistBtn.querySelector('.counter'),
        cardWrapper = document.querySelector('.cart-wrapper');

    const wishlist = [];
    const goodsBasket = {}; //пустой обьект

    const loading = (nameFunction) => {
        const spinner = `<div id="spinner"><div class="spinner-loading"><div><div><div></div>
          </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>
          `;
        if (nameFunction === 'renderCard') {
            goodsWrapper.innerHTML = spinner;
        }
        if (nameFunction === 'renderBasket') {
            cardWrapper.innerHTML = spinner;
        }
        //   console.log(nameFunction);
    };
//Запрос на сервер
    const getGoods = (handler, filter) => {
        loading(handler.name);
        fetch('db/db.json')
            .then(response => response.json()) //переделывает в массив из json формата.и выполняем ретерн
            .then(filter)
            .then(handler);
            //для fetch для старых браузеров необходим полифил
    };

  //генерация карточек  
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist ${wishlist.includes(id)? 'active': ''}"
                                data-goods-id="${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${price} ₽</div>
                                <div>
                                    <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
                                </div>
                            </div>
                            </div>`;
        return card;
    };
// создание in box- basket
    const createCardGoodsBasket = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'goods';
        card.innerHTML = `	<div class="goods-img-wrapper">
        <img class="goods-img" src="${img}" alt="">

    </div>
    <div class="goods-description">
        <h2 class="goods-title">${title}</h2>
        <p class="goods-price">${price}</p>

    </div>
    <div class="goods-price-count">
        <div class="goods-trigger">
            <button class="goods-add-wishlist ${wishlist.includes(id)? 'active': ''}"  data-goods-id="${id}"></button>
            <button class="goods-delete"  data-goods-id="${id}"></button>
        </div>
        <div class="goods-count">${goodsBasket[id]}</div> 
    </div>`;
        return card;
    };

//ркндеры
    const renderCard = goods => {
        //    items.forEach((item,index, array)=>{  });
        goodsWrapper.textContent = ''; //зачищаем все старые  товары на стр : textContent быстрее чем innerHTML
        if (goods.length) {
            goods.forEach((item) => { //или так items.forEach(({ id, title, price, imgMin }) но тогда удаляем const { id, title, price, imgMin }
                const {
                    id,
                    title,
                    price,
                    imgMin
                } = item; // деструктуризация с присвоением и ставим откуда хочу получить(item); получаем переменные-создаем переменные
                goodsWrapper.append(createCardGoods(id, title, price, imgMin));
            });
        } else {
            goodsWrapper.textContent = '❌ Извините, мы не нашли товаров по вашему запросу!';
        }
    };   
 
    const renderBasket = goods => {
        //    items.forEach((item,index, array)=>{  });
        cardWrapper.textContent = ''; //зачищаем все старые  товары на стр : textContent быстрее чем innerHTML
        if (goods.length) {
            goods.forEach((item) => { //или так items.forEach(({ id, title, price, imgMin }) но тогда удаляем const { id, title, price, imgMin }
                const {
                    id,
                    title,
                    price,
                    imgMin
                } = item; // деструктуризация с присвоением и ставим откуда хочу получить(item); получаем переменные-создаем переменные
                cardWrapper.append(createCardGoodsBasket(id, title, price, imgMin));
            });
        } else {
            cardWrapper.innerHTML = `<div id="cart-empty">Ваша корзина ещё пуста</div>`;
        }
    };
     // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg')); //appendChild() добавляет в конец 
    // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg')); //можно использовать также append() но с babel
    // goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'img/temp/Socks.jpg')); 

    //калькуляция
    const calcTotalPrice = goods => {
        // let sum = 0;
        //начало с помощью reduce
        let sum = goods.reduce((accum, item) => {
            return accum + item.price * goodsBasket[item.id];

        }, 0) //принимает четыре параметра-1-откуда начинается отсчет начинается с нуля
        //end с помощью reduce



        // for (const item of goods) {
        //     // console.log(item);
        //     sum += item.price * goodsBasket[item.id];
        // }
        cart.querySelector('.cart-total>span').textContent = sum.toFixed(2); // toFix оставляет две цифрі после запятой 
    };

    const checkCount = () => {
        wishlistCounter.textContent = wishlist.length;
        cardCounter.textContent = Object.keys(goodsBasket).length; //так как у обьекта нету length то пишем через обьект кей и он нам возвращает массив в котором только ключи но мы увидим кол-во  length
    };  

    //фильтры 
    const showCardBasket = goods => {
        const basketGoods = goods.filter(item => goodsBasket.hasOwnProperty(item.id));
        calcTotalPrice(basketGoods);
        return basketGoods;
    };

    const showWishlist = () => {
        getGoods(renderCard, goods => goods.filter(item => wishlist.includes(item.id)))
    };

    const randomSort = goods => goods.sort(() => Math.random() - 0.5); //метод sort мы можем передать несколько параметров по которым будет сортироваться и на сайте мдн можем почитать, чтоб отсортировать массив рандомно=>Math.random() возвращает число от нуля до единицы, нам нужно чтоб число было отриц либо пол значит Math.random()-0.5 просто рандомная сортировка

  


    //работа с хранилищем
     //https://learn.javascript.ru/cookie#prilozhenie-funktsii-dlya-raboty-s-kuki
    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    //сами куки хранятся через ; работают только на сервере
    const getCookie = name => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined; //0 это имя куки, 1 это сами данные которые мы туда записали
    }

    const cookieQuery = get => {

        if (get) {
            if (getCookie('goodsBasket')) {
                Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket')));

                // goodsBasket = JSON.parse(getCookie('goodsBasket'));
            }
            checkCount();
        } else {
            document.cookie = `goodsBasket=${JSON.stringify(goodsBasket)}; max-age=86400e3`; //max-age это сколько в милисек будут храниться наши куки
        }
        // console.log(goodsBasket)
    };

    const storageQuery = get => { //localStorage это API браузера который может хранить данные и имеет свои методы свои свойства

        if (get) {
            if (localStorage.getItem('wishlist')) {
                wishlist.push(...JSON.parse(localStorage.getItem('wishlist'))); //через запяту можем перечислить ещё массивы и они тож будут собираться и добавляться

                // wishlist.splice(0, 0, ...JSON.parse(localStorage.getItem('wishlist'))); //первім поставить infinity то  будет добавлять в начало
                // const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'));
                // wishlistStorage.forEach(id => wishlist.push(id)); //так данные будут возвращаться и записываться в wishlist, а wishlist мы каждый раз когда кликаем

            }
            checkCount();

        } else {
            localStorage.setItem('wishlist', JSON.stringify(wishlist)); // добавить в локасторэдж. через JSON.stringify передаем в массиве и обратно мы будем получать строку и нам надо будет распарсить 
        }
    };





//события
    const closeCart = (event) => {
        // console.log(event);
        event.preventDefault();

        const target = event.target;

        if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) { //если куда я кликнул будет являться элементом с классом cart то сработает || или там где мы кликнули есть класс cart-close тоже сработает; свойство contains у classList проверяет есть ли класс 
            cart.style.display = ''; // если очистить то применятся стили те которые в цсс
            document.removeEventListener('keyup', closeCart);
        }
        // console.log(event.keyCode); 

    };

    const openCart = event => {
        event.preventDefault();
        cart.style.display = 'flex';
        // у  клавиатуры есть три события- keypress keyup keydown
        document.addEventListener('keyup', closeCart);
        getGoods(renderBasket, showCardBasket);
    }; 

    const choiceCategory = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const cat = target.dataset.category;
            // console.log(target.dataset); // получим все дата атрибуты которые есть у элемента data-...
            // console.log(target.dataset.category);//в датаатрибутах нету когда возвращает нету дефисов только camelCase
            getGoods(renderCard, (goods) => goods.filter(item => item.category.includes(cat))); //includes на массиве скажет тру или фолс-есть ли товары н или нету            .bind() передает в фенкцию аргумент переменную но не вызывает функцию
        };

    };

    const searchGoods = event => {
        console.log(event);
        event.preventDefault();
        const input = event.target.elements.searchGoods;
        const inputValue = input.value.trim();
        if (inputValue !== '') { //trim() убирает пробелы и слева и справа если два слова или больше то уберет пробелы от самого первого символа слева и самого последнего спарава
            const searchString = new RegExp(inputValue, 'i'); //const searchString= new RegExp(inputValue,'g' ) глобальный поиск
            // let reg = /xiaomi/i; //вот такое ищет
            getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));
        } else {
            search.classList.add('error');
            setTimeout(() => {
                search.classList.remove('error');
            }, 2000);
        }
        input.value = '';
    };

   
    const toggleWishlist = (id, elem) => {
        if (wishlist.includes(id)) { //includes позволяет получать индексы массивов, когда хотим сохранить переменную   когда хоти с ними работать как с эдементами с условиями чтоюы не использовать лишние методы 
            wishlist.splice(wishlist.indexOf(id), 1);
            elem.classList.remove('active')
        } else {
            wishlist.push(id);
            elem.classList.add('active');
        }
        // console.log(wishlist);
        checkCount();
        storageQuery();
    };
    const addBasket = id => {
        if (goodsBasket[id]) {
            goodsBasket[id] += 1
        } else {
            goodsBasket[id] = 1
        }
        checkCount();
        cookieQuery();
    };

    const removeGoods = id => {
        delete goodsBasket[id];
        checkCount();
        cookieQuery();
        getGoods(renderBasket, showCardBasket);
    };
        //не работает
        // const removeGoods = (id, elem) => {
    //     delete goodsBasket[id];
    //     checkCount();
    //     cookieQuery();
    //     elem.closest('.goods').remove()
    // };



//узнаем куда мы кликнули
    const handlerGoods = (event) => {
        const target = event.target;

        if (target.classList.contains('card-add-wishlist')) {
            toggleWishlist(target.dataset.goodsId, target);
        };
        if (target.classList.contains('card-add-cart')) {
            addBasket(target.dataset.goodsId)
        }
    }


    const handlerBasket = event => {
        const target = event.target;
        if (target.classList.contains('goods-add-wishlist')) {
            toggleWishlist(target.dataset.goodsId, target);
        };
        if (target.classList.contains('goods-delete')) {
            removeGoods(target.dataset.goodsId);
        };
    };



    //есть api fetch вместо xtmlhtpr
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
    cookieQuery(true);


//назначение событий
    cartBtn.addEventListener('click', openCart);
    //cartBtn.removeEventListener('click', openCart); отменяет событие  onclick записывает только одно событие на элемент а предыдущее переписывает
    cart.addEventListener('click', closeCart); // когда мы кликаем то создается обьект event и функции могут принимать этот обьект
    category.addEventListener('click', choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    cardWrapper.addEventListener('click', handlerBasket);
    wishlistBtn.addEventListener('click', showWishlist);


  
});