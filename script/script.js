// day second 00.00.00
document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search'), //первый элемент у которого такой класс,querySelectorAll все элементы
        cartBtn = document.getElementById('cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart');


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

    goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg')); //appendChild() добавляет в конец 
    goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg'));//можно использовать также append() но с babel
    goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'img/temp/Socks.jpg'));
const closeCart=(event)=>{
    // console.log(event);
    event.preventDefault();
    const target=event.target;
    if(target===cart || target.classList.contains('cart-close')){//если куда я кликнул будет являться элементом с классом cart то сработает || или там где мы кликнули есть класс cart-close тоже сработает; свойство contains у classList проверяет есть ли класс
        cart.style.display='';// если очистить то применятся стили те которые в цсс
    }
};
const openCart=()=>{
    event.preventDefault();
cart.style.display='flex';
};

    cartBtn.addEventListener('click', openCart);
     //cartBtn.removeEventListener('click', openCart); отменяет событие  onclick записывает только одно событие на элемент а предыдущее переписывает
     cart.addEventListener('click',closeCart); // когда мы кликаем то создается обьект event и функции могут принимать этот обьект
});