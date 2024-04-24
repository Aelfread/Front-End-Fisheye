import { photographerTemplate } from "../templates/photographer.js";
//Mettre le code JavaScript lié à la page photographer.html
const urlParams = new URL(document.location).searchParams;
let photographerId = urlParams.get("id");

async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const { photographers } = data;
  console.log(photographers);
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographersToDisplay = photographers.filter(
    (photographer) => photographer.id == photographerId
  );
  photographersToDisplay.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographer();
  displayData(photographers);
}

init();
