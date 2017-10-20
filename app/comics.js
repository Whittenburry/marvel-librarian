'use strict';

export default class Comics {
  constructor(comic) {
    this.comic = comic;
    this.element = document.createElement('li');
    this.element.classList.add('li-item');

    this.element.innerHTML = `
      <h1 className="section__heading">Heyyyyyyyyyyyy</h1>
    `;
  }
}
