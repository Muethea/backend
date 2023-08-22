const { DataTypes } = require('sequelize')

const db = require('../db/db')

const User = db.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING
  }
})

module.exports = User
