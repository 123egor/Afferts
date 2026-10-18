import {filterCards} from './cardFilter.js';

const sortSelect = document.querySelector('.catalog__sort-select');

export function sortCards(cards) {
    const sortValue = sortSelect.value;

    if (sortValue === 'price-min') {
        return cards.toSorted((a, b) => a.price.new - b.price.new);
    } else if (sortValue === 'price-max') {
        return cards.toSorted((a, b) => b.price.new - a.price.new);
    } else if (sortValue === 'rating-max') {
        return cards.toSorted((a, b) => b.rating - a.rating);
    }

    return cards;
}

sortSelect.addEventListener('change', filterCards);