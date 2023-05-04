
// burger
let hamb = document.querySelector(".hamb_field");
let headerNav = document.querySelector(".nav-list");
let navLink = document.querySelectorAll(".nav-list li a");
let body = document.querySelector(".body");
let back = document.querySelector(".back-navbar");




function hambMenu() {
    hamb.classList.toggle("active");
    headerNav.classList.toggle("active");
    body.classList.toggle("active");
    back.classList.toggle("active")

}

hamb.addEventListener('click', hambMenu);
navLink.forEach(n => n.addEventListener("click", hambMenu));
document.addEventListener("click", (n) => {
    if (headerNav.classList.contains("active") &&
        !(headerNav.contains(n.target)) &&
        !(hamb.contains(n.target))) {
        hambMenu();
    }
});

import pets from "./pets.js"
import { Card } from "./Card.js"
import { Popup } from "./Popup.js"

const isAnchor = false;

window.onload = () => {
  if (window.location.pathname.indexOf('/main/index.html') > 0) {
    // render card
    renderCardsToSlider()

    // slider
    addSliderClickHandler()

    // Popup
    addCardsClickHandler('.our-friends-container', ".our-friends-background")
  }

  if (window.location.pathname.indexOf('/pets/index.html') > 0) {
    // render card
    catalogueInit()

    // resize window
    addRenderCardsAfterResizeWindow()

    // Popup
    addCardsClickHandler('.our-friends-container', ".our-friends-background")
  }

}

// Slider
// ---------------------------------------------------------------------------------
const rendertUniqueSlide = (inLeft) => {
  const cardsActive = document.querySelectorAll("#slider-active .our-friends-background");
  const slideLeft = document.querySelector("#slider-left");
  const slideRight = document.querySelector("#slider-right");
  let activeSlideCardsId = [];

  cardsActive.forEach((card, index) => activeSlideCardsId[index] = card.dataset.id)

  if (inLeft) {
    slideLeft.innerHTML = ""
    generateUniqueThreeCards(activeSlideCardsId).forEach(card => {
      slideLeft.append(card.generateCard("our-friends-background"))
    })
  } else {
    slideRight.innerHTML = ""
    generateUniqueThreeCards(activeSlideCardsId).forEach(card => {
      slideRight.append(card.generateCard("our-friends-background"))
    })
  }
}

const addSliderClickHandler = () => {
  const btnSliderLeft = document.querySelector('.button-arrows');
  const btnSliderRight = document.querySelector('.button-arrows-two');
  const slider = document.querySelector('.slider');
  const leftSlide = document.querySelector('#slider-left');
  const activeSlide = document.querySelector('#slider-active');
  const rightSlide = document.querySelector('#slider-right');

  if (slider) {
    const moveSliderLeft = () => {
      slider.classList.add("transition-left")
      btnSliderLeft.removeEventListener("click", moveSliderLeft)
      btnSliderRight.removeEventListener("click", moveSliderRight)
    }

    const moveSliderRight = () => {
      slider.classList.add("transition-right")
      btnSliderLeft.removeEventListener("click", moveSliderLeft)
      btnSliderRight.removeEventListener("click", moveSliderRight)
    }

    slider.addEventListener("animationend", (event) => {
      if (event.animationName === "move-left" || event.animationName === "move-left830") {
        slider.classList.remove("transition-right")
        leftSlide.innerHTML = activeSlide.innerHTML
        activeSlide.innerHTML = rightSlide.innerHTML
        rendertUniqueSlide(false)
      } else {
        slider.classList.remove("transition-left")
        rightSlide.innerHTML = activeSlide.innerHTML
        activeSlide.innerHTML = leftSlide.innerHTML
        rendertUniqueSlide(true)
      }
      btnSliderLeft.addEventListener("click", moveSliderLeft)
      btnSliderRight.addEventListener("click", moveSliderRight)
    })

    btnSliderLeft.addEventListener("click", moveSliderLeft)
    btnSliderRight.addEventListener("click", moveSliderRight)
  }
}

const renderCardsToSlider = (prevIdCards = null) => {
  const sliderList = getWrapperCards(".pets-container");

  if (sliderList.length > 0) {
    let prevThreeCardsId = [];

    sliderList.forEach(slide => {
      let tempArr = []
      generateUniqueThreeCards(prevThreeCardsId).forEach(card => {
        slide.append(card.generateCard("our-friends-background"));
        tempArr.push(card.id);
      })
      prevThreeCardsId = tempArr
    })
  }
}

const getWrapperCards = (classNameWrapper) => {
  const listCards = document.querySelectorAll(classNameWrapper)
  listCards.forEach(slide => slide.innerHTML = "")
  return listCards
}

const generateAllCards = (data) => {
  let cards = [];
  data.forEach(card => cards.push(new Card(card)))
  return cards
}

const generateUniqueThreeCards = (prevIdCards = []) => {
  let availableCards = generateAllCards(pets).filter(card => !prevIdCards.includes(card.id));
  let uniqueThreeCards = []
  while (uniqueThreeCards.length < 3) {
    let randomIndex = Math.floor(Math.random() * availableCards.length);
    uniqueThreeCards.push(availableCards[randomIndex])
    availableCards.splice(randomIndex, 1)
  }
  return uniqueThreeCards
}

// Popup
// ---------------------------------------------------------------------------------
const addCardsClickHandler = (classContainer, classCard) => {
  const cardsWrapper = document.querySelector(classContainer);
  if (cardsWrapper) {
    cardsWrapper.addEventListener("click", (e) => {
      if (e.target.closest(classCard)) {
        let petId = e.target.closest(classCard).dataset.id;
        let pet = pets.find(pet => pet.id === petId);
        let popup = new Popup(pet)

        document.body.append(popup.generatePopup())
        body.classList.add("active");
        const renderedPopup = document.querySelector('.popup');
        setTimeout(() => {
          renderedPopup.classList.add("_open-popup")
          addClosePopupClickHandler()
        }, 0);
      }
    })
  }
  
}

