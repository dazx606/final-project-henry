const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('car', {
    license_plate: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.SMALLINT,
    },
    pricePerDay: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    passengers: {
      type: DataTypes.SMALLINT,
    },
    trunk: {
      type: DataTypes.STRING,
    },
    consumption: {
      type: DataTypes.FLOAT,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingNum: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  }, { timestamps: false });
};
