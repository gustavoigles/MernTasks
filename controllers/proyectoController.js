const Proyecto = require('../models/Proyects')
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({errors : errors.array() })
    }

    try {
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


exports.obtenerProyecto = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador : req.usuario.id}).sort({creado :-1});
        res.json( {proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualiza un proyecto

exports.actualizarProyecto = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({errors : errors.array() })
    }

    const { nombre} = req.body;
    const nuevoProyecto = {};

    if(nombre) {
        nuevoProyecto.nombre  = nombre;
    }

    try {
            let proyecto = await Proyecto.findById(req.params.id)

            if(proyecto.creador.toString() != req.usuario.id) {
                return res.status(401).json({ mshg : 'No autorizado'})
            }

            proyecto = await Proyecto.findByIdAndUpdate({ _id : req.params.id}, { $set : nuevoProyecto}, {new : true})

            res.json({ proyecto })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
        }
}

exports.eliminarProyecto = async (req, res) => {
    try {
        const proyectos = await Proyecto.findOneAndRemove({'_id' : req.params.id})
        res.json( {proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}