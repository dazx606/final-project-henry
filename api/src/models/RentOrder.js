const { DataTypes } = require('sequelize')

/* Deje las timestamps en true por  si quieren utilizarlas eventualmente,
ya que la reserva puede ser o no modificada */

module.exports = (sequelize) => {
    sequelize.define('rentOrder', {
        startingDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endingDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
        },
        rated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        refundId: {
            type: DataTypes.STRING,
        },
    })
}