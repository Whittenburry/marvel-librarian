'use strict';

import 'whatwg-fetch';

// Going to need a media query stacking column__primary on top of column__secondary
// const imgBox = document.querySelector('.img-container');
//
// imgBox.innerHTML = `
//   <img class="img-container__img" src="http://worldversus.com/img/ironman.jpg" alt="">
// `;

// const myHeaders = new Headers();
// const myInit = {
//   method: 'GET',
//   headers: myHeaders,
//   mode: 'no-cors',
//   cache: 'default'
// };

const pubKey = 'apikey=7a18a6993fb085a7db47c5326aa3ba70';
const id = 109368;


fetch(`https://gateway.marvel.com:443/v1/public/characters?${pubKey}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data.results[0]);

    const characterList = data.data.results;
    characterList.forEach(function (item) {
      // console.log(`${item.thumbnail.path}/landscape_xlarge.${item.thumbnail.extension}`);

      const ul = document.querySelector('.section__ul');
      const liItem = document.createElement('li');
      liItem.classList.add('li-item');
      ul.appendChild(liItem).innerHTML = `
        <div class="li-item__img-box">
          <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="" class="li-item__img-box__img" />
        </div>
        <div class="li-item__text-box">
          <h3 class="li-item__text-box__name">${item.name}</h3>
        </div>
      `;
    });
  });


// creating basic subject-view; looping over html wireframe
  //
  // const ul = document.querySelector('.section__ul');
  //
  // for (let i = 1; i <= 20; i++) {
  //   const liItem = document.createElement('li');
  //   liItem.classList.add('li-item');
  //   ul.appendChild(liItem).innerHTML = `
  //     <div class="li-item__img-box">
  //       <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/ironmangoat-profile_image-49d896b9b298eb99-300x300.jpeg" alt="" class="li-item__img-box__img">
  //     </div>
  //     <div class="li-item__text-box">
  //       <h3 class="li-item__text-box__name">Character #${i}</h3>
  //     </div>
  //   `;
  // }
