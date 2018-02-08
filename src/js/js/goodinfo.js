$.ajax({
	type:"GET",
	url:"http://localhost:1701/goodinfo",
	data:{
		seller:getCookie().id
	},
	success:function(data){
		$("tbody").html(data);
	}
})

$("#searchls").click(function(e){
	e.preventDefault();
	$.ajax({
		type:"POST",
		url:"http://localhost:1701/goodsearch",
		data:{
			name:$("#txt").val(),
			seller:getCookie().id
		},
		success:function(data){
			if(data=="未查询到"){
				layui.use('layer', function(){ 
					layer.msg(data);
				})
			}else{
				$("tbody").html(data);
			}
		}
	})
})

$("tbody").on("click","#down",function(){
	var status = $(this).parent().children().eq(3).html();
	/*console.log(status);*/
	var _this = this;
	if(status==1){
		$.ajax({
			type:"POST",
			url:"http://localhost:1701/gooddown",
			data:{
				id:$(this).parent().children().eq(0).html(),
				seller:getCookie().id
			},
			success:function(data){
				$(_this).parent().children().eq(3).html(parseInt(data));
				layui.use('layer', function(){ 
				layer.msg('下架成功');
				})
			}
	})
	}else{
		layui.use('layer', function(){ 
			layer.msg('此商品已下架');
		})
	}
		
})
function getCookie(){
	var str = $.cookie("seller");
	return JSON.parse(str);
}
