(function(window, document) {
  'use strict';

  init();

  function init(gallery, searchbar) {
    var searchbar = document.getElementById('gallery-search');
    var loadingIcon = document.getElementById('gallery-loading-icon');
    var searchValue = '';
    var timer;
    var loadMoreButton = document.getElementById('gallery-load-more')
    var gallery = new Gallery(getGridContainers(), getLighthouseContainers(), loadMoreButton);

    // example search for blank state
    gallery.searchImages('Travel City');

    // hotkeys for lighthouse
    document.body.addEventListener('keydown', function(e) {
      if (document.getElementById('photo-lighthouse').className.indexOf('active') == -1)
        return;

      switch (e.which) {
        case 27: //esc
          gallery.hideLighthouseImage();
          break;
        case 37: //left
          gallery.prevLighthouseImage();
          break;
        case 39: //right
          gallery.nextLighthouseImage();
          break;
      }
    });

    // Wait half second after typing has stopped before querying text
    searchbar.addEventListener('keyup', function() {
      clearInterval(timer);
      timer = setTimeout(function() {
        searchImages(this.value);
      }.bind(this), 500);
    });

    function searchImages(value) {
      if (value && value != searchValue) {
        // show loading icon while searching
        loadingIcon.setAttribute('style', 'display: block');
        searchValue = value;
        gallery.searchImages(value);
        setTimeout(function() {
          loadingIcon.setAttribute('style', 'display: none');
        }, 1000);
      }
    }
  }

  // get DOM Elements that LightHouse will use
  function getLighthouseContainers() {
    return {
      main_container: document.getElementById('photo-lighthouse'),
      image_text_container: document.getElementById('photo-lighthouse-display-text'),
      image_containers: document.getElementsByClassName('photo-lighthouse-display-image'),
      next_image_button: document.getElementById('photo-lighthouse-next'),
      prev_image_button: document.getElementById('photo-lighthouse-prev'),
      close_image_button: document.getElementById('photo-lighthouse-close'),
      overlay: document.getElementById('photo-lighthouse-overlay')
    };
  }

  // get DOM Elements that Grid will use
  function getGridContainers() {
    return {
      photos_container: document.getElementById('photo-grid')
    };
  }

})(window, document);
