const { Router } = require('express');
const { Car, CarType } = require('../db.js')
const { Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/cars', async (req, res, next) => {
    const { model, carType } = req.query

    try {
        if (model) {
            const cars = await Car.findAll({ where: { model: { [Op.eq]: model } } })
            return res.send(cars)
        }
        else if (carType) {
            const cars = await CarType.findAll(
                {
                    where: { name: { [Op.eq]: carType } },
                    include: {
                        model: Car,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                })
                return res.send(cars)
        }
        else{
            const cars = await Car.findAll()
            return res.send(cars)
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;
