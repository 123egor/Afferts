import * as component from './component.js';
import { getCard } from './getCard.js';
import * as sort from './cardSort.js';

const catalogList = document.querySelector('.catalog__list');
const catalogForm = document.querySelector('.catalog-form');

let allCards = [];

async function getAllCards() {
    const response = await fetch("./data/data.json");
    allCards = await response.json();
    updateCounts(allCards);
    renderCards(allCards);
}

function renderCards(cards) {
    catalogList.innerHTML = '';
    const sorted = sort.sortCards(cards);
    sorted.forEach((card) => {
        const listItem = getCard(card);
        catalogList.append(listItem);
    });
}

function updateCounts(cards) {
    const types = ['pendant', 'ceiling', 'overhead', 'point', 'nightlights'];

    types.forEach(type => {
        const count = cards.filter(card => card.type.includes(type)).length;

        const checkbox = document.querySelector(`#${type}`);
        const countEl = checkbox
            .closest('.custom-checkbox')
            .querySelector('.custom-checkbox__count');

        countEl.textContent = count;
    });
}

function getFilters() {
    const checkedTypes = Array.from(
        catalogForm.querySelectorAll('input[name="type"]:checked')
    ).map(input => input.value);

    const status = catalogForm.querySelector('input[name="status"]:checked').value;

    return { checkedTypes, status };
}

export function filterCards() {
    const { checkedTypes, status } = getFilters();

    const filtered = allCards.filter(card => {
        const typeMatch = checkedTypes.length === 0 ||
            checkedTypes.some(type => card.type.includes(type));

        const isAvailable = card.availability.moscow > 0 ||
            card.availability.orenburg > 0 ||
            card.availability.saintPetersburg > 0;
        const statusMatch = status === 'all-item' || isAvailable;

        return typeMatch && statusMatch;
    });

    renderCards(filtered);
}

catalogForm.addEventListener('change', filterCards);

catalogForm.addEventListener('reset', () => {
    setTimeout(filterCards, 0);
});

getAllCards();