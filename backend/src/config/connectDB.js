import { Sequelize } from "sequelize";

const sequelize = new Sequelize("fptucms_database", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully! 😊");
  } catch (err) {
    console.error("Unable to connect to the database: ", error, "😖");
  }
};

module.exports = connectDB;
