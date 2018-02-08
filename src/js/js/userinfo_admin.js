//将数据库中的数据进行保存
var arr={}
//页面最开始对ajax的请求
$.ajax({
			url:"http://localhost:1701/userinfo_admin",
			type:"GET",
			data:{
			},
           	success: function (data) {
                    arr = JSON.parse(data);
					getList(arr);
                }
})
//对radius进行判断
var sex=-1;
$("input[type='radio']").on("click",function(){
	$(this).prop("checked",true).siblings().prop("checked",false);
	sex=$(this).val();
})
//提交查询信息
$(".butt").on("click",function(){
	var obj={};
	if($("#userName").val()!=""){
		obj.userName=$("#userName").val();
	}
	if($("#userId").val()!=""){
		if( /^[0-9]{1,}$/.test($("#userId").val())){
			obj.userId=$("#userId").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('用户ID输入格式不正确,搜索用户ID无效');
		})
		}
	}
	if($("#phoneNum").val()!=""){
		if( /^[0-9]{1,}$/.test($("#phoneNum").val())){
			obj.phoneNum=$("#phoneNum").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('联系电话输入格式不正确,搜索联系电话无效');
		})
		}
	}
	if($("#userAddress").val()!=""){
		obj.userAddress=$("#userAddress").val();
	}
		if(sex!=-1){
		obj.sex=sex;
	}
	$.ajax({
			url:"http://localhost:1701/userinfo_admin/find",
			type:"GET",
			data:{
				userId:obj.userId,
				userName:obj.userName,
				phoneNum:obj.phoneNum,
				userAddress:obj.userAddress,
				sex:obj.sex
			},
           	success: function (data) {
                 arr = JSON.parse(data);
					getList(arr);
                }
	})
	$("input[type='text']").val("");
	$("input[type='radio']").eq(0).prop("checked",true).siblings().prop("checked",false);
	sex=-1;
})


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
							var sex="";
							if(arr[i].sex==0){
								sex="男";
							}else{
								sex="女";
							}
							src+='<tr><td data-id='+arr[i].userId+'>'+arr[i].userId+'</td><td><img src='+arr[i].userImg+'></td><td>'+arr[i].userName+'</td><td>'+sex+'</td><td>'+arr[i].birthDay+'</td><td>'+arr[i].userAddress+'</td><td>'+arr[i].phoneNum+'</td></tr>';
						}
						$("#table_list").html(src);
					}
				  })
				  })
					
			}
}

