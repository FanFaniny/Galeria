import { GalleryUtils } from "../module/utils.js";

// Configuration for the "Your Photos" (liked photos) page
const galleryConfig = {
  sidebar: {
    buttonSelector: "#sidebar-btn",
    sidebarSelector: ".sidebar",
  },
  photoView: {
    containerSelector: "#content",
    onImageClick: (src) => {
      // Image click handled by GalleryUtils
    },
  },
  photoPreview: {
    previewSelector: "#photo-preview",
    likeButtonSelector: "#like-btn",
    closeButtonSelector: "#close-btn",
    onLikeToggle: ({ src, isLikedNow, allLiked }) => {
      // Remove unliked photo from gallery
      if (!isLikedNow && src) {
        gallery.removePhoto(src);
      }
      // Show empty message if no liked photos left
      if (allLiked.length === 0) {
        const content = document.getElementById("content");
        content.innerHTML = "<h2>it's still empty there...</h2>";
      }
    },
  },
};

// Initialize the gallery utilities
const gallery = new GalleryUtils(galleryConfig);

// Get and display liked photos
const likedPhotos = gallery.getLikedPhotos();
if (likedPhotos.length === 0) {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>it's still empty there...</h2>";
} else {
  gallery.renderPhotos(likedPhotos);
}
