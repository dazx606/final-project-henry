const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('statusUpdate', {
        lastExecution: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps: false });
};