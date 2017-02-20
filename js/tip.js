$("#tax-toggle").click(function(){
	if (taxIsOpen) {
		taxIsOpen=false;
		$("#tax-toggle").removeClass("on");
	}
	else {
		taxIsOpen=true;
		$("#tax-toggle").addClass("on");	
	}
	calTip();
})

// $("#tip-toggle").click(function(){
// 	if (tipIsOpen) {
// 		tipIsOpen=false;
// 		$("#tip-toggle").removeClass("on");
// 	}
// 	else {
// 		tipIsOpen=true;
// 		$("#tip-toggle").addClass("on");	
// 	}
// 	calTip();
// })

$("#tipNo").click(function(){
	$("#tipMoreField").hide();
	$(".tipSeg").removeClass("selected");
	$(this).addClass("selected");
	calTip();
})

$("#tip10").click(function(){
	$("#tipMoreField").hide();
	$(".tipSeg").removeClass("selected");
	$(this).addClass("selected");
	calTip();
})

$("#tip15").click(function(){
	$("#tipMoreField").hide();
	$(".tipSeg").removeClass("selected");
	$(this).addClass("selected");
	calTip();
})

$("#tip18").click(function(){
	$("#tipMoreField").hide();
	$(".tipSeg").removeClass("selected");
	$(this).addClass("selected");
	calTip();
})

$("#tipMore").click(function(){
	$("#tipMoreField").show();
	$(".tipSeg").removeClass("selected");
	$(this).addClass("selected");
	calTip();
})

$("#tipMoreField").hide();

function calTip() {
	total = parseFloat($("#user-total").val());
	tax = parseFloat($("#user-tax").val())/100+1;

	var dataTip = $(".tipSeg.selected").data('tip');
	if (dataTip == "more") {
		tip = parseInt($("#user-tip").val())/100+1;
	}
	else {
		tip = dataTip+1;
	}


	// tip = parseInt($("#user-tip").val())/100+1;
	if ($("#user-people").val()=="") head = 1;
	else head = parseInt($("#user-people").val());

	if (!taxIsOpen) tax=1;
	// if (!tipIsOpen) tip=1;

	console.log(tip);

	if (total!=0 && tip!=0 && head!=0 && !isNaN(total) && !isNaN(tip) && !isNaN(head)) {
		resultTip = total*tax*(tip-1);
		grandTotal = total*tax*tip;
		perHead = grandTotal/head;


		$("#result-tip").text("$" + resultTip.toFixed(2));
		$("#grand-total").text("$" + grandTotal.toFixed(2));
		$("#per-total").text("$" + perHead.toFixed(2));
	}
	else {
		$("#result-tip").text("-");
		$("#grand-total").text("-");
		$("#per-total").text("-");
	}

	
}




taxIsOpen = false;
if (localStorage["tax"] != undefined || localStorage["tax"] != "" || localStorage["tax"] != 0) {
	$("#user-tax").val(localStorage["tax"]);
}
if (localStorage["tip"] != undefined || localStorage["tip"] != "" || localStorage["tip"] != 0) {
	$("#user-tip").val(localStorage["tip"]);
}
// tipIsOpen = false;

$("#user-total").bind("keyup change",function(){
	calTip();
})

$("#user-tax").bind("keyup change",function(){
	var tax = parseFloat($("#user-tax").val());
	if (tax !=0 && !isNaN(tax)) {
		taxIsOpen=true;
		localStorage["tax"] = tax;
		$("#tax-toggle").addClass("on");
	}
	else {
		taxIsOpen=false;
		$("#tax-toggle").removeClass("on");	
	}
	calTip();
})

$("#user-tip").bind("keyup change",function(){
	var tip = parseInt($("#user-tip").val());
	localStorage["tip"] = tip;
	// if (tip !=0 && !isNaN(tip)) {
	// 	tipIsOpen=true;
	// 	$("#tip-toggle").addClass("on");
		
	// }
	// else {
	// 	tipIsOpen=false;
	// 	$("#tip-toggle").removeClass("on");	
	// }
	calTip();
})

$("#user-people").bind("keyup change",function(){
	calTip();
})

$("#tip-reset").click(function(){
	taxIsOpen = false;
	// tipIsOpen = false;
	$("#tax-toggle").removeClass("on");	
	$("#tip-toggle").removeClass("on");	
	$("#user-total").val("");
	$("#user-tax").val("");
	$("#user-tip").val("");
	$("#user-people").val("");
	calTip();
})






