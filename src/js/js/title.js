$("#title_admin").load("title.html",function(){
			layui.use('element', function(){
			  var $ = layui.jquery
			  ,element = layui.element; })
			
			var href =location.href;
			if(/orderlist.html/.test(href)){
				console.log($(".ullist li").eq(1));
				$(".ullist li").eq(1).addClass("layui-nav-item layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
			}	
			//获取管理员名字
			var str = $.cookie("seller");
			var obj = JSON.parse(str);
			$("#seller_name").html(obj.name);
			$("#cancal").click(function(){
				$.cookie("seller","cancal",{expires:-1})
				location.href=encodeURI("reg_admin.html" ,"utf-8");
			})
		})