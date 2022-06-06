const { Router } = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtScope = require('express-jwt-scope');
require("dotenv").config();
const router = Router();

const {
  User,
  RentOrder,
  OptionalEquipment,
  Driver,
  Location,
  IndividualCar,
  CarModel,
  Payment,
} = require("../db.js");




// ===================================== AUTHORIZATION MIDDLEWARE ==================================//
const authMiddleWare = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH_JWKS_URI,
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ["RS256"],
});
const checkScopes = (permissions)=> jwtScope(permissions, { scopeKey : 'permissions', requireAll: true });

// router.use(authMiddleWare);
// router.use(checkScopes("read:user"));
  

// ===================================GET== USERS
router.get("/users", async (req, res, next) => {
  const {email} = req.query
  console.log(email)
  try {
    let users = await User.findAll(
    //   {
    //   include: [
    //     { model: RentOrder, attributes: ["startingDate", "endingDate"] },
    //     {
    //       model: Driver,
    //       attributes: ["firstName", "lastName"],
    //     },
    //     { model: Payment, attributes: ["firstName", "lastName"] },
    //   ],
    // }
    );    
    if (email) {
      users = users.filter(u => u.email.includes(email))
      if(!users) return res.status(404).json({msg: 'user not found'})
      return res.status(200).json(users)
    }
    if(!email){
      return res.status(200).json(users);
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }
});



router.delete("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.destroy();
    const users = await User.findAll()
    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//============ RENT
router.get("/rent", async (req, res, next) => {
  try {
    const orders = await RentOrder.findAll();
    res.status(200).send(orders);
  } catch (error) { }
});

//============ CARS
router.get("/allCars", async (req, res, next) => {
  const { plate, locationId } = req.query;
  console.log(plate)
  try {
    if (plate && !locationId) {
      let specificCar = await IndividualCar.findAll({
        where: {
          license_plate: plate.toString(),
        },
        order: [['license_plate', 'ASC']],
        include: {
          model: CarModel,
          attributes: ['model'],
        }
      });
      if (!specificCar.length) return res.status(404).json({ msg: 'car not found' })
      return res.status(200).json({ car: specificCar })
    };
  
    if(locationId){
      let carsInCity = await Location.findByPk(locationId,{
        order:[[{model: IndividualCar}, 'license_plate', 'ASC']],
        include:[{
          model: IndividualCar,          
        },
        {
          model: CarModel,
          attributes: ['model'],
        }
      ],
      });
      carsInCity= carsInCity.individualCars;
      if(plate) {
        carsInCity = carsInCity.filter(c => c.license_plate.includes(plate.toString()))
      }
      
      return res.status(200).json({cars: carsInCity});
    }

    if (!plate && !locationId) {
      let allCars = await IndividualCar.findAll({
        order: [['license_plate', 'ASC']],
        include: {
          model: CarModel,
          attributes: ['model'],
        }
      })
      return  res.status(201).json({ car: allCars })
    }

  } catch (e) {
    next(e)
  }
});

router.delete("/cars/delete/:license_plate", async (req,res,next)=>{
  const {license_plate} = req.params;
  try {
    let car = await IndividualCar.destroy({where:{license_plate}});
    if (car === 1) res.send({msg:"Deleted",license: license_plate});
    else if (car === 0) res.status(404).send({msg:"Car not found, check and try again",license: license_plate});
  } catch (error) {
    next(error)
  }
});

//===================================================RESERVATIONS==================================

router.get("/reservations", async (req,res,next)=>{
    
  const {userId, orderId} = req.query;

  try {
    if(userId){
      let orders = await RentOrder.findAll({where:{userId}, include:[{model:IndividualCar, include:[CarModel, Location]}]});
      return orders.length ?  res.send({orders}) : res.status(404).send({msg:"There are no orders for the user"})
    }
    if(orderId){
      let order = await RentOrder.findOne({where:{id:orderId}, include:[{model:IndividualCar, include:[CarModel, Location]}]});
      return order !==null ?  res.send({order}) : res.status(404).send({msg:"order not found"});
    }
    // let orders = await RentOrder.findAll({include:[{model:IndividualCar, include:[CarModel, Location]}]});
    let orders = await RentOrder.findAll({ include:{
      model:User,
      attributes: ['firstName','lastName','email'],
    }});
    orders.length ?  res.send({orders}) : res.status(404).send({msg:"There are no orders"})

  } catch (error) {
    next(error)
  }
});

router.delete("/reservations/delete/:id", async (req,res,next)=>{
  const {id} = req.params;
  try {
    let order = await RentOrder.destroy({where:{id}});
    if (order === 1) res.send({msg:"Deleted", id});
    else if (order === 0) res.status(404).send({msg:"Order not found, check and try again", id});
  } catch (error) {
    next(error)
  }
});

module.exports = router;