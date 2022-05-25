const { Router } = require('express');
const { Car, CarType, Location } = require('../db.js')
const { Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/cars/:locationId', async (req, res, next) => {
    const { brand, category, order, orderType, date, page} = req.query
    //PENDIENTE: FILTRADO POR FECHA!
    //date(availableDate)
    const { locationId } = req.params

    try {
        //los tengo como un array de objetos.
        
        if(category && brand){
            const filterByBoth = await Car.findAll({ 
                where: {locationId: locationId, brand: brand, category: category},
                limit: 6,
                offset: page * 6,
                order: [[orderType, order]],
                include: [{model: CarType}]
            })
            return res.json(filterByBoth)
        }
        if(brand){
            const carsByBrand = await Car.findAll({ 
                where: {locationId: locationId, brand: brand},
                limit: 6,
                offset: page * 6,
                order: [[orderType, order]],
                include: [{model: CarType}]
            })
            return res.json(carsByBrand)
        }
        if(category){
            // const type = await CarType.findOne({where: {name: category}})
            const carsByCategory = await Car.findAll({ 
                where: {locationId: locationId, category: category},
                limit: 6,
                offset: page * 6,
                order: [[orderType, order]],
                include: [{model: CarType}]
            })
            return res.json(carsByCategory)
        }
        if(orderType){
            const onlyOrder = await Car.findAll({ 
                where: {locationId: locationId},
                limit: 6,
                offset: page * 6,
                order: [[orderType, order]],
                include: [{model: CarType}]
            })
            return res.json(onlyOrder)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/locationCars/:locationId', async (req, res, next) => {
    const { locationId } = req.params
    try {
        const allCars = await Car.findAll({ 
            where: {locationId: locationId},
            include: [{model: CarType}]
        })
        return res.json(allCars)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
