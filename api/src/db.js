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

const { Car, CarType, Driver, IncludedEquipment, Location, OptionalEquipment, Payment, RentOrder, User } = sequelize.models;


// Aca vendrian las relaciones
Car.belongsTo(CarType);
CarType.hasMany(Car);

Car.belongsTo(Location);
Location.hasMany(Car);

Car.belongsToMany( IncludedEquipment , {through:"CarEquipment"});
IncludedEquipment.belongsToMany( Car , {through:"CarEquipment"});

Car.belongsToMany( OptionalEquipment , {through:"CarOptionalEquipment"});
OptionalEquipment.belongsToMany( Car , {through:"CarOptionalEquipment"});

Payment.belongsTo(User);
User.hasMany(Payment);

Driver.belongsTo(User);
User.hasMany(Driver);

RentOrder.belongsTo(Car);
Car.hasMany(RentOrder);

RentOrder.belongsTo(User);
User.hasMany(RentOrder);

RentOrder.belongsToMany( Driver , {through:"RentDriver"});
Driver.belongsToMany( RentOrder , {through:"RentDriver"});

RentOrder.belongsTo(Location);
Location.hasMany(RentOrder);

RentOrder.belongsToMany( OptionalEquipment , {through:"RentEquipment"});
OptionalEquipment.belongsToMany( RentOrder , {through:"RentEquipment"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,
};
