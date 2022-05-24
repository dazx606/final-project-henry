const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('location', {
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};