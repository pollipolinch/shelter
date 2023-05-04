export class Popup {
    constructor(pets) {
      this.pets = pets;
    }
  
    // Popup generator
    generatePopup() {
      let imageBlock = this.pets.img
      
        ? `<img class="pets-more-container-img" src=${this.pets.img} alt=${this.pets.name}>`
        : ``
       

      let template = `
      <div class="pets-more">
      <div class="cross">X</div>
<div class="pets-more-container">
  
            ${imageBlock}
  
            <div>
<h3 class="pets-more-container-title">${this.pets.name}</h3>
<p class="pets-more-container-subtitle">${this.pets.type} - ${this.pets.breed}</p>
<p class="pets-more-container-text">${this.pets.description}</p>
<ul class="pets-more-container-list">
<li class="pets-more-container-item"><span>Age: </span>${this.pets.age}</li>
<li class="pets-more-container-item"><span>Inoculations: </span>${this.pets.inoculations.join(", ")}</li>
<li class="pets-more-container-item"><span>Diseases: </span>${this.pets.diseases.join(", ")}</li>
<li class="pets-more-container-item"><span>Parasites: </span>${this.pets.parasites.join(", ")}</li>
</ul>
</div>
</div>
    </div>`
  
      let popup = document.createElement("div");
      popup.className = "popup";
      popup.setAttribute("data-popup-id", this.pets.id);
  
      popup.innerHTML = template;
      return popup;
    }
  }