'use strict';

import 'whatwg-fetch';

// Prevent Default 'Sumbit' on Form | .addEventListener(`submit`, (ev) => { ev.preventDefault(); });
document.querySelector('.form').addEventListener('submit', (ev) => { ev.preventDefault(); });

const pubKey = 'apikey=7a18a6993fb085a7db47c5326aa3ba70';

const fetchCharacterFocus = function (url) {
  fetch(`${url}?${pubKey}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  });
};

const fetchArray = function (url) {
  fetch(`${url}?${pubKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data.results)
    });
};

fetchCharacterFocus()
fetchArray('https://gateway.marvel.com:443/v1/public/characters');


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
      document.querySelector('.li-item__text-box__name').addEventListener('click', () => {
        console.log(character.urls[2].url);
      });
    });
  });
