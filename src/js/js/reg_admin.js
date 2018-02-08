layui.use('element', function(){
			  var element = layui.element;
			  
			  //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
			  var layid = location.hash.replace(/^#test1=/, '');
			  element.tabChange('test1', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项
			  
			  //监听Tab切换，以改变地址hash值
			  element.on('tab(test1)', function(){
			    location.hash = 'test1='+ this.getAttribute('lay-id');
			  });
		});
		
$("#but_ad").click(function(){
	var user = $("#username_ad").val();
	var pass = $("#password_ad").val();
	$.ajax({
			url:"http://localhost:1701/reg_admin",
			type:"POST",
			data:{
				adminName:user,
				adminPass:pass
			},
           	success: function (data) {
                   var arr = JSON.parse(data)[0];	
                   if(arr==null){
	                  	layui.use('layer', function(){ 
							layer.msg('用户或密码不正确，请重新输入');
						})
                   }else{
                   		var obj={"name":arr.adminName,};
                   		console.log(obj);
                   		$.cookie("admin",JSON.stringify(obj));
                   		layui.use('layer', function(){ 
							layer.msg('登录成功');
						})
                   		location.href=encodeURI("userinfo_admin1.html" ,"utf-8");
                   }
                }
})
})

$("#but_go").click(function(){
	var user = $("#username_go").val();
	var pass = $("#password_go").val();
	$.ajax({
			url:"http://localhost:1701/reg_seller",
			type:"POST",
			data:{
				sellerName:user,
				sellerPass:pass
			},
           	success: function (data) {
                   var arr = JSON.parse(data)[0];	
                   if(arr==null){
	                  	layui.use('layer', function(){ 
							layer.msg('用户或密码不正确，请重新输入');
						})
                   }else{
                   		var obj={
                   			"name":arr.sellerName,
                   			"id":arr.sellerId
                   		};
                   		console.log(obj);
                   		$.cookie("seller",JSON.stringify(obj));
                   		layui.use('layer', function(){ 
							layer.msg('登录成功');
						})
                   		location.href=encodeURI("goodsinfo1.html" ,"utf-8");
                   }
                }
})
})
$("#but_reg").click(function() {
	location.href=encodeURI("regsi.html" ,"utf-8");
});