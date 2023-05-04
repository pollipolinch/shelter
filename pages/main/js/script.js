
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
    renderCardsToSliderTo()

    // slider
    SliderClickHandlerTo()

    // Popup
    addCardsClickHandlerNew('.our-friends-container', ".our-friends-background")
  }


}

const addUniqueSlide = (inLeft) => {
  const activeSlide = document.querySelectorAll("#slider-active .our-friends-background");
  const leftSlider = document.querySelector("#slider-left");
  const rightSlider = document.querySelector("#slider-right");
  let activeSlideIdex = [];

  activeSlide.forEach((card, index) => activeSlideIdex[index] = card.dataset.id)

  if (inLeft) {
    leftSlider.innerHTML = ""
    generateNewThreeCards(activeSlideIdex).forEach(card => {
      leftSlider.append(card.generateCard("our-friends-background"))
    })
  } else {
    rightSlider.innerHTML = ""
    generateNewThreeCards(activeSlideIdex).forEach(card => {
      rightSlider.append(card.generateCard("our-friends-background"))
    })
  }
}

const SliderClickHandlerTo = () => {
  const butonLeftSlider = document.querySelector('.button-arrows');
  const butonRightSlider = document.querySelector('.button-arrows-two');
  const slider = document.querySelector('.slider');
  const leftSliderCop = document.querySelector('#slider-left');
  const activeSliderCop = document.querySelector('#slider-active');
  const rightSliderCop = document.querySelector('#slider-right');

  if (slider) {
    const movingSliderToLeft = () => {
      slider.classList.add("transition-left")
      butonLeftSlider.removeEventListener("click", movingSliderToLeft)
      butonRightSlider.removeEventListener("click", movingSliderToRight)
    }

    const movingSliderToRight = () => {
      slider.classList.add("transition-right")
      butonLeftSlider.removeEventListener("click", movingSliderToLeft)
      butonRightSlider.removeEventListener("click", movingSliderToRight)
    }

    slider.addEventListener("animationend", (event) => {
      if (event.animationName === "move-left" || event.animationName === "move-left830") {
        slider.classList.remove("transition-right")
        leftSliderCop.innerHTML = activeSliderCop.innerHTML
        activeSliderCop.innerHTML = rightSliderCop.innerHTML
        addUniqueSlide(false)
      } else {
        slider.classList.remove("transition-left")
        rightSliderCop.innerHTML = activeSliderCop.innerHTML
        activeSliderCop.innerHTML = leftSliderCop.innerHTML
        addUniqueSlide(true)
      }
      butonLeftSlider.addEventListener("click", movingSliderToLeft)
      butonRightSlider.addEventListener("click", movingSliderToRight)
    })

    butonLeftSlider.addEventListener("click", movingSliderToLeft)
    butonRightSlider.addEventListener("click", movingSliderToRight)
  }
}

const renderCardsToSliderTo = (prevIdCards = null) => {
  const sliderListening = showWrapToCards(".pets-container");

  if (sliderListening.length > 0) {
    let showThreeCards = [];

    sliderListening.forEach(slide => {
      let addnewArr = []
      generateNewThreeCards(showThreeCards).forEach(card => {
        slide.append(card.generateCard("our-friends-background"));
        addnewArr.push(card.id);
      })
      showThreeCards = addnewArr
    })
  }
}

const showWrapToCards = (classNameWrapper) => {
  const listCards = document.querySelectorAll(classNameWrapper)
  listCards.forEach(slide => slide.innerHTML = "")
  return listCards
}

const generateNewCards = (data) => {
  let cards = [];
  data.forEach(card => cards.push(new Card(card)))
  return cards
}

const generateNewThreeCards = (prevIdCards = []) => {
  let addCoolCards = generateNewCards(pets).filter(card => !prevIdCards.includes(card.id));
  let addUniqueNewThreeCards = []
  while (addUniqueNewThreeCards.length < 3) {
    let randomIndexofCards = Math.floor(Math.random() * addCoolCards.length);
    addUniqueNewThreeCards.push(addCoolCards[randomIndexofCards])
    addCoolCards.splice(randomIndexofCards, 1)
  }
  return addUniqueNewThreeCards
}

// Popup
// ---------------------------------------------------------------------------------
const addCardsClickHandlerNew = (classContainer, classCard) => {
  const cardsAddNewWrapper = document.querySelector(classContainer);
  if (cardsAddNewWrapper) {
    cardsAddNewWrapper.addEventListener("click", (e) => {
      if (e.target.closest(classCard)) {
        let addpetId = e.target.closest(classCard).dataset.id;
        let pet = pets.find(pet => pet.id === addpetId);
        let popup = new Popup(pet)

        document.body.append(popup.generatePopup())
        body.classList.add("active");
        const randomMyPopup = document.querySelector('.popup');
        setTimeout(() => {
          randomMyPopup.classList.add("_open-popup")
          thisClosePopupClickHandlerButon()
        }, 0);
      }
    })
  }
}

