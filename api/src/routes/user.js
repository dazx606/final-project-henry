const { Router } = require("express");
const {
  User,
  RentOrder,
  IndividualCar,
  CarModel,
  Location,
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
router.get("/", authMiddleWare, async (req, res, next) => {
  const { email } = req.query;
  try {
    let completed;
    const user = await User.findOne({ where: { email } });
    if (user === null) return res.send({ msg: "User not found" });
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);
    return res.status(200).send({ data: user, completed });
  } catch (error) {
    next(error);
  }
});

router.get("/reservations", async (req, res, next) => {
  const { userId } = req.query;

  try {
    if (userId) {
      let orders = await RentOrder.findAll({
        where: { userId },
        include: [{ model: IndividualCar, include: [CarModel, Location] }],
      });
      return res.json(orders);
    }
  } catch (error) {
    next(error);
  }
});

// ============================ POST =============================================================//
router.post("/", async (req, res, next) => {
  const { email, picture } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        picture: picture,
      },
    });
    let completed;
    user.firstName && user.lastName && user.documentId && user.license
      ? (completed = true)
      : (completed = false);
    if (created)
      return res
        .status(201)
        .json({ msg: "User created", data: user.id, completed });
    return res.status(200).json({
      msg: "User found",
      data: user.id,
      completed,
    });
  } catch (error) {
    next(error);
  }
});

// ============================ PATCH =============================================================//
router.patch("/:id", authMiddleWare, async (req, res, next) => {
  try {
    const { id } = req.params;
    const v4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const { firstName, lastName, documentId, license, phone, language } =
      req.body;

    if (!v4.test(id)) return res.status(406).send({ msg: "Invalid id format" });
    const user = await User.findOne({ where: { id } });
    if (user === null) return res.status(404).send({ msg: "User not found" });
    User.update(
      { firstName, lastName, documentId, license, phone },
      { where: { id } }
    );
    return res.status(202).send({
      msg: "user updated",
      updatedData: {
        firstName,
        lastName,
        documentId,
        license,
        phone,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
