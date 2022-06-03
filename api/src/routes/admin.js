const { Router } = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtScope = require('express-jwt-scope');


require("dotenv").config();

const router = Router();

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

router.use(authMiddleWare);

  const checkScopes = (permissions)=> jwtScope(permissions, { scopeKey : 'permissions', requireAll: true });


// =================================================================================================//
router.get("/cool", authMiddleWare, checkScopes("read:user"), (req, res, next) => {
  try {
    res.send("permission")
  } catch (error) {
    next(error)
  }
});

router.get("/a", authMiddleWare, (req, res, next) => {
  try {
    res.send("token")
  } catch (error) {
    next(error)
  }
});

router.get("/b", (req, res, next) => {
  try {
    res.send("any")
  } catch (error) {
    next(error)
  }
});


module.exports = router;