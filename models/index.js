'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var env = process.env.NODE_ENV || 'development'
var config = require(path.join(__dirname, '/../config/config.json'))[env]
var db = {}

console.log(config.database, 'which', process.env.DATABASE_URL)

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL)
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
  }
}

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Serie.hasMany(db.Episode, { foreignKey: 'serie_id' })
db.Episode.belongsTo(db.Serie, { foreignKey: 'serie_id' })

db.Episode.belongsToMany(db.User, {through: db.UserEpisodes})
db.User.belongsToMany(db.Episode, {through: db.UserEpisodes})

db.Serie.hasMany(db.Gifts, { foreignKey: 'serie_id' })
db.User.hasMany(db.Gifts, { foreignKey: 'user_id' })

db.Gifts.belongsTo(db.Serie, { foreignKey: 'serie_id' })
db.Gifts.belongsTo(db.User, { foreignKey: 'user_id' })

db.Serie.belongsToMany(db.User, {through: db.UserSeries})
db.User.belongsToMany(db.Serie, {through: db.UserSeries})

db.Serie.hasOne(db.Dashboard, {foreignKey: 'main_serie_id'})
db.Dashboard.belongsTo(db.Serie, {foreignKey: 'main_serie_id'})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
