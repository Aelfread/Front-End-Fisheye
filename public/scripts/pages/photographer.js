
/**
 * Import the function to open the carrousel modal for the photographer page
 * 
 * The function "openCarousel" is imported from the "carrousel.js" module. It is
 * used to open the carrousel modal when the user clicks on an image or video
 * on the photographer page. The function is called with the ID of the photographer
 * and the index of the image or video in the carrousel.
 */
import {openCarousel} from "./carrousel.js"; // Import the function to open the carrousel modal

/**
 * Retrieve the photographer ID from the URL params
 *
 * The URL params are expected to contain an "id" parameter, which
 * will be used to retrieve the corresponding photographer from the
 * JSON file. E.g. http://localhost:3000/photographer.html?id=123456789
 */
const urlParams = new URL(document.location).searchParams;

/**
 * The ID of the photographer to display on the page.
 * It is retrieved from the URL params (see above).
 */
let photographerId = urlParams.get("id"); // no default value

/**
 * Fetch the data of a specific photographer from the JSON file
 * 
 * This function fetches the data of a specific photographer from the JSON file.
 * The function uses the "photographerId" variable to specify which photographer
 * to fetch the data for. The "photographerId" is expected to be the ID of the
 * photographer, which is a number. The function returns an object with the
 * photographer and media data for that specific photographer.
 * 
 * @returns {Promise<Object>} - The promise resolves with an object containing
 * the photographer and media data for the specific photographer. The object
 * has the following shape:
 * { 
 *   photographers: Array<Object> - The photographer data
 *   media: Array<Object> - The media data
 * }
 */
async function getPhotographer() {
  // Fetch the data from the JSON file
  const response = await fetch("data/photographers.json");
  // Parse the data from the JSON file
  const data = await response.json();
  // Destructure the data to get the array of photographers and media
  const { photographers, media } = data;
  // Log the array of photographers in the console for debugging purposes
  //console.log(photographers);
  // Return the photographer and media data for the specific photographer
  return {
    // Spread the array of photographers to return a new array
    // with the same data but not the same reference as the original array
    photographers: [...photographers],
    // Spread the array of media to return a new array
    // with the same data but not the same reference as the original array
    media: [...media],
  };
}

export function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;
  /**
   * Function to create a DOM element of a photographer.
   * 
   * This function creates a DOM element for a photographer.
   * It creates a <div> element with the class "photograph-profile"
   * and appends the following elements inside it:
   * - A <h1> element with the photographer's name
   * - A <h2> element with the photographer's city and country
   * - A <p> element with the photographer's tagline
   * - A <p> element with the photographer's price per day
   * - A <a> element with a link to the photographer's profile page
   * 
   * @returns {HTMLElement} - The DOM element of the photographer
   */
  function getUserCardDOM() {
    const photographProfile = document.createElement("div");
    photographProfile.setAttribute("class", "photograph-profile");
    
    const h1 = document.createElement("h1");
    h1.textContent = name;
    const h2 = document.createElement("h2");
    h2.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.textContent = tagline;
    
    
    photographProfile.appendChild(h1);
    photographProfile.appendChild(h2);
    photographProfile.appendChild(p);
    
    
    // Fetch the data of the photographer from the JSON file
    fetch(`http://localhost:5500/data/photographers.json`);
    return photographProfile;
  }

  /**
   * Function to create a DOM element of a photographer's profile picture.
   * 
   * This function creates a DOM element with an <article> element
   * that contains the photographer's profile picture.
   * It also adds a <button> element as the first child of the <article>
   * to allow the user to contact the photographer.
   * 
   * @returns {HTMLElement} - The DOM element of the photographer's profile picture
   */
  function getImgUserCardDOM() {
    const btn = document.querySelector(".contact_button"); // Contact button
    const article = document.createElement("article"); // <article> element
    const img = document.createElement("img"); // <img> element
    
    img.setAttribute("src", picture); // Set the src attribute of the <img> element
    img.setAttribute("alt", name); // Set the alt attribute of the <img> element
    img.setAttribute("aria-label", `Photographe: ${name}`); // Set the aria-label attribute of the <img> element
    
    article.appendChild(img); // Add the <img> element to the <article> element
    article.insertBefore(btn, article.firstChild); // Add the <button> element before the <img> element
    
    return article; // Return the <article> element
  }

  /**
   * Object containing the data of a photographer.
   * @typedef {Object} Photographer
   * @property {string} name - The name of the photographer
   * @property {number} id - The id of the photographer
   * @property {string} city - The city of the photographer
   * @property {string} country - The country of the photographer
   * @property {string} tagline - The tagline of the photographer
   * @property {number} price - The price per day of the photographer
   * @property {string} portrait - The portrait of the photographer
   * @property {function(): HTMLElement} getUserCardDOM - Function to create a DOM element of a photographer
   * @property {function(): HTMLElement} getImgUserCardDOM - Function to create a DOM element of a photographer's profile picture
   */
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

