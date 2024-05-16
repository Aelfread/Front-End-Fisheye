/**
 * Retrieve the photographer ID from the URL params
 *
 * The URL params are expected to contain an "id" parameter, which
 * will be used to retrieve the corresponding photographer from the
 * JSON file. E.g. http://localhost:3000/contact.html?id=123456789
 */
const urlParamsForm = new URL(document.location).searchParams;

/**
 * The ID of the photographer to display in the contact form.
 * It is retrieved from the URL params (see above).
 * @type {string|null}
 */
let photographerIdForm = urlParamsForm.get("id"); // no default value


/**
 * The button to open the contact form modal
 * @type {HTMLButtonElement}
 */
const modalContactButton = document.querySelector(".contact_button");

/**
 * The close button of the contact form modal
 * @type {HTMLImageElement}
 */
const modalCloseBtn = document.getElementById("modalClosebtn");

/**
 * The contact form modal element
 * @type {HTMLDivElement}
 */
const modalContact = document.getElementById("contact_modal");

/**
 * The <body> element of the page
 * @type {HTMLBodyElement}
 */
const body = document.querySelector("body");

/**
 * The input element for the first name in the contact form
 * @type {HTMLInputElement}
 */
const first = document.getElementById("firstname");

/**
 * The input element for the last name in the contact form
 * @type {HTMLInputElement}
 */
const last = document.getElementById("lastname");

/**
 * The input element for the email in the contact form
 * @type {HTMLInputElement}
 */
const email = document.getElementById("email");

/**
 * The textarea element for the message in the contact form
 * @type {HTMLTextAreaElement}
 */
const message = document.getElementById("message");

/**
 * The <main> element of the page
 * @type {HTMLDivElement}
 */
const main = document.getElementById("main");

/**
 * The contact form element
 * @type {HTMLFormElement}
 */
const formContact = document.querySelector("form");
/**
 * Display the contact form modal
 *
 * This function retrieves the contact form modal element from the
 * DOM, displays it, and sets the necessary attributes for
 * accessibility. It also sets the focus on the modal and disables
 * the tabindex of non-focusable elements within the modal.
 */
// eslint-disable-next-line no-unused-vars
function displayModal() {
  // Get the contact form modal element
  const modal = document.getElementById("contact_modal");

  // Display the modal
  modal.style.display = "block";

  // Set the necessary attributes for accessibility
  main.setAttribute("aria-hidden", "true"); // Hide the main content from assistive technologies
  modal.setAttribute("aria-hidden", "false"); // Show the modal to assistive technologies
  body.setAttribute("class", "no-scroll"); // Disable scrolling on the body
  modal.setAttribute("role", "dialog"); // Set the role of the modal
  modal.setAttribute("aria-describedby", "Contactez le photographe"); // Set the aria-describedby attribute

  // Set the focus on the modal
  modalCloseBtn.focus();

  // Set the tabindex of the modal close button to 0
  modalCloseBtn.setAttribute("tabindex", "0");

  // Add a keydown event listener to close the modal when the Escape key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Disable the tabindex of non-focusable elements within the modal
  const focusableElements = document.querySelectorAll(
    "[tabindex='0'],.custom-select,.contact_button"
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "-1");
  });

  // Set the tabindex of the first, last, email, and message inputs to 0
  first.setAttribute("tabindex", "0");
  last.setAttribute("tabindex", "0");
  email.setAttribute("tabindex", "0");
  message.setAttribute("tabindex", "0");

  // Add a focusin event listener to log the element focused
  document.addEventListener(
    "focusin",
    () => {
      //console.log("Element focused:", event.target);
    },
    true // Use capture phase to catch the event early
  );
}


/**
 * Close the contact form modal
 *
 * This function hides the contact form modal, sets the necessary
 * attributes for accessibility, and resets the tabindex of focusable
 * elements.
 */
function closeModal() {
  // Hide the modal
  modalContact.style.display = "none";

  // Set the necessary attributes for accessibility
  main.setAttribute("aria-hidden", "false"); // Make the main content visible
  modalContact.setAttribute("aria-hidden", "true"); // Hide the modal from assistive technologies
  body.removeAttribute("class", "no-scroll"); // Enable scrolling on the body

  // Reset tabindex of focusable elements
  const focusableElements = document.querySelectorAll(
    "[tabindex='-1'],.custom-select,.contact_button"
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "0"); // Reset the tabindex of the element
  });

  // Set the focus on the contact button
  modalContactButton.focus();
}



