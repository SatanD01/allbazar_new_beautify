if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/service-worker.js')
  .then(function(reg){

 }).catch(function(err) {

});
}



$(window).ready(function(){
	$("[data-r-load]").each(function(){
		$(this).attr("src",$(this).attr("data-r-load"));
	})
})


function closeMenu(){
	$(".left-menu").css("right","-9999px")
}
function showMenu(){
	$(".left-menu").css("right","0")
}
$(".closeMenu").click(function(){
	closeMenu();
});
$(".showMenu").click(function(){
	showMenu();
})
$("#searchInp").keyup(function(){
if($(this).val())
	$.get("/cat/search.php",{q:$(this).val()},function(d){
		$("#searchRes").html(d)
	})
else
	$("#searchRes").html("")
});


$("body").on("click",".closesres",function(){
	$("#searchRes").html("");
	$("#searchInp").val("");
})



$(".js-togFilter").click(function(){
	$(".filterBody").toggleClass("d-none");
})


$("body").on("change",".cninp",function(){
var bid = $(this).attr("data-bid");
	$.get("/cart/api.php",{"updBasket":bid,"cnt":$(this).val(),"bMode":$(this).attr("data-bmode")},function(d){
		d = $.parseJSON(d);

		if(d.bitotal){
			basketTotal = d.summ;
			calcBasketTotal()
			$("#bitotal"+bid).html(d.bitotal);
		}


		$(".bcnt").html(d.cnt);
		$(".bsumm").html(d.summ);
		

	});
})

$("body").on("click",".cnminus",function(){

	var inp = $(".cninp",$(this).parents(".jsCounter"));
	var step = 1;
	if(inp.attr("data-step"))
	step = parseFloat(inp.attr("data-step"));
	
	var v = parseFloat(inp.val());
	if(v>step)
	inp.val(v-step);
	inp.change();
	
	
})
$("body").on("click",".cnplus",function(){
	var inp = $(".cninp",$(this).parents(".jsCounter"));
	var step = 1;
	if(inp.attr("data-step"))
	step = parseFloat(inp.attr("data-step"));

	var v = parseFloat(inp.val());
	inp.val(v+step);
	inp.change();
})


$("body").on("click",".jsAddCart",function(){
	var btn = $(this);
	btn.hide()
//	btn.after('<button class="jsGoBasket mb-2 btn-sm w-100 btn-outline-primary"><i class="fa fa-check"></i> Добавлено</button>');

	$(".jsanimupdn").addClass("animated");
	$(".jsmakeshake").addClass("animated");
	$.get("/cart/api.php",{add:1,btn:$(this).attr("data-btn"),step:$(this).attr("data-step"),item:$(this).attr("data-id"),type:$(this).attr("data-type"),offer:$(this).attr("data-offer")},function(d){
		d = $.parseJSON(d);
		btn.after(d.btn)
		$(".bcnt").html(d.cnt);
		$(".bsumm").html(d.summ);

	});
	
	
	
	setTimeout(function(){$(".jsanimupdn").removeClass("animated")}, 2000)
	setTimeout(function(){$(".jsmakeshake").removeClass("animated")}, 2000)	
	
if(location.host=="allbazar.top"){
	ym(46369467,'reachGoal','addBasket')
}
	
	return false;
});

$("#basketForm").submit(function(){
	$("#makeOrder").attr("disabled","1").html("Идет оформление");
});

$("#basketForm").on("click",".delItem",function(){
	
	$.get("/cart/api.php",{delItem:$(this).attr("data-id")},function(d){
		d = $.parseJSON(d);
		if(d.cnt==0)
		location.reload();
		
		$(".bcnt").html(d.cnt);
		$(".bsumm").html(d.summ)
		basketTotal = d.summ;
		calcBasketTotal()

	});
	$(this).parents(".cartItem").remove();		
	//reloadBasket({delItem:$(this).attr("data-id")});
});


function calcBasketTotal(){
	dprice = parseFloat($(".dSelector:checked").attr("data-price"));
	$("#basketTotal").html(basketTotal);
	$("#deliverTotal").html(dprice)
	$("#orderTotal").html(parseInt(basketTotal)+parseInt(dprice))
	
	
	console.log(basketTotal)
		console.log(dprice)
}



/*
$("body").on("click",".jsGoBasket",function(){
	location.href='/cart/';
	return false;
})
*/


/*
$("body").on("click",".jsAddInCart",function(){
	var btn = $(this);
	btn.attr("disabled","1");
	$.get("/cart/api.php",{add:1,item:$(this).attr("data-id"),offer:$(this).attr("data-offer")},function(d){
		reloadBasket({updBasket:1});
	});
	return false;
});
*/





/*
function updBasketCnt(){
	$.get("/cart/api.php",{getBasket:1},function(d){
		d = $.parseJSON(d);
		$(".bcnt").html(d.cnt)
	})	
}
*/

//updBasketCnt();

$.mask.definitions['9'] = '';
$.mask.definitions['d'] = '[0-9]';

function makePhoneMask(){
	$(".makePhone").mask("+\998 dd ddd-dd-dd")
}
makePhoneMask()


function resizeImage(){
	$('.listItem').each(function(){
		$(this).find('img').attr('style','height:'+$(this).width()+'px;');
	});	
}
resizeImage();


/*
	$("#basketForm").on("click",".delItem",function(){
		//$(this).parents(".cartItem").remove();
		
		reloadBasket({delItem:$(this).attr("data-id")});
	});
	
	$("#basketForm").on("change",".updBasket",function(){
		//$(this).parents(".cartItem").remove();
		
		reloadBasket({updBasket:1});
	});	
*/
/*
	
	
	function reloadBasket(params){
		var fdata = $("#basketForm").serialize();
		$("#basketForm").html("");
		$("#loadingBasket").show();
		$.get("?ajx=1",fdata+"&"+$.param(params),function(d){
			$("#loadingBasket").hide();
			$("#basketForm").html(d);
			makePhoneMask()
		})		
	}
*/

var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
	  autoplay: {
		  delay: 5000,
	  },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var swiper2 = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
    });