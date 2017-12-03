'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        password: '774_fab',
        email: 'faben02@gmail.com',
        image: '1231',
        adress: 'suitbertusstrase 151',
        country: 'Germany',
        bio: 'lorem asldk aalskd alsdk alskd alskd alsdkasldk',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {})
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
