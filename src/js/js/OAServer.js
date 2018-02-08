var express = require("express");
var mysql = require("mysql");
var url = require("url");
var multer = require ("multer");
var querystring  = require("querystring");
//实例化express
var app = express();
app.use(express.static('../public'));
var connection = mysql.createConnection({
		host:"10.40.153.231",
		user:"liusong",
		password:"123456",
		database:"shopinfo"
	});
connection.connect();

/*-----------author：jianxinfeng-------------*/
//对seller表的所有数据提取
app.get("/sellerinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from seller`,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
		})
})
//对user表的所有数据提取
app.get("/userinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from userinfo`,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
		})
})
//对user表的所有数据提取
app.get("/goodinfo_admin",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`select * from good`,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
		})
})

//对seller表进行查询操作
app.get("/sellerinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from seller where ";
		for(var i in req.query){
			if(i=="sellerId"  ||  i=="sellerStatus"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="sellerName"  ||  i=="sellerAddress"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对userinfo表进行查询操作
app.get("/userinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from userinfo where ";
		for(var i in req.query){
			if(i=="userId"  ||  i=="sex"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="userName"  ||  i=="userAddress"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对userinfo表进行查询操作
app.get("/goodinfo_admin/find",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	var sql="select * from good where ";
		for(var i in req.query){
			if(i=="goodId"  ||  i=="goodSatus" || i=="stock" || i=="saleNum" || i=="sellerId"){
				sql+=i+"="+req.query[i]+" and ";
			}else if(i=="goodName"){
				sql+=i+" like '%"+req.query[i]+"%' and ";
			}else{
				sql+=i+"='"+req.query[i]+"' and ";
			}
		}
		sql = sql.substr(0,sql.length-4);
			connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
			})
})
//对seller表进行状态修改操作
app.get("/sellerinfo_admin/delete",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "update seller set sellerStatus=2 where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//对seller表进行审核操作的同意
app.get("/sellerinfo_admin/exam/agree",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "update seller set sellerStatus=1 where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//对seller表进行审核操作的拒绝
app.get("/sellerinfo_admin/exam/regect",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 var id = req.query.sellerId;
	 var sql = "delete from seller where sellerId="+id;
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send("success");
				
		})
})
//post请求体模块
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//管理员的登录
app.post("/reg_admin",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	//req.body是post传输的数据
	var sql="select adminName from admininfo where "
	for(var i in req.body){
		sql+=i+"='"+req.body[i] +"'and ";
	}
	sql = sql.substr(0,sql.length-4);
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
				
		})
})

//电商的登录
app.post("/reg_seller",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	//req.body是post传输的数据
	var sql="select sellerId,sellerName from seller where "
	for(var i in req.body){
		sql+=i+"='"+req.body[i] +"'and ";
	}
	sql = sql.substr(0,sql.length-4);
	 connection.query(sql,function(error,results,fields){
				if (error) throw error;
				res.send(JSON.stringify(results));
				
		})
})
/*-----------end-------------*/

/*-----------author：wangying-------------*/
app.get('/orderlist', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var cookId=req.query.cookId;
    var sql="SELECT a.* ,b.*,c.* ,d.sellerId from orderinfo AS a,good AS b,userinfo as c,seller AS d  WHERE a.goodId=b.goodId AND a.userId=c.userId AND a.sellerId=d.sellerId AND a.sellerId="+cookId;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        var data=JSON.stringify(results);
        res.send(data)
    });
});
app.get('/orderlist/searchOrder', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql="SELECT a.* ,b.*,c.* ,d.sellerId from orderinfo AS a,good AS b,userinfo as c,seller AS d  WHERE a.goodId=b.goodId AND a.userId=c.userId AND a.sellerId=d.sellerId AND ";
    for(var i in req.query){
        if(i=="cookId" && req.query[i]){
            sql+="a.sellerId="+req.query.cookId+" AND ";
        }
        if(i=="orderidtext" && req.query[i]){
            sql+="a.orderId="+req.query.orderidtext+" AND ";
        }
        if(i=="usernametext" && req.query[i]){
            sql+="c.userName like '%"+req.query.usernametext+"%' AND "
        }
        if(i=="ordertimetext" && req.query[i]){
            sql+="a.orderTime='"+req.query.ordertimetext+"' AND "
        }
        if(i=="quiz1" && req.query[i]){
            sql+="a.reciveAddress like '%"+req.query.quiz1+"%' AND ";
        }
    }
    sql=sql.slice(0,sql.length-5);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        var data=JSON.stringify(results);
        res.send(data)
    });
});
app.get('/orderlist/editOrder', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var orderIdedit=req.query.orderIdedit;
    var sql="UPDATE orderinfo SET orderStatus=0 WHERE orderinfo.orderId ="+orderIdedit;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send("success")
    });
});
/*-----------------liusong----------------*/
//获取所有的商品信息
app.get('/goodinfo', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
   var query = url.parse(req.url).query;
	var obj = querystring.parse(query);
	connection.query(`select * from good where sellerId = ${obj.seller}`,function(error,result){
		if(error) throw error;
		
		var str = restr(result);
		res.send(str);
	})
});

