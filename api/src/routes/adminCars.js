const { Router } = require("express");
const { User, Location, IndividualCar, CarModel } = require("../db.js");
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
