'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserEpisode = sequelize.define('UserEpisode', {
    status: DataTypes.STRING,
    pay: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return UserEpisode
}
