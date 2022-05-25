const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('driver', {
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