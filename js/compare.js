function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  });
 
  return params;
}

function option(value) {
	return '<option value="'+value+'" data-lang="'+value+'"></option>';
}


// var unit_arr = {
// 	volume : option("gallon","gal - Gallon (US)")
// 			+option("pint","pt - Pint (US)")
// 			+option("fluid_ounce","oz - Fluid Ounce (US)")
// 			+option("liter","l - Liter")
// 			+option("milliliter","ml - Milliliter ")
// 			+option("cup","Cup")
// 			+option("tablespoon","Tablespoon")
// 			+option("teaspoon","Teaspoon")
// 			+option("other","Other..."),
	
// 	weight : option("pound","lb - Pound (US)")
// 			+option("ounce","oz - Ounce (US)")
// 			+option("kilogram","kg - Kilogram")
// 			+option("gram","g - Gram")
// 			+option("other","Other..."),
	
// 	length : option("kilometer","km - Kilometer")
// 			+option("meter","m - Meter")
// 			+option("centimeter","cm - Centimeter")
// 			+option("millimeter","mm - Millimeter")
// 			+option("yard","yd - Yard")
// 			+option("foot","ft - Foot")
// 			+option("inch","in - Inch")
// 			+option("other","Other..."),
	
// 	area : option("square_mile","mile² - Square Mile")
// 			+option("square_yard","yd² - Square Yard")
// 			+option("square_foot","ft² - Square Foot")
// 			+option("square_inch","in² - Square Inch")
// 			+option("acre","Acre")
// 			+option("square_kilometer","km² - Square Kilometer")
// 			+option("square_meter","m² - Square Meter")
// 			+option("square_centimeter","cm² - Square Centimeter")
// 			+option("other","Other..."),
// }



var unit_arr = {
	volume : option("gallon")
			+option("pint")
			+option("fluid_ounce")
			+option("liter")
			+option("milliliter")
			+option("cup")
			+option("tablespoon")
			+option("teaspoon")
			+option("other"),
	
	weight : option("pound")
			+option("ounce")
			+option("kilogram")
			+option("gram")
			+option("other"),
	
	length : option("kilometer")
			+option("meter")
			+option("centimeter")
			+option("millimeter")
			+option("yard")
			+option("foot")
			+option("inch")
			+option("other"),
	
	area : option("square_mile")
			+option("square_yard")
			+option("square_foot")
			+option("square_inch")
			+option("acre")
			+option("square_kilometer")
			+option("square_meter")
			+option("square_centimeter")
			+option("other"),
}

// get the unit type
var type;
var changeType = function() {
	// type = $("#type").val();
	type = $("#type .selected").data('unit');
	$(".unit").html(unit_arr[type]);	
	editChanged();

	$("[data-lang]").each(function(){
	    $(this).text( jQuery.i18n.prop( $(this).data("lang") ) );
	});
}
changeType();

// $("#type").change(function(){
// 	changeType();	
// })

$(".unit, .portion, .price").change(function(){
	editChanged();
})

$(".portion, .price").keyup(function(){
	editChanged();	
})

$("#compare-reset").click(function(){
     // console.log("hihi");
    for (var i = 0; i<5 ; i++) {
     	var n=i+1;
     	$("#amount"+n).val("");
     	$("#price"+n).val("");
	    $("#unit"+n).prop("selectedIndex",0);
     }

     
     editChanged();
    window.location.search = "";

})

$("#unitVolume").click(function(){
	$(".unitSeg").removeClass("selected");
	$(this).addClass("selected");
	changeType();
})

$("#unitWeight").click(function(){
	$(".unitSeg").removeClass("selected");
	$(this).addClass("selected");
	changeType();
})

$("#unitLength").click(function(){
	$(".unitSeg").removeClass("selected");
	$(this).addClass("selected");
	changeType();
})

$("#unitArea").click(function(){
	$(".unitSeg").removeClass("selected");
	$(this).addClass("selected");
	changeType();
})

function addCheapestClass(n) {
	// $("#amount" + n).addClass("cheapest");
 //    $("#price" + n).addClass("cheapest");
 	$("#item" + n).addClass("cheapest");
}

function removeCheapestClass(n) {
	// $("#amount" + n).removeClass("cheapest");
 //    $("#price" + n).removeClass("cheapest");
 	$("#item" + n).removeClass("cheapest");
}

