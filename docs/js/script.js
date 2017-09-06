	/* Page controller begin */
var page = location.hash.substr(1);

$("header nav ul li a").removeClass("selected");
$("a[href=#"+page+"]").addClass("selected");
if (page == "") $("a[href=#home]").addClass("selected");

function loadPage(yourPage) {
	

	if (yourPage == "" || yourPage == "home") {
		$("section").css({"opacity":"0"});
		$("section").load("home.html",function(){
			loadAll();
			$("section").animate({"opacity":"1"});
		});
	}
	else if (yourPage == "screenshot") {
		$("section").css({"opacity":"0"});
		$("section").load("screenshot.html",function(){
			loadAll();
			loadScreenshot();
			$("section").animate({"opacity":"1"});
		});
	}
	else if (yourPage == "updates") {
		$("section").css({"opacity":"0"});
		$("section").load("updates.html",function(){
			loadAll();
			$("section").animate({"opacity":"1"});
		});
	}
	else if (yourPage == "author") {
		return false;
		$("section").animate({"opacity":"1"});
	}
	else {
		$("section").css({"opacity":"0"});
		$("section").load("404.html",function(){
			loadAll();
			$("section").animate({"opacity":"1"});
		});
	}

	
}

loadPage(page);

// active Navigation
$(function(){
	$("header nav ul li a").click(function() {
		var goingPage = $(this).attr("href").substr(1);

		if ($(this).attr("href") != "mailto:chonseng38@gmail.com") {
			$("header nav ul li a").removeClass("selected");
			$(this).addClass("selected");
			loadPage(goingPage);			
		}

		clearInterval(cardInterval);
	})

})


	/* Page controller end */

function loadAll() {

	function preload(images) {
	    if (document.images) {
	        var i = 0;
	        var imageArray = new Array();
	        imageArray = images.split(',');
	        var imageObj = new Image();
	        for(i=0; i<=imageArray.length-1; i++) {
	            //document.write('<img src="' + imageArray[i] + '" />');// Write to page (uncomment to check images)
	            imageObj.src=imageArray[i];
	        }
	    }
	}

	function setCardNav() {
		$(".card_nav a").removeClass("selected");
		$(".card_nav").children().eq(index).addClass("selected");
	}


	var phone = {
		iphone : {
			0 : "iphone1",
			1 : "iphone2",
			2 : "iphone3",
			3 : "iphone4",
		},
		nexus : {
			0 : "nexus1",
			1 : "nexus2",
			2 : "nexus3",
			3 : "nexus4",
		}

	}

	var phoneType;


	// Start
	preload('img/compare5c.png,img/free5c.png,img/gratuity5c.png,img/discount5c.png');
	// preload('img/nexus1.png,img/nexus2.png,img/nexus3.png,img/nexus4.png');

	phoneType = "iphone";
	$("#screen").addClass(phone[phoneType][0]);


	var index = 0;
	// display first card

	$(".card_nav").children().eq(index).addClass("selected");

	var card = function() {
		var currentCard = $(".cards").children().eq(index);
		currentCard.removeClass("in");
		currentCard.addClass("out");
		$("#screen").removeClass();

		index++;
		if (index > 3) index = 0;

		var nextCard = $(".cards").children().eq(index);
		nextCard.removeClass("out");
		nextCard.addClass("in");	
		$("#screen").addClass(phone[phoneType][index]);

		setCardNav();
	}

	cardInterval = setInterval(card, 5000);


	$(".card_nav a").click(function() {
		var selectedCardNum = $(this).data("card");
		$("#screen").className = "screen";

		index = selectedCardNum - 1;
		if (index < 0) index = 3;

		$(".card").removeClass("in");
		$(".card").removeClass("out");
		$(".card").addClass("out");

		$(".cards").children().eq(index).removeClass("out");
		$(".cards").children().eq(index).addClass("in");


		setCardNav();

		$("#screen").removeClass();
		$("#screen").addClass(phone[phoneType][index]);

		clearInterval(cardInterval);
		cardInterval = setInterval(card, 5000);

		return false;
	});



	
}

function loadScreenshot() {
	$(".screenshot").css({"opacity":1});
}