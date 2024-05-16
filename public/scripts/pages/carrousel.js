/**
 * Retrieve the photographer ID from the URL params
 *
 * The URL params are expected to contain an "id" parameter, which
 * will be used to retrieve the corresponding photographer from the
 * JSON file. E.g. http://localhost:3000/carrousel.html?id=123456789
 */
const urlParamsCarrousel = new URL(document.location).searchParams;

/**
 * The ID of the photographer to display in the carrousel. It is
 * retrieved from the URL params (see above).
 */
let photographerIdCarrousel = urlParamsCarrousel.get("id"); // no default value




/**
 * DOM elements related to the carrousel modal
 */
const imgP = document.getElementById("carousel"); // The <img> element of the carrousel
const videoP = document.getElementById("video"); // The <video> element of the carrousel
const rightBtn = document.getElementById("right-btn"); // The "right" button of the carrousel
const leftBtn = document.getElementById("left-btn"); // The "left" button of the carrousel
const main = document.getElementById("main"); // The <main> element of the page
const body = document.querySelector("body"); // The <body> element of the page


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
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
  const { photographers, media } = data;
  //console.log(photographers);
  return {
    photographers: [...photographers],
    media: [...media],
  };
}



/**
 * Global variable to store the photographers and media data
 * 
 * This variable is used to store the data fetched from the JSON file
 * when the page loads. It is an array of objects, where each object
 * represents a photographer and their media data.
 * 
 * When the page loads, the function "loadMediaData" is called, which
 * fetches the data from the JSON file and stores it in this variable.
 * 
 * The data stored in this variable is then used by other functions in
 * the code to display the carrousel of images and videos.
 */
let globalMediaData = []

/**
 * Fetch and store the media data for the carrousel when the page loads
 * 
 * This function is called when the page loads. It fetches the media data
 * for the carrousel from the JSON file and stores it in the global variable
 * "globalMediaData".
 * 
 * The function uses the "photographerIdCarrousel" variable to filter the data
 * and only store the media data for the photographer whose ID is stored in
 * that variable.
 */
async function loadMediaData() {
  const { media } = await getPhotographer();
  
  /**
   * Filter the media data to only include the media items for the
   * photographer whose ID is stored in the "photographerIdCarrousel"
   * variable. The "parseInt" function is used to convert the ID string to a
   * number.
   */
  globalMediaData = media.filter(item => item.photographerId === parseInt(photographerIdCarrousel, 10));
}

/**
 * When the page loads, fetch and store the media data for the carrousel
 * and set up the click listeners for the images and videos.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch and store the media data when the page loads
  await loadMediaData();

  // Set up the click listeners for the images and videos
  setupImageClickListeners();

  // Any other initialization code (e.g. hide the carrousel modal)
});



/**
 * Set up click listeners for the images and videos in the carrousel section
 * 
 * This function is called when the page loads. It sets up event listeners for
 * the images and videos in the carrousel section. When the user clicks on an
 * image or video, the function finds the corresponding media item within the
 * mediaItemsForPhotographer array and opens the carousel at that index. If the
 * media item is not found, the function does nothing.
 * 
 * The function uses the "medias" parameter which is the media data for the
 * photographer whose carrousel is being displayed. This parameter is passed
 * from the "openCarousel" function.
 * 
 * The function logs a message to the console when an image or video is
 * clicked, and logs a message to the console if the media item is not found.
 * 
 * @param {Array} medias - The media data for the photographer whose carrousel is being displayed
 */
