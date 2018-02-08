$("#searchls").click(function(e){
	e.preventDefault();
	$.ajax({
		type:"POST",
		url:"http://localhost:1701/goodsearchId",
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
$("tbody").on("dblclick","td",function(e){
	e.preventDefault();
	var _this = this;
	if($(this).attr("id")!="update"&&$(this).index()!=0&&$(this).index()!=4&&$(this).index()!=9){
		var val = $(this).html();
		var str = `
			<input type="text" style="border:0;width:60px;" value=${val}>
		`;
		$(this).html(str);
		$(this).children().eq(0).focus();
		$(this).children().eq(0).blur(function(){
			var value = $(_this).children().eq(0).val();
			$(_this).children().eq(0).remove();
			$(_this).html(value);
		})
	}else{
		layui.use('layer', function(){ 
			layer.msg('此项不可修改');
		})
	}
})

$("tbody").on("click","#update",function(){
	$.ajax({
		type:"POST",
		url:"http://localhost:1701/goodupdate",
		data:{
			id:$(this).parent().children().eq(0).html(),
			name:$(this).parent().children().eq(1).html(),
			type:$(this).parent().children().eq(2).html(),
			status:$(this).parent().children().eq(3).html(),
			price:$(this).parent().children().eq(5).html(),
			stock:$(this).parent().children().eq(6).html(),
			salenum:$(this).parent().children().eq(7).html(),
			message:$(this).parent().children().eq(8).html(),
			size:$(this).parent().children().eq(10).html(),
			color:$(this).parent().children().eq(11).html(),
			fare:$(this).parent().children().eq(12).html(),
			seller:$(this).parent().children().eq(13).html(),
		},
		success:function(data){
			if(data=="success"){
				layui.use('layer', function(){ 
			layer.msg('修改成功');
		})
			}
		}
	})
})
function getCookie(){
	var str = $.cookie("seller");
	return JSON.parse(str);
}