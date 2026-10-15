import * as component from './component.js';
import * as sort from './cardSort.js';
import { basketAdd } from './basket.js';

const catalogList = document.querySelector('.catalog__list');

async function getAllCards() {
    const response = await fetch("./data/data.json");
    const data = await response.json();

    data.forEach((card) => {
        const listItem = getCard(card);
        catalogList.append(listItem);
    })

}

export function getCard(card) {
    const listItem = component.getListItem("", "catalog__item");
    const productCard = component.getDiv("product-card");
    const productCardVisual = component.getDiv("product-card__visual");
    const productCardImg = component.getImg(card.image, card.name, "product-card__img");
    const productCardMore = component.getDiv("product-card__more");
    const productCardLink = component.getLink("#", card.name, "product-card__link btn btn--icon");
    const spanCartBtn = component.getSpan("В корзину", "btn__text");
    const productCardLinkCart = component.getLink("#", "В корзину", "product-card__link btn btn--icon");
    const productCardLinkMore = component.getLink("#", "", "product-card__link btn btn--secondary");
    const svgCart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgCart.setAttribute('width', '24');
    svgCart.setAttribute('height', '24');
    svgCart.setAttribute('aria-hidden', 'true');
    const useCart = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
    );
    useCart.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        'images/sprite.svg#icon-basket'
    );
    svgCart.append(useCart);
    productCardLink.append(spanCartBtn, svgCart);

    const availability = card.availability.moscow > 0 || card.availability.orenburg > 0 || card.availability.saintPetersburg > 0;

    const spanMoreBtn = component.getSpan('Подробнее', 'btn__text');
    productCardLinkMore.append(spanMoreBtn);

    productCardMore.append(productCardLinkCart, productCardLinkMore);
    productCardVisual.append(productCardImg, productCardMore);

    const productCardInfo = component.getDiv('product-card__info');

    const productCardTitle = document.createElement('h2');
    productCardTitle.className = 'product-card__title';
    productCardTitle.textContent = card.name;

    const productCardOld = component.getSpan('', 'product-card__old');
    const productCardOldNumber = component.getSpan(
        card.price.old.toLocaleString('ru-RU'),
        'product-card__old-number'
    );
    const productCardOldAdd = component.getSpan('₽', 'product-card__old-add');
    productCardOld.append(productCardOldNumber, productCardOldAdd);

    const productCardPrice = component.getSpan('', 'product-card__price');
    const productCardPriceNumber = component.getSpan(
        card.price.new.toLocaleString('ru-RU'),
        'product-card__price-number'
    );
    const productCardPriceAdd = component.getSpan('₽', 'product-card__price-add');
    productCardPrice.append(productCardPriceNumber, productCardPriceAdd);

    const productCardTooltip = component.getDiv('product-card__tooltip tooltip');

    const tooltipBtn = document.createElement('button');
    tooltipBtn.className = 'tooltip__btn';
    tooltipBtn.setAttribute('aria-label', 'Показать подсказку');

    const svgTooltip = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    svgTooltip.setAttribute('class', 'tooltip__icon');
    svgTooltip.setAttribute('width', '5');
    svgTooltip.setAttribute('height', '10');
    svgTooltip.setAttribute('aria-hidden', 'true');
    const useTooltip = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
    );
    useTooltip.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        'images/sprite.svg#icon-i'
    );
    svgTooltip.append(useTooltip);
    tooltipBtn.append(svgTooltip);

    const tooltipContent = component.getDiv('tooltip__content');
    const tooltipText = component.getSpan(
        'Наличие товара по городам:',
        'tooltip__text'
    );

    const tooltipList = document.createElement('ul');
    tooltipList.className = 'tooltip__list';

    const cities = [
        { label: 'Москва', count: card.availability.moscow },
        { label: 'Оренбург', count: card.availability.orenburg },
        { label: 'Санкт-Петербург', count: card.availability.saintPetersburg },
    ];

    cities.forEach(({ label, count }) => {
        const li = document.createElement('li');
        li.className = 'tooltip__item';
        const span = component.getSpan('', 'tooltip__text');
        span.textContent = `${label}: `;
        const countSpan = component.getSpan(String(count), 'tooltip__count');
        span.append(countSpan);
        li.append(span);
        tooltipList.append(li);
    });

    tooltipContent.append(tooltipText, tooltipList);
    productCardTooltip.append(tooltipBtn, tooltipContent);

    productCardInfo.append(
        productCardTitle,
        productCardOld,
        productCardPrice,
        productCardTooltip
    );

    if (!availability) {
        productCard.classList.add('product-card--unavailable');
    }

    productCard.append(productCardVisual, productCardInfo);
    listItem.append(productCard);

    productCardLinkCart.addEventListener('click', (e) => {
        e.preventDefault();
        basketAdd(card);
    });

    return listItem;

}

getAllCards();