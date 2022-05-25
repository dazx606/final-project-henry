const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preloadLocation, preloadCar } = require("./src/preloadDb/preloadFunctions")
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT); // eslint-disable-line no-console
  });
  try {
    await preloadLocation();
    await preloadCar();
  } catch (error) {
    console.log(error);
  }
});