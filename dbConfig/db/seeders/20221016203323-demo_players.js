'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Players',
      [
        {
          name: "Brunno",
          active: true,
          role: "Player",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Igor",
          active: true,
          role: "Narrator",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Juliana",
          active: false,
          role: "Player",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
