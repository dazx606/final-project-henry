const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      // userName: {
      //     type: DataTypes.STRING,
      //     primaryKey: true,
      // },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      documentId: {
        type: DataTypes.STRING,
      },
      license: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // picture:{
      //   type:DataTypes.STRING,
      // },
      phone: {
        type: DataTypes.STRING,
      },
      language: {
        type: DataTypes.ENUM("Eng", "Esp"),
        defaultValue: "Eng",
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
