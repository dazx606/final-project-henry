const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('user', {
        // userName: {
        //     type: DataTypes.STRING,
        //     primaryKey: true,
        // },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        language: {
            type: DataTypes.ENUM('Eng', 'Esp'),
            defaultValue: "Eng",
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, { timestamps: false });
};