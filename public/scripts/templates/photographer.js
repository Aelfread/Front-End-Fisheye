/**
 * Function to create a template for a photographer.
 * @param {Object} data - Data of the photographer
 * @param {string} data.name - Name of the photographer
 * @param {number} data.id - Id of the photographer
 * @param {string} data.city - City of the photographer
 * @param {string} data.country - Country of the photographer
 * @param {string} data.tagline - Tagline of the photographer
 * @param {number} data.price - Price of the photographer's services
 * @param {string} data.portrait - Portrait of the photographer
 * @returns {Object} - Object with the photographer's data
 * and a function to create a DOM element of the photographer
 */
export function photographerTemplate(data) {
  
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;
  /**
   * Function to create a DOM element of a photographer.
   * @returns {HTMLElement} - The DOM element of the photographer
   */
  function getUserCardDOM() {
    /**
     * Create a new HTML element <article>
     * @type {HTMLElement} - The <article> element
     */
    const article = document.createElement("article");
    /**
     * Create a new HTML element <img>
     * @type {HTMLElement} - The <img> element
     */
    const img = document.createElement("img");
    /**
     * Set the source of the <img> element
     */
    img.setAttribute("src", picture);
    /**
     * Set the alternative text of the <img> element
     */
    img.setAttribute("alt", name);
    /**
     * Set the aria-label of the <img> element
     */
    img.setAttribute("aria-label", `Photographe: ${name}`);
    /**
     * Create a new HTML element <h2>
     * @type {HTMLElement} - The <h2> element
     */
    const h2 = document.createElement("h2");
    /**
     * Set the text content of the <h2> element
     */
    h2.textContent = name;
    /**
     * Create a new HTML element <h3>
     * @type {HTMLElement} - The <h3> element
     */
    const h3 = document.createElement("h3");
    /**
     * Set the text content of the <h3> element
     */
    h3.textContent = `${city}, ${country}`;
    /**
     * Create a new HTML element <p>
     * @type {HTMLElement} - The <p> element
     */
    const p = document.createElement("p");
    /**
     * Set the text content of the <p> element
     */
    p.textContent = tagline;
    /**
     * Create a new HTML element <p>
     * @type {HTMLElement} - The <p> element
     */
    const p2 = document.createElement("p");
    /**
     * Set the text content of the <p> element
     */
    p2.textContent = `${price}€/jour`;
    /**
     * Set the class attribute of the <p> element
     */
    p2.setAttribute("class", "price");
    /**
     * Create a new HTML element <a>
     * @type {HTMLElement} - The <a> element
     */
    const a = document.createElement("a");
    /**
     * Set the href attribute of the <a> element
     */
    a.setAttribute("href", `photographer.html?id=${id}`);
    /**
     * Append the <img> element to the <a> element
     */
    a.appendChild(img);
    /**
     * Append the <h2> element to the <a> element
     */
    a.appendChild(h2);
    /**
     * Append the <a> element to the <article> element
     */
    article.appendChild(a);
    /**
     * Append the <h3> element to the <article> element
     */
    article.appendChild(h3);
    /**
     * Append the <p> element to the <article> element
     */
    article.appendChild(p);
    /**
     * Append the <p> element to the <article> element
     */
    article.appendChild(p2);
    /**
     * Fetch data from the server
     */
    fetch(`http://localhost:5500/data/photographers.json/${name}`);
    /**
     * Return the <article> element
     */
    return article;
  }
  /**
   * Object with the photographer's data
   * @typedef {Object} Photographer
   * @property {string} name - Name of the photographer
   * @property {number} id - Id of the photographer
   * @property {string} city - City of the photographer
   * @property {string} country - Country of the photographer
   * @property {string} tagline - Tagline of the photographer
   * @property {number} price - Price of the photographer's services
   * @property {string} picture - Portrait of the photographer
   */
  /**
   * Function to create a DOM element of a photographer.
   * @returns {HTMLElement} - The DOM element of the photographer
   */
  return {
    name, // Name of the photographer
    id, // Id of the photographer
    city, // City of the photographer
    country, // Country of the photographer
    tagline, // Tagline of the photographer
    price, // Price of the photographer's services
    picture, // Portrait of the photographer
    getUserCardDOM, // Function to create a DOM element of the photographer
  }; // Object with the photographer's data
}

