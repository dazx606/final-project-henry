const { Router } = require('express');
const { Car, CarType } = require('../db.js')
const { Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

(() => {
    try {
        preLoadDb();
    } catch (error) {
        console.log(error);
    }
})();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
