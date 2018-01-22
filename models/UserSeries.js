'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserSeries = sequelize.define('UserSeries', {
    status: DataTypes.STRING,
    pay: DataTypes.STRING,
    email: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return UserSeries
}
