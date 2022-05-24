const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('carType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};