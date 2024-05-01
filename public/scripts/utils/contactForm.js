const urlParams = new URL(document.location).searchParams;
let photographerId = urlParams.get("id");
async function displayModal(data) {
  //const modal = document.getElementById("contact_modal");
  modalContact.style.display = "block";
  main.setAttribute("aria-hidden", "true");
  modalContact.setAttribute("aria-hidden", "false");
  body.setAttribute("class", "no-scroll");
  modalContact.setAttribute("role", "dialog");
  modalContact.setAttribute("aria-describedby", "Contactez le photographe");
  modalCloseBtn.focus();
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function closeModal() {
  modalContact.style.display = "none";
  main.setAttribute("aria-hidden", "false");
  modalContact.setAttribute("aria-hidden", "true");
  body.removeAttribute("class", "no-scroll");
  modalContactButton.focus();
}
const modalContactButton = document.querySelector(".contact_button");
const modalCloseBtn = document.getElementById("modalClosebtn");
const modalContact = document.getElementById("contact_modal");
const body = document.querySelector("body");
const first = document.getElementById("firstname");
const last = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const main = document.getElementById("main");
const formContact = document.querySelector("form");
formContact.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(first.value);
  console.log(last.value);
  console.log(email.value);
  console.log(message.value);
  //console.log();
  closeModal();
});
// Close modal when escape key is pressed

/**
 * Checks if the last name input is valid.
 *
 * This function uses a regular expression to validate if the input contains
 * at least two lowercase alphabetical characters. It updates the visibility
 * of the error message based on the validation result.
 *
 * @param {HTMLInputElement} input - The input element containing the last name.
 * @return {boolean} - True if the input is valid, false otherwise.
 */
function isValidInputLast(input) {
  // Define a regex to match at least two lowercase alphabetical characters
  const regex = new RegExp("^[a-z]{2,}$");

  // Test if the input value matches the regex
  const isValid = regex.test(input.value);
  if (isValid) {
    console.log("Input valid");
    // Hide the error message
    last.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Input not valid");
    // Show the error message
    last.parentElement.dataset.errorVisible = "true";
  }

  // Return the result of the validation
  return isValid;
}

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

  function getName() {
    const photographContact = document.querySelector(".photograph_contact");
    //photographContact.innerHTML = name;
    const h2 = document.createElement("h2");
    h2.setAttribute("class", "photograph_contact");
    h2.textContent = name;
    //photographContact.appendChild(h2);
    photographContact.parentNode.insertBefore(
      h2,
      photographContact.nextSibling
    );
    fetch(`http://localhost:5500/data/photographers.json/${name}`);
    return photographContact;
  }

  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    portrait,
    getName,
  };
}

async function displayData(photographers) {
  //const photographersHeader = document.querySelector(".photograph_contact");
  const photographersToDisplay = photographers.filter(
    (photographer) => photographer.id == photographerId
  );
  photographersToDisplay.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getName();
    //photographersHeader.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographer();
  displayData(photographers);
}

init();
