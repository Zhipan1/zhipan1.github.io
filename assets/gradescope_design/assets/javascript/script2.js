$(document).ready(function() {

	/* 
		.sidebar-content-collapsed
		.sidebar-profile-collapsed
		.collapse-menu-show


		.sidebar-collapsed

	*/

	$("#sidebar-profile-menu").click(function() {
		collapse();
	});

	$(".collapse-menu").click(function() {
		expand();
	});

	$(".add-assignment-button").click(function() {
		showModal();
		showFocus();
	})

	$("#modal-cancel").click(function() {
		modalNavCancel();
	})

	$("#modal-nav-submit").click(function() {
		modalNavSubmit();
	})

	$(".modal-uploader").click(function() {
		fileSelected();
	})

	$("#footer-nav-cancel").click(function() {
		gradeFooterHide();
	})

	$(".content-body-item").click(function() {
		gradeFooterShow()
	})

	$(".chart-distribution-bar").hover(function() {
		showBarStat($(this)) }, function() {showBarHide($(this))
	})




	// loads the review bars 
	loadBars();
	loadYAxis()

	

	function expand() {
		var sidebarCollapsed = $(".sidebar-collapsible").hasClass("sidebar-collapsed")
		if(sidebarCollapsed) {
			sidebarExpand();
			contentExpand();
			gradeFooterContract();
		}
		else {
			return false
		}
	}

	function collapse() {
		var sidebarCollapsed = $(".sidebar-collapsible").hasClass("sidebar-collapsed")
		if(!sidebarCollapsed) {
			sidebarCollapse();
			contentCollapse();
			gradeFooterExpand();
		}
		else {
			return false
		}
	}

	function sidebarCollapse() {
		$(".sidebar-collapsible").addClass("sidebar-collapsed");
		$(".sidebar-content-collapsible").addClass("sidebar-content-collapsed");
		$(".collapse-menu").show();
		setTimeout(function() {
			$(".sidebar-profile-collapsible").addClass("sidebar-profile-collapsed")
			$(".collapse-menu").addClass("collapse-menu-show")
			setTimeout(function() {
				$(".sidebar-content-collapsible").hide();
			}, 500)
		}, 100)
	};

	function sidebarExpand() {
		$(".sidebar-collapsible").removeClass("sidebar-collapsed")
		$(".sidebar-content-collapsible").removeClass("sidebar-content-collapsed")
		$(".sidebar-content-collapsible").show();
		setTimeout(function() {
			$(".sidebar-profile-collapsible").removeClass("sidebar-profile-collapsed")
			$(".collapse-menu").removeClass("collapse-menu-show")
			setTimeout(function() {
				$(".collapse-menu").hide();
			}, 500)
		}, 100)
	}

	function contentCollapse() {
		$(".content-collapsible").addClass("content-collapsed")
	}

	function contentExpand() {
		$(".content-collapsible").removeClass("content-collapsed")
	}

	function showModal() {
		$(".popup-modal").show();
		setTimeout(function() {
			$(".popup-modal").addClass("popup-modal-active");
		}, 40)
		
	}

	function hideModal() {
		$(".popup-modal").removeClass("popup-modal-active");
		setTimeout(function() {
			$(".popup-modal").hide();
		}, 300)
	}

	function showFocus() {
		$(".focus").show();
		setTimeout(function() {
			$(".focus").addClass("focus-active");
		}, 40)
	}

	function hideFocus() {
		$(".focus").removeClass("focus-active");
		setTimeout(function() {
			$(".focus").hide();
		}, 300)
	}
	function modalNavSubmit() {
		modalNext();
		setTimeout(function() {
			disableNext();
		}, 400)
	}
	function modalNext() {
		$(".modal-body-slider").css("margin-left", "-480px");
		$(".modal-subtitle-slider").css("margin-left", "-480px");
		$(".modal-body").css("height", "100px")
		$(".file-label-input").keyup(function() {
			listenForInput();
		})
		setTimeout(function() {
			$("#file-label-input").focus();
		}, 500);
	}

	function modalNavCancel() {
		hideModal();
		hideFocus();
		setTimeout(function() {
			modalPrev();
			disableSubmit();
			$(".modal-body").css("height", "290px");
		}, 500)
	}

	function modalPrev() {
		$(".modal-body-slider").css("margin-left", "0px");
	}

	function enableSubmit() {
		$("#modal-nav-submit").addClass("modal-button-active");
	}

	function disableSubmit() {
		$("#modal-nav-submit").removeClass("modal-button-active");
	}

	function fileSelected() {
		$(".modal-uploader").on("change", function() {
			setTimeout(function() {
				modalNext();
			}, 100);
		})
	}

	function listenForInput() {
		filled = !!$(".file-label-input").val()
		if(filled) {
			enableSubmit();
		}
		else {
			disableSubmit();
		}
	}

	/* grade footer */

	function gradeFooterExpand() {
		var footerReduce = 40
		$('#grade-footer').css('margin-left', '60px')
		$('#grade-footer').css('width', 'calc(100% - 100px)')
	}

	function gradeFooterContract() {
		$('#grade-footer').css('margin-left', '301px')
		$('#grade-footer').css('width', 'calc(100% - 341px)')
	}

	function gradeFooterHide() {
		$('#grade-footer').css('bottom', '-62px')
	}

	function gradeFooterShow() {
		$('#grade-footer').css('bottom', '0px')
	}


	
	function submitOutline() {
		// Post: Send the outline and title to the server
		// Params: Outline.pdf, Title
		// Server: 
		// Response:
	}

	/* review */

	//load bar heights

	function loadBars() {
		var barHeights = [10, 25, 60, 120, 155, 200, 280, 270, 240, 210]
		var maxHeight = barHeights.slice(0).sort(function(a, b){return b-a})[0]
		var barHeightsRelative = barHeights.map(function(num) {
			return Math.floor(num / maxHeight * 330)
		})
		var barName = "#distribution-bar-"
		for (var i = 0; i < barHeightsRelative.length; i++) {
			var barNumber = barName + (i + 1)
			var barSelect = $(barNumber)
			var barStatNumber = $(barNumber + " .bar-text-number")
			var barStatContainer = $(barNumber + " .distribution-bar-stat")
			barSelect.css('height', barHeightsRelative[i] + 'px')
			barStatNumber.text(barHeights[i])
			if (barHeightsRelative[i] < 50) {
				barStatContainer.css("bottom", "-120px")
			}
		}
	}


	function loadYAxis() {
		var barHeights = [10, 25, 60, 120, 155, 200, 280, 270, 240, 210]
		var maxHeight = barHeights.sort(function(a, b){return b-a})[0]
		var ceiling = Math.ceil(maxHeight / 10) * 10
		var increment = ceiling / 5
		var roundIncrement = Math.ceil(increment / 10) * 10
		var axis = $("#chart-axis-y").children().get().reverse()
		$(axis).each(function(index, value) {
			$(value).find('.chart-axis-number').text(index * roundIncrement)
		})
		
	}

	function showBarStat(parent) {
		var stat = parent.children('.distribution-bar-stat')
		stat.show()
		setTimeout(function() {
			stat.addClass('distribution-bar-stat-active')
		}, 50)
	}

	function showBarHide(parent) {
		var stat = parent.children('.distribution-bar-stat')
		stat.removeClass('distribution-bar-stat-active')
		setTimeout(function() {
			stat.hide()
		}, 300)
	}

	/* create boxes */


	var QuestionBox = React.createClass({
		getInitialState: function() {
			return {
				title: "",
				points: 0,
				subquestion: [],
				sidebarQuestion: []
			}
		},
		render: function() {
			return (
				<div className="test-box"> </div>
			)
		}
	})

	$("#create-outline").click(function() {
		React.render(<QuestionBox />, mountNode)
	})


});




