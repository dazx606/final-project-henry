const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "carModel",
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      pricePerDay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stripePriceId: {
        type: DataTypes.STRING,
      },
      passengers: {
        type: DataTypes.SMALLINT,
      },
      trunk: {
        type: DataTypes.ENUM("small", "medium", "large"),
      },
      consumption: {
        type: DataTypes.FLOAT,
      },
      engine: {
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      description: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      ratingNum: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );
};
