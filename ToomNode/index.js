/*
==========================================================
Develop by : Sayomphoo Yongpadhca
API :   |API name           |method     |Discription

==========================================================
*/

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;
var mysql = require('mysql');
var path = require('path');
require('datejs')

var app = express();
app.use(express.static('ToomWeb'))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('ToomWeb'));

app.set('json spaces', 2);
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    function handleDisconnect() {
        res.locals.connection = mysql.createConnection({
            host: "localhost",
            user: "toom",
            password: "toom",
            database: "toom"
        });
        
        res.locals.connection.connect(function(err) {
            if(err) {                               
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }                                     
        });                                     
                                               
        res.locals.connection.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();                      
            } else {                                     
                throw err;                                
            }
        });
    }

    handleDisconnect();

    return next();
});

app.listen(port, function() {
    console.log('toom server --version 0.3.1(  * test login & express image v2.0 ) on port ' + port);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/ToomWeb/login.html'));
});

app.get('/getdate',function(req,res){
    var data = {};
    res.locals.connection.query("select count(bike_licence) as count from owner where cus_phone like '0808888881'",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["count"] = rows;
                console.log(data["count"][0].count)
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/api',function(req,res){
    var data =  'toom api --version 0.3.0\n' + 
                ' + add |get|       /alluser\n' +
                ' + add |get|       /user?phone=\n' +
                ' + add |get|       /user/bike?phone=\n' +
                ' + add |get|       /allhis/user?phone=\n' +
                ' + add |get|       /allhis\n' +
                ' + add |get|       /allhis/status?status=\n' +
                ' + add |get|       /selecthis?his_num=\n' +
                ' + add |get|       /insert/user?phone=&name=&email=\n' +
                ' + add |get|       /update/user?phone=&name=&email=\n' +
                ' + add |get|       /insert/bike?phone=&number=&brand=&model=&color=\n' +
                ' + add |get|       /update/bike?number=&brand=&model=&color=\n' +
                ' + add |get|       /delete/bike?number=\n' +
                ' + add |get|       /insert/history?phone=&number=&lat=&lng=&detail\n' +
                ' + add |get|       /update/history?his_num=&number=&lat=&lng=&detail=&price=&status=\n' +
                ' + add |get|       /delete/history?/his_num=\n' +
                ' + add |get|       /allbike\n' +
                ' + add |post|      /post/history\n' +
                ' + add |put|       /put/history\n' +
                ' + add |put|       /update/history/location\n' +
                ' + add |delete|    /delete/history\n' +
                ' + add |delete|    /delete/current/history\n' +
                ' + add |post|      /insert/user\n' +
                ' + add |put|       /update/user\n' +
                ' + add |post|      /insert/bike\n' +
                ' + add |put|       /update/bike\n' +
                ' + add |delete|    /delete/bike\n' +
                ' + add |get|       /api\n' +
                ' + add |get|       /search/user?search=\n' +
                ' + add |get|       /search/history?search=&status=';
                
                
    res.end(data);
});

/* Routing */
app.get('/alluser',function(req,res){
    var data = {};
    res.locals.connection.query("SELECT * from customer",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
            res.locals.connection.end();
        }
    });
});

