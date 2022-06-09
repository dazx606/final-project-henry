const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "individualCar",
    {
      license_plate: {
        type: DataTypes.STRING,
        unique: true,
      },
      year: {
        type: DataTypes.SMALLINT,
      },
    },
    { timestamps: false }
  );
};
