import { GalleryUtils } from "./module/utils.js";

// Configuration for the main gallery page
const galleryConfig = {
  sidebar: {
    buttonSelector: "#sidebar-btn",
    sidebarSelector: ".sidebar",
  },
  photoView: {
    containerSelector: ".content",
    onImageClick: (src) => {
      // Image click is handled by GalleryUtils internally via photoPreview
    },
  },
  photoPreview: {
    previewSelector: "#photo-preview",
    likeButtonSelector: "#like-btn",
    closeButtonSelector: "#close-btn",
  },
};

// Initialize the gallery utilities
const gallery = new GalleryUtils(galleryConfig);

// Photos data structure
const photos = {
  newyork: [
    "../Bilder/New York/New York1.jpg",
    "../Bilder/New York/New York2.jpg",
    "../Bilder/New York/New York3.jpg",
    "../Bilder/New York/New York4.jpg",
    "../Bilder/New York/New York5.jpg",
  ],
  nature: [
    "../Bilder/Nature/NatureBild1.jpg",
    "../Bilder/Nature/NatureBild2.jpg",
    "../Bilder/Nature/NatureBild3.jpg",
    "../Bilder/Nature/NatureBild4.jpg",
    "../Bilder/Nature/NatureBild5.jpg",
  ],
  animal: [
    "../Bilder/Animals/animal1.jpg",
    "../Bilder/Animals/animal2.jpg",
    "../Bilder/Animals/animal3.jpg",
    "../Bilder/Animals/animal4.jpg",
    "../Bilder/Animals/animal5.jpg",
  ],
};

// Function to filter and display photos based on search input
function photoFilter(filter) {
  const normalizedFilter = filter.split(" ").join("").toLowerCase();
  if (photos[normalizedFilter]) {
    gallery.renderPhotos(photos[normalizedFilter]);
  } else {
    // Show all photos if no specific category matches
    const allPhotos = [...photos.newyork, ...photos.nature, ...photos.animal];
    gallery.renderPhotos(allPhotos);
  }
}

// Initial load: display all photos
const allPhotos = [...photos.newyork, ...photos.nature, ...photos.animal];
gallery.renderPhotos(allPhotos);

// Search functionality
const searchFieldInput = document.getElementById("search-field");
searchFieldInput.addEventListener("input", () => {
  photoFilter(searchFieldInput.value);
});
