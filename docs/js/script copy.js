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

function _(selector) {
	return document.querySelector(selector);
}

function cardNavReset() {
	for (var i = _(".card_nav").children.length - 1; i >= 0; i--) {
		_(".card_nav").children[i].classList.remove("selected");
	};
}

function setCardNav() {
	cardNavReset();
	_(".card_nav").children[index].classList.add("selected");

}

function removeAllSelectedClass() {
	for (var i = _("header nav ul").children.length - 1; i >= 0; i--) {
		_("header nav ul").children[i].children[0].classList.remove("selected");
	};
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
preload('img/iphone1.png,img/iphone2.png,img/iphone3.png,img/iphone4.png');
// preload('img/nexus1.png,img/nexus2.png,img/nexus3.png,img/nexus4.png');

phoneType = "iphone";
_(".screen").classList.add(phone[phoneType][0]);



var index = 0;
// display first card
// _(".cards").children[index].style.display = "block";
_(".card_nav").children[index].classList.add("selected");

var card = function() {
	var currentCard = _(".cards").children[index];
	currentCard.classList.remove("in");
	currentCard.classList.add("out");
	// _(".screen").classList.remove(phone[phoneType][index]);
	_(".screen").className = "screen";

	index++;
	if (index > 3) index = 0;

	var nextCard = _(".cards").children[index];
	nextCard.classList.remove("out");
	nextCard.classList.add("in");	
	_(".screen").classList.add(phone[phoneType][index]);

	setCardNav();
}

cardInterval = setInterval(card, 3000);


for (var i = _(".card_nav").children.length - 1; i >= 0; i--) {
	_(".card_nav").children[i].onclick = function() {
		var selectedCardNum = this.getAttribute("data-card");
		// _(".screen").classList.remove(phone[phoneType][index]);
		_(".screen").className = "screen";

		index = selectedCardNum - 1;
		if (index < 0) index = 3;

		for (var i = _(".cards").children.length - 1; i >= 0; i--) {
			_(".cards").children[i].classList.remove("in");
			_(".cards").children[i].classList.remove("out");
			_(".cards").children[i].classList.add("out");
		};

		_(".cards").children[index].classList.remove("out");
		_(".cards").children[index].classList.add("in");


		setCardNav();

		_(".screen").classList.add(phone[phoneType][index]);

		clearInterval(cardInterval);
		cardInterval = setInterval(card, 3000);

		return false;
	}
};


// _(".android_logo").onclick = function() {
// 	phoneType = "nexus";
// 	console.log(phoneType);
// 	card();
// }

// _(".apple_logo").onclick = function() {
// 	phoneType = "iphone";
// 	console.log(phoneType);
// 	card();
// }

for (var i = _("header nav ul").children.length - 1; i >= 0; i--) {
	_("header nav ul").children[i].children[0].onclick = function() {
		removeAllSelectedClass();
		this.classList.add("selected");
	}
};