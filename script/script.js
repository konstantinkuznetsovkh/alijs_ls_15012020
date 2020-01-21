// day second 02.25.00
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
        category = document.querySelector('.category');


    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist"
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

    // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg')); //appendChild() добавляет в конец 
    // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg')); //можно использовать также append() но с babel
    // goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'img/temp/Socks.jpg'));
    const closeCart = (event) => {
        // console.log(event);
        event.preventDefault();
        const target = event.target;
        if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) { //если куда я кликнул будет являться элементом с классом cart то сработает || или там где мы кликнули есть класс cart-close тоже сработает; свойство contains у classList проверяет есть ли классnpm install -g eslint
            cart.style.display = ''; // если очистить то применятся стили те которые в цсс
            document.removeEventListener('keyup', closeCart);
        }
        console.log(event.keyCode);

    };
    const openCart = () => {
        event.preventDefault();
        cart.style.display = 'flex';
        // у  клавиатуры есть три события- keypress keyup keydown
        document.addEventListener('keyup', closeCart);
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
    const renderCard = items => {
        //    items.forEach((item,index, array)=>{  });
        goodsWrapper.textContent = ''; //зачищаем все старые  товары на стр : textContent быстрее чем innerHTML
        items.forEach((item) => { //или так items.forEach(({ id, title, price, imgMin }) но тогда удаляем const { id, title, price, imgMin }
            const {
                id,
                title,
                price,
                imgMin
            } = item; // деструктуризация с присвоением и ставим откуда хочу получить(item); получаем переменные-создаем переменные
            goodsWrapper.append(createCardGoods(id, title, price, imgMin));
        });
    };
    const getGoods = (handler, filter) => {
        fetch('db/db.json')
            .then(response => response.json()) //переделывает в массив из json формата.и выполняем ретерн
            .then(filter)
            .then(handler);
    }
    const randomSort = item => item.sort(() => Math.random() - 0.5); //метод sort мы можем передать несколько параметров по которым будет сортироваться и на сайте мдн можем почитать, чтоб отсортировать массив рандомно=>Math.random() возвращает число от нуля до единицы, нам нужно чтоб число было отриц либо пол значит Math.random()-0.5 просто рандомная сортировка
    const choiceCategory = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('category-item')) {
            const category = target.dataset.category;
            // console.log(target.dataset); // получим все дата атрибуты которые есть у элемента data-...
            // console.log(target.dataset.category);//в датаатрибутах нету когда возвращает нету дефисов только camelCase
            getGoods(renderCard, (goods) => goods.filter(item => item.category.includes(category))); //includes на массиве скажет тру или фолс-есть ли товары н или нету            
        };
    };
    cartBtn.addEventListener('click', openCart);
    //cartBtn.removeEventListener('click', openCart); отменяет событие  onclick записывает только одно событие на элемент а предыдущее переписывает
    cart.addEventListener('click', closeCart); // когда мы кликаем то создается обьект event и функции могут принимать этот обьект
    category.addEventListener('click', choiceCategory);

    getGoods(renderCard, randomSort);
});