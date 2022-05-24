const { DataTypes } = require('sequelize')

/* Deje las timestamps en true por  si quieren utilizarlas eventualmente,
ya que la reserva puede ser o no modificada */

module.exports = (sequelize) => {
    sequelize.define('rentOrder', {
        startingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })
}