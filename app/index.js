'use strict';

import 'whatwg-fetch';
import Comics from './comics';

// A User can:
// – see a random character's info on landing page
// – search for a character
// – see queried characterResults[]
// – can click any [item] in characterResults[] to switch to clicked [item]
//   • Character then populates a page with clickable references
//   • to all other api end points (links to all other routes
//   • (e.g. series, comics, etc…)

const pubKey = 'apikey=7a18a6993fb085a7db47c5326aa3ba70';
const ts = new Date();
// let ts = new Date().getTime();

const apiQuery = (url, inputValue) => {
  const searchUrl = `${url}${inputValue}&${pubKey}`;

// FETCHING characterInfo FROM userInput apiQuery
  fetch(searchUrl)
    .then(response => response.json())
    .then((data) => {
      const characterInfo = data.data.results[0];
      console.log(characterInfo);

      document.querySelector('.section__heading__focus').innerText = `${characterInfo.name}`;
      document.getElementById('bio').innerText = `${characterInfo.description}`;
      // const totalComics = document.querySelector('.total-comics');
      // totalComics.innerText = `Total Comics: ${characterInfo.comics.available}`;
      const imgBox = document.getElementById('bio__img');
      imgBox.innerHTML = `
        <img src="${characterInfo.thumbnail.path}/standard_fantastic.${characterInfo.thumbnail.extension}" class="li-item__img-box__img" alt="" />
      `;

// FETCHING comics FROM the userInput apiQuery URI endpoint
      const comicsURI = `${characterInfo.comics.collectionURI}?limit=50&${pubKey}`;
      const seriesURI = `${characterInfo.series.collectionURI}?limit=50&${pubKey}`;
      console.log(comicsURI);
      console.log(seriesURI);

      fetch(comicsURI)
      .then(res => res.json())
      .then((comicsData) => {
        const comicsList = comicsData.data.results;
        console.log(ts, comicsList);

// Rendering EACH Comic FROM comicsData
        comicsList.forEach((comic) => {
          const ul = document.querySelector('.section__ul');
          const liItem = document.createElement('li');
          liItem.classList.add('li-item');
          ul.appendChild(liItem).innerHTML = `
            <div class="li-item__img-box">
              <img src="${comic.thumbnail.path}/standard_medium.${comic.thumbnail.extension}" alt="" class="li-item__img-box__img" />
            </div>
            <div class="li-item__text-box">
              <h3 class="li-item__text-box__name">id: ${comic.id}</h3>
            </div>
          `;
        });
      });

// FETCHING seriesURI endpoint
      fetch(seriesURI)
      .then(res => res.json())
      .then((seriesData) => {
        const seriesList = seriesData.data.results;
        console.log(seriesList);

// Rendering EACH series FROM seriesData
        // seriesList.forEach((series) => {
        //   const ul = document.querySelector('.section__ul');
        //   const liItem = document.createElement('li');
        //   liItem.classList.add('li-item');
        //   ul.appendChild(liItem).innerHTML = `
        //     <div class="li-item__img-box">
        //       <img src="${series.thumbnail.path}/standard_medium.${series.thumbnail.extension}" alt="" class="li-item__img-box__img" />
        //     </div>
        //     <div class="li-item__text-box">
        //       <h3 class="li-item__text-box__name">id: ${series.id}</h3>
        //     </div>
        //   `;
        // });
      });
    });
// RESETING input && rendered VALUES
  document.querySelector('.form__input').value = '';
  document.querySelector('.section__ul').innerHTML = '';
};

// LANDING PAGE CHARACTER
const landingCharacter = 'Spider-man';
apiQuery('https://gateway.marvel.com:443/v1/public/characters?name=', landingCharacter);


const form = document.querySelector('.form');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const userInput = document.querySelector('.form__input').value;
  if (!userInput) {
    alert('You must provide a name to search');
  } else {
    apiQuery('https://gateway.marvel.com:443/v1/public/characters?name=', userInput);
  }
});

// /////////////////////////////////////////////////////////////
//
// fetch(`https://gateway.marvel.com:443/v1/public/characters?${pubKey}`)
//   .then(res => res.json())
//   .then((data) => {
//     const characterList = data.data.results;
//     characterList.forEach((character) => {
//       const ul = document.querySelector('.section__ul');
//       const liItem = document.createElement('li');
//       liItem.classList.add('li-item');
//       ul.appendChild(liItem).innerHTML = `
//         <div class="li-item__img-box">
//           <img
//           src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}"
//           alt=""
//           class="li-item__img-box__img"
//           />
//         </div>
//         <div class="li-item__text-box">
//           <h3 class="li-item__text-box__name">${character.name}</h3>
//         </div>
//       `;
//     });
//     document.querySelector('.li-item__text-box__name').addEventListener('click', (ev) => {
//       ev.preventDefault();
//       const name = document.querySelector('.li-item__text-box__name').innerText;
//       console.log(name);
//       apiQuery('https://gateway.marvel.com:443/v1/public/characters?name=', name);
//     });
//   });

// const footerContainer = document.querySelector('.footer-container');
// const footer = document.createElement('FOOTER');
// footerContainer.appendChild(footer).innerHTML = `
//   <a href="http://marvel.com/">Data provided by Marvel. © ${new Date().getFullYear()} MARVEL</a>
// `;