/**
 * Handle the form submission event
 *
 * This function is called when the user submits the contact form.
 * It prevents the default form submission behavior, retrieves the
 * form data, and logs it to the console. It also closes the modal.
 *
 * @param {Event} event - The form submission event
 */
formContact.addEventListener("submit", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the form data
  const firstValue = first.value;
  const lastValue = last.value;
  const emailValue = email.value;
  const messageValue = message.value;

  // Log the form data to the console
  console.log(`First name: ${firstValue}`);
  console.log(`Last name: ${lastValue}`);
  console.log(`Email: ${emailValue}`);
  console.log(`Message: ${messageValue}`);

  // Close the modal
  closeModal();
});


/**
 * Fetch the photographer data from the JSON file
 *
 * This function fetches the data from the JSON file and returns
 * an object containing the photographers and media data.
 *
 * @returns {Promise<Object>} - The promise resolves with an object containing
 * the photographers and media data. The object has the following shape:
 * { 
 *   photographers: Array<Object> - The photographers data
 *   media: Array<Object> - The media data
 * }
 */
async function getPhotographer() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const { photographers, media } = data;

  // Log the data to the console
  //console.log(photographers);

  // Return the data
  return {
    photographers: [...photographers],
    media: [...media],
  };
}

/**
 * Template for a photographer
 *
 * This function returns an object that contains the data of a photographer.
 * The object has the following properties:
 *
 * - name: The name of the photographer
 * - id: The ID of the photographer
 * - city: The city where the photographer is located
 * - country: The country where the photographer is located
 * - tagline: The tagline of the photographer
 * - price: The price of the photographer's services
 * - portrait: A boolean indicating if the photographer takes portraits
 * - getName: A function to display the name of the photographer in the contact form
 *
 * @param {Object} data - The data of the photographer
 * @returns {Object} - The photographer data
 */
function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  /**
   * Function to display the name of the photographer in the contact form.
   *
   * This function displays the name of the photographer in the contact form.
   * It gets the element with the class "photograph_contact" and sets its innerHTML to the name of the photographer.
   *
   * @returns {HTMLElement} - The <h2> element with the photographer's name
   */
  function getName() {
    const photographContact = document.querySelector(".photograph_contact");

    // Create a new <h2> element
    const h2 = document.createElement("h2");

    // Add the class "photograph_contact" to the <h2> element
    h2.setAttribute("class", "photograph_contact");

    // Set the text content of the <h2> element to the name of the photographer
    h2.textContent = name;

    // Insert the <h2> element before the next sibling of the ".photograph_contact" element
    photographContact.parentNode.insertBefore(
      h2,
      photographContact.nextSibling
    );

    // Fetch the data of the photographers from the JSON file
    fetch(`http://localhost:5500/data/photographers.json`);

    // Return the <h2> element with the photographer's name
    return h2;
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

/**
 * Function to display the data of the photographers in the contact form
 *
 * This function displays the data of the photographers in the contact form.
 * It gets the element with the class "photograph_contact" and filters the data of the photographers
 * by the ID of the photographer that is currently selected in the form.
 * It then creates a new object with the data of the photographer using the photographerTemplate function.
 * It calls the getName function of the created object and appends the returned HTMLElement to the ".photograph_contact" element.
 *
 * @param {Array<Object>} photographers - The data of the photographers
 */
async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photograph_contact");

  // Filter the data of the photographers by the ID of the photographer that is currently selected in the form
  const photographersToDisplay = photographers.filter(
    (photographer) => photographer.id == photographerIdForm
  );

  // Loop through the photographers to display
  photographersToDisplay.forEach((photographer) => {
    // Create a new object with the data of the photographer using the photographerTemplate function
    const photographerModel = photographerTemplate(photographer);

    // Call the getName function of the created object and get the returned HTMLElement
    const userCardDOM = photographerModel.getName();

    // Append the returned HTMLElement to the ".photograph_contact" element
    photographersHeader.appendChild(userCardDOM);
  });
}


/**
 * Initialize the contact form
 * - Get the data of the photographers
 * - Display the data of the photographers in the contact form
 */
async function init() {
  const { photographers } = await getPhotographer(); // Get the data of the photographers
  displayData(photographers); // Display the data of the photographers in the contact form
}


init();