function setupImageClickListeners(medias) {
  /**
   * Select the section of the page that contains the images and videos
   * 
   * This selector is used to find the images and videos in the carrousel section
   * of the page. The images and videos are later looped over to set up click
   * listeners for them.
   */
  const photographersSection = document.querySelector(".photograph_section"); // Select the section of the page that contains the images and videos
  /**
   * Get all the images in the carrousel section
   * 
   * This function is called when the page loads. It finds all the images in the
   * carrousel section of the page and loops over them to set up click listeners
   * for them. The click listeners will open the carrousel at the index of the
   * image/video that was clicked.
   */
  const images = photographersSection.querySelectorAll("img"); // Get all the images in the carrousel section
  /**
   * Get all the videos in the carrousel section
   * 
   * This function is called when the page loads. It finds all the videos in the
   * carrousel section of the page and loops over them to set up click listeners
   * for them. The click listeners will open the carrousel at the index of the
   * image/video that was clicked.
   */
  const videos = photographersSection.querySelectorAll("video"); // Get all the videos in the carrousel section
  /**
   * Set up a click listener for each image in the carrousel
   */

  
  images.forEach((image,index) => {
    /**
     * Set up a click listener for each image in the carrousel
     * 
     * This function is called when the page loads. It sets up event listeners for
     * each image in the carrousel section of the page. When the user clicks on an
     * image, the function finds the corresponding media item within the
     * mediaItemsForPhotographer array and opens the carousel at that index. If the
     * media item is not found, the function logs a message to the console.
     */
    image.addEventListener("click", (event) => {
      
      event.preventDefault(); // Prevent the default action if they are wrapped in <a> tags
      console.log(
        `Image at index ${index} clicked, attempting to open carousel.`
      );
      // Find the index within mediaItemsForPhotographer array
      /**
       * Find the media item in the mediaItemsForPhotographer array that matches the
       * image that was clicked. The media item is found by comparing the image src
       * attribute with the image property of the media item. The src attribute of
       * the image is split on "/" and the last item is used to match the image
       * property of the media item.
       */
      const clickedMediaItem = medias.find(media => media.image === image.getAttribute("src").split('/').pop());
      /**
       * Find the index of the media item in the mediaItemsForPhotographer array. If
       * the media item is not found, the index will be -1.
       */
      const clickedMediaIndex = medias.indexOf(clickedMediaItem);
      
      // If item found, open the carousel at that index
      /**
       * If the media item is found, open the carousel at the index of the image/video
       * that was clicked. The openCarousel function is defined in carrousel.js and
       * takes the index of the media item to open as its only parameter.
       */
      if (clickedMediaItem) {
        openCarousel.updateCarousel(clickedMediaIndex);
      } else {
        /**
         * If the media item is not found, log a message to the console. This should
         * never happen, but is included as a failsafe just in case.
         */
        console.log(`Media item not found for image at index ${index}`);
      }
      
    });
    
  });
  
  videos.forEach((video,index) => {
    /**
     * Set up a click listener for each video in the carrousel
     * 
     * This function is called when the page loads. It sets up event listeners for
     * the videos in the carrousel section. When the user clicks on a video, the
     * function finds the corresponding media item within the mediaItemsForPhotographer
     * array and opens the carousel at that index. If the media item is not found,
     * the function does nothing.
     * 
     * The function uses the "medias" parameter which is the media data for the
     * photographer whose carrousel is being displayed. This parameter is passed
     * from the "setupImageClickListeners" function.
     * 
     * The function logs a message to the console if the media item is not found.
     */
    video.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default action if they are wrapped in <a> tags
      console.log(
        `Video at index ${index} clicked, attempting to open carousel.`
      );
      // Find the index within mediaItemsForPhotographer array
      /**
       * Find the media item in the mediaItemsForPhotographer array that corresponds
       * to the clicked video. The media item is found by matching the src attribute
       * of the video element to the video property of the media item.
       */
      const clickedMediaItem = medias.find(media => media.video === video.getAttribute("src").split('/').pop());
      /**
       * Get the index of the media item in the mediaItemsForPhotographer array. If
       * the media item is not found, the index will be -1.
       */
      const clickedMediaIndex = medias.indexOf(clickedMediaItem);
      
      // If item found, open the carousel at that index
      if (clickedMediaItem) {
        /**
         * Open the carousel at the index of the video that was clicked.
         * The openCarousel function is defined in carrousel.js and takes the index
         * of the media item to open as its only parameter.
         */
        openCarousel(video.getAttribute("src"), clickedMediaItem.title,clickedMediaIndex);
      } else {
        console.log(`Media item not found for video at index ${index}`);
      }
      
    });
    
  });
}


/**
 * Open the carrousel modal for the photographer and display the corresponding
 * media item at the given index. If the media item is not found, the function
 * does nothing.
 * 
 * @param {String} imgSrc - The src attribute of the image that was clicked
 * @param {String} imgAlt - The alt attribute of the image that was clicked
 * @param {Number} index - The index of the image or video in the carrousel
 * @param {Number} clickedMediaIndex - The index of the media item in the media
 * data array for the photographer
 */
