'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Characters',
      [
        {
          name: "Auros Auriga",
          character_class: "Clérigo",
          Level: 34,
          player_id: 1,
          session_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Flaira Lirista",
          character_class: "Bardo",
          Level: 40,
          player_id: 3,
          session_id: 1,
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
