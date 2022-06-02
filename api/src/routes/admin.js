const { Router } = require("express");
const { User, RentOrder, Driver, Payment } = require("../db.js");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const router = Router();

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

module.exports = router;
