const { Router } = require('express');
const Media = require('../models/Media');
const { validarMedia } = require('../helpers/validar-media');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const medias = await Medias.find().populate([
            {
                path: 'genero', select: 'nombre estado descripcion'
            },
            {
                path: 'director', select: 'nombre estado'
            },
            {
                path: 'productora', select: 'nombre estado slogan descripcion'
            },
            {
                path: 'tipo', select: 'nombre descripcion'
            }
        ]);
        res.send(medias)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar medias')
    }
});

router.post('/', async function(req, res) {
    try {
        const validaciones = validarMedia(req);

        if (validaciones.lenght > 0) {
            return res.status(400).send(validaciones);
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });

        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe el serial para otra pelicula')
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sipnosis = req.body.sipnosis;
        media.peliculaURL = req.body.peliculaURL;
        media.fotoPortada = req.body.fotoPortada;
        media.añoEstreno = req.body.añoEstreno
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();

        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio algo al crear la Media');
    }
});

router.put('/:mediaId', async function(req,res) {
    try {
        let media = await Media.findById(req.params.mediaId);
        if (!media) {
            return res.status(400).send('Media no existe');
        }
    
        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial, _id: { $ne: media._id } });
        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe el serial para otra pelicula')
        }

        const validaciones = validarMedia(req);
        if (validaciones.lenght > 0) {
            return res.status(400).send(validaciones);
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sipnosis = req.body.sipnosis;
        media.peliculaURL = req.body.peliculaURL;
        media.fotoPortada = req.body.fotoPortada;
        media.añoEstreno = req.body.añoEstreno
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date();

        media = await media.save();

        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio algo al consultar Media');
    }
});

router.get('/:inventarioId', async function(req, res) {
    try {
        const media = await Media.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(404).send('Inventario no existe');
        }
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Media')
    }
});

module.exports = router;