//根据名字查找对应的商品
app.post('/goodsearch', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
	connection.query(`select * from good where goodName like '%${req.body.name}%' and sellerId=${req.body.seller}`,function(error,result){
		if(error) throw error;
		if(result.length==0){
			res.send("未查询到");
		}else{
			var str = restr(result);
			res.send(str);
		}
	});
});

//根据id查找对应商品
app.post('/goodsearchId', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
	connection.query(`select * from good where goodId = ${req.body.name} and sellerId=${req.body.seller} `,function(error,result){
		if(error) throw error;
		if(result.length==0){
			res.send("未查询到");
		}else{
			var str = "";
			for (var i in result){
						str+=`
								<tr>
							  		<td>${result[i].goodId}</td>
							  		<td>${result[i].goodName}</td>
							  		<td>${result[i].goodType}</td>
							  		<td>${result[i].goodStatus}</td>
							  		<td>${result[i].pubDate}</td>
							  		<td>${result[i].goodPrice}</td>
							  		<td>${result[i].stock}</td>
							  		<td>${result[i].saleNum}</td>
							  		<td>${result[i].goodinfo}</td>
							  		<td><img src=${result[i].goodImg}></td>
							  		<td>${result[i].goodSize}</td>
							  		<td>${result[i].goodColor}</td>
							  		<td>${result[i].goodFare}</td>
							  		<td>${result[i].sellerId}</td>
							  		<td id="update">更改</td>
							  	</tr>
					`
					}
			res.send(str);
		}
	});
});
//下架商品
app.post("/gooddown",function(req,res){
	 res.append("Access-Control-Allow-Origin","*");
	 connection.query(`update good set goodStatus = '0' where goodId='${req.body.id}'`,function(error,result){
	 	if(error) throw error;
	 	res.send('0');
	 })
})

//更改信息
app.post("/goodupdate",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	if(req.body.status!=0&&req.body.status!=1){
		req.body.status=1;
	}
	connection.query(`update good set goodName = '${req.body.name}',goodType='${req.body.type}',goodStatus='${req.body.status}',goodPrice='${req.body.price}',stock='${req.body.stock}',saleNum='${req.body.salenum}',goodInfo='${req.body.message}',goodSize='${req.body.size}',goodColor='${req.body.color}',goodFare='${req.body.fare}',sellerId=${req.body.seller} where goodId=${req.body.id}`,function(error,result){
		if(error) throw error;
		res.send("success");
	});
})

//添加商品
app.post("/goodaddls",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var r = req.body;
	var reg = new RegExp("^(红|橙|黄|绿|蓝|靛|紫|黑|白)色$","gi");
	var time = stringTime();
	var stock = parseInt(r.stock);
	if(r.price>=0&&stock>=0&&r.fare>=0){
		if(reg.test(r.color)){
			connection.query(`insert into good(goodName,goodType,goodStatus,pubDate,goodPrice,stock,saleNum,goodInfo,goodImg,goodSize,goodColor,goodFare,sellerId) values ('${r.name}','${r.type}',1,'${time}','${r.price}',${stock},0,'${r.info}','http://10.40.153.231:88/project/ShopOASystem/src/public/${r.img}','${r.size}','${r.color}','${r.fare}',${r.seller})`,function(error,result){
				if(error) throw error;
				res.send("添加成功");
			})
		}else{
			res.send("颜色输入不符合要求");
		}
	}else{
		res.send("价格，库存，运费存在输入不符合要求");
	}
})
/*-----------end-------------*/

