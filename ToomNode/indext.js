
var mysql = require("mysql");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

//Database connection
var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'app1'
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    function handleDisconnect() {

        res.locals.mysqlconnection = mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: '1234',
            database: 'app1'
        });

        res.locals.mysqlconnection.connect(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }
        });

        res.locals.mysqlconnection.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }
    handleDisconnect();

    return next();
});


app.get('/', function (req, res) {
    var data = {};
    res.locals.mysqlconnection.query("SELECT * FROM student_tbl", function (err, rows, fields) {
        if (err) {
            data["Data"] = err;
            console.log(err);
        } else {
            if (rows.length != 0) {
                data["Data"] = rows;
                res.json(data);
            } else {
                data["Data"] = 'No data Found..';
                res.json(data);
            }
            res.locals.mysqlconnection.end();
        }
    });
})

app.post('/insertClass',function(req,res){    
    var class_id = req.body.class_id;
    var t_id = req.body.t_id;
    var term = req.body.term;
    var sec = req.body.sec;
    var data = {"Data":""};
    console.log("Insert class!");
    res.locals.mysqlconnection.query("INSERT INTO class_tbl VALUES (?,?,?,?);",[class_id,t_id,term,sec],function(err, rows, fields){
            if(rows.length != 0){
                data["Data"] = rows;
                res.json(data);
                res.locals.mysqlconnection.end();
            }else{
                data["Data"] = 'No data Found..';
                res.json(data);
                res.locals.mysqlconnection.end();
            }
    });
});


app.listen(1337);