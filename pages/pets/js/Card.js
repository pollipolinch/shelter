export class Card {
    constructor({ id, name, img, ...rest }) {
      this.id = id;
      this.name = name;
      this.img = img;
    }
  
    // Card generator
    generateCard(classes) {
      let template = ``;
      let card = document.createElement("div");
      card.className = classes;
      card.setAttribute("data-id", this.id);
  
      this.img
        ? (template += `<img class="our-friends-img" width="270" src=${this.img} alt=${this.name}>`)
        : (template += `<img class="our-friends-img" width="270" src="src/images/our-friends/no-image.jpg" alt=${this.name}>`)
  
      template += `<p class="our-friends-card-title">${this.name}</p>
      <button class="our-friends-card-button">Learn more</button>`
  
      card.innerHTML = template;
      return card;
    }
  }