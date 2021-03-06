require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

//----------------------------------------HEROKU CONECTION------------------------------
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: { timestamps: false },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
} else {
  //-------------------------------------LOCAL----------------------------------------------------

  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    define: { timestamps: false },
  });
}



const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { CarModel, CarType, Driver, IncludedEquipment, IndividualCar, Location, OptionalEquipment, RentOrder, User } = sequelize.models;

CarModel.belongsTo(CarType);
CarType.hasMany(CarModel);

CarModel.belongsToMany(Location, { through: "modelLocation" });
Location.belongsToMany(CarModel, { through: "modelLocation" });

CarModel.belongsToMany(IncludedEquipment, { through: "carEquipment" });
IncludedEquipment.belongsToMany(CarModel, { through: "carEquipment" });

CarModel.belongsToMany(OptionalEquipment, { through: "carOptionalEquipment" });
OptionalEquipment.belongsToMany(CarModel, { through: "carOptionalEquipment" });

IndividualCar.belongsTo(CarModel);
CarModel.hasMany(IndividualCar);

IndividualCar.belongsTo(Location);
Location.hasMany(IndividualCar);

Driver.belongsTo(User);
User.hasMany(Driver);

RentOrder.belongsTo(IndividualCar);
IndividualCar.hasMany(RentOrder);

RentOrder.belongsTo(User);
User.hasMany(RentOrder);

RentOrder.belongsToMany(Driver, { through: "rentDriver" });
Driver.belongsToMany(RentOrder, { through: "rentDriver" });

RentOrder.belongsTo(Location);
Location.hasMany(RentOrder);

RentOrder.belongsToMany(OptionalEquipment, { through: "rentEquipment" });
OptionalEquipment.belongsToMany(RentOrder, { through: "rentEquipment" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,
};
