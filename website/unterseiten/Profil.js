import { GalleryUtils } from "../module/utils.js";

// Configuration for the Profile page (only sidebar needed)
const galleryConfig = {
  sidebar: {
    buttonSelector: "#sidebar-btn",
    sidebarSelector: ".sidebar",
  },
  // Other components not needed for Profile page
};

// Initialize the gallery utilities (only sidebar will be active)
const gallery = new GalleryUtils(galleryConfig);
