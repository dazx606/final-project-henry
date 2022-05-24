const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('carType', {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};