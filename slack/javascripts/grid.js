(function(window, document) {
  'use strict';

  // Grid Class: controls the grid view
  function Grid(containers, photoOnClick) {
    this.gridPhotos = []; // hold GridPhoto instances
    this.photosContainer = containers.photos_container; // where to insert photo DOM elements
    this.photoOnClick = photoOnClick; // callback when a photo is clicked on
  }

  // reset instance variables and clean out DOM
  Grid.prototype.reset = function() {
    this.gridPhotos = [];
    this.photosContainer.innerHTML = '';
  };

  // add photos to the Grid and DOM
  Grid.prototype.loadPhotos = function(photos) {
    var startingIndex = this.gridPhotos.length;
    for (var photoIndex = startingIndex, array_index = 0; array_index < photos.length; array_index++, photoIndex++) {
      this.loadPhoto(photos[array_index], photoIndex);
    }
  };

  // create GridPhoto instance and add it to the DOM
  Grid.prototype.loadPhoto = function(photoData, index) {
    var photo = new GridPhoto(photoData, index, this.photoOnClick);
    this.gridPhotos.push(photo);
    var PhotoDOMElement = photo.createDomElement();
    this.appendPhoto(PhotoDOMElement);
  };


  // Add photo to the DOM
  Grid.prototype.appendPhoto = function(PhotoDOMElement) {
    this.photosContainer.appendChild(PhotoDOMElement);
  };

  Grid.prototype.showPhotos = function() {
    for (var i = 0; i < this.gridPhotos.length; i++) {
      this.gridPhotos[i].show();
    }
  };

  Grid.prototype.hidePhotos = function() {
    for (var i = 0; i < this.gridPhotos.length; i++) {
      this.gridPhotos[i].hide();
    }
  };

  // GridPhoto class: controls individual photo inside Grid
  function GridPhoto(photoData, index, onClick) {
    this.photo = photoData; // returned JSON object from Flickr query. Contains all info about the picture
    this.index = index; // photo number in the DOM (0 index is first photo in the grid container and so on)
    this.DOMElement = null; // the matching DOM Element to this instance
    this.onClick = clickHandler(this); // Callback when the DOM Element is clicked

    // wrapper function to make event and index available to function
    function clickHandler(photoInstance) {
      return function(e) {
        onClick(e, photoInstance.index);
      };
    }
  }

  // Build DOM Element
  GridPhoto.prototype.createDomElement = function() {
    var img_container = document.createElement('DIV');
    var img = document.createElement('IMG');
    img.src = Flickr.buildPhotoUrl(this.photo, null);
    img_container.appendChild(img);
    img_container.addEventListener('click', this.onClick);
    img_container.className = 'grid-photo';
    img.onload = this.show.bind(this); // show photo once it has loaded
    this.DOMElement = img_container;
    return this.DOMElement;
  };

  GridPhoto.prototype.show = function(e) {
    this.DOMElement.className = this.DOMElement.className.replace(' shrink','').replace(' active','');
    setTimeout(function() {
      this.DOMElement.className += ' active';
    }.bind(this), 50);
  };

  GridPhoto.prototype.hide = function(e) {
    this.DOMElement.className += ' shrink';
  };

  window.Grid = Grid;


})(window, document);
