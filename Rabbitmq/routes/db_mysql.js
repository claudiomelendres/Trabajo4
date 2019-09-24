const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'kudos',
    port: '3308',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


// app.listen(3001, () => console.log('Express server is runnig at port no : 3001'));


const UpdateUser = (id, qty) => {
    console.log("UpdateUser");
    var sql = "update users set \
    KudosQTY ='"+qty+"' where id = '"+id+"';";

    mysqlConnection.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        else
        {
            console.log("1 record updated");
        }
    })

}

module.exports = {
    UpdateUser
};