/**
 * Function to display the data of a photographer on the page.
 * 
 * This function displays the data of a photographer on the page.
 * It gets the data of the photographer from the JSON file
 * and creates a DOM element for the photographer using the 
 * `photographerTemplate` function.
 * It then creates a DOM element for the photographer's profile picture
 * using the `photographerTemplate.getImgUserCardDOM` function.
 * It finally appends both elements to the ".photograph-header" element
 * on the page.
 * 
 * @param {Photographer[]} photographers - The data of the photographers
 * @returns {Promise<void>} - A Promise that resolves when the function is done
 */
async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographersToDisplay = photographers.filter(
    (photographer) => photographer.id == photographerId
  );
  // For each photographer to display
  photographersToDisplay.forEach((photographer) => {
    // Create a DOM element of the photographer
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    // Create a DOM element of the photographer's profile picture
    const imgUserCardDOM = photographerModel.getImgUserCardDOM();
    // Append the elements to the ".photograph-header" element
    photographersHeader.appendChild(imgUserCardDOM);
    photographersHeader.appendChild(userCardDOM);
  });
}

/**
 * Function to display the media of a photographer on the page.
 * 
 * This function displays the media of a photographer on the page.
 * It gets the media of the photographer from the JSON file
 * and creates a DOM element for each media using the `imagePhotographer` function.
 * It then appends the elements to the ".photograph_section" element
 * on the page.
 * 
 * @param {Media[]} medias - The media of the photographer
 * @returns {Promise<void>} - A Promise that resolves when the function is done
 */
async function displayDataMedia(medias) {
  const photographersSection = document.querySelector(".photograph_section");
  const mediaToDisplay = medias.filter(
    (media) => media.photographerId == photographerId
  );
  // For each media to display
  mediaToDisplay.forEach((media) => {
    // Create a DOM element of the media
    const imagePhotographerModel = imagePhotographer(media);
    const imagePhotographerDOM =
      imagePhotographerModel.getImagePhotographerDOM();
    // Append the element to the ".photograph_section" element
    photographersSection.appendChild(imagePhotographerDOM);
  });
}

export async function init() {
  const { photographers } = await getPhotographer();
  displayData(photographers);

  const { media } = await getPhotographer();
  displayDataMedia(media);
}

init();


let h2Likes = document.querySelector(".likes");
let totalLikes = 0;
/**
 * Function to create a DOM element of a media
 * @param {Media} data - The media to display
 * @returns {HTMLElement} - The DOM element of the media
 */