/*-----------------huchong----------------*/
app.get('/reg/checkuser', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var str12 = `SELECT * FROM seller where sellerName = '${req.query.name}'`;
    connection.query(str12, function (error, results, fields) {
            if (error) throw error;
                //返回一个数据
            if(results==''){
                //表示没有找到
                res.send("1")
            }else{
            	res.send("0")
            }
            
        });
});
//向数据库里面添加数据
app.post('/reg/adduser/', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
        var str11 = `INSERT INTO seller (sellerName, sellerPass,regTime,sellerInfo,sellerAddress,sellerPhone,sellerStatus,sellerImg) VALUES ('${req.body.name}',${req.body.password},'${req.body.time}','${req.body.introduce}','${req.body.place}',${req.body.tel},0,'http://10.40.153.231:88/project/ShopOASystem/src/public/${req.body.img}')`;
        connection.query(str11, function (error, results, fields) {
        	if (error) throw error;
        		res.send('1');
            });
    
});
//获取自己的个人信息
app.get('/sellerinfoUpdata/getdata', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    connection.query(`SELECT * FROM seller where sellerId = '${req.query.id}'`, function (error, results, fields) {
            if (error) throw error;
                //返回一个数据
                //console.log(results)
            if(results==''){
                //表示没有找到
                res.send("1")
            }else{
            	res.send(results)
            }
            
        });
});
//修改数据库里面的数据
app.post('/sellerinfoUpdata/senddata', function(req, res) {
    res.append("Access-Control-Allow-Origin","*");
    var str11 = `UPDATE seller SET sellerInfo = '${req.body.sellerInfo}',sellerAddress = '${req.body.sellerAddress}',sellerPhone=${req.body.sellerPhone},sellerPass= '${req.body.sellerPass}',sellerImg= '${req.body.img}' WHERE sellerName = '${req.body.sellerName}'`
    connection.query(str11, function (error, results, fields) {
	if (error) throw error;
        res.send('1');
    });   
});


/*-----------------end----------------*/

var storage = multer.diskStorage({
	//存储文件地方
	destination:function(req,res,cb){
		cb(null,"../../public");
	},
	//存储文件名字
	filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})
//配置上传参数
var upload = multer({
	storage:storage
})
app.post("/upload",upload.any(),function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	if(req.files.length==0){
		res.send('');
	}else{
		res.send(req.files[0].filename);
	}

	//console.log(req.files[0])
})

app.listen(1701);

/*liusong*/
function restr(result){
	var str = "";
	for (var i in result){
				str+=`
						<tr>
					  		<td>${result[i].goodId}</td>
					  		<td>${result[i].goodName}</td>
					  		<td>${result[i].goodType}</td>
					  		<td>${result[i].goodStatus}</td>
					  		<td>${result[i].pubDate}</td>
					  		<td>${result[i].goodPrice}</td>
					  		<td>${result[i].stock}</td>
					  		<td>${result[i].saleNum}</td>
					  		<td>${result[i].goodinfo}</td>
					  		<td><img src=${result[i].goodImg}></td>
					  		<td>${result[i].goodSize}</td>
					  		<td>${result[i].goodColor}</td>
					  		<td>${result[i].goodFare}</td>
					  		<td>${result[i].sellerId}</td>
					  		<td id="down">下架</td>
					  	</tr>
			`
			}
	return str;
}
//获取年月日
function stringTime(sign){
	var d = new Date();
	if(!sign){
		sign = '-';
	}
	return d.getFullYear()+sign+buling(d.getMonth()+1)+sign+buling(d.getDate());
}
//补0
function buling(num){
	if(num<10){
		num = '0'+num;
	}
	return num;
}

