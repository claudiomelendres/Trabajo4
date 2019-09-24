const express = require('express');
const _ = require('underscore');

const { verificarToken } = require('../middlewares/authenticacion');

let app = express();

let Kudo = require('../models/kudo');
let Sender = require('../utils/sender');


app.get('/kudo', [], (req, res) => {
    Kudo.find({})
        .sort('tema')
        // .populate('fuente', 'nombre email') // para popular el parametro usuario
        // .populate('destino', 'nombre email') // para popular el parametro usuario
        .exec((err, kudos) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            Kudo.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    kudos,
                    total: conteo
                });
            });
        });
});



// verificarToken
app.post('/kudo', [] , (req, res) => {
    //let idUsuario = req.usuario._id;
    let body = req.body;
    //console.log(req);

    let kudo = new Kudo({
        fuente: body.fuente,//idUsuario,
        destino: body.destino,
        tema: body.tema,
        fecha: body.fecha,
        lugar: body.lugar,
        texto: body.texto
    });

    if (body.fuente === body.destino) {
        return res.status(400).json({
            ok: false,
            err : {
                message: 'No puedes enviarte Kudos a ti mismo '
            }
        });
    }

    kudo.save((err, kudoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!kudoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            kudo: kudoDB
        });

        console.log("=============== Destino:");
        console.log(kudoDB.destino);
        Sender.updateUser(kudoDB.destino);
    });
});


app.delete('/kudo/:id', [], (req, res) => {
    let id = req.params.id;
    Kudo.findByIdAndRemove(id, (err, kudoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!kudoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe '
                }
            });
        }

        // if (kudoDB.fuente !== idUsuario) {
        //     return res.status(400).json({
        //         ok: false,
        //         err: {
        //             message: 'No puede borrar Kudos de Otros usuarios '
        //         }
        //     });
        // }

        res.json({
            ok: true,
            message: 'Kudo Borrado'
        });

        console.log("=============== Destino:");
        console.log(kudoDB.destino);
        Sender.updateUser(kudoDB.destino);
    });

});



module.exports = app;