function imagePhotographer(data,index ) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const imageP = `assets/images/${image}`;
  const videoP = `assets/images/${video}`;

  /**
   * Get the DOM element of the media
   * @returns {HTMLElement} - The DOM element of the media
   */
  function getImagePhotographerDOM() {
    const article = document.createElement("article");
    const divCardContent = document.createElement("div");
    divCardContent.setAttribute("class", "card-content");
    const divCardTxt = document.createElement("div");
    divCardTxt.setAttribute("class", "card-txt");
    const spanLike = document.createElement("span");
    spanLike.setAttribute("class", "heart-icon");
    const iHeart = document.createElement("i");
    iHeart.setAttribute("class", "fa-regular fa-heart fa-2xl empty-heart");
    iHeart.setAttribute("aria-hidden", `true`);
    const iHeartLiked = document.createElement("i");
    iHeartLiked.setAttribute("class", "fa-solid fa-heart fa-2xl full-heart");
    iHeartLiked.setAttribute("aria-hidden", `true`);
    iHeartLiked.style.display = "none";

    const h3 = document.createElement("h3");
    h3.setAttribute("alt", title);
    h3.textContent = title;
    const p = document.createElement("p");
    p.textContent = `${likes}`;
    const p2 = document.createElement("p");
    p2.textContent = `${date}`;
    totalLikes += data.likes;
    if (h2Likes) {
      h2Likes.textContent = totalLikes.toString();
    }
    if (image) {
      const imagePhotographer = document.createElement("img");
      imagePhotographer.setAttribute("src", imageP);
      imagePhotographer.setAttribute("alt", title);
      imagePhotographer.setAttribute("aria-label", `Photographe: ${title}`);
      imagePhotographer.setAttribute("tabindex", 0);
      imagePhotographer.addEventListener("click", () => {
        openCarousel(imagePhotographer.getAttribute("src"));
      });
      imagePhotographer.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openCarousel(imagePhotographer.getAttribute("src"),index);
        }
      });

      article.appendChild(imagePhotographer);
    } else if (video) {
      const videoPhotographer = document.createElement("video");
      videoPhotographer.setAttribute("src", videoP);
      videoPhotographer.setAttribute("alt", title);
      videoPhotographer.setAttribute("aria-label", `Photographe: ${title}`);
      videoPhotographer.setAttribute("controls", true);
      videoPhotographer.setAttribute("tabindex", 0);

      videoPhotographer.addEventListener("click", () => {
        openCarousel(videoPhotographer.getAttribute("src"));
      });
      videoPhotographer.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openCarousel(videoPhotographer.getAttribute("src"), index);
        }
      });
      article.appendChild(videoPhotographer);
    }
    if (image) {
      fetch(`http://localhost:5500/data/photographers.json`);
    } else if (video) {
      fetch(`http://localhost:5500/data/photographers.json`);
    }
    spanLike.appendChild(iHeart);
    spanLike.appendChild(iHeartLiked);
    spanLike.appendChild(p);
    divCardTxt.appendChild(h3);

    divCardContent.appendChild(divCardTxt);
    divCardContent.appendChild(spanLike);
    article.appendChild(divCardContent);

    let likesCount = likes;
    let alreadyLiked = false;

    /**
     * Handle the click on the like button
     * Update the likes count and the total likes count
     * Update the like button appearance
     */
    const handleClick = () => {
      // If the user has not yet liked the photo
      if (!alreadyLiked) {
        // Increment the likes count
        likesCount++;
        // Increment the total likes count
        totalLikes++;
        // Update the likes count in the DOM
        p.textContent = `${likesCount}`;
        // Set the flag to true to prevent further likes
        alreadyLiked = true;
        // Hide the empty heart
        iHeart.style.display = "none";
        // Display the full heart
        iHeartLiked.style.display = "inline";
        // If there is a total likes count displayed
        if (h2Likes) {
          // Update the total likes count in the DOM
          h2Likes.textContent = totalLikes.toString();
        }
        // If the user has already liked the photo
      } else {
        // Decrement the likes count
        likesCount--;
        // Decrement the total likes count
        totalLikes--;
        // Update the likes count in the DOM
        p.textContent = `${likesCount}`;
        // Reset the flag to false to allow likes again
        alreadyLiked = false;
        // Display the empty heart
        iHeart.style.display = "inline";
        // Hide the full heart
        iHeartLiked.style.display = "none";
        // If there is a total likes count displayed
        if (h2Likes) {
          // Update the total likes count in the DOM
          h2Likes.textContent = totalLikes.toString();
        }
      }
    };
    spanLike.setAttribute("tabindex", 0);
    spanLike.addEventListener("click", handleClick);
    spanLike.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleClick();
      }
    });
    return article;

    // ajouter un video
  }

  /**
   * Object representing a media
   * @typedef {Object} ImagePhotographer
   * @property {number} id - The id of the media
   * @property {number} photographerId - The id of the photographer
   * @property {string} title - The title of the media
   * @property {string} imageP - The path of the image
   * @property {string} videoP - The path of the video
   * @property {number} likes - The number of likes of the media
   * @property {string} date - The date of the media
   * @property {number} price - The price of the media
   * @property {function(): HTMLElement} getImagePhotographerDOM - The function to get the DOM element of the media
   * @property {function(number): void} updateTotalLikes - The function to update the total likes
   */
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
    updateTotalLikes: (newLikes) => {
      totalLikes += newLikes - likes;
      // eslint-disable-next-line no-const-assign
      likes = newLikes;

      if (h2Likes) {
        h2Likes.textContent = totalLikes.toString();
      }
      // eslint-disable-next-line no-undef
      p.textContent = `${likes}`;
    },
  };
}
/**
 * Toggle the dropdown
 *
 * @description
 * Toggle the display of the dropdown menu
 * based on its current state
 */
