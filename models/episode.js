'use strict'
module.exports = (sequelize, DataTypes) => {
  var Episode = sequelize.define('Episode', {
    name: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
    price: DataTypes.DECIMAL,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING,
    release: DataTypes.DATE,
    video: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        Episode.belongsTo(models.Serie, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })
  return Episode
}
