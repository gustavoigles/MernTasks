const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post('/',
 auth, 
 proyectoController.crearProyecto)

 router.get('/',
 auth, 
 proyectoController.obtenerProyecto)

 router.put('/:id',
 auth,
 [
     check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
 ],
 proyectoController.actualizarProyecto)

 router.delete('/:id',
 auth,

 proyectoController.eliminarProyecto)



module.exports = router;