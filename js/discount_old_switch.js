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
    $("#discount-result").text(function(){
    	return "$" + result.toFixed(1);
    }) 
}

function calSaving() {
    var input = $("#discount-input").val();
    saving=input*(1-countD);
    $("#discount-saving").text(function(){
    	return "$" + saving.toFixed(1);
    })
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
	$("#a1").removeClass("on_blue");
	$("#a15").removeClass("on_blue");
	$("#ac").removeClass("on_blue");
	$("#d95").removeClass("on_pink");
	$("#d9").removeClass("on_pink");
	$("#d8").removeClass("on_pink");
	$("#dc").removeClass("on_pink");
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

$("#tf-ac").bind("keyup change",function(){
	var input = $("#tf-ac").val();
	if(input!=0 && input<100) {
		 if (input<10) {
            customA=input/10+1;
        }else if (input<100){
            customA=input/100+1;
        }
		ac=true;
		$("#ac").addClass("on_blue");
	}
	else {
		ac=false;
		$("#ac").removeClass("on_blue");
	}
	valueChange();
})

$("#tf-dc").bind("keyup change",function(){
	var input = $("#tf-dc").val();
	if(input!=0 && input<100) {
		 if (input<10) {
            customD=input/10;
        }else if (input<100){
            customD=input/100;
        }
		dc=true;
		$("#dc").addClass("on_pink");
	}
	else {
		dc=false;
		$("#dc").removeClass("on_pink");
	}
	valueChange();
})

$("#ac").click(function(){
	if(ac) {
		ac=false;
		$("#ac").removeClass("on_blue");
	}
	else {
		var input = $("#tf-ac").val();
		if(input!=0 && input<100) {
			ac=true;
		$("#ac").addClass("on_blue");
		}
	}
	valueChange();
})

$("#dc").click(function(){
	if(dc) {
		dc=false;
		$("#dc").removeClass("on_pink");
	}
	else {
		var input = $("#tf-dc").val();
		if(input!=0 && input<100) {
			dc=true;
			$("#dc").addClass("on_pink");
		}
	}
	valueChange();
})

$("#a1").click(function(){
	if (a1) {
		a1=false;
		$("#a1").removeClass("on_blue");
	}
	else {
		a1=true;
		$("#a1").addClass("on_blue");
	}
	valueChange();
})

$("#a15").click(function(){
	if (a15) {
		a15=false;
		$("#a15").removeClass("on_blue");
	}
	else {
		a15=true;
		$("#a15").addClass("on_blue");
	}
	valueChange();
})

$("#d95").click(function(){
	if (d95) {
		d95=false;
		$("#d95").removeClass("on_pink");
	}
	else {
		d95=true;
		$("#d95").addClass("on_pink");
	}
	valueChange();
})

$("#d9").click(function(){
	if (d9) {
		d9=false;
		$("#d9").removeClass("on_pink");
	}
	else {
		d9=true;
		$("#d9").addClass("on_pink");
	}
	valueChange();
})

$("#d8").click(function(){
	if (d8) {
		d8=false;
		$("#d8").removeClass("on_pink");
	}
	else {
		d8=true;
		$("#d8").addClass("on_pink");
	}
	valueChange();
})

$("#discount-reset").click(function(){
	initDiscount();
})