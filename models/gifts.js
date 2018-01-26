'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gifts = sequelize.define('Gifts', {
    user_id: DataTypes.INTEGER,
    serie_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    pay: DataTypes.STRING,
    claim: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Gifts.hasMany(models.Serie)
        models.Gifts.hasMany(models.User)
      }
    }
  });
  return Gifts;
};