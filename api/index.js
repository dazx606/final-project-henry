const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preloadLocation, preloadCarType, preloadIncludedEquipment, preloadOptionalEquipment, preloadCar, preloadDriver, preloadUser, preloadRentOrder } = require("./src/preloadDb/preloadFunctions")
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT);
  });
  try {
    await preloadLocation();
    await preloadCarType();
    await preloadIncludedEquipment();
    await preloadOptionalEquipment();
    await preloadCar();
    await preloadDriver();
    await preloadUser();
    await preloadRentOrder();
    console.log("Preload done");
  } catch (error) {
    console.log(error);
  }
});