const addClosePopupClickHandler = () => {
  const popup = document.querySelector(".popup");
    const pop = document.querySelector(".pets-more");
  const closePopupBtn = document.querySelector(".cross");


  
  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("pets-more")) {
      popup.classList.remove("_open-popup")
      body.classList.remove("active");
      popup.addEventListener("transitionend", () => {
        popup.remove()
      })
    }
  })
  popup.addEventListener("click", (n) => {
    if ((!(pop.contains(n.target)) ) ) {
      body.classList.remove("active");
      popup.classList.remove("_open-popup")
      popup.addEventListener("transitionend", () => {
        popup.remove()
      })
    }
});

  closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("_open-popup")
    body.classList.remove("active");
    popup.addEventListener("transitionend", () => {
      popup.remove()
    })
  })
}




// Catalogue
// ---------------------------------------------------------------------------------
const generate48Cards = () => {
  const compareRandom = () => Math.random() - 0.5;
  let allCatalogueCards = []
  let slicedArray = []
  let eightCards = generateAllCards(pets).sort(compareRandom)

  for (let i = 0; i < 6; i++) {
    slicedArray.push(eightCards.slice(0, 3).sort(compareRandom))
    slicedArray.push(eightCards.slice(3, 6).sort(compareRandom))
    slicedArray.push(eightCards.slice(6).sort(compareRandom))
  }

  allCatalogueCards.push(slicedArray.flat())
  return allCatalogueCards.flat();
}

const listCards = generate48Cards();

const catalogueInit = () => {
  const currentPage = document.querySelector(".pagination__current-page")
  const anchor = document.getElementById("topCatalogue");
  let currentStep = 0;
  currentPage.innerText = currentStep + 1

  renderCardsInCatalogue(listCards, currentStep, numCardsAndPages()[0])

  document.getElementById("pagination").addEventListener("click", (e) => {
    const workPagination = () => {
      renderCardsInCatalogue(listCards, currentStep, numCardsAndPages()[0])
      currentPage.innerText = currentStep + 1
      paginationHadler(currentStep)
    }

    if (e.target.closest(".pagination__arrow_first-page")) {
      currentStep = 0
      isAnchor && anchor.scrollIntoView({ behavior: 'smooth' });
      workPagination()
    }

    if (e.target.closest(".pagination__arrow_prev")) {
      currentStep -= 1
      isAnchor && anchor.scrollIntoView({ behavior: 'smooth' });
      workPagination()
    }

    if (e.target.closest(".pagination__arrow_next")) {
      currentStep += 1
      isAnchor && anchor.scrollIntoView({ behavior: 'smooth' });
      workPagination()
    }

    if (e.target.closest(".pagination__arrow_last-page")) {
      let lastPage = numCardsAndPages()[1]
      currentStep = lastPage
      isAnchor && anchor.scrollIntoView({ behavior: 'smooth' });
      workPagination()
    }

  })
}

const paginationHadler = (currentStep) => {
  const firstPageArrow = document.querySelector(".pagination__arrow_first-page")
  const prevArrow = document.querySelector(".pagination__arrow_prev")
  const nextArrow = document.querySelector(".pagination__arrow_next")
  const lastPageArrow = document.querySelector(".pagination__arrow_last-page")
  const numPages = numCardsAndPages()[1]

  if (currentStep === 0) {
    firstPageArrow.classList.add("_disabled")
    prevArrow.classList.add("_disabled")
    nextArrow.classList.remove("_disabled")
    lastPageArrow.classList.remove("_disabled")
  }

  if (currentStep > 0 && currentStep < numPages + 1) {
    firstPageArrow.classList.remove("_disabled")
    prevArrow.classList.remove("_disabled")
    nextArrow.classList.remove("_disabled")
    lastPageArrow.classList.remove("_disabled")
  }

  if (currentStep === numPages) {
    nextArrow.classList.add("_disabled")
    lastPageArrow.classList.add("_disabled")
  }
}

const renderCardsInCatalogue = (listCards, currentStep, numOfCards) => {
  let catalogueList = getWrapperCards(".our-friends-container")
  let startIndex = currentStep * numOfCards
  let endIndex = startIndex + numOfCards

  listCards.slice(startIndex, endIndex).forEach(card => {
    catalogueList[0].append(card.generateCard("our-friends-background"))
  })
}

const numCardsAndPages = () => {
  let numCardsAndPages = [8, 5];

  if (window.innerWidth < 1260) {
    numCardsAndPages = [6, 7]
  }

  if (window.innerWidth < 621) {
    numCardsAndPages = [3, 15]
  }
  return numCardsAndPages
}

const addRenderCardsAfterResizeWindow = () => {
  let function1HasRun = true;
  let function2HasRun = false;
  let function3HasRun = false;

  const checkWidthWindow = () => {
    if (window.innerWidth >= 1261 && !function1HasRun) {
      catalogueInit()
      paginationHadler(0)
      function1HasRun = true;
      function2HasRun = false;
    }

    if (window.innerWidth < 1261 && window.innerWidth >= 621 && !function2HasRun) {
      catalogueInit()
      paginationHadler(0)
      function1HasRun = false;
      function2HasRun = true;
      function3HasRun = false;
    }

    if (window.innerWidth < 621 && !function3HasRun) {
      catalogueInit()
      paginationHadler(0)
      function2HasRun = false;
      function3HasRun = true;
    }
  }

  checkWidthWindow()

  window.addEventListener('resize', checkWidthWindow);
}

