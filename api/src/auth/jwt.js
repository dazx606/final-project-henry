var jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
require('dotenv').config();

const payload = {
    "id":user.id,
    "email":user.email,
    "role":user.admin
}