function editChanged() {

    var data = getUrlParams();
    // console.log(data);
	/* Covernt Unit */
	var convert = new Array();

	for (var i = 0; i<5 ; i++) {
		var n=i+1;

		
		var unit = $("#unit"+n).val();

		if (data["price1"]!=undefined) {
			if (data["price"+n] != "" && data["amount"+n] != "") {
				$("#unit"+n).val(data["unit"+n]);
				unit = $("#unit"+n).val();
			}
		}

	    if (unit == "other") convert[i] = 1;
	    
	    //volume
	    if (unit == "pint") convert[i] = 0.5;
	    if (unit == "gallon") convert[i] = 0.0625;
	    if (unit == "fluid_ounce") convert[i] = 8;
	    if (unit == "cup") convert[i] = 1;
	    if (unit == "teaspoon") convert[i] = 48;
	    if (unit == "tablespoon") convert[i] = 16;

	    //weight
	    if (unit == "pound") convert[i] = 2.2046226;
		if (unit == "ounce") convert[i] = 35.273962;
		if (unit == "kilogram") convert[i] = 1;
		if (unit == "gram") convert[i] = 1000;

		//length
		if (unit == "kilometer") convert[i] = 0.001;
		if (unit == "meter") convert[i] = 1;
		if (unit == "centimeter") convert[i] = 100;
		if (unit == "millimeter") convert[i] = 1000;
		if (unit == "yard") convert[i] = 1.0936133;
		if (unit == "foot") convert[i] = 3.2808399;
		if (unit == "inch") convert[i] = 39.370079;

		//area
		if (unit == "square_mile") convert[i] = 0.38610214;
		if (unit == "square_yard") convert[i] = 1195990.5;
		if (unit == "square_foot") convert[i] = 10763910;
		if (unit == "square_inch") convert[i] = 1550003084;
		if (unit == "acre") convert[i] = 247.10538;
		if (unit == "square_kilometer") convert[i] = 1;
		if (unit == "square_meter") convert[i] = 1000000;
		if (unit == "square_centimeter") convert[i] = 10000000000;

	}


     var b = new Array();
     var compare = new Array();

     amount = new Array();
     price = new Array();


     for (var i = 0; i<5 ; i++) {
     	var n=i+1;

     	
     	if (data["price1"]==undefined) {
			amount[i] = $("#amount"+n).val();
			price[i] = $("#price"+n).val();
     	}
     	else {
     		// console.log(n, data["amount"+n]);
	     	if (data["amount"+n] === "") {
		     	amount[i] = $("#amount"+n).val();
	     	}
	     	else {
	     		amount[i] = data["amount"+n];
	     		$("#amount"+n).val( data["amount"+n] );
	     	}

	     	if (data["price"+n] === "") {
		     	price[i] = $("#price"+n).val();
	     	}
	     	else {
	     		price[i] = data["price"+n];
	     		$("#price"+n).val( data["price"+n] );
	     	}

	     	
     	}

     	// price[i] = $("#price"+n).val();


     	if (amount[i] != 0 && price[i] != 0) b[i]=true; else b[i]=false;
     	if (b[i]) compare[i] = price[i] / (amount[i] / convert[i]) ;
	    
     	// make sure the compare is defined
	    compare[i] = compare[i] || 9999999;
     }

    cheapest = Math.min(compare[0],compare[1],compare[2],compare[3],compare[4]);

	// color the column if it is the cheapest   
    for (var i = 0; i<5; i++) {
	    if (cheapest == compare[i] && b[i]) {
			
	    	addCheapestClass(i+1);
	    }
	    else {
	    	removeCheapestClass(i+1);	
	    }
    }



}

$(".share-compare-btn").click(function(){
	var form = {};
	for (var i = 1; i <= 5; i++) {
		form["price"+i] = $("#price"+i).val();
		form["amount"+i] = $("#amount"+i).val();
		form["unit"+i] = $("#unit"+i).val();
	};
	// console.log(form);
	var urlRoot = "http://app.chonseng.info/"
	var urlParams = "?price1="+form['price1']+"&amount1="+form['amount1']+"&unit1="+form['unit1']+"&price2="+form['price2']+"&amount2="+form['amount2']+"&unit2="+form['unit2']+"&price3="+form['price3']+"&amount3="+form['amount3']+"&unit3="+form['unit3']+"&price4="+form['price4']+"&amount4="+form['amount4']+"&unit4="+form['unit4']+"&price5="+form['price5']+"&amount5="+form['amount5']+"&unit5="+form['unit5'];
	var url = encodeURIComponent(urlRoot+urlParams);
	// console.log(url);
	// return false;
	// console.log("form",form);
	// console.log("url",decodeURIComponent(url));
	if ($(this).hasClass("facebook")) {
		$(".share-btn").attr("href", "https://www.facebook.com/sharer/sharer.php?u="+url);
	}
	else {
		$(".share-btn").attr("href", "https://twitter.com/share?url="+url);	
	}
	// $("#item-form").submit();
})