"use strict";

const { faker } = require("@faker-js/faker");

const papers = [];

for (let i = 1; i <= 100; i++) {
  papers.push({
    user_id: Math.floor(Math.random() * 10 + 1),
    path: faker.system.filePath(),
    title: faker.lorem.sentence(),
    checked: Math.floor(Math.random()),
    score: Math.floor(Math.random() * 100 + 1),
    blind_version: Math.floor(Math.random() * 2 + 1),
    is_camera_ready: Math.floor(Math.random()),
    notes: faker.lorem.paragraph(),
    author_name: faker.name.fullName(),
    prefix: faker.name.prefix(),
    institution: faker.company.name(),
    country: faker.address.country(),
    author_email: faker.internet.email(),
    phone: faker.phone.number(),
    abstract: faker.lorem.paragraph(),
    keywords: faker.lorem.words(),
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("papers", papers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("papers", null, {});
  },
};
