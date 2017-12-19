'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dashboard = sequelize.define('Dashboard', {
    main_serie_id: DataTypes.INTEGER,
    video: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Dashboard.hasOne(models.Serie)
      }
    }
  });
  return Dashboard;
};