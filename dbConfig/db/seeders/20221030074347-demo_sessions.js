'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sessions',
      [
        {
          name: "Crônicas de Ekar",
          start_date: "2015-01-10",
          narrator_id: 2,
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
