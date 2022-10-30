'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      character_class: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:"Players",
          key: "id"
        }
      },
      session_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:"Sessions",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};