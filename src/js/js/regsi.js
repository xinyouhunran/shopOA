// var id_bs = false;
var name_bs = false;
var password_bs = false;
var password_repeat = false;
var tel_bs = false;
// var name_bs = true;
	layui.use(['form', 'layedit', 'laydate'], function(){
		var form = layui.form
		,layer = layui.layer
		,layedit = layui.layedit
		,laydate = layui.laydate;

  //日期
  laydate.render({
  	elem: '#date'
  });
  laydate.render({
  	elem: '#date1'
  });
  
  //创建一个编辑器
  var editIndex = layedit.build('LAY_demo_editor');

  // 自定义验证规则
  form.verify({
  	title: function(value){
  		if(value.length < 5){
  			return '标题至少得5个字符啊';
  		}
  	}
  	,pass: [/(.+){6,12}$/, '密码必须6到12位']
  	,content: function(value){
  		layedit.sync(editIndex);
  	}
  });
  
  $("#resetbtn").click(function(){
  	$(".layui-form input").val('')
  })
  
});
//从输入框移出光标时，验证用户名是否重复
$("#shop_name").on("blur",function(){
	$.ajax({
		url:"http://localhost:1701/reg/checkuser",
		type:"get",
		data:{
			name:$("#shop_name").val()
		},
		success:function(data){
			if(data=='1'){
				name_bs = true;
				// console.log(2)
			}else{
				// console.log(9)
				$("#layui-form-name").css("display","block")
				setTimeout(function(){
					$("#layui-form-name").css("display","none")
				},2000)
				name_bs = false;

			}
		}
	})
})
//从输入框移出光标时，验证id名是否重复
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
//判断电话号码
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
//点击提交按钮时，将用户信息添加到后台
var src=[];
function upload(){
		$.ajax({
		url:"http://localhost:1701/upload",
		type:"POST",
		async:false,
		processData:false,
        contentType:false,
        cache:false,
        data:new FormData($("#sellerreg")[0]),
        success:function(data){
        	src.push(data);
        }
	});
	return src;
}
$("#add_reg").on("click",function(){
	if(name_bs&&password_bs&&password_repeat&&tel_bs){
		name_bs = false;
		password_bs = false;
		password_repeat = false;
		tel_bs = false;
		var path=upload();
		var str='';
		if(path[0]==''){
			str='xixixi.jpg';
		}else{
			str=path[0];
		}
		$.ajax({
			url:"http://localhost:1701/reg/adduser/",
			type:"post",
			async:false,
			data:{
				// id:$("#shop_id").val(),
				name:$("#shop_name").val(),
				password:$("#shop_password").val(),
				time:$("#date").val(),
				introduce:$("#shop_introduce").val(),
				place:$("#shop_place").val(),
				tel:$("#shop_tel").val(),
				img:str
			},
			success:function(data){
				// location.herf = url;
				console.log(data)
				if(data==1){
					// layer.msg('chenggong');
					// console.log("niadhao")
					location.href = "reg_admin.html";
				}
				
			}
		})
	}else{
		layui.use('layer', function(){ 
			layer.msg('信息填写错误，请检查后再注册');
		})
				
	}
	
})
//插件
