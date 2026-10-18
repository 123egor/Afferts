import * as component from './component.js';
import { getCard } from './getCard.js';
import * as sort from './cardSort.js';
import { setAllCard } from './basket.js'

const catalogList = document.querySelector('.catalog__list');
const catalogForm = document.querySelector('.catalog-form');
const pagination = document.querySelector('.catalog__pagination');

let allCards = [];
let currentCard = []

async function getAllCards() {
    const response = await fetch("./data/data.json");
    allCards = await response.json();
    setAllCard(allCards);
    updateCounts(allCards);
    renderCards(allCards);
}

function renderCards(cards, page = 1) {
    currentCard = cards
    catalogList.innerHTML = '';
    const sorted = sort.sortCards(cards);
    sorted.slice((page - 1) * 6, page * 6).forEach((card) => {
        catalogList.append(getCard(card));
    });

    pagination.innerHTML = '';
    const pageCount = Math.ceil(sorted.length / 6);

    if (pageCount > 1) {
        for (let i = 1; i < pageCount; i++) {
            pagination.innerHTML += `
                <li class="catalog__pagination-item">
                    <button class="catalog__pagination-link" type="button" ${i === page ? 'disabled' : ''}>${i}</button>
                </li>`;
        }
    }
}

pagination.addEventListener('click', function (e) {
    const btn = e.target.closest('.catalog__pagination-link')
    if (!btn) return;
    renderCards(currentCard, Number(btn.textContent))
});

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