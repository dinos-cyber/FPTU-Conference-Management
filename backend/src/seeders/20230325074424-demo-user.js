const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const generateFakeUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = bcrypt.hashSync(faker.internet.password(), 10);
    const country = faker.address.country();
    const address = faker.address.streetAddress();
    const phone = faker.phone.number();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      country,
      address,
      phone,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
    users.push(user);
  }
  return users;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeUsers = generateFakeUsers(20);
    await queryInterface.bulkInsert("Users", fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
