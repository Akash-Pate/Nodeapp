 const mysql = require('mysql');
 const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"" ,
    database:"art_gallery"
 });
 con.connect((err)=> {
    if(err){
        console.warn("error in connection")
    }
    console.log('connected as id ');
 });
 module.exports = con;


 