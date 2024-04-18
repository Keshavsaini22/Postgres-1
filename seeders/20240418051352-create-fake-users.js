'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: "john@gmail.com",
      role: "User",
      uuid: "75ef6b48-f3da-473d-a80f-298f4c3fe896",
      createdAt: "2024-04-17T13:05:38.744Z",
      updatedAt: "2024-04-17T13:05:38.744Z"
    },
    {
      name: 'John Doeee',
      email: "johnee@gmail.com",
      role: "User",
      uuid: "75ef6b48-f3da-473d-a80f-298f4c3fe890",
      createdAt: "2024-04-17T13:05:38.744Z",
      updatedAt: "2024-04-17T13:05:38.744Z"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