function toggleDropdown() {
  // Get the dropdown menu
  const dropdownMenu = document.querySelector(".select-items");

  // Toggle the display of the dropdown menu
  dropdownMenu.classList.toggle("select-hide"); // hide or show the dropdown menu
}

/**
 * Handle changes to the dropdown
 *
 * @description
 * Fetch the data from the API, filter the media
 * based on the selected photographer and sort the media
 * based on the selected value, and update the DOM with the sorted media
 */
async function handleDropdownChange() {
  const { media } = await getPhotographer(); // Fetch the data from the API
  const selectedValue = document.querySelector(".select-selected").textContent; // Get the selected value

  // Filter the media based on the selected photographer
  const mediaOfSelectedPhotographer = media.filter(
    (medias) => medias.photographerId == photographerId
  );

  // Sort the media based on the selected value
  const sortedMediaToDisplay = sortMedia(
    mediaOfSelectedPhotographer,
    selectedValue
  );

  // Update the DOM with the sorted media
  updateDOMWithSortedMedia(sortedMediaToDisplay);
}


/**
 * Sort media based on selected value
 *
 * @description
 * Sort the media based on the selected value.
 * The media is sorted by popularity, date, or title.
 *
 * @param {Media[]} media - The media to sort
 * @param {string} selectedValue - The selected value for sorting
 * @returns {Media[]} - The sorted media
 */
function sortMedia(media, selectedValue) {
  // Sort the media based on the selected value
  return media.sort((a, b) => {
    if (selectedValue === "Popularité") {
      // Sort by popularity
      return b.likes - a.likes;
    } else if (selectedValue === "Date") {
      // Sort by date
      return new Date(b.date) - new Date(a.date);
    } else if (selectedValue === "Titre") {
      // Sort by title
      return a.title.localeCompare(b.title);
    }
  });
}



/**
 * Update the DOM with sorted media
 *
 * @description
 * Update the DOM with the sorted media.
 * This function is called when the user changes the sort order of the media
 * in the dropdown menu.
 * It gets the sorted media, creates a DOM element for each media using the
 * `imagePhotographer` function, and appends the elements to the
 * ".photograph_section" element on the page.
 *
 * @param {Media[]} sortedMedia - The sorted media
 */
function updateDOMWithSortedMedia(sortedMedia) {
  const photographersSection = document.querySelector(".photograph_section");

  // Clear the ".photograph_section" element
  photographersSection.innerHTML = "";

  // For each media to display
  sortedMedia.forEach((media) => {
    // Create a DOM element of the media
    const imagePhotographerModel = imagePhotographer(media);
    const imagePhotographerDOM =
      imagePhotographerModel.getImagePhotographerDOM();

    // Append the element to the ".photograph_section" element
    photographersSection.appendChild(imagePhotographerDOM);
  });
}


// Event listeners for the dropdown
document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the dropdown
  // Attach event listener to the dropdown
  let dropdown = document.querySelector(".custom-select");
  // Set tabindex attribute to make the dropdown accessible with keyboard
  // https://web.dev/tabindex-refactoring/
  if (dropdown) {
    dropdown.setAttribute("tabindex", "0");
  }
  // Toggle the dropdown when the user clicks on it
  if (dropdown) {
    dropdown.addEventListener("click", function (event) {
      toggleDropdown();
      // Stop the event from bubbling up to the document
      event.stopPropagation();
    });
  }
  // Open the dropdown when the user presses the Enter key
  // on the dropdown
  if (dropdown) {
    dropdown.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        toggleDropdown();
      }
    });
  }

  // Attach event listener to each dropdown item
  document.querySelectorAll(".select-item").forEach(function (item) {
    //item.setAttribute("tabindex", "0");
    /**
     * Handle click events on dropdown items
     *
     * @description
     * When a dropdown item is clicked, update the selected value in the
     * dropdown, and handle the change in dropdown value.
     *
     * @param {Object} event - The click event
     */
    item.addEventListener("click", function (event) {
      event.preventDefault();
      // Update the selected value in the dropdown
      document.querySelector(".select-selected").textContent = this.textContent;
      // Handle the change in dropdown value
      handleDropdownChange();
    });
    item.addEventListener("keydown", function (event) {
      /**
       * Handle Enter key press on dropdown items
       *
       * @description
       * When the user presses the Enter key on a dropdown item,
       * update the selected value in the dropdown, and handle the
       * change in dropdown value.
       *
       * @param {Object} event - The keydown event
       */
      if (event.key === "Enter") {
        // Prevent the default behavior of the Enter key
        event.preventDefault();
        // Update the selected value in the dropdown
        document.querySelector(".select-selected").textContent =
          this.textContent;
        // Handle the change in dropdown value
        handleDropdownChange();
      }
    });
  });
});

