//先获取cookie,获取cookid的值。
var str = $.cookie('seller');
// 判断cookie是否存在
var password_bs = false;
var password_repeat = false;
var tel_bs = false;

if(str){
	str = JSON.parse(str);
	$.ajax({
		url: 'http://10.40.153.231:1701/sellerinfoUpdata/getdata',
		type: 'GET',
		data: {
			id:str.id,
			type:str.type
		},
		success:function(data){
			var data = data[0];
			$("#shop_name").val(data.sellerName)
			$("#shop_introduce").val(data.sellerInfo)
			$("#shop_tel").val(data.sellerPhone)
			$("#shop_place").val(data.sellerAddress)
			$("#shop_password").val(data.sellerPass)
		}
	})
	//先判断密码符合
	$("#shop_password").on("blur",function(){
		var str = $("#shop_password").val();
		if(!/.{6,12}/.test(str)){
			$("#layui-form-mid").css("display","block")
			setTimeout(function(){
			$("#layui-form-mid").css("display","none")
			},2000)
			password_bs = false;
		}else{
			password_bs = true;
		}
	})
	////先判断两次密码是否一样
	$("#shop_password_repeat").on("blur",function(){
		if(!($("#shop_password_repeat").val()==$("#shop_password").val())){
			$("#layui-form-m").css("display","block")
			setTimeout(function(){
				$("#layui-form-m").css("display","none")
			},2000)
			password_repeat = false;
		}else{
			password_repeat = true;
		}
	})
	//判断手机号是否符合
	$("#shop_tel").on("blur",function(){
		var str = $("#shop_tel").val();
		if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(str)){
			$("#layui-form-t").css("display","block")
			setTimeout(function(){
				$("#layui-form-t").css("display","none")
			},2000)
			tel_bs = false;
		}else{
			tel_bs = true;
		}
	})
	var src=[];
	function upload(){
			$.ajax({
			url:"http://localhost:1701/upload",
			type:"POST",
			async:false,
			processData:false,
	        contentType:false,
	        cache:false,
	        data:new FormData($("#fo")[0]),
	        success:function(data){
	        	src.push(data);
	        }
		});
		return src;
	}
	//点击立即提交的时候将数据提交上去;
	$("#add_reg").on("click",function(){
		var path=upload();
		var str=path[0];
		if (tel_bs&&password_repeat&&password_bs) {
			$.ajax({
				url: 'http://10.40.153.231:1701/sellerinfoUpdata/senddata',
				type: 'post',
				async:false,
				data: {
					sellerName:$("#shop_name").val(),
					sellerInfo:$("#shop_introduce").val(),
					sellerPhone:$("#shop_tel").val(),
					sellerAddress:$("#shop_place").val(),
					sellerPass:$("#shop_password").val(),
					img:str
				},
				success:function(data){
					layui.use('layer', function(){ 
						layer.msg('修改成功');
					})
				}
			})
		}else{
			layui.use('layer', function(){ 
				layer.msg('信息有误，请核对后再修改');
			})
		}

	})
	//点击重置按钮，清空所有的数据
	$("#resetbtn").on("click",function(){
		$("#shop_introduce").val("")
		$("#shop_tel").val('')
		$("#shop_place").val('')
		$("#shop_password_repeat").val('')
		$("#shop_password").val('')
	})
}

