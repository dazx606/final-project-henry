const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('optionalEquipment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};