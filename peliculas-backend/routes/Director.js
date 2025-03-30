const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Director = require('../models/Director');
const mongoose = require('mongoose');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

router.post('/',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let director = new Director();

            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            director.fechaCreacion = new Date();
            director.fechaActualizacion = new Date();

            director = await director.save();

            res.send(director);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error')
        }
    }
);

router.put('/:directorId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    ],
    async function(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.directorId)) {
                return res.status(400).send('ID no válido');
            }
            const directorId = mongoose.Types.ObjectId(req.params.directorId);
            let director = await Director.findById(directorId);
            if (!director) {
                return res.status(404).send('Director no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            director.fechaActualizacion = new Date();

            director = await director.save();

            res.send(director);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error');
        }
    }
);



module.exports = router;