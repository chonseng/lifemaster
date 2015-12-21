$("#help-btn").click(function(){
    $("#free-help").show();
})

$("#ok-btn").click(function(){
    $("#free-help").hide();
})


selected = 1;

$("#tf-ori-price").bind("keyup change",function(){
    cal();
})

$("#tf-cond-buy").bind("keyup change",function(){
    cal();
})

$("#tf-cond-free").bind("keyup change",function(){
    cal();
})

$("#tf-buy").bind("keyup change",function(){
    cal();
})

$("#seg-buy").click(function(){
    $("#seg-total").removeClass("selected");
    $("#seg-buy").addClass("selected");
    selected = 0;
    cal();
})

$("#seg-total").click(function(){
    $("#seg-buy").removeClass("selected");
    $("#seg-total").addClass("selected");
    selected = 1;
    cal();
})

$("#btn-add").click(function(){
    tipsAdd();
})

$("#btn-sub").click(function(){
    tipsSubtract();
})

$("#free-reset").click(function(){
    $("#btn-add").hide();
    $("#btn-sub").hide();
    $("#tf-ori-price").val("");
    $("#tf-cond-buy").val("");
    $("#tf-cond-free").val("");
    $("#tf-buy").val("");
    cal();
})

$("#btn-add").hide();
$("#btn-sub").hide();
// $("#smarter-tips").hide();

function showTips() {
   // $("#smarter-tips").show();
   $("#btn-add").show();
   $("#btn-sub").show();
   // $("#tips-end").show();
    // lbtips1.textAlignment=UITextAlignmentLeft;
    // lbtips1.text=@"Smarter";
    $("#tips-text").html($.i18n.prop("smarter"));
    $("#tips-end").html($.i18n.prop("saveMore"));
}

function hiddenTips() {
    // $("#smarter-tips").hide();
    $("#btn-add").hide();
    $("#btn-sub").hide();
    // $("#tips-end").hide();
    // lbtips1.textAlignment=UITextAlignmentCenter;
    // lbtips1.text=@"This is the SMARTEST method to buy!";
    $("#tips-text").text($.i18n.prop("smartestWay"));
    $("#tips-end").text("");
    
    
}





