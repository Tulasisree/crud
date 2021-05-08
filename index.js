const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'))

var con = mysql.createConnection({
    host: "localhost",
    port:3307,
    user: "root",
    password: "tulasisree",
    database:'tulasi'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /*con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });*/
      /*var sql = "CREATE TABLE users (fname VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });*/
  });


  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/

app.get('/',function(req,res){  
    res.sendFile(__dirname+"/index.html")
})

app.post('/',function(req,res){

    var sql1 = "INSERT INTO users (fname,lname,email,dob) VALUES ('"+req.body.fname+"','"+req.body.lname+"','"+req.body.email+"','"+req.body.dob+"')";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    res.redirect('/data')
  });
   
})


app.get('/data',function(req,res){
    let sql = 'SELECT * FROM users'
    let query = con.query(sql,function(err,result){
        if (err) throw err;
        res.render('list',{users:result})
    })
    
})



app.get('/edit/:userID',function(req,res){
     var userid = req.params.userID;
     console.log(userid)
     var sql = `SELECT * FROM users WHERE id = ${userid}`;
     
     con.query(sql,function(err,result){
         if (err) throw err;
         console.log(result);
         res.render('edit_user',{user:result[0]})
     })
})

app.post('/update',function(req,res){
    var userid = req.body.id;
    console.log(userid);
    console.log(req.body.fname)
    var sql1 = "UPDATE users SET fname='"+req.body.fname+"',lname = '"+req.body.lname+"',email='"+req.body.email+"',dob='"+req.body.dob+"' WHERE id = '"+userid+"' ";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    res.redirect('/data')
  });
})

app.get('/delete/:userID',function(req,res){
    var userid = req.params.userID;
    console.log(userid);

    var sql = `DELETE FROM users WHERE id = ${userid}`;
    
    con.query(sql,function(err,result){
        if (err) throw err;
        res.redirect('/data')
        })
})

 
app.listen(3000,function(){
    console.log("server started at port 3000")
})
