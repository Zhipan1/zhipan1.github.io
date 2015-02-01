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


	$("#create-outline").mousedown( function(e) {
		var box = createBox()
		positionBox(e, box)
		$(this).append(box);
		saveBox(box);
		$(this).mousemove( function(e) {
			manipulateBox(e, box)
		});
	})

	$("#create-outline").mouseup( function() {
		$(this).off("mousemove");
		saveNewPosition()
		//don't make box unless its at least X by Y
		if (apprBoxSize(200, 50)) {
			attachBoxEvent()
			insertOutlineNav()
			newSidebarQuestion()
		}

		// weird bug fix where event only attaches only if div already exists
		
	})

	//delete box
	$(".template-box-delete").hover(
		function() {
			deleteBoxHover($(this))
		},
		function() {
			deleteBoxHoverOff($(this))
		})
	.click(function() {
		deleteBox($(this))
	})

	/*
	$("#create-outline").mouseout(function() {
		// stop manipulating box size if cursor is off #create-outline
		$(this).off("mousemove");
		attachBoxEvent()
		saveMovedBox($(this))
		saveNewPosition()
	})
	*/



	//prevent image dragging 

	$('#create-outline img').on('dragstart', function(event) { event.preventDefault(); });






	/* create box outline */

	var boxes = []

	var questions = {}

	function lastBox() {
		return boxes[boxes.length - 1]
	}

	function outlineOffsetX() {
		return 60;
	}

	function manipulateBox(e, box) {
		var offsetX = outlineOffsetX()
		var newMouseX = e.pageX - offsetX; 
		var newMouseY = e.pageY;

		// flip the box if mouse position is before position point

		if (newMouseX - box.left < 0) {
			box.css("left", newMouseX + "px");
			box.newLeft = newMouseX
		}

		if (newMouseY - box.top < 0) {
			box.css("top", newMouseY + "px");
			box.newTop = newMouseY
		}

		// save widths 

		var width = Math.abs(box.left - newMouseX)
		var height = Math.abs(box.top - newMouseY)

		boxSize(box, width, height)

		// stop manipulation if cursor moves outside container
		if (newMouseX < 0 || newMouseY < 0) {
			return
		}
	}

	function apprBoxSize(minWidth, minHeight) {
		var box = $(lastBox())
		if(parseInt(box.css("width")) < minWidth || parseInt(box.css("height")) < minHeight) {
			box.remove()
			return false
		}
		return box
	}

	//really buggy ... figure out a way to do this witout calling the last element of the box array
	function saveNewPosition() {
		var boxObj = lastBox()
		var box = $(boxObj)
		boxObj.top = parseInt(box.css("top"))
		boxObj.left = parseInt(box.css("left"))
		box.css("cursor", "move")
	}

	function insertOutlineNav() {
		var boxObj = lastBox()
		var box = $(boxObj)
		if (box.children().length > 0) {
			return
		}
		var nav = $($("#partial-hack").clone(true));
		nav.attr("id", box.attr("id"))
		box.append(nav)
	}

	function boxSize (box, width, height) {
		box.css("width", width + "px");
		box.css("height", height + "px");
	}

	function createBox() {
		var box = $(document.createElement("div"));
		var boxId = "box-" + boxes.length;
		box.attr("id", boxId);
		return box;
	}

	function positionBox(e, box) {
		var mouseX = e.pageX - outlineOffsetX(); 
		var mouseY = e.pageY;
		box.addClass("template-question-box");
		box.css("top", mouseY + "px");
		box.css("left", mouseX + "px");
		box.top = mouseY;
		box.left = mouseX;
	}

	function saveBox(box) {
		boxes.push(box)
	}

	function searchById(id) {
		var key = id[id.length - 1]
		return boxes[key]
	}

	function moveBox(boxDomElement, e) {
		//stops parent events from triggering 
		e.stopPropagation();


		//find box so we can access its properties
		var boxId = $(boxDomElement).attr("id")
		box = searchById(boxId)

		//used to determine delta
		var initialMouseX = e.pageX - outlineOffsetX(); 
		var initialMouseY = e.pageY;

		//determine cursor position in the box
		var mouseFromTop = e.pageY - box.top
		var mouseFromLeft = e.pageX - box.left - outlineOffsetX(); 
		

		//update position
		$(document).mousemove( function(e) {
			var mouseX = e.pageX - outlineOffsetX(); 
			var mouseY = e.pageY;
			box.css("top", (mouseY - mouseFromTop) + "px");
			box.css("left", (mouseX - mouseFromLeft) + "px");
		})

	}

	function saveMovedBox(box) {
		box.left = box.css("left")
		box.top = box.css("top")
	}

	function attachBoxEvent() {
		$(".template-question-box").mousedown(function(e) {
			moveBox(this, e)
		})
		$(".template-question-box").mouseup(function() {
			$(document).off("mousemove");
			saveMovedBox($(this))
		})
	}

	//javascript for outline box nav

	function deleteBoxHover(navButton) {
		var templateBox = navButton.parents(".template-question-box")
		var inputHeader = $(navButton.parent()).siblings()
		$(templateBox).addClass("template-question-box-danger")
		$(inputHeader).addClass("template-box-input-danger")
	}

	function deleteBoxHoverOff(navButton) {
		var templateBox = navButton.parents(".template-question-box")
		var inputHeader = $(navButton.parent()).siblings()
		$(templateBox).removeClass("template-question-box-danger")
		$(inputHeader).removeClass("template-box-input-danger")
	}

	function deleteBox(navButton) {
		var templateBox = navButton.parents(".template-question-box")
		$(templateBox).remove()
	}


	// create question on sidebar

	function newQuestion() {

	}

	function newSidebarQuestion(boxKey) {
		//var question = $(document.createElement("div"))
		var question = $("#partial-hack2").clone()
		$(question).removeAttr("id")
		$(".sidebar-grader-content").append(question)
		questions[boxKey] = question
	}

	function deleteSidebarQuestion(boxKey) {
		var question = questions[boxKey]
		$(question).remove()
		delete questions[boxKey]
	}

















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



});

















