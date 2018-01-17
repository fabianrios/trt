'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserEpisodes = sequelize.define('UserEpisodes', {
    status: DataTypes.STRING,
    pay: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return UserEpisodes
}
