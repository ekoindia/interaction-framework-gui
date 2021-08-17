const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "i18n_lang_strings_app",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      keystr: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "Key String in English",
        unique: "UniqueKey",
      },
      en: {
        type: DataTypes.STRING(1000),
        allowNull: false,
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
      disabled: {
        type: DataTypes.DECIMAL(1, 0),
        allowNull: false,
        defaultValue: 0,
        comment: "Is entry disabled (not being used in the connect app)?",
      },
    },
    {
      sequelize,
      tableName: "i18n_lang_strings_app",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "UniqueKey",
          unique: true,
          using: "BTREE",
          fields: [{ name: "keystr" }],
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
