//返回头部、底部
function goTop() { window.scroll(0, 0)}
function goBottom(){var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);}

//返回头部、底部
$(function () {
	$(".gotop").click(/*定义返回顶部的动画*/
	function () {
		$('html,body').animate({ scrollTop: 0 }, 700);
	});
	$(".gohome").click(/**/
	function(){
		/*HomepageFavorite.Homepage();*/
	});
	$(".gobottom").click(/*定义返回底部的动画*/
	function () {
		var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);
	});
	$(document).scroll(
		function(){
			if($(document.body).scrollTop() + $(document).scrollTop() > 300 && $(document.body).scrollTop() + $(document).scrollTop() < 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","block"),$(".gotop").css("display","none");
			}else if($(document.body).scrollTop() + $(document).scrollTop() > 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","none"),$(".gotop").css("display","block");				
			}else{
				$(".go").css("display","none");
			}
	    }
	);
});

$(function () {

	//搜索
	var searchA = $('.search-a');
	var search = searchA.siblings('.search');
	searchA.on('click',function(){
		$(this).css('display','none');
		search.css('display','inline-block');
		return false;
	});
	search.on('click',function(){
		return false;
	});
	$(document).on('click',function(){
		searchA.css('display','inline-block');
		search.css('display','none');
	});
	
	//导航
	var navMenu = $('.mobile-menu');
	var topBar = $(".top-bar-section");
	navMenu.click(function(){
		$(this).toggleClass('is-open');
		topBar.toggleClass("show");
	});
	
	//顶部和底部动画效果
	var $animateBg = $(".animate-bg");
	var $animateTopBg = $(".animate-top-bg");
	var $animateBottomBg = $(".animate-bottom-bg");
	var bottomH = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) - document.body.clientHeight;
	
	function showTopAnimate(){
		if($(document.body).scrollTop()==0){
			$animateTopBg.find(".stant-left,.stant-right").addClass("fadeInUp animated");
		}else{
			$animateTopBg.find(".stant-left,.stant-right").removeClass("fadeInUp animated");
		}
	}
	function showBottomAnimate(){
		if($(document.body).scrollTop()== bottomH){
			$animateBottomBg.find(".stant-left,.stant-right").addClass("fadeInDown animated");
		}else{
			$animateBottomBg.find(".stant-left,.stant-right").removeClass("fadeInDown animated");
		}
	}
	showTopAnimate();
	$(window).scroll(showTopAnimate);
	$(window).scroll(showBottomAnimate);
	
	//默认背景选择
	var $instalImg = $('.instal-img').find('li input[type=radio]');
	var $img = '../images/body-bg.jpg';
	$instalImg.click(function(){
		$img = $($(this).next().find('img'))[0].src;
		defaultLayout();
	});
	
	//默认颜色选择
	var $instalLi = $('.instal-color').find('li');
	var $instal = $('.instal-color').find('li input[type=radio]');
	var $span = "";
	$instalLi.mouseover(function(){
		$span = $(this).find("input[type=radio]").next().find('span');
		changed($span);
	}).mouseout(function(){
		$span = "";
		if($('[name="default-color"]:checked').length <= 0){
			defaultLayout();
		}else{
			$span = $('[name="default-color"]:checked').next().find('span');
			changed($span);
		}
	});
	$instal.click(function(){
		$span = $(this).next().find('span');
		changed($span);
	});
//	var $setDefault = $("#setDefault");
//	$setDefault.on("click",function(){
//		$span = "";
//		console.log($instal.find("input[type=radio]:checked"));
//		$instal.find("input[type=radio]:checked").each(function(){
//			$(this).checked = false;
//		});
//		//$(this).checked = true;
//		defaultLayout();
//	});
	function changed(arr){
		less.modifyVars({
			'background-color':$(arr[0]).css('backgroundColor'),
			'primary-color':$(arr[1]).css('backgroundColor'),
			'panel-color':$(arr[2]).css('backgroundColor'),
			'base-font-color':$(arr[3]).css('backgroundColor'),
			'body-bg-img':"url(" + $img + ")"
		});
	}
	function defaultLayout(){
		if($span == ""){
			less.modifyVars({
				'background-color':"#fff",
				'primary-color':"#5acdb3",
				'panel-color':"#fafafa",
				'base-font-color':"#333",
				'body-bg-img':"url(" + $img + ")"
			});
		}else{
			changed($span);
		}
	}
	
	//模板风格切换
	var $changeStyle = $("#change-style"),$post = $("#post");
	var index = 1;
	var astyle = new Array("large-block-grid-1 medium-block-grid-1","changed-img","large-block-grid-2 medium-block-grid-2","list-style large-block-grid-2 medium-block-grid-2","list-style large-block-grid-3 medium-block-grid-3");
	var	atext = new Array("布局A","布局B","布局C","布局D","布局E");
	$changeStyle.text(atext[0]);
	$post.addClass(astyle[0]);
	$post.masonry({
		itemSelector: '.postitem',
		resize: true
	});
	$changeStyle.on("click",function(){
		$post.find("li .info-box-part").show();
		$post.find("li .info-box-all").hide();
		$post.find("li").removeClass("show-all");
		$(this).text(atext[index]);
		$(this).parent().siblings().find(".post").attr("class","post").toggleClass(astyle[index]);
		index++;
		if(index >= astyle.length){
			index = 0;
		}
		$post.masonry({
			itemSelector: '.postitem',
			resize: true
		});
	});
});