/**
 * Import the template for a photographer card
 * @type {Object} - The template function to generate the HTML for a photographer
 * @see {@link ../templates/photographer.js}
 */
import { photographerTemplate } from "../templates/photographer.js";


/**
 * Function to get the data of all photographers
 * @returns {Object} - Object with the array of photographers
 */
async function getPhotographers() {
  // Fetch the data of all photographers from the JSON file
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  // Destructure the data to get the array of photographers
  const { photographers } = data;

  // Log the array of photographers in the console for debugging purposes
  console.log(photographers);

  // Return the array of photographers
  return {
    // Spread the array of photographers to return a new array
    // with the same data but not the same reference as the original array
    photographers: [...photographers],
  };
}


/**
 * Function to display the data of all photographers
 * @param {Array} photographers - Array of objects containing the data of all photographers
 */
async function displayData(photographers) {
  /**
   * Select the HTML element that will contain the data of all photographers
   * @type {HTMLElement} - The HTML element containing the data of all photographers
   */
  const photographersSection = document.querySelector(".photographer_section");

  /**
   * Loop through the array of photographers
   * @param {Object} photographer - Object containing the data of a single photographer
   */
  photographers.forEach((photographer) => {
    /**
     * Generate the HTML for a single photographer
     * @type {Object} - The template function to generate the HTML for a photographer
     * @see {@link ../templates/photographer.js}
     */
    const photographerModel = photographerTemplate(photographer);

    /**
     * Get the HTML element for a single photographer
     * @type {HTMLElement} - The HTML element for a single photographer
     */
    const userCardDOM = photographerModel.getUserCardDOM();

    /**
     * Append the HTML element for a single photographer to the HTML element
     * containing the data of all photographers
     */
    photographersSection.appendChild(userCardDOM);
  });
}


/**
 * Initialize the page
 * - Get the data of all photographers
 * - Display the data of all photographers
 */
async function init() {
  const { photographers } = await getPhotographers(); // Get the data of all photographers
  displayData(photographers); // Display the data of all photographers
}

init(); // Call the init function to start the application