/**
 * Close the dropdown if the user clicks outside of it
 *
 * @description
 * If the user clicks outside of the dropdown menu, close the dropdown
 * by adding the "select-hide" class to the dropdown menu element.
 *
 * @param {Object} event - The click event
 */
document.addEventListener("click", function (event) {
  // Get the dropdown menu element
  const selectItems = document.querySelector(".select-items");
  // If the user clicks outside of the dropdown menu
  if (selectItems && !selectItems.contains(event.target)) {
    // Close the dropdown menu
    selectItems.classList.add("select-hide"); // Add the "select-hide" class
  }
});

/**
 * Handle keyboard events
 *
 * @description
 * Handle keyboard events (arrow keys) to navigate between focusable elements
 * on the page. This is useful for users who cannot use a mouse.
 */
document.addEventListener("keydown", function (event) {
  // Get all focusable elements on the page
  const focusableElements = document.querySelectorAll(
    '[tabindex="0"],.custom-select,.contact_button'
  );

  // Get the currently focused element
  const focusedElement = document.activeElement;

  // Get the current index of the focused element
  const currentIndex = Array.prototype.indexOf.call(
    focusableElements,
    focusedElement
  );

  let nextIndex;

  // Number of columns in the grid
  const columns = 3;
switch (event.key) {
  // Calculate the next index based on the key pressed
  // Up arrow
  // Move focus to the element above the currently focused element
  // in a grid with 3 columns
  // If the next index is less than 0, wrap around to the last element
  case "ArrowUp":
    nextIndex = currentIndex - columns;
    if (nextIndex < 0) {
      nextIndex += focusableElements.length;
    }
    break;
  // Down arrow
  // Move focus to the element below the currently focused element
  // in a grid with 3 columns
  // If the next index is greater than or equal to the length of the
  // focusableElements array, wrap around to the first element
  case "ArrowDown":
    nextIndex = currentIndex + columns;
    if (nextIndex >= focusableElements.length) {
      nextIndex -= focusableElements.length;
    }
    break;
  // Left arrow
  // Move focus to the element to the left of the currently focused element
  // If the next index is less than 0, wrap around to the last element
  case "ArrowLeft":
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex += focusableElements.length;
    }
    break;
  // Right arrow
  // Move focus to the element to the right of the currently focused element
  // If the next index is greater than or equal to the length of the
  // focusableElements array, wrap around to the first element
  case "ArrowRight":
    nextIndex = currentIndex + 1;
    if (nextIndex >= focusableElements.length) {
      nextIndex -= focusableElements.length;
    }
  }
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      if (currentIndex !== -1) {
        // Retrieve the correct media item using currentIndex
        const mediaItem = globalMediaData[currentIndex];
        
        // Check if mediaItem is defined and has an image or video property
        if (mediaItem && (mediaItem.image || mediaItem.video)) {
          // Construct the imgSrc string based on whether it's an image or video
          const imgSrc = mediaItem.image ? `assets/images/${mediaItem.image}` : `assets/images/${mediaItem.video}`;
          const imgAlt = mediaItem.title; // The alt text for the image or video
  
          // Call openCarousel with the correct string imgSrc
          await openCarousel(imgSrc, imgAlt, currentIndex, currentIndex); // Assuming currentIndex is the clickedMediaIndex
        } else {
          console.error('Media item not found or does not have an image/video property', currentIndex);
        }
      }
    }
  });

  // Make sure to focus the element if it's found
  if (nextIndex >= 0 && nextIndex < focusableElements.length) {
    focusableElements[nextIndex].focus();
  }
});

let globalMediaData = [];
