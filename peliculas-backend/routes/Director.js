const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Director = require('../models/Director');

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
            let director =  await director.findById(req.params.directorId);
            if (!director) {
                return res.send('director no existe');
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
            res.send('Ocurrio un error');
        }
    }
);

module.exports = router;