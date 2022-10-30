'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Players',
      [
        {
          name: "Brunno Pessoa",
          email: "brunno.pessoa@rpg.com",
          active: true,
          role: "Player",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Igor Souza",
          email: "igor.souza@rpg.com",
          active: true,
          role: "Narrator",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Juliana Alves",
          email: "juliana.alves@rpg.com",
          active: true,
          role: "Player",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
