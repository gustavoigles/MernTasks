//Rutas para autenticar
const express = require('express')
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')


//Crea un usuario y lo manda a la api
router.post('/',
 authController.autenticarUsuario
);

router.get('/', 
    auth,
    authController.usuarioAutenticado
);

module.exports = router;