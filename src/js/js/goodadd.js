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
$("#addls").click(function(){
	var path=upload();
	var t = $(".text");
	var str='';
	if(path[0]==''){
		str='xixixi.jpg';
	}else{
		str=path[0];
	}
	//调用判断是否为空的方法
	var tag = isNull(t);
	//console.log(t.eq(2).val());
	if(tag){
		$.ajax({
			type:"POST",
			url:"http://localhost:1701/goodaddls",
			async:false,
			data:{
				name:t.eq(0).val(),
				type:t.eq(1).val(),
				price:t.eq(2).val(),
				stock:t.eq(3).val(),
				info:t.eq(4).val(),
				size:t.eq(5).val(),
				color:t.eq(6).val(),
				fare:t.eq(7).val(),
				seller:getCookie().id,
				img:str
			},
			success:function(data){
				layui.use('layer', function(){ 
				layer.msg(data);
				})
				if(data=="添加成功"){
					for(var i=0;i<t.length;i++){
						t.eq(i).val("");
					}
				}
			}
		})
	}else{
		layui.use('layer', function(){ 
			layer.msg('请填写完整');
		})
	}
})

//判断是否有空值
function isNull(t){
	var flag = true;
	for (var i = 0;i<t.length;i++){
		if(t.eq(i).val()==""){
			flag = false;
		}
	}
	return flag;
}

function getCookie(){
	var str = $.cookie("seller");
	return JSON.parse(str);
}