const thisClosePopupClickHandlerButon = () => {
  const popup = document.querySelector(".popup");
  const pop = document.querySelector(".pets-more");
  const closePopupButonTo = document.querySelector(".cross");

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



closePopupButonTo.addEventListener("click", () => {
    popup.classList.remove("_open-popup")
    body.classList.remove("active");
    popup.addEventListener("transitionend", () => {
      popup.remove()
    })
  })
}



// Catalogue
// ---------------------------------------------------------------------------------
const addgenerateNew48Cards = () => {
  const showRandomCar = () => Math.random() - 0.5;
  let addNewCatalCards = []
  let addslicedToArray = []
  let addeightNewCards = generateNewCards(pets).sort(showRandomCar)

  for (let i = 0; i < 6; i++) {
    addslicedToArray.push(addeightNewCards.slice(0, 3).sort(showRandomCar))
    addslicedToArray.push(addeightNewCards.slice(3, 6).sort(showRandomCar))
    addslicedToArray.push(addeightNewCards.slice(6).sort(showRandomCar))
  }

  addNewCatalCards.push(addslicedToArray.flat())
  return addNewCatalCards.flat();
}

const listCards = addgenerateNew48Cards();

const showCatalogToInit = () => {
  const showCurPage = document.querySelector(".pagination__current-page")
  const addNewanch = document.getElementById("topCatalogue");
  let curNumStep = 0;
  showCurPage.innerText = curNumStep + 1

  randomCardtoCat(listCards, curNumStep, numCardsAndPages()[0])

  document.getElementById("pagination").addEventListener("click", (e) => {
    const addWorkPag = () => {
      randomCardtoCat(listCards, curNumStep, numCardsAndPages()[0])
      showCurPage.innerText = curNumStep + 1
      showpagHadl(curNumStep)
    }

    if (e.target.closest(".pagination__arrow_first-page")) {
      curNumStep = 0
      isAnchor && addNewanch.scrollIntoView({ behavior: 'smooth' });
      addWorkPag()
    }

    if (e.target.closest(".pagination__arrow_prev")) {
      curNumStep -= 1
      isAnchor && addNewanch.scrollIntoView({ behavior: 'smooth' });
      addWorkPag()
    }

    if (e.target.closest(".pagination__arrow_next")) {
      curNumStep += 1
      isAnchor && addNewanch.scrollIntoView({ behavior: 'smooth' });
      addWorkPag()
    }

    if (e.target.closest(".pagination__arrow_last-page")) {
      let showMylastPag = numCardsAndPages()[1]
      curNumStep = showMylastPag
      isAnchor && addNewanch.scrollIntoView({ behavior: 'smooth' });
      addWorkPag()
    }

  })
}

const showpagHadl = (curNumStep) => {
  const showfirstPagAr = document.querySelector(".pagination__arrow_first-page")
  const showPrevArr = document.querySelector(".pagination__arrow_prev")
  const showNextArr = document.querySelector(".pagination__arrow_next")
  const showlastPagAr = document.querySelector(".pagination__arrow_last-page")
  const shownumPag = numCardsAndPages()[1]

  if (curNumStep === 0) {
    showfirstPagAr.classList.add("_disabled")
    showPrevArr.classList.add("_disabled")
    showNextArr.classList.remove("_disabled")
    showlastPagAr.classList.remove("_disabled")
  }

  if (curNumStep > 0 && curNumStep < shownumPag + 1) {
    showfirstPagAr.classList.remove("_disabled")
    showPrevArr.classList.remove("_disabled")
    showNextArr.classList.remove("_disabled")
    showlastPagAr.classList.remove("_disabled")
  }

  if (curNumStep === shownumPag) {
    showNextArr.classList.add("_disabled")
    showlastPagAr.classList.add("_disabled")
  }
}

const randomCardtoCat = (listCards, curNumStep, numOfCards) => {
  let catNewList = showWrapToCards(".our-pets__grid")
  let showStartIndex = curNumStep * numOfCards
  let showEndInd = showStartIndex + numOfCards

  listCards.slice(showStartIndex, showEndInd).forEach(card => {
    catNewList[0].append(card.generateCard("our-pets__item pet-card"))
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
  let show1HasRunning = true;
  let show2HasRunning = false;
  let show3HasRunning = false;

  const showcheWidtWin = () => {
    if (window.innerWidth >= 1261 && !show1HasRunning) {
      showCatalogToInit()
      showpagHadl(0)
      show1HasRunning = true;
      show2HasRunning = false;
    }

    if (window.innerWidth < 1261 && window.innerWidth >= 621 && !show2HasRunning) {
      showCatalogToInit()
      showpagHadl(0)
      show1HasRunning = false;
      show2HasRunning = true;
      show3HasRunning = false;
    }

    if (window.innerWidth < 621 && !show3HasRunning) {
      showCatalogToInit()
      showpagHadl(0)
      show2HasRunning = false;
      show3HasRunning = true;
    }
  }

  showcheWidtWin()

  window.addEventListener('resize', showcheWidtWin);
}

