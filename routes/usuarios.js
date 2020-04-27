const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator')


//Crea un usuario y lo manda a la api
router.post('/', [ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteeres').isLength({ min: 6})
] ,
usuarioController.crearUsuarios
);

module.exports = router;