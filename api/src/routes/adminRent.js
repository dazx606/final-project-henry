const { Router } = require("express");
const {
  User,
  RentOrder,
  OptionalEquipment,
  Driver,
  Location,
  IndividualCar,
  CarModel,
} = require("../db.js");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
require("dotenv").config();

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

const router = Router();

// ============================ GET =============================================================//
router.get("/", async (req, res, next) => {
  try {
    const orders = await RentOrder.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
