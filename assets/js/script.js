$(document).ready(function() {


/* script for scrolling through work */
	

  $("#nav-left").click(function() {
    var current_margin = parseInt($('.work-slider').css('margin-left').replace("px", ""))
    if (current_margin >= 200) {
      return false;
    }
    else {
      var new_margin = current_margin + 800;
      $(".work-slider").css("margin-left", new_margin)
      if (new_margin >= 200) {
      	setTimeout(function() {
			$("#nav-left").hide();
      	}, 600);
        $("#nav-left").removeClass("pursuit-nav-active");
      }
      else {
      	setTimeout(function() {
			$("#nav-left").show();
			$("#nav-right").show();
        	setTimeout(function() {
			$("#nav-left").addClass("pursuit-nav-active");
        	$("#nav-right").addClass("pursuit-nav-active");
      		}, 50);
      	}, 300);
      }
    }
  });

  $("#nav-right").click(function() {
    var current_margin = parseInt($('.work-slider').css('margin-left').replace("px", ""))
    if (current_margin >= 3200) {
      return false;
    }
    else {
      var new_margin = current_margin - 800;
      $(".work-slider").css("margin-left", new_margin)
      if (new_margin <= -2200) {
      	setTimeout(function() {
			$("#nav-right").hide();
      	}, 600);
        $("#nav-right").removeClass("pursuit-nav-active");
      }
      else {
      	setTimeout(function() {
			$("#nav-left").show();
			$("#nav-right").show();
        	setTimeout(function() {
			$("#nav-left").addClass("pursuit-nav-active");
        	$("#nav-right").addClass("pursuit-nav-active");
      		}, 50);
      	}, 300);
      }
    }
  });

  /* script for moving between headers */

  $("#projects").click(function() {
  	var projects = $("#projects")
  	var skills = $("#skills")
  	if (projects.hasClass("adventure-text-active")) {
  		return false;
  	}
  	else {
  		projects.addClass("adventure-text-active");
  		skills.removeClass("adventure-text-active");
  		$("#work-carousel").css("margin-left", "0")
  	}

  });

  $("#skills").click(function() {
  	var projects = $("#projects")
  	var skills = $("#skills")
  	if (skills.hasClass("adventure-text-active")) {
  		return false;
  	}
  	else {
  		skills.addClass("adventure-text-active");
  		projects.removeClass("adventure-text-active");
  		$("#work-carousel").css("margin-left", "-100%")
  	}

  });

  $("#avid-reader").click(function() {
  	var reader = $("#avid-reader")
  	var explorer = $("#explorer-of-ideas")
  	if (reader.hasClass("adventure-text-active")) {
  		return false;
  	}
  	else {
  		reader.addClass("adventure-text-active");
  		explorer.removeClass("adventure-text-active");
  		$("#more-about-me-carousel").css("margin-left", "0")
  	}

  });

  $("#explorer-of-ideas").click(function() {
  	var reader = $("#avid-reader")
  	var explorer = $("#explorer-of-ideas")
  	if (explorer.hasClass("adventure-text-active")) {
  		return false;
  	}
  	else {
  		explorer.addClass("adventure-text-active");
  		reader.removeClass("adventure-text-active");
  		$("#more-about-me-carousel").css("margin-left", "-100%")
  	}

  });

  /*script for moving between recommendations */
	$("#carousel-prev").click(function() {
	    var current_margin = parseInt($('#carousel').css('margin-left').replace("px", ""))
	    if (current_margin == 0) {
	      return false;
	    }
	    else {
	      var new_margin = current_margin + 960;
	      $("#carousel").css("margin-left", new_margin)
	      if (new_margin == 0) {
	        $("#carousel-prev").css("opacity", 0.4);
	      }
	      else {
	        $("#carousel-prev").css("opacity", 1);
	        $("#carousel-next").css("opacity", 1);
	      }
	    }
	  })

	$("#carousel-next").click(function() {
	    var current_margin = parseInt($('#carousel').css('margin-left').replace("px", ""))
	    if (current_margin == -3840) {
	      return false;
	    }
	    else {
	      var new_margin = current_margin - 960;
	      $("#carousel").css("margin-left", new_margin)
	      if (new_margin == -3840) {
	        $("#carousel-next").css("opacity", 0.4);
	      }
	      else {
	        $("#carousel-next").css("opacity", 1);
	        $("#carousel-prev").css("opacity", 1);
	      }
	    }
	  });

  /* script for moving between books */
  function activate_review(review) {
  	if (review.hasClass("review-active")) {
  		return false;
  	}
  	else {
  		var prev = $(".review-active")
  		prev.removeClass("review-active");

  		setTimeout(function() {
  			prev.hide()
  			setTimeout(function() {
  				review.addClass("review-active")
  			}, 20)
  			review.show();
  		}, 500)
  	}
  }

  function activate_title(title) {
  	if (title.hasClass("book-title-active")) {
  		return false;
  	}
  	else {
  		var prev = $(".book-title-active")
  		prev.removeClass("book-title-active");
		title.addClass("book-title-active")
  	}
  }

  function activate_book(book_num) {
  	var book_id = "book" + book_num
  	if ($(".book-img").attr("id") == book_id) {
  		return false;
  	}
  	else {
	  	$(".book-img").addClass("book-img-hide")
	  	setTimeout(function() {
	  		$(".book-img").attr("id", book_id);
	  		setTimeout(function() {
	  			$(".book-img").removeClass("book-img-hide")
	  		}, 20)
	  	}, 350)
  	}
  }

  function load() {
  	var title1 = $("#book-title-1");
  	var review1 = $("#book-review-1");
  	var screensize = $(window).height();
  	activate_title(title1);
  	activate_review(review1);
  	$(".section").css("height", screensize);
    setTimeout(function() {
      loadNavPlaces();
      console.log(navPlace)
    },500)
  }

  $(".book-title").click(function() {
  	var book_place = $(this).attr("id").length - 1
  	var book_num = $(this).attr("id")[book_place]
  	var review = "#book-review-" + book_num
  	review = $(review)
  	activate_title($(this));
  	activate_review(review);
  	activate_book(book_num);

  })



  $(".book-title").hover(function() {
  	var book_place = $(this).attr("id").length - 1
  	var book_num = $(this).attr("id")[book_place]
  	var review = "#book-review-" + book_num
  	review = $(review)
  	activate_title($(this));
  	activate_review(review);
  	activate_book(book_num);
  })

  /*scrolling shit */

  $("a").click(function(e) {
    e.preventDefault();
    var key = "#nav-" + String($(this).attr('href')).slice(-1);
    $('html, body').animate({
      scrollTop: navPlace[key]
    }, 1000);
    $(".current").removeClass("current");
    $(this).children().addClass("current")
  });



  var didScroll = false;
  var lastScrollTop = 0;
  var delta = 10;
  var screensize = $(window).height();
  var navbarHeight = 50;
  var navPlace = {"#nav-1": 0};


  function loadNavPlaces () {
    for (var i = 2; i < 6; i++) {
      var nav = "#nav-" + i
      var slide = "#slide-" + i
      var place = $(slide).position().top
      var slide_size = $(slide).height()
      // vertically center smaller sections
      if (slide_size < screensize) {
        var top = Math.floor(place - (screensize - slide_size)/2)
        navPlace[nav] = top
      }
      else {
        navPlace[nav] = place
      }
    }
  }




  $(window).scroll(function(event) {
    didScroll = true;
  })

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
    }
    didScroll = false;
  },250)

  function findNavPlace() {
    var st = $(this).scrollTop();
    var place = $(".current").attr("id")
    for (var i in navPlace) {
      if (navPlace[i] <= st) {
        place = i
      }
    }
    if ("#" + $(".current").attr("id") == place) {
      return false;
    }
    $(".current").removeClass("current");
    $(place).addClass("current");

  }

  function hasScrolled() {
    var st = $(this).scrollTop();
    var current_delta = Math.abs(lastScrollTop - st);
    findNavPlace();

    if (current_delta < delta) {
      return false;
    }
    if (st > lastScrollTop && st > navbarHeight) {
      $("#side-bar").addClass("side-bar-hide")
      lastScrollTop = st
    }
    else if (st + $(window).height() < $(document).height()) {
      setTimeout(function() {
        $("#side-bar").removeClass("side-bar-hide");
        lastScrollTop = st
      },500)

    }

    else {
      return false
    }
  }

  

  /*hover shit */

  var clear = 0

  function swap_text() {
  	setTimeout(function() {
	  	var exploring = ["AngularJs", "Web Dev Decal", "Objective-C", "Viral Marketing", "Growth Hacking", 
	  	"Crime-Fighting", "Transporation", "Investing"]
	  	var text = $("#revolving-text")
	  	var random = Math.floor(exploring.length * Math.random());
      setInterval(function() {
		  		var new_text = exploring[random]
		  		text.text(new_text)
		  		random = Math.floor(exploring.length * Math.random());
		  	}, 1000)
  	}, 1000)
  }

  $("#revolving-text-container").hover(swap_text(), function() {
  	clearInterval(clear);
  });

  /*see more */

  $("a").click(function() {
    window.location.href = $(this).attr("href");
  })

  $("#gradescope-link").click(function() {
    $("#gradescope").show();
    $(".learn-more-overlay").show();
    setTimeout(function() {
      $("#gradescope").addClass("active");
      $(".learn-more-overlay").addClass("active");
    }, 50)
    $("body").css("overflow", "hidden")
  });

  $(".learn-more-close").click(function() {
    setTimeout(function() {
      $(".learn-more").hide();
      $(".learn-more-overlay").hide();
    }, 500)
    $("#gradescope").removeClass("active");
    $(".learn-more-overlay").removeClass("active");
    $("body").css("overflow", "visible")
  })

  load();

});
















