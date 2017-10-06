'use strict';

import 'whatwg-fetch';

// A User can:
// – see a random character's info on landing page
// – search for a character
// – see queried characterResults[]
// – can click any [item] in characterResults[] to switch to clicked [item]
//   • Character then populates a page with clickable references
//   • to all other api end points (links to all other routes
//   • (e.g. series, comics, etc…)
const pubKey = 'apikey=7a18a6993fb085a7db47c5326aa3ba70';

const apiQuery = (url, inputValue) => {
  const searchUrl = `${url}${inputValue}&${pubKey}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      const characterInfo = data.data.results[0];
      console.log(characterInfo);

      const bio = document.getElementById('bio').innerHTML = `
        ${characterInfo.description}
      `;
    });

  document.querySelector('.form__input').value = '';
};

const form = document.querySelector('.form');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const userInput = document.querySelector('.form__input').value;

  apiQuery('https://gateway.marvel.com:443/v1/public/characters?name=', userInput);
});

fetch(`https://gateway.marvel.com:443/v1/public/characters?${pubKey}`)
  .then((res) => res.json())
  .then((data) => {
    const characterList = data.data.results;
    characterList.forEach((character) => {
// API Image Path - character.thumbnail.path + picture_size + character.thumbnail.extension

      const ul = document.querySelector('.section__ul');
      const liItem = document.createElement('li');
      liItem.classList.add('li-item');
      ul.appendChild(liItem).innerHTML = `
        <div class="li-item__img-box">
          <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" alt="" class="li-item__img-box__img" />
        </div>
        <div class="li-item__text-box">
          <h3 class="li-item__text-box__name">${character.name}</h3>
        </div>
      `;
      document.querySelector('.li-item__text-box__name').addEventListener('click', (ev) => {
        ev.preventDefault();
      });
    });
  });
