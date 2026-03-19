import { GalleryUtils } from "../module/utils.js";

// Configuration for the FAQ page (only sidebar needed)
const galleryConfig = {
  sidebar: {
    buttonSelector: "#sidebar-btn",
    sidebarSelector: ".sidebar",
  },
  // Other components not needed for FAQ page
};

// Initialize the gallery utilities (only sidebar will be active)
const gallery = new GalleryUtils(galleryConfig);
