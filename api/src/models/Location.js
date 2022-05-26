const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('location', {
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, { timestamps: false });
};