function cal() {
    function tipString (buy, free, things) {
        var a =  jQuery.i18n.prop("tipString").split("##");
        var str = a[0]+buy+a[1]+free+a[2]+things+a[3];

        return str;
    }

    function tipStringWithoutDiscount (buy, free, things, single) {
        var a =  jQuery.i18n.prop("tipStringWithoutDiscount").split("##");
        var str = a[0]+buy+a[1]+free+a[2]+things+a[3]+single+a[4];

        return str;
    }

    function buyMore(num) {
         var a =  jQuery.i18n.prop("buyMore").split("##");
        var str = a[0]+num+a[1];

        return str;
    }

    function buyLess(num) {
         var a =  jQuery.i18n.prop("buyLess").split("##");
        var str = a[0]+num+a[1];

        return str;
    }

    price = parseFloat($("#tf-ori-price").val());
    buy = parseInt($("#tf-cond-buy").val());
    free = parseInt($("#tf-cond-free").val());
    things = parseInt($("#tf-buy").val());  


        if (price!=0 && buy!=0 && free!=0 && things!=0 &&
            !isNaN(price) && !isNaN(buy) && !isNaN(free) && !isNaN(things) ) {

                
                if (selected==0) {


                    priceTotal = price*things;
                    $("#total-price").text("$" + priceTotal.toFixed(2));
                    
                    // saveUser = price*(things+things/buy*free)-priceTotal;
                    // $("#save-price").text("$" + saveUser.toFixed(2));
                    
                    pricePer = priceTotal/(things+Math.floor(things/buy)*free);
                    $("#per-price").text("$" + pricePer.toFixed(2));
                    
                    savePer = price-pricePer;
                    $("#save-price").text("$" + savePer.toFixed(2));
                    
                    get_free = Math.floor(things/buy)*free;
                    get_total = things + get_free;
                    
                    $("#buy-and-get").html(tipString(things, get_free, get_total));
                    // $("#buy-and-get").html("Buy "+things+" Get "+get_free+" Free<br> You will get "+get_total+" items in total.");
                    //buy tips
                    if ( things%buy!=0) {
                        showTips();
                        add = buy - things%buy;
                        subtract = things%buy;
                        
                        if (add+things<1000){
                        // NSString *addText = [NSString stringWithFormat:@"+%d件",add];
                        // [btnTipsAdd setTitle:addText forState:UIControlStateNormal];
                            $("#btn-add").val( buyMore(add) );
                        }
                        else $("#btn-add").hide();
                        
                        if (subtract-things!=0){
                            // NSString *subtractText = [NSString stringWithFormat:@"-%d件",subtract];
                            // [btnTipsSubtract setTitle:subtractText forState:UIControlStateNormal];
                            $("#btn-sub").val( buyLess(subtract) );
                        }
                        else $("#btn-sub").hide();
                        
                        
                        
                    }
                    else {
                        hiddenTips();
                    }
                }
                else{
                    priceTotal = (Math.floor(things/(buy+free))*buy+things%(buy+free))*price;
                    $("#total-price").text("$"+priceTotal.toFixed(2));
                    
                    // saveUser = price*things-priceTotal;
                    // lbSaveUser.text = [NSString stringWithFormat:@"$%.2f",saveUser];

                    
                    pricePer = priceTotal/things;
                    // lbPricePer.text = [NSString stringWithFormat:@"$%.2f",pricePer];
                    $("#per-price").text("$"+pricePer.toFixed(2));


                    savePer = price-pricePer;
                    $("#save-price").text("$"+savePer.toFixed(2));
                    
                    if (things%(buy+free)==0){
                        tips_buy = Math.floor(things/(buy+free))*buy;
                        tips_free = things-Math.floor(things/(buy+free))*buy;

                        $("#buy-and-get").html( tipString(tips_buy, tips_free, things) );
                        // $("#buy-and-get").text("買"+tips_buy+"送"+tips_free+", 共"+things+"件");
                    }
                    else {
                        tips_buy = Math.floor(things/(buy+free))*buy+things%(buy+free);
                        tips_free= things-things%(buy+free)-Math.floor(things/(buy+free))*buy;
                        tips_single =things%(buy+free);
                        // $("#buy-and-get").html("Buy "+tips_buy+" Get "+tips_free+" Free<br> You will get "+things+" items in total<br>"+tips_single+" items without discount");
                        $("#buy-and-get").html( tipStringWithoutDiscount(tips_buy, tips_free, things, tips_single) );
                        // $("#buy-and-get").text("買"+tips_buy+"送"+tips_free+"(單買"+tips_single+"件), 共"+things+"件");
                    }
                    //buy+free tips
                    if ( things%(buy+free)!=0) {
                        showTips();
                        
                        add = (buy+free)-things%(buy+free);
                        subtract = things%(buy+free);
                        
                        if (add+things<1000){
                             $("#btn-add").val( buyMore(add) );
                        }
                        else $("#btn-add").hide();
                        
                        if (subtract-things!=0){
                             $("#btn-sub").val( buyLess(subtract) );
                        }
                        else $("#btn-sub").hide();
                        
                                            
                    }
                    else {
                        hiddenTips();
                    }
                
                }
                
                //Discount
                // var discount  = pricePer/price;
                // var intDiscount = Math.floor(discount*100);
                // if (intDiscount==100) lbDiscount.text = @"原價";
                // else if (intDiscount%10==0){
                //     if (intDiscount==50) {
                //         lbDiscount.text = @"半價";
                //     }
                //     else lbDiscount.text = [NSString stringWithFormat:@"%d折",intDiscount/10];
                // }
                // else lbDiscount.text = [NSString stringWithFormat:@"%d折",intDiscount];

            
        }
        else {
            $("#per-price").text("-");
            $("#save-price").text("-");
            $("#total-price").text("-");
            $("#buy-and-get").text("");

            $("#tips-text").text("");
            $("#tips-end").text("");
            $("#btn-add").hide();
            $("#btn-sub").hide();

            // lbPricePer.text=@"-        ";
            // lbSavePer.text=@"-        ";
            // lbpriceTotal.text=@"-        ";
            // lbSaveUser.text=@"-        ";
            // lbtips1.text=@"";
            // lbBuyAndGet.text=@"";
            // lbDiscount.text=@"";
        }
        
        // if (savePer==0){
        //     // lbSavePer.text=@"-        ";
        //     // lbSaveUser.text=@"-        ";
        // }
}

function tipsAdd() {
    hiddenTips();
    things+=add;
    $("#tf-buy").val(things);
    cal();
}

function tipsSubtract() {
    hiddenTips();
    things-=subtract;
    $("#tf-buy").val(things);
    cal();
}