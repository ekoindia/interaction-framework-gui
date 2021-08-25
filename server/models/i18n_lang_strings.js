const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "i18n_lang_strings",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      en: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "English",
        unique: "UniqueText",
      },
      hi: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Hindi",
      },
      bn: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Bengali",
      },
      gu: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Gujarati",
      },
      mr: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Marathi",
      },
      kn: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Kannada",
      },
      ta: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
        comment: "Tamil",
      },
    },
    {
      sequelize,
      tableName: "i18n_lang_strings",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "UniqueText",
          unique: true,
          using: "BTREE",
          fields: [{ name: "en" }],
        },
      ],
    }
  );
