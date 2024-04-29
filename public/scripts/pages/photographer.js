//import { photographerTemplate } from "../templates/photographer.js";
//Mettre le code JavaScript lié à la page photographer.html
const urlParams = new URL(document.location).searchParams;
let photographerId = urlParams.get("id");

async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const { photographers } = data;
  const { media } = data;
  console.log(photographers);
  return {
    photographers: [...photographers],
    media: [...media],
  };
}
function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const photographProfile = document.createElement("div");
    photographProfile.setAttribute("class", "photograph-profile");
    const article = document.createElement("article");
    /*const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", `Photographe: ${name}`);*/
    const h1 = document.createElement("h1");
    h1.textContent = name;
    const h2 = document.createElement("h2");
    h2.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.textContent = tagline;
    const p2 = document.createElement("p");
    p2.textContent = `${price}€/jour`;
    p2.setAttribute("class", "price");
    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`);
    photographProfile.appendChild(h1);
    photographProfile.appendChild(h2);
    photographProfile.appendChild(p);
    //photographProfile.appendChild(p2);
    //img.appendChild(img);
    /*a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(p2);*/
    //article.appendChild(img);

    fetch(`http://localhost:5500/data/photographers.json/${name}`);
    return photographProfile;
  }
  function getImgUserCardDOM() {
    const btn = document.querySelector(".contact_button");
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", `Photographe: ${name}`);
    article.appendChild(img);
    article.insertBefore(btn, article.firstChild);
    return article;
  }
  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    portrait,
    getUserCardDOM,
    getImgUserCardDOM,
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
    const imgUserCardDOM = photographerModel.getImgUserCardDOM();
    photographersHeader.appendChild(imgUserCardDOM);
    photographersHeader.appendChild(userCardDOM);
  });
}

async function displayDataMedia(medias) {
  const photographersSection = document.querySelector(".photograph_section");
  const mediaToDisplay = medias.filter(
    (media) => media.photographerId == photographerId
  );
  mediaToDisplay.forEach((media) => {
    const imagePhotographerModel = imagePhotographer(media);
    const imagePhotographerDOM =
      imagePhotographerModel.getImagePhotographerDOM();
    photographersSection.appendChild(imagePhotographerDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographer();
  displayData(photographers);

  const { media } = await getPhotographer();
  displayDataMedia(media);
}

init();

function imagePhotographer(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const imageP = `assets/images/${image}`;
  const videoP = `assets/images/${video}`;
  function getImagePhotographerDOM() {
    const article = document.createElement("article");
    const divCardContent = document.createElement("div");
    divCardContent.setAttribute("class", "card-content");
    const divCardTxt = document.createElement("div");
    divCardTxt.setAttribute("class", "card-txt");
    const spanLike = document.createElement("span");
    spanLike.setAttribute("class", "heart-icon");
    const iHeart = document.createElement("i");
    iHeart.setAttribute("class", "fa-regular fa-heart fa-2xl");
    iHeart.setAttribute("aria-hidden", `true`);

    const h3 = document.createElement("h3");
    h3.textContent = title;
    const p = document.createElement("p");
    p.textContent = `${likes}`;
    const p2 = document.createElement("p");
    p2.textContent = `${date}`;

    if (image) {
      const imagePhotographer = document.createElement("img");
      imagePhotographer.setAttribute("src", imageP);
      imagePhotographer.setAttribute("alt", title);
      imagePhotographer.setAttribute("aria-label", `Photographe: ${title}`);
      //article.appendChild(videoPhotographer);
      article.appendChild(imagePhotographer);
    } else if (video) {
      const videoPhotographer = document.createElement("video");
      videoPhotographer.setAttribute("src", videoP);
      videoPhotographer.setAttribute("alt", title);
      videoPhotographer.setAttribute("aria-label", `Photographe: ${title}`);
      videoPhotographer.setAttribute("controls", true);
      article.appendChild(videoPhotographer);
    }
    if (image) {
      fetch(`http://localhost:5500/data/photographers.json/${image}`);
    } else if (video) {
      fetch(`http://localhost:5500/data/photographers.json/${video}`);
    }
    spanLike.appendChild(iHeart);
    spanLike.appendChild(p);
    divCardTxt.appendChild(h3);
    //divCardTxt.appendChild(p);

    //divCardTxt.appendChild(p2);
    divCardContent.appendChild(divCardTxt);
    divCardContent.appendChild(spanLike);
    article.appendChild(divCardContent);
    return article;

    //ajouter un video
  }

  return {
    id,
    photographerId,
    title,
    imageP,
    videoP,
    likes,
    date,
    price,
    getImagePhotographerDOM,
  };
}