app.get('/user',function(req,res){    
    var phone = req.query.phone;
    var data = {"Data":""};
    res.locals.connection.query("SELECT * from customer where cus_phone=?",[phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/user/bike',function(req,res){    
    var phone = req.query.phone;
    var data = {};
    res.locals.connection.query("select * from customer where cus_phone=?",[phone],function(err, rows, fields){
        if (err) {
            data["user"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["user"] = rows;
                res.locals.connection.query("select * from customer natural join bike natural join owner where cus_phone=?",[phone],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["user"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/allhis',function(req,res){    
    var data = {"Data":""};
    res.locals.connection.query("select * from history natural join customer natural join bike order by his_date desc, his_time desc;",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/allhis/status',function(req,res){    
    var status = req.query.status;
    var data = {"Data":""};
    res.locals.connection.query("select * from history natural join customer natural join bike where status=? order by his_date desc, his_time desc;",[status],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/selecthis',function(req,res){ 
    var his_num = req.query.his_num;   
    var data = {"Data":""};
    res.locals.connection.query("select * from history natural join customer natural join bike where his_num = ? order by his_date desc;",[his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/allhis/user',function(req,res){    
    var phone = req.query.phone;
    var data = {"Data":""};
    res.locals.connection.query("select * from history natural join customer natural join bike where cus_phone=? order by his_date desc, his_time desc;",[phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/insert/user',function(req,res){    
    var phone = req.query.phone;
    var name = req.query.name;
    var email = req.query.email;
    var data = {"Data":""};
    res.locals.connection.query("INSERT INTO customer VALUES (?,?,?);",[phone,name,email],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/update/user',function(req,res){    
    var phone = req.query.phone;
    var name = req.query.name;
    var email = req.query.email;
    var data = {"Data":""};
    res.locals.connection.query("update customer set cus_name=?, cus_email=? where cus_phone=? ;",[name,email,phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/insert/bike',function(req,res){
    var phone = req.query.phone;    
    var number = req.query.number;
    var brand = req.query.brand;
    var model = req.query.model;
    var color = req.query.color;
    var data = {"Data":""};
    res.locals.connection.query("INSERT INTO bike VALUES (?,?,?,?);",[number,brand,model,color],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.locals.connection.query("INSERT INTO owner VALUES (?, ?);",[phone,number],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/update/bike',function(req,res){    
    var number = req.query.number;
    var brand = req.query.brand;
    var model = req.query.model;
    var color = req.query.color;
    var data = {"Data":""};
    res.locals.connection.query("update bike set bike_brand=?, bike_model=?, bike_color=? where bike_licence=? ;",[brand,model,color,number],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/delete/bike',function(req,res){    
    var number = req.query.number;
    var data = {"Data":""};
    res.locals.connection.query("delete from bike where bike_licence=?",[number],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/insert/history',function(req,res){    
    var phone = req.query.phone;
    var number = req.query.number;
    var lat = req.query.lat;
    var lng = req.query.lng;
    var detail = req.query.detail;
    var data = {"Data":""};
    res.locals.connection.query("select max(his_num) as max_his from history",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                var max = data["Data"][0].max_his;
                var his_num = max+1
                var currentDate = getCurDate();
                var currentTime = getCurTime();
                res.locals.connection.query("INSERT INTO history VALUES (?, ?, ?, ?, ?, ?, ?, ?, '0', 'แจ้งซ่อม');",[his_num,currentDate,currentTime,phone,number,lat,lng,detail],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/update/history',function(req,res){
    var his_num = req.query.his_num;
    var number = req.query.number;
    var lat = req.query.lat;
    var lng = req.query.lng;
    var detail = req.query.detail
    var price = req.query.price    
    var status = req.query.status;
    var data = {"Data":""};
    res.locals.connection.query("update history set bike_licence=?, lat=?, lng=?, detail=?, price=?, status=? where his_num=?;",[number,lat,lng,detail,price,status,his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/delete/history',function(req,res){    
    var his_num = req.query.his_num;
    var data = {"Data":""};
    res.locals.connection.query("delete from history where his_num=?",[his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/allbike',function(req,res){
    var data = {};
    res.locals.connection.query("SELECT * from bike",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
            res.locals.connection.end();
        }
    });
});

app.post('/post/history',function(req,res){    
    var phone = req.body.phone;
    var number = req.body.number;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var detail = req.body.detail;
    var data = {"Data":""};
    res.locals.connection.query("select max(his_num) as max_his from history",function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                var max = data["Data"][0].max_his;
                var his_num = max+1
                var currentDate = getCurDate();
                var currentTime = getCurTime();
                res.locals.connection.query("INSERT INTO history VALUES (?, ?, ?, ?, ?, ?, ?, ?, '0', 'แจ้งซ่อม');",[his_num,currentDate,currentTime,phone,number,lat,lng,detail],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.put('/put/history',function(req,res){
    var his_num = req.body.his_num;
    var number = req.body.number;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var detail = req.body.detail
    var price = req.body.price    
    var status = req.body.status;
    var data = {"Data":""};
    res.locals.connection.query("update history set bike_licence=?, lat=?, lng=?, detail=?, price=?, status=? where his_num=?;",[number,lat,lng,detail,price,status,his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.put('/update/history/location',function(req,res){
    var his_num = req.body.his_num;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var data = {"Data":""};
    res.locals.connection.query("update history set lat=?, lng=? where his_num=?;",[lat,lng,his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.delete('/delete/history',function(req,res){    
    var his_num = req.body.his_num;
    var data = {"Data":""};
    res.locals.connection.query("delete from history where his_num=?",[his_num],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.post('/insert/user',function(req,res){    
    var phone = req.body.phone;
    var name = req.body.name;
    var data = {"Data":""};
    res.locals.connection.query("INSERT INTO customer VALUES (?,?,'');",[phone,name],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.put('/update/user',function(req,res){    
    var phone = req.body.phone;
    var name = req.body.name;
    var email = req.body.email;
    var data = {"Data":""};
    res.locals.connection.query("update customer set cus_name=?, cus_email=? where cus_phone=? ;",[name,email,phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.post('/insert/bike',function(req,res){   
    var phone = req.body.phone; 
    var number = req.body.number;
    var brand = req.body.brand;
    var model = req.body.model;
    var color = req.body.color;
    var data = {"Data":""};
    var count 

    res.locals.connection.query("select count(bike_licence) as count from owner where cus_phone=?;",[phone],function(err, rows, fields){
        if (err) {
            data["count"] = err;
            res.json(data);
            console.log(err);
        } else {
            if(rows.length != 0){
                data["count"] = rows;
                count = data["count"][0].count
                count++
                if (number == '') {
                    number = phone + '-' + count
                }
                console.log(number);

                res.locals.connection.query("INSERT INTO bike VALUES (?,?,?,?);",[number,brand,model,color],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            
                            res.locals.connection.query("INSERT INTO owner VALUES (?, ?);",[phone,number],function(err, rows, fields){
                                if (err) {
                                    data["Data2"] = err;
                                    res.json(data);
                                    console.log(err);
                                } else {
                                    if(rows.length != 0){
                                        data["Data2"] = rows;
                                        res.json(data);
                    
                                    }else{
                                        data["Data2"] = 'No data Found..';
                                        res.json(data);
                                    }
                                }
                            });
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });

            }else{
                data["count"] = 'No data Found..';
                res.json(data);
            }
        }
    });
});

app.put('/insert/bike',function(req,res){   
    var phone = req.body.phone; 
    var number = req.body.number;
    var brand = req.body.brand;
    var model = req.body.model;
    var color = req.body.color;
    var data = {"Data":""};
    res.locals.connection.query("INSERT INTO bike VALUES (?,?,?,?);",[number,brand,model,color],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.locals.connection.query("INSERT INTO owner VALUES (?, ?);",[phone,number],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.put('/update/bike',function(req,res){    
    var number = req.body.number;
    var brand = req.body.brand;
    var model = req.body.model;
    var color = req.body.color;
    var data = {"Data":""};
    res.locals.connection.query("update bike set bike_brand=?, bike_model=?, bike_color=? where bike_licence=? ;",[brand,model,color,number],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.delete('/delete/bike',function(req,res){   
    var phone = req.body.phone;  
    var number = req.body.number;
    var data = {"Data":""};
    res.locals.connection.query("delete from owner where bike_licence=? and cus_phone=?",[number,phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.locals.connection.query("delete from bike where bike_licence=?",[number],function(err, rows, fields){
                    if (err) {
                        data["Data"] = err;
                        console.log(err);
                    } else {
                        if(rows.length != 0){
                            data["Data"] = rows;
                            res.json(data);
                        }else{
                            data["Data"] = 'No data Found..';
                            res.json(data);
                        }
                    }
                });
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

app.get('/search/user',function(req,res){
    var search = req.query.search;
    var data = {};
    res.locals.connection.query("SELECT * from customer natural join owner natural join bike where cus_phone=? or cus_name=? or cus_email=? or bike_licence=? or bike_brand=? or bike_model=?",[search,search,search,search,search,search],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
            res.locals.connection.end();
        }
    });
});

app.get('/search/history',function(req,res){
    var status = req.query.status;
    var search = req.query.search;
    var data = {};
    res.locals.connection.query("SELECT * from history natural join customer natural join bike where status=? and (cus_phone=? or cus_name=? or cus_email=? or bike_licence=? or bike_brand=? or bike_model=?) order by his_date desc, his_time desc",[status,search,search,search,search,search,search],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
            res.locals.connection.end();
        }
    });
});

app.delete('/delete/current/history',function(req,res){    
    var phone = req.body.phone;
    var data = {"Data":""};
    res.locals.connection.query("delete from history where cus_phone=? and his_num = (select max(his_num) from history where cus_phone=?);",[phone,phone],function(err, rows, fields){
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
            }
        }
        res.locals.connection.end();
    });
});

function getCurDate() {
    var currentDate = Date.today().toString('yyyy-MM-dd')
    var hour = new Date().toString('HH')
    var hour7 = parseInt(hour) + 7
    
    if (hour7 >= 24) {
        hour7 = hour7 - 24
        currentDate = Date.today().addDays(1).toString('yyyy-MM-dd')
    }
    return currentDate;
}

function getCurTime() {
    var hour = new Date().toString('HH')
    var minsec = new Date().toString('mm:ss')
    var hour7 = parseInt(hour) + 7
    
    if (hour7 >= 24) {
        hour7 = hour7 - 24
    }

    var currentTime = hour7 + ':' + minsec;
    return currentTime;
}

app.post('/auth', function(req, res) {
	var username = req.body.username;
    var password = req.body.password;
    var data = {}
    
    if (username && password) {
		res.locals.connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(err, rows, fields){
            if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                data.status = "success";
                data.login = req.session.loggedin
                res.json(data);
			} else {
                req.session.loggedin = false;
                req.session.username = username;
                data.status = "incorrect";
                res.json(data);
			}			
			res.end();
            res.locals.connection.end();
        });
	} else {
        req.session.loggedin = false;
		req.session.username = username;
        data.status = "novalue";
        res.json(data);
        res.end();
    }
});

app.get('/home', function(req, res) {
    var data = {}
	if (req.session.loggedin) {
        data.loggedin = "true";
        data.user = req.session.username;
        res.json(data)
	} else {
		data.loggedin = "false";
        data.user = req.session.username;
        res.json(data)
	}
	res.end();
});

app.get('/logout', function(req, res) {
    req.session.loggedin = false;
	res.end();
});