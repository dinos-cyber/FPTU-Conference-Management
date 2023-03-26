"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paper.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      blind_version: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_camera_ready: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prefix: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      author_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      abstract: {
        type: DataTypes.TEXT,
      },
      keywords: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Paper",
    }
  );
  return Paper;
};
