const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('payment', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};