export async function openCarousel(imgSrc, imgAlt, index, clickedMediaIndex) {
  //console.log('Global media data :', globalMediaData);
  const { media } = await getPhotographer(); // Get the media data for the photographer
  let imgFileName = imgSrc.split("/").pop(); // Get the filename of the image that was clicked
  //console.log(imgFileName);
// Get the filename of the image that was clicked
  const mediaItem = globalMediaData.find(item => // Find the media item in the media data array that corresponds to the clicked image
    (item.image && item.image.includes(imgFileName)) || (item.video && item.video.includes(imgFileName))
  );
  const carousel = createCarousel(photographerIdCarrousel, media, clickedMediaIndex); // Create the carrousel
  
  carousel.update(); // Update the carrousel
  //console.log('mediaItem :', mediaItem);
  // Ensure the modal is visible before trying to access the title element
  const carrouselModal = document.getElementById("carrousel_modal");
  carrouselModal.style.display = "block"; // Or the appropriate method to show your modal
  
  if (mediaItem) { // If the media item is found
    
    const carouselImg = document.getElementById("carousel"); // Ensure this is the correct ID for the image element
    const carouselVideo = document.getElementById("video"); // Ensure this is the correct ID for the video element
    
    if (mediaItem.image) { // If the media item is an image
      carouselImg.style.display = 'block';
      carouselVideo.style.display = 'none';
      carouselImg.src = `assets/images/${mediaItem.image}`; // Set the src attribute of the image
      carouselImg.alt = mediaItem.title || imgAlt; // Set the alt attribute of the image
    } else if (mediaItem.video) { // If the media item is a video
      carouselImg.style.display = 'none';
      carouselVideo.style.display = 'block';
      carouselVideo.src = `assets/images/${mediaItem.video}`; // Set the src attribute of the video
      carouselVideo.controls = true; // Enable controls on the video
      carouselVideo.alt = mediaItem.title || imgAlt; // Set the alt attribute of the video
    }
    
  }
  
    
      
      
      const carouselTitle = document.getElementById("carousel-title"); // Get the title element
      // Update the element as needed
      if (carouselTitle) {
        carouselTitle.textContent = mediaItem.title;
      }
      
      //console.log('carouselTitle element:', carouselTitle); // Check if the element is found
    

  // Assuming you already have the photographerId available
  const carrouselModel = document.getElementById("carrousel_modal");
  carrouselModel.style.display = "block";
  main.setAttribute("aria-hidden", "true"); // Hide the main content
  carrouselModel.setAttribute("aria-hidden", "false"); // Show the carrousel modal
  body.setAttribute("class", "no-scroll"); // Disable scrolling on the body
  carrouselModel.setAttribute("role", "dialog"); // Set the role of the carrousel modal
  carrouselModel.setAttribute("aria-describedby", "Carrousel du photographe"); // Set the aria-describedby attribute
  rightBtn.focus(); // Focus the right button in the carrousel
  document.addEventListener("keydown", (event) => { // Add a keydown event listener
    if (event.key === "Escape") { // If the Escape key is pressed
      closeCarousel(); // Close the carrousel
    }
  });
  const modalClosebtn = document.getElementById("modalClosebtnn"); // Get the close button in the carrousel modal
  modalClosebtn.addEventListener("click", () => { // Add a click event listener to the close button
    closeCarousel(); // Close the carrousel
  });
  const focusableElements = document.querySelectorAll(
    '[tabindex="0"],.custom-select,.contact_button' // Get all focusable elements in the carrousel modal
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "-1"); // Set the tabindex attribute of all focusable elements to -1
  });

  
}


/**
 * Load the media data for the photographers and setup the image click
 * listeners.
 */
loadMediaData().then(setupImageClickListeners); // Load the media data and setup the image click listeners

/**
 * Close the carrousel modal
 * 
 * This function is called when the user clicks the close button in the
 * carrousel modal or presses the Escape key while the modal is open.
 * It closes the modal and resets the tabindex of focusable elements.
 */
function closeCarousel() {
  const carrouselModel = document.getElementById("carrousel_modal"); // Get the modal element
  carrouselModel.style.display = "none"; // Hide the modal
  main.setAttribute("aria-hidden", "false"); // Make the main content visible
  carrouselModel.setAttribute("aria-hidden", "true"); // Hide the modal from assistive technologies
  body.removeAttribute("class", "no-scroll"); // Enable scrolling on the body
  carrouselModel.setAttribute("role", "none"); // Remove the role of the modal
  carrouselModel.setAttribute("aria-describedby", "none"); // Remove the aria-describedby attribute
  leftBtn.focus(); // Focus the left button in the carrousel
  document.removeEventListener("keydown", closeCarouselOnEscapeKey); // Remove the keydown event listener
  const customSelect = document.querySelector(".custom-select"); // Get the custom select element
  customSelect.setAttribute("tabindex", "0"); // Reset the tabindex of the custom select
  const contactButton = document.querySelector(".contact_button"); // Get the contact button element
  contactButton.setAttribute("tabindex", "0"); // Reset the tabindex of the contact button
  // Reset tabindex for focusable elements
  const focusableElements = document.querySelectorAll(
    '[tabindex="-1"], .custom-select, .contact_button'
  );
  focusableElements.forEach((element) => {
    element.setAttribute("tabindex", "0"); // Reset the tabindex of the element
  });
}

/**
 * Close the carrousel modal when the Escape key is pressed
 * 
 * This function is called when the user presses the Escape key while the
 * modal is open. It closes the modal.
 * 
 * @param {KeyboardEvent} event - The keyboard event
 */
function closeCarouselOnEscapeKey(event) {
  if (event.key === "Escape") { // If the Escape key is pressed
    closeCarousel(); // Close the carrousel
  }
}


// Call this function after the images are added to the DOM


