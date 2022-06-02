const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('optionalEquipment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stripePriceId: {
            type: DataTypes.STRING,
        },
    }, { timestamps: false });
};