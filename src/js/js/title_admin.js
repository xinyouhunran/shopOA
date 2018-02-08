$("#title_admin").load("title_admin.html",function(){
			layui.use('element', function(){
			  var $ = layui.jquery
			  ,element = layui.element; })
			
			var href =location.href;
			if(/sellerinfo_admin.html/.test(href)){
				$(".ullist li").eq(1).addClass("layui-nav-item layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
			}else if(/goodsinfo_admin.html/.test(href)){
				$(".ullist li").eq(2).addClass("layui-nav-item layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
			}
			
			
			
			//获取管理员名字
			var str = $.cookie("admin");
			var obj = JSON.parse(str);
			$("#admin_name").html(obj.name);
			$("#cancal").click(function(){
				$.cookie("admin","cancal",{expires:-1})
				location.href=encodeURI("reg_admin.html" ,"utf-8");
			})
		})	