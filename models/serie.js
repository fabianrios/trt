'use strict'
module.exports = (sequelize, DataTypes) => {
  var Serie = sequelize.define('Serie', {
    name: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    bio: DataTypes.TEXT,
    video: DataTypes.TEXT,
    release: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.User.hasMany(models.Episode)
        models.Serie.hasMany(models.Gifts)
      }
    }
  })
  return Serie
}
