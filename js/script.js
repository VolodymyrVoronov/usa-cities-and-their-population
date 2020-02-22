'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const form = document.querySelector('.form');
const suggestions = document.querySelector('.form__suggestions');
const searchInput = document.querySelector('.form__input');
const formSuggestions = document.querySelector('.form__suggestions');
const ESC_KEY = 'Escape';

const towns = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => towns.push(...data));

function findMatches(wordToMatch, towns) {
  return towns.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithComas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function  showMatchesOnDiplay() {
  const matchArr = findMatches(this.value, towns);
  const html = matchArr.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const townName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
    return `
    <li class="form__infos">
      <span class="form__info">${townName}, ${stateName}.</span>
      <span class="form__population">Population: ${numberWithComas(place.population)} people</span>
    </li>`;
  }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('change', showMatchesOnDiplay);
searchInput.addEventListener('keyup', showMatchesOnDiplay); 

form.addEventListener('submit', function(e) {
  e.preventDefault();
});

searchInput.addEventListener('keyup', function(e) {
  if (e.currentTarget.value.length === 0) {
    formSuggestions.innerHTML = '';
  }
});