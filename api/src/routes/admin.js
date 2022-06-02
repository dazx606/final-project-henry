const { Router } = require("express");
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
router.get("/", (req, res, next) => {
  try {
    res.send("si");
  } catch (error) {}
});
// ============ USERS
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: RentOrder, attributes: ["startingDate", "endingDate"] },
        {
          model: Driver,
          attributes: ["firstName", "lastName"],
        },
        { model: Payment, attributes: ["firstName", "lastName"] },
      ],
    });
    return res.json(users);
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
    return res.json({ message: "User deleted" });
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
  } catch (error) {}
});

module.exports = router;
