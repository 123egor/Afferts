import * as component from './component.js';

const basketBtn = document.querySelector('.header__user-btn');
const basketEl = document.querySelector('.basket');
const basketList = document.querySelector('.basket__list');
const basketEmptyBlock = document.querySelector('.basket__empty-block');
const basketCount = document.querySelector('.header__user-count');
const basketLink = document.querySelector('.basket__link');

let basketItems = []
let allCard = []

export function setAllCard (card) {
    allCard = card
}

document.addEventListener('click', function (e) {
    const btn = e.target.closest('.product-card__cart-btn')
    if(!btn) return;
    e.preventDefault();
    const card = allCard.find(item => item.id == Number(btn.dataset.id));
    if(card){
        basketAdd(card)
    }
});


basketBtn.addEventListener('click', function (e) {
    basketEl.classList.toggle("basket--active")
});


function basketCountUpd() {
    basketCount.textContent = basketItems.length
}

const checkout = component.getLink("#", "Оформить заказ", "basket__link btn");
basketEl.append(checkout);

function basketState() {
    if (basketItems.length === 0) {
        basketEmptyBlock.style.display = '';
        checkout.style.display = 'none';     
    } else {
        basketEmptyBlock.style.display = 'none';
        checkout.style.display = '';
    }
}

function basketItem(card) {
    const listItem = document.createElement("li")
    listItem.className = "basket__item";
    listItem.dataset.id = card.id;

    const basketDiv = component.getDiv("basket__img");
    const basketImg = component.getImg(card.image, card.name, "basketImg");
    basketImg.setAttribute("height", "60");
    basketImg.setAttribute("width", "60");
    basketDiv.append(basketImg);

    const name = component.getSpan(card.name, 'basket__name');
    const price = component.getSpan(`${card.price.new.toLocaleString('ru-RU')} ₽`, 'basket__price');

    const closeBtn = component.getBtn("", "basket__item-close");
    closeBtn.type = "button";

    const svgClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgClose.setAttribute('class', 'main-menu__icon');
    svgClose.setAttribute('width', '24');
    svgClose.setAttribute('height', '24');
    svgClose.setAttribute('aria-hidden', 'true');
    const useClose = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useClose.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'images/sprite.svg#icon-close');

    svgClose.append(useClose);
    closeBtn.append(svgClose);

    closeBtn.addEventListener('click', function (e) {
        basketItems = basketItems.filter(function (item) {
            return item.id !== card.id;
        });
        listItem.remove();
        basketCountUpd();
        basketState();
    });

    listItem.append(basketDiv, name, price, closeBtn);
    return listItem;
}

export function basketAdd(card) {
    const item = basketItems.some(function (item) {
        return item.id === card.id;
    });

    if (!item) {
        basketItems.push(card);
        const item = basketItem(card);
        basketList.append(item);
    }

    basketCountUpd();
    basketState();
}

basketState();
basketCountUpd();
