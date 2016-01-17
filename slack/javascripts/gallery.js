(function(window, document) {

  'use strict';

  // Gallery Class: controls grid view and lighthouse view
  function Gallery(gridContainers, lighthouseContainers, loadMoreButton) {
    this.lighthouse = new LightHouse(lighthouseContainers, this.hideLighthouseImage.bind(this));
    this.grid = new Grid(gridContainers, this.showLighthouseImage.bind(this));
    this.loadMoreButton = loadMoreButton;
    this.page = 1; // Flickr pages is 1 index (so first page is page 1)
    this.photos = [];
    this.queryText = '';

    //attach events
    // Load more images on click
    this.loadMoreButton.addEventListener('click', function() {
      this.loadImages(this.queryText);
    }.bind(this));
  }

  Gallery.prototype.showLighthouseImage = function(e, index) {
    this.lighthouse.showPhotoAtIndex(index);
    this.grid.hidePhotos();
    this.disableScroll();
  };

  Gallery.prototype.hideLighthouseImage = function() {
    this.lighthouse.close();
    this.grid.showPhotos();
    this.enableScroll();
  };

  Gallery.prototype.nextLighthouseImage = function() {
    this.lighthouse.showNextPhoto();
  };

  Gallery.prototype.prevLighthouseImage = function() {
    this.lighthouse.showPrevPhoto();
  };

  Gallery.prototype.disableScroll = function() {
    document.body.setAttribute('style', 'overflow: hidden');
  };

  Gallery.prototype.enableScroll = function() {
    document.body.setAttribute('style', 'overflow: ""');
  };

  Gallery.prototype.searchImages = function(queryText) {
    this.reset();
    this.queryText = queryText;
    this.loadImages(this.queryText);
  };

  // clear DOM Elements and instance variables from previous query
  Gallery.prototype.reset = function() {
    this.grid.reset();
    this.lighthouse.reset();
    this.queryText = '';
    this.page = 1;
  };

  Gallery.prototype.loadImages = function(queryText) {
    this.queryText = queryText;
    Flickr.searchForPhotos(this.queryText, this.handleLoadedImages.bind(this), this.handleLoadFail.bind(this), {page: this.page});
    this.page++; // increment page so next loadImages call gets next page of results
  };

  Gallery.prototype.handleLoadFail = function(data) {
    console.log('uh oh...', data);
  };

  Gallery.prototype.handleLoadedImages = function(data) {
    var photos = data.photos.photo; // unpack returned Json
    this.photos.push.apply(this.photos, photos); // add new images to the our existing collection of images
    //update grid and lighthouse with new images
    this.grid.loadPhotos(photos);
    this.lighthouse.loadPhotos(photos);
  };

  window.Gallery = Gallery;


})(window, document);
