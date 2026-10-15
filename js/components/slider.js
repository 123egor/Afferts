import { getCard } from './getCard.js';

const dayProductsList = document.querySelector('.day-products__list');

function createSlide(card) {
    const slide = document.createElement('li');
    slide.classList.add('day-products__item', 'swiper-slide');

    const cardEl = getCard(card);
    slide.innerHTML = cardEl.innerHTML;

    const productCard = slide.querySelector('.product-card');
    if (productCard) productCard.classList.add('product-card--small');

    return slide;
}
 
function initSlider() {
    new Swiper('.day-products__slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },
    });
}

export async function initDayProducts() {
    const response = await fetch('./data/data.json');
    const data = await response.json();
 
    const goodsOfDay = data.filter(card => card.goodsOfDay === true);
 
    goodsOfDay.forEach(card => {
        const slide = createSlide(card);
        dayProductsList.append(slide);
    });
 
    initSlider();
    
}
