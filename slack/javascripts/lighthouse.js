(function(window, document) {
  'use strict';

  // Lighthouse Class: controls lighthouse view
  function LightHouse(containers, onCloseCallback) {
    this.mainContainer = containers.main_container; // main container where all lighthouse DOM (except for overlay) is housed
    this.imageTextContainer = containers.image_text_container; // container for image title

    // images are lazily loaded. There are two additional image containers for loading prev and next images in the background.
    // see showPrevPhoto/showNextPhoto to see how lazy loading and preloading works
    var imageContainers = containers.image_containers;
    this.prevImageContainer = imageContainers[0];
    this.currentImageContainer = imageContainers[1];
    this.nextImageContainer = imageContainers[2];

    this.nextImageButton = containers.next_image_button; // button to go to next image
    this.prevImageButton = containers.prev_image_button; // button to go to prev image
    this.closeImageButton = containers.close_image_button; // button to close lighthouse
    this.overlay = containers.overlay; // background overlay when lighthouse view is shown
    this.photosData = []; // raw data for photos (JSON objects)
    this.displayPhotos = []; // stores all LightHousePhoto instances

    // LightHousePhoto instances for current, prev, and next image
    this.prevImage = null;
    this.currentImage = null;
    this.nextImage = null;

    this.photoIndex = 0; // index of photo currently being shown

    // on init, hide prev and next image containers (so that only current image is being shown)
    this.prevImageContainer.setAttribute('style', 'display: none');
    this.nextImageContainer.setAttribute('style', 'display: none');

    // attach event handlers
    this.nextImageButton.addEventListener('click', this.showNextPhoto.bind(this));
    this.prevImageButton.addEventListener('click', this.showPrevPhoto.bind(this));
    this.closeImageButton.addEventListener('click', onCloseCallback);
  }

  // add new photos into lighthouse collection
  LightHouse.prototype.loadPhotos = function(photos) {
    var startingIndex = this.photosData.length;
    for (var photoIndex = startingIndex, array_index = 0; array_index < photos.length; array_index++, photoIndex++) {
      this.loadPhoto(photos[array_index], photoIndex);
    }
  };

  LightHouse.prototype.loadPhoto = function(photo, index) {
    this.displayPhotos.push(new LightHousePhoto(photo, index));
  };

  LightHouse.prototype.showPhotoAtIndex = function(index) {
    this.photoIndex = index;
    this.showPhotoAtCurrentIndex();
  };

  LightHouse.prototype.showPhotoAtCurrentIndex = function() {
    // set current, prev, and next image instances
    this.currentImage = this.displayPhotos[this.photoIndex];
    this.prevImage = this.photoIndex > 0 ? this.displayPhotos[this.photoIndex - 1] : null;
    this.nextImage = this.photoIndex < this.displayPhotos.length - 1 ? this.displayPhotos[this.photoIndex + 1] : null;

    // loadPhoto loads current image first, then onCurrentImageLoad loads surrounding
    this.currentImage.loadPhoto(this.currentImageContainer, this.onCurrentImageLoad.bind(this));
    this.setLighthouseText(this.currentImage.getTitle());

    // show lighthouse
    setTimeout(this.show.bind(this), 200);
  };

  // run once current image has loaded
  LightHouse.prototype.onCurrentImageLoad = function() {
    this.currentImage.show();
    this.loadSurroundImage();
  };

  // load next and prev images
  LightHouse.prototype.loadSurroundImage = function() {
    if (this.nextImage)
      this.nextImage.loadPhoto(this.nextImageContainer);
    if (this.prevImage)
      this.prevImage.loadPhoto(this.prevImageContainer);
  };

  LightHouse.prototype.setLighthouseText = function(text) {
    this.imageTextContainer.innerHTML = text;
  };

  // since prev, current, and next images have already been loaded, when we go to prev image
  // we just have to load in the new prev image. ei current becomes next, prev becomes current, and now prev is empty
  // so we have to load that in.
  LightHouse.prototype.showPrevPhoto = function() {
    if (this.photoIndex > 0) {
      // reset next image so that it rerenders
      if (this.nextImage) this.nextImage.clear();
      if (this.currentImage) this.currentImage.hide();

      this.photoIndex--;
      var tempPrevContainer = this.prevImageContainer;
      var tempCurrentContainer = this.currentImageContainer;
      this.prevImageContainer = this.nextImageContainer;
      this.currentImageContainer = tempPrevContainer;
      this.nextImageContainer = tempCurrentContainer;
      this.showPhotoAtCurrentIndex();
    }
  };

  // see above. It's just mirrored
  LightHouse.prototype.showNextPhoto = function() {
    if (this.photoIndex < this.displayPhotos.length - 1) {
      // reset prev image so that it rerenders
      if (this.prevImage) this.prevImage.clear();
      if (this.currentImage) this.currentImage.hide();

      this.photoIndex++;
      var tempPrevContainer = this.prevImageContainer;
      var tempCurrentContainer = this.currentImageContainer;
      this.prevImageContainer = tempCurrentContainer;
      this.currentImageContainer = this.nextImageContainer;
      this.nextImageContainer = tempPrevContainer;
      this.showPhotoAtCurrentIndex();
    }
  };

  LightHouse.prototype.showOverlay = function() {
    if (this.overlay.className.indexOf('active') == -1) {
      this.overlay.setAttribute('style', 'display: block');
      setTimeout(function() {
        this.overlay.className += ' active';
      }.bind(this), 30);
    }
  };

  LightHouse.prototype.hideOverlay = function() {
    this.overlay.className = this.overlay.className.replace(' active','');
    setTimeout(function() {
      this.overlay.setAttribute('style', 'display: none');
    }.bind(this), 300);
  };

  LightHouse.prototype.show = function() {
    if (this.mainContainer.className.indexOf('active') == -1) {
      this.mainContainer.setAttribute('style', 'display: block');
      setTimeout(function() {
        this.mainContainer.className += ' active';
      }.bind(this), 30);
      this.showOverlay();
    }
  };

  LightHouse.prototype.hide = function() {
    this.mainContainer.className = this.mainContainer.className.replace(' active', '');
    setTimeout(function() {
      this.mainContainer.setAttribute('style', 'display: none');
    }.bind(this), 300);
  };

  LightHouse.prototype.close = function() {
    // clear out all rendered imgs
    if (this.currentImage)
      this.currentImage.hide();
    if (this.prevImage)
      this.prevImage.hide();
    if (this.nextImage)
      this.nextImage.hide();
    this.hideOverlay();
    this.hide();
  };

  // clean out DOM and reset instance variables
  LightHouse.prototype.reset = function() {
    this.photosData = [];
    this.displayPhotos = [];
    this.prevImage = null;
    this.currentImage = null;
    this.nextImage = null;
    this.photoIndex = 0;
  };

  // LightHousePhoto class: controls the display image DOM Element inside the lighthouse
  function LightHousePhoto(photoData, index) {
    this.photo = photoData; // JSON object of the photo's data
    this.index = index; // index of image
    this.rendered = false; // has image been loaded?
  }

  LightHousePhoto.prototype.loadPhoto = function(container, onload) {
    if (!this.rendered) {
      container.src = Flickr.buildPhotoUrl(this.photo, 'large');
      this.rendered = true;
      this.DOMElement = container;
      if (onload) {
        this.DOMElement.onload = onload;
      }
    } else if (onload) { // run onload callback since image is already loaded
      onload();
    }
  };

  LightHousePhoto.prototype.clear = function() {
    this.rendered = false;
  };

  LightHousePhoto.prototype.show = function() {
    if (this.rendered)
      this.DOMElement.setAttribute('style', 'display: block');
  };

  LightHousePhoto.prototype.hide = function() {
    this.DOMElement.setAttribute('style', 'display: none');
    this.clear();
  };

  LightHousePhoto.prototype.getTitle = function() {
    return this.photo.title;
  };

  window.LightHouse = LightHouse;

})(window, document);
