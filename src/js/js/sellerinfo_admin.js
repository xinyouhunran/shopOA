//将数据库中的数据进行保存
var arr={}
//页面最开始对ajax的请求
$.ajax({
			url:"http://localhost:1701/sellerinfo_admin",
			type:"GET",
			data:{
			},
           	success: function (data) {
                    arr = JSON.parse(data);
					getList(arr);
                }
})
//对radius进行判断
var status=-1;
$("input[type='radio']").on("click",function(){
	$(this).prop("checked",true).siblings().prop("checked",false);
	status=$(this).val();
})
//提交查询信息
$(".butt").on("click",function(){
	var obj={};
	if($("#sellerName").val()!=""){
		obj.sellerName=$("#sellerName").val();
	}
	if($("#sellerId").val()!=""){
		if( /^[0-9]{1,}$/.test($("#sellerId").val())){
			obj.sellerId=$("#sellerId").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('电商输入格式不正确,搜索商品ID无效');
		})
		}
	}
	if($("#sellerPhone").val()!=""){
		if( /^[0-9]{1,}$/.test($("#sellerPhone").val())){
			obj.sellerPhone=$("#sellerPhone").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('电话输入格式不正确,搜索电话无效');
		})
		}
	}
	if($("#sellerAddress").val()!=""){
		obj.sellerAddress=$("#sellerAddress").val();
	}
		if(status!=-1){
		obj.sellerStatus=status;
	}
	$.ajax({
			url:"http://localhost:1701/sellerinfo_admin/find",
			type:"GET",
			data:{
				sellerId:obj.sellerId,
				sellerName:obj.sellerName,
				sellerPhone:obj.sellerPhone,
				sellerAddress:obj.sellerAddress,
				sellerStatus:obj.sellerStatus
			},
           	success: function (data) {
                 arr = JSON.parse(data);
					getList(arr);
                }
	})
	$("input[type='text']").val("");
	$("input[type='radio']").eq(0).prop("checked",true).siblings().prop("checked",false);
	status=-1;
})
//对注销的点击事件
function clickdel(){
	$("#cancal strong").on("click",function(){
		var sta =$(this).parent().parent().children("td:eq(3)");
	if(sta.html()=="已注销")
	{
		layui.use('layer', function(){ 
			layer.msg('该用户已被注销', {icon: 1});
		})
		  
	}else if(sta.html()=="审核中"){
		layui.use('layer', function(){ 
			layer.msg('该用户还未通过审核，不能进行该操作', {icon: 1});
		})
	}else{
		var id = $(this).parent().parent().children("td:eq(0)").html();
		
		layui.use('layer', function(){
			var $ = layui.jquery, layer = layui.layer;
			layer.confirm('确定是否注销？', {
						  btn: ['确定','取消'] //按钮
					}, function(){
							sta.html("已注销");
							findid(id,2);
							$.ajax({
									url:"http://localhost:1701/sellerinfo_admin/delete",
									type:"GET",
									data:{
										sellerId:id
									},
						           	success: function (data) {
										layer.msg('注销成功', {icon: 1});
						            }
							})
						})
		})
		}
	})
}
//对审核状态的点击事件
function clickagree(){
	$("#exam strong").on("click",function(){
			var sta =$(this).parent().parent().children("td:eq(3)");
			if(sta.html()=="已注销")
			{
				layui.use('layer', function(){ 
					layer.msg('该用户已被注销', {icon: 1});
				})
			}else if(sta.html()=="已注册"){
				layui.use('layer', function(){ 
					layer.msg('该用户已审核通过', {icon: 1});
				})
			}else{
				var id = $(this).parent().parent().children("td:eq(0)").html();
				if($(this).html()=="同意"){
					layui.use('layer', function(){
						var $ = layui.jquery, layer = layui.layer;
						layer.confirm('确定是否同意？', {
							  btn: ['确定','取消'] //按钮
						}, function(){
							sta.html("已注册");findid(id,1);
							$.ajax({
								url:"http://localhost:1701/sellerinfo_admin/exam/agree",
								type:"GET",
								data:{
									sellerId:id
								},
					           	success: function (data) {
									layer.msg('该用户注册已成功', {icon: 1});
					            }
							})
						})
					})
				}else{
					var _this=$(this);
					layui.use('layer', function(){
						var $ = layui.jquery, layer = layui.layer;
						layer.confirm('确定是否拒绝？', {
							  btn: ['确定','取消'] //按钮
						}, function(){
							_this.parent().parent().remove();
							findid(id,3);
							$.ajax({
									url:"http://localhost:1701/sellerinfo_admin/exam/regect",
									type:"GET",
									data:{
										sellerId:id
									},
						           	success: function (data) {
										layer.msg('该用户注册已被拒绝', {icon: 1});
						            }
							})
						})
					})
				}
			}
	})
}

//将数据库中的信息插入到页面中
function getList(arr){
	if(arr.length==0){
		layui.use('layer', function(){ 
			layer.msg('未查询到相关用户信息');
		})
	}else{
		layui.use('laypage', function(){
				  var laypage = layui.laypage;
				  //执行一个laypage实例
				  laypage.render({
				    elem: 'table_page', //注意，这里的 test1 是 ID，不用加 # 号
				    count: arr.length, //数据总数，从服务端得到
				    limit:6,
				    groups:2,
				    jump: function(obj, first){
				    	//obj.curr得到当前页，以便向服务端请求对应页的数据。
						//obj.limit得到每页显示的条数
						var src="";
						for(var i=(obj.curr-1)*obj.limit;i<Math.min(obj.count,obj.limit+(obj.curr-1)*obj.limit);i++){
							var status="";
							if(arr[i].sellerStatus==0){
								status="审核中";
							}else if(arr[i].sellerStatus==1){
								status="已注册";
							}else{
								status="已注销";
							}
							if(arr[i].sellerStatus!=3){
							src+='<tr><td data-id='+arr[i].sellerId+'>'+arr[i].sellerId+'</td><td><img src='+arr[i].sellerImg+'></td><td>'+arr[i].sellerName+'</td><td>'+status+'</td><td>'+arr[i].regTime+'</td><td>'+arr[i].sellerAddress+'</td><td>'+arr[i].sellerPhone+'</td><td id="cancal"><strong>注销</strong></td><td id="exam"><strong>同意</strong><strong>拒绝</strong></td></tr>';
							}
						}
						$("#table_list").html(src);
						clickdel();
					clickagree();
					}
				  })
				  })
					
			}
}
function findid(id,str){
	for(var i in arr){
		if(arr[i].sellerId==id){
			arr[i].sellerStatus=str;
			break;
		}
	}
}

