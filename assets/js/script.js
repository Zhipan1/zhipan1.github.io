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
    if (current_margin >= 2400) {
      return false;
    }
    else {
      var new_margin = current_margin - 800;
      $(".work-slider").css("margin-left", new_margin)
      if (new_margin <= -1400) {
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

  $("a").click(function() {
    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href')).offset().top
    }, 1000);
  });

  /*hover shit */

  var clear = 0

  function swap_text() {
  	setTimeout(function() {
	  	var exploring = ["AngularJs", "Web Dev Decal", "Objective-C", "Viral Marketing", "Growth Hacking", 
	  	"Crime-Fighting", "Transporation", "Investing"]
	  	var text = $("#revolving-text")
	  	var random = Math.floor(exploring.length * Math.random());
	  	function intervalManager() {
		  	var k =	setInterval(function() {
		  		var new_text = exploring[random]
		  		text.text(new_text)
		  		random = Math.floor(exploring.length * Math.random());
		  	}, 1000)
		  	return k
	  	}
	  	clear = intervalManager()
  	},1500)
  }

  $("#revolving-text-container").hover(swap_text());

  load();

});
















