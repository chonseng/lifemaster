function valueChange() {
	countD=1;
    countA=1;
	
	/* Add */			    
    if(a1){
        countA*=1.1;
    }
    
    if(a15){
        countA*=1.15;
    }
    
    if (ac) {
        countA*= customA;
    }

    /* Discount */
    if(d95){
    	countD*=0.95;
    }
    
    if(d9){
        countD*=0.9;
    }
    
    if(d8){
        countD*=0.8;
    }
    
    if(dc){
        countD*=customD;
    }

	calAndOutput();			 	
	calSaving();
}

function calAndOutput() {
	var input = $("#discount-input").val();
    result=input*countA-input*(1-countD);
	$("#discount-result").text("$" + result.toFixed(2));
}

function calSaving() {
    var input = $("#discount-input").val();
    saving=input*(1-countD);
    $("#discount-saving").text("$" + saving.toFixed(2));
}

function initDiscount() {
	countA=1;
	countD=1;
	a1=false;
	a15=false;
	ac=false;
	d95=false;
	d9=false;
	d8=false;
	dc=false;
	result = 0;
	saving = 0;
	$("#a1").removeClass("on");
	$("#a15").removeClass("on");
	$("#ac").removeClass("on");
	$("#d95").removeClass("on");
	$("#d9").removeClass("on");
	$("#d8").removeClass("on");
	$("#dc").removeClass("on");
	$("#tf-ac").val(function(){return " ";})
	$("#tf-dc").val(function(){return " ";})
	$("#discount-input").val(function(){return " ";})
	valueChange();
	calSaving();
}






initDiscount();


$("#discount-input").bind("keyup change",function(){
	valueChange();
})

var acChange = function(){
	var currentLang = $.i18n.prop("currentLang");

	var input = $("#tf-ac").val();
	if (input<0) {
		var value = 100 - (-input);
		// console.log(value);
		$("#tf-ac").val(value);
	}
	var input = $("#tf-ac").val();

	if(input!=0 && input<100) {
   		// if (currentLang == "en-US")
	   		customA = input/100 + 1;
	  //  	else {
			// if (input<10) {
	  //           customA=input/10+1;
	  //       }else if (input<100){
	  //           customA=input/100+1;
	  //       }
	  //  	}
		ac=true;
		$("#ac").addClass("on");
	}
	else {
		ac=false;
		$("#ac").removeClass("on");
	}
	valueChange();
};

var dcChange = function(){
	var input = $("#tf-dc").val();
	if (input<0) {
		var value = 100 - (-input);
		// console.log(value);
		$("#tf-dc").val(value);
	}
	
	var input = $("#tf-dc").val();


	if(input!=0 && input<100) {
        if (currentLang == "en-US")
	   		customD = 1 - input/100;
	   	else {
			if (input<10) {
	            customD=input/10;
	        }else if (input<100){
	            customD=input/100;
	        }
	    }
   		
		dc=true;
		$("#dc").addClass("on");
	}
	else {
		dc=false;
		$("#dc").removeClass("on");
	}
	valueChange();
};

$("#tf-ac").bind("keyup change",acChange);

$("#tf-dc").bind("keyup change", dcChange);

$("#ac").click(function(){
	if(ac) {
		ac=false;
		$("#ac").removeClass("on");
	}
	else {
		var input = $("#tf-ac").val();
		if(input!=0 && input<100) {
			ac=true;
		$("#ac").addClass("on");
		}
	}
	valueChange();
})

$("#dc").click(function(){
	if(dc) {
		dc=false;
		$("#dc").removeClass("on");
	}
	else {
		var input = $("#tf-dc").val();
		if(input!=0 && input<100) {
			dc=true;
			$("#dc").addClass("on");
		}
	}
	valueChange();
})

$("#a1").click(function(){
	if (a1) {
		a1=false;
		$("#a1").removeClass("on");
	}
	else {
		a1=true;
		$("#a1").addClass("on");
	}
	valueChange();
})

$("#a15").click(function(){
	if (a15) {
		a15=false;
		$("#a15").removeClass("on");
	}
	else {
		a15=true;
		$("#a15").addClass("on");
	}
	valueChange();
})

$("#d95").click(function(){
	if (d95) {
		d95=false;
		$("#d95").removeClass("on");
	}
	else {
		d95=true;
		$("#d95").addClass("on");
	}
	valueChange();
})

$("#d9").click(function(){
	if (d9) {
		d9=false;
		$("#d9").removeClass("on");
	}
	else {
		d9=true;
		$("#d9").addClass("on");
	}
	valueChange();
})

$("#d8").click(function(){
	if (d8) {
		d8=false;
		$("#d8").removeClass("on");
	}
	else {
		d8=true;
		$("#d8").addClass("on");
	}
	valueChange();
})

$("#discount-reset").click(function(){
	initDiscount();
})