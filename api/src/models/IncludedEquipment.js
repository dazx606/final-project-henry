const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('includedEquipment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};