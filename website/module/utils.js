/**
 * Scalable Gallery Utilities Module
 *
 * This module provides reusable, configurable utilities for a photo gallery application.
 * Designed with scalability in mind: modular, extensible, and maintainable.
 *
 * Principles followed:
 * - Single Responsibility: Each class/method has one clear purpose.
 * - Open/Closed: Easy to extend without modifying existing code.
 * - Dependency Injection: Dependencies passed via config objects.
 * - DRY: No code duplication.
 * - Encapsulation: Internal state and logic hidden.
 * - Error Handling: Robust checks for DOM elements and data.
 * - Configurability: Flexible setup via options.
 * - Separation of Concerns: UI, logic, and storage separated.
 */

/**
 * Storage Manager for liked photos using localStorage.
 * Handles persistence and retrieval of liked photo data.
 */
class StorageManager {
  constructor(storageKey = "likedPhotos") {
    this.storageKey = storageKey;
  }

  getLikedPhotos() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch (error) {
      console.error("Error retrieving liked photos:", error);
      return [];
    }
  }

  setLikedPhotos(photos) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(photos));
    } catch (error) {
      console.error("Error saving liked photos:", error);
    }
  }

  isLiked(src) {
    return this.getLikedPhotos().includes(src);
  }

  toggleLike(src) {
    const liked = this.getLikedPhotos();
    const index = liked.indexOf(src);
    if (index > -1) {
      liked.splice(index, 1);
      this.setLikedPhotos(liked);
      return false; // Now unliked
    } else {
      liked.push(src);
      this.setLikedPhotos(liked);
      return true; // Now liked
    }
  }
}

/**
 * Sidebar Manager for toggle functionality.
 * Handles sidebar open/close with animations.
 */
class SidebarManager {
  constructor(config) {
    this.button = this._getElement(config.buttonSelector);
    this.sidebar = this._getElement(config.sidebarSelector);
    this.activeClass = config.activeClass || "active";
    this.init();
  }

  _getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  init() {
    if (this.button && this.sidebar) {
      this.button.addEventListener("click", () => this.toggle());
    }
  }

  toggle() {
    this.sidebar.classList.toggle(this.activeClass);
  }

  open() {
    this.sidebar.classList.add(this.activeClass);
  }

  close() {
    this.sidebar.classList.remove(this.activeClass);
  }
}

/**
 * Photo View Manager for rendering image galleries.
 * Creates and manages image elements in a container.
 */
class PhotoViewManager {
  constructor(config) {
    this.container = this._getElement(config.containerSelector);
    this.imageClass = config.imageClass || "img";
    this.onImageClick = config.onImageClick || (() => {});
  }

  _getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  renderPhotos(photoPaths) {
    if (!Array.isArray(photoPaths)) {
      console.error("Photo paths must be an array");
      return;
    }

    this.clear();
    photoPaths.forEach((path) => {
      const img = document.createElement("img");
      img.classList.add(this.imageClass);
      img.src = path;
      img.dataset.path = path;
      img.addEventListener("click", () => this.onImageClick(path));
      this.container.appendChild(img);
    });
  }

  clear() {
    this.container.innerHTML = "";
  }

  removePhoto(path) {
    const img = this.container.querySelector(`img[data-path="${path}"]`);
    if (img) {
      img.remove();
    }
  }
}

/**
 * Photo Preview Manager for modal image viewing.
 * Handles preview display, like button state, and interactions.
 */
class PhotoPreviewManager {
  constructor(config) {
    this.previewContainer = this._getElement(config.previewSelector);
    this.likeButton = this._getElement(config.likeButtonSelector);
    this.closeButton = this._getElement(config.closeButtonSelector);
    this.storageManager = config.storageManager || new StorageManager();
    this.onLikeToggle = config.onLikeToggle || (() => {});
    this.init();
  }

  _getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  init() {
    this.closeButton.addEventListener("click", () => this.close());
    this.likeButton.addEventListener("click", () => this.toggleLike());
    this.previewContainer.addEventListener("click", (event) => {
      if (event.target === this.previewContainer) {
        this.close();
      }
    });
  }

  show(src) {
    const img = document.createElement("img");
    img.src = src;
    img.id = "preview-img";
    this.previewContainer.appendChild(img);
    this.previewContainer.style.display = "flex";
    this.updateLikeButton(src);
  }

  close() {
    this.previewContainer.innerHTML = "";
    this.previewContainer.style.display = "none";
    // Recreate buttons after clearing
    this._recreateButtons();
  }

  _recreateButtons() {
    const closeBtn = document.createElement("button");
    closeBtn.id = "close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => this.close());

    const likeBtn = document.createElement("button");
    likeBtn.id = "like-btn";
    likeBtn.innerHTML = "&hearts;";
    likeBtn.addEventListener("click", () => this.toggleLike());

    this.previewContainer.appendChild(closeBtn);
    this.previewContainer.appendChild(likeBtn);
    this.closeButton = closeBtn;
    this.likeButton = likeBtn;
  }

  updateLikeButton(src) {
    if (this.storageManager.isLiked(src)) {
      this.likeButton.classList.add("active");
    } else {
      this.likeButton.classList.remove("active");
    }
  }

  toggleLike() {
    const img = this.previewContainer.querySelector("#preview-img");
    if (!img) return;

    const src = img.src;
    const isNowLiked = this.storageManager.toggleLike(src);
    this.updateLikeButton(src);

    this.onLikeToggle({
      src,
      isLikedNow: isNowLiked,
      allLiked: this.storageManager.getLikedPhotos(),
    });
  }
}

/**
 * Main Gallery Utilities Factory
 * Creates and configures all managers with a single config object.
 */
export class GalleryUtils {
  constructor(config = {}) {
    this.config = {
      sidebar: {
        buttonSelector: config.sidebar?.buttonSelector || "#sidebar-btn",
        sidebarSelector: config.sidebar?.sidebarSelector || ".sidebar",
        activeClass: config.sidebar?.activeClass || "active",
      },
      photoView: {
        containerSelector: config.photoView?.containerSelector || "#content",
        imageClass: config.photoView?.imageClass || "img",
        onImageClick: config.photoView?.onImageClick || (() => {}),
      },
      photoPreview: {
        previewSelector:
          config.photoPreview?.previewSelector || "#photo-preview",
        likeButtonSelector:
          config.photoPreview?.likeButtonSelector || "#like-btn",
        closeButtonSelector:
          config.photoPreview?.closeButtonSelector || "#close-btn",
        onLikeToggle: config.photoPreview?.onLikeToggle || (() => {}),
      },
      storage: config.storage || {},
    };

    this.storageManager = new StorageManager(this.config.storage.key);
    this.sidebarManager = new SidebarManager(this.config.sidebar);
    this.photoViewManager = new PhotoViewManager({
      ...this.config.photoView,
      onImageClick: (src) => this.handleImageClick(src),
    });
    this.photoPreviewManager = new PhotoPreviewManager({
      ...this.config.photoPreview,
      storageManager: this.storageManager,
      onLikeToggle: this.config.photoPreview.onLikeToggle,
    });
  }

  handleImageClick(src) {
    this.photoPreviewManager.show(src);
  }

  // Public API methods
  renderPhotos(paths) {
    this.photoViewManager.renderPhotos(paths);
  }

  clearPhotos() {
    this.photoViewManager.clear();
  }

  removePhoto(path) {
    this.photoViewManager.removePhoto(path);
  }

  getLikedPhotos() {
    return this.storageManager.getLikedPhotos();
  }

  toggleSidebar() {
    this.sidebarManager.toggle();
  }
}
