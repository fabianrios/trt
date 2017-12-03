'use strict'
module.exports = (sequelize, DataTypes) => {
  var Serie = sequelize.define('Serie', {
    name: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        User.hasMany(models.Episode)
      }
    }
  })
  return Serie
}