function createCarousel(photographerId, medias,initialIndex = 0) {
  if (!Array.isArray(medias)) {
    throw new Error("medias is not an array");
  }
  let currentPosition = initialIndex;
  let mediaItemsForPhotographer = medias.filter(
    (item) => item.photographerId == photographerId
  );
  
  /**
   * Update the carrousel modal with the current media item
   * 
   * This function is called when the user clicks the "next" or "previous" buttons
   * in the carrousel modal, or when the carrousel is first opened. It updates
   * the carrousel modal with the current media item. The function sets the
   * src attribute of the image or video element, and sets the text content of
   * the title element in the modal.
   */
  function updateCarousel() {
    
    const mediaItem = mediaItemsForPhotographer[currentPosition]; // Get the current media item
    const { image, video } = mediaItem; // Get the image and video properties of the media item
    const divCardTxt = document.querySelector(".card-txt-modal"); // Get the element that contains the title element
    divCardTxt.innerHTML = ""; // Reset the inner HTML of the element
    const h3 = document.createElement("h3"); // Create a new h3 element
    h3.setAttribute("id", "carousel-title"); // Set the id attribute of the h3 element
    h3.textContent = mediaItem.title; // Set the text content of the h3 element to the title of the media item

    

    if (image) { // If the media item is an image
      imgP.setAttribute("src", "/assets/images/" + image); // Set the src attribute of the image element
      imgP.setAttribute("alt", mediaItem.title); // Set the alt attribute of the image element
      imgP.style.display = "block"; // Display the image element
      videoP.style.display = "none"; // Hide the video element
    } else if (video) { // If the media item is a video
      videoP.setAttribute("src", "/assets/images/" + video); // Set the src attribute of the video element
      videoP.setAttribute("controls", true); // Set the controls attribute of the video element
      videoP.style.display = "block"; // Display the video element
      imgP.style.display = "none"; // Hide the image element
    }
    divCardTxt.appendChild(h3); // Add the h3 element to the element that contains the title element
  }

  /**
   * Move to the next media item in the carrousel.
   *
   * This function is called when the user clicks the "next" button in the
   * carrousel modal. It updates the current position of the carrousel and
   * updates the modal with the next media item.
   */
  function moveRight() {
    currentPosition = (currentPosition + 1) % mediaItemsForPhotographer.length;
    // Calculate the next position in the array of media items for the current photographer
    // and wrap around to the beginning of the array if necessary
    //console.log(currentPosition);
    // Log the new position of the carrousel
    updateCarousel();
    // Update the carrousel modal with the new media item
  }


  /**
   * Move to the previous media item in the carrousel.
   *
   * This function is called when the user clicks the "previous" button in the
   * carrousel modal. It updates the current position of the carrousel and
   * updates the modal with the previous media item.
   */
  function moveLeft() {
    currentPosition =
      (currentPosition - 1 + mediaItemsForPhotographer.length) %
      mediaItemsForPhotographer.length;
      // Calculate the previous position in the array of media items for the current photographer
      // and wrap around to the end of the array if necessary
      //.log(currentPosition);
      // Log the new position of the carrousel
      updateCarousel();
      // Update the carrousel modal with the new media item
  }

  updateCarousel(); // Initialize carousel with the first image

  /**
   * Returns an object with methods to control the carrousel:
   * - next: moves to the next media item in the carrousel
   * - previous: moves to the previous media item in the carrousel
   * - update: updates the carrousel modal with the current media item
   * @returns {Object} An object with methods to control the carrousel
   */
  return {
    /**
     * Moves to the next media item in the carrousel
     */
    next: moveRight,
    /**
     * Moves to the previous media item in the carrousel
     */
    previous: moveLeft,
    /**
     * Updates the carrousel modal with the current media item
     */
    update: updateCarousel,
  };

}

// Initialize the carrousel when the DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Call getPhotographers to get media
    const { media } = await getPhotographer();
    // Check if the media is an array
    if (!Array.isArray(media)) {
      throw new Error("media is not an array");
    }
    // Create a carrousel with the media and the id of the photographer
    const carousel = createCarousel(photographerIdCarrousel, media);

    // Get the right and left buttons
    const rightBtn = document.getElementById("right-btn");
    const leftBtn = document.getElementById("left-btn");

    // Add event listeners to the buttons
    rightBtn.addEventListener("click", carousel.next);
    leftBtn.addEventListener("click", carousel.previous);

    // Add event listener to the document to handle keyboard events
    document.addEventListener("keydown", (event) => {
      // If the user presses the left arrow key
      if (event.key === "ArrowLeft") {
        // Move to the previous media item in the carrousel
        carousel.previous();
      } else if (event.key === "ArrowRight") {
        // If the user presses the right arrow key
        // Move to the next media item in the carrousel
        carousel.next();
      }
    });
  } catch (error) {
    // Log the error
    console.error(error);
  }
});
