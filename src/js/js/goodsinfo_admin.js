layui.use('form', function(){
  var form = layui.form;
})

//将数据库中的数据进行保存
//页面最开始对ajax的请求
$.ajax({
			url:"http://localhost:1701/goodinfo_admin",
			type:"GET",
			data:{
			},
           	success: function (data) {
                  var  arr = JSON.parse(data);
                  var arr1=norepeat(arr);
									var str1="<option value='全部类型' selected=''>全部类型</option>";
									for(var i in arr1){
										str1+="<option value='"+arr1[i]+"' >"+arr1[i]+"</option>";
									}
									$("#goodType").html(str1);
									getList(arr);
									
                }
})

//提交查询信息
$("#butt").click(function(){
	var obj={};
	if($("#goodName").val()!=""){
		obj.goodName=$("#goodName").val();
	}
	$("#goodName").val("");
	if($("#sellerId").val()!=""){
		if( /^[0-9]{1,}$/.test($("#sellerId").val())){
			obj.sellerId=$("#sellerId").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('电商输入格式不正确,搜索商品ID无效');
		})
		}
	}
	$("#sellerId").val("");
	if($("#goodId").val()!=""){
		if( /^[0-9]{1,}$/.test($("#goodId").val())){
			obj.goodId=$("#goodId").val();
		}else{
			layui.use('layer', function(){ 
			layer.msg('商品id输入格式不正确,搜索电商ID无效');
		})
		}
	}
	$("#goodId").val("");
	if($("#goodStatus").val()!="-1"){
		obj.goodStatus=$("#goodStatus").val();
	}
if($("#goodType").val()!="全部类型"){
		obj.goodType=$("#goodType").val();console.log($("#goodType").val())
	}
	$.ajax({
			url:"http://localhost:1701/goodinfo_admin/find",
			type:"GET",
			data:{
				goodId:obj.goodId,
				sellerId:obj.sellerId,
				goodName:obj.goodName,
				goodStatus:obj.goodStatus,
				goodType:obj.goodType
			},
           	success: function (data) {
                 var arr = JSON.parse(data);
								getList(arr);
                }
	})
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
							var goodStatus="";
							if(arr[i].goodStatus==0){
								goodStatus="上架";
							}else{
								goodStatus="下架";
							}
							src+='<tr><td data-id='+arr[i].goodId+'>'+arr[i].goodId+'</td><td><img src='+arr[i].goodImg+'></td><td>'+arr[i].goodName+'</td><td>'+arr[i].goodType+'</td><td>'+goodStatus+'</td><td>'+arr[i].pubDate+'</td><td>'+arr[i].goodPrice+'</td><td>'+arr[i].stock+'</td><td>'+arr[i].saleNum+'</td></tr>';
						}
						
						$("#table_list").html(src);
					}
				  })
				  })
					
			}
}

//去除相同的商品类型
function norepeat(arr){
	var arr1=[];
	arr1.push(arr[0].goodType)
	for(var i in arr){
		var bstop=true;
		for(var j in arr1){
				if(arr[i].goodType==arr1[j]){
					bstop=false;
					break;
				}
		}
		if(bstop==true){
			arr1.push(arr[i].goodType);
		}
	}
	return arr1;
}
