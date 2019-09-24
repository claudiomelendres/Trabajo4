const express = require('express');
const _ = require('underscore');
const mongoose = require('mongoose');



let Kudo = require('../models/kudo');
const mysqlRoute = require('./db_mysql');


mongoose.connect('mongodb://localhost:27017/Kudo', (err, resp) => {

    if (err) throw err;
    console.log('Base de datos ONLINE!');
});

const deleteAllKudos = (userId) => {
    console.log("deleteAllKudos");
    Kudo.deleteMany({destino : userId}, function (err, k) {
        if(err)
            console.log(err);
        if(k)
            console.log(k);
    });

};

const countKudos = (idUser) => {
    console.log("countKudos");
    Kudo.countDocuments({destino: idUser}, function (err, total) {
        if(err)
            console.log(err);
        else {
            console.log(total);
            mysqlRoute.UpdateUser(idUser,Number(total));
        }
    });
};

const findByIdKudo = (id) => {
    console.log("findByIdKudo");
    var id = mongoose.Types.ObjectId(id);
    Kudo.findById(id, function (err, k) {
        if(err)
            console.log(err);
        if(k)
            console.log(k);
    });

};



module.exports = {
    deleteAllKudos,
